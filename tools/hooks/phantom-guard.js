#!/usr/bin/env node
/**
 * PHANTOM ship guard — the mechanical half of ship discipline, executed instead of remembered.
 *
 * Installed 2026-08-08 by the instruction-surface compaction. It replaces four prose rules and
 * one blocking rule that could never run:
 *
 *   CLAUDE.md used to say "a ship is blocked until lockstep-auditor and data-honesty-auditor both
 *   report PASS". Those agents live in nexus01/.claude/agents/, the session CWD is the home
 *   directory, so they were never loadable — BATCH-VERIFY records "Agents barred, equivalents run
 *   inline" three separate times. A gate that cannot execute is not a gate. These checks run.
 *
 * WHAT IT ENFORCES (each one has drawn blood at least once):
 *   1. CRLF preservation on dct-ios.html / sw.js  — `sed -i` silently rewrites 55k line endings
 *   2. Three-stamp lockstep                       — dct-ios.html + sw.js + version.json or no ship
 *   3. Inline <script> compile + CSS brace balance — a syntax error ships a blank app
 *   4. No backticks in a git commit body           — they run as a subshell and eat the message
 *   5. VERIFIED token gate                        — version.json bumps blocked until VERIFIED is stamped
 *
 * DESIGN NOTES, so a later reader does not "simplify" this into a footgun:
 *   - Scoped to the PHANTOM repo. Any other project passes straight through untouched.
 *   - Read-only. It inspects and reports; it never edits, stages, or rewrites anything.
 *   - Fails OPEN on its own internal error. A broken guard must not block a real fix at 2am —
 *     it prints the failure and gets out of the way. It is a seatbelt, not an immobiliser.
 *   - Exit 2 blocks the tool call and returns stderr to Claude; exit 0 allows it.
 */

'use strict';
const fs = require('fs');
const path = require('path');

const REPO = 'C:\\Users\\Darkm\\nexus01';
const APP = path.join(REPO, 'dct-ios.html');
const SW = path.join(REPO, 'sw.js');
const VER = path.join(REPO, 'version.json');

function read(p) { return fs.readFileSync(p, 'utf8'); }
function inRepo(p) {
  if (!p) return false;
  return path.resolve(String(p)).toLowerCase().startsWith(REPO.toLowerCase());
}

/** Lone LF (or lone CR) in a CRLF file = line endings were rewritten by something. */
function lineEndingReport(file) {
  const b = fs.readFileSync(file);
  let crlf = 0, loneLF = 0, loneCR = 0;
  for (let i = 0; i < b.length; i++) {
    if (b[i] === 10) { if (i > 0 && b[i - 1] === 13) crlf++; else loneLF++; }
    else if (b[i] === 13 && b[i + 1] !== 10) loneCR++;
  }
  return { crlf, loneLF, loneCR };
}

function checkLineEndings(file) {
  const { crlf, loneLF, loneCR } = lineEndingReport(file);
  // Only assert on files that are CRLF to begin with; a genuinely LF file is not damaged.
  if (crlf > 0 && (loneLF > 0 || loneCR > 0)) {
    return `${path.basename(file)}: LINE ENDINGS DAMAGED — ${crlf} CRLF but ${loneLF} lone LF / `
      + `${loneCR} lone CR. Something rewrote them (sed -i is the usual culprit). `
      + `Restore with: git checkout -- ${path.basename(file)}  then redo the edit with Edit.`;
  }
  return null;
}

function checkStamps() {
  const app = read(APP), sw = read(SW);
  const a = (app.match(/const PHANTOM_APP_VERSION = '(phantom-v[\d.]+)'/) || [])[1];
  const s = (sw.match(/const CACHE_VERSION = '(phantom-v[\d.]+)'/) || [])[1];
  let v = null;
  try { v = JSON.parse(read(VER)).version; } catch (e) { return `version.json is not valid JSON: ${e.message}`; }
  if (!a || !s || !v) return `stamp not found — app:${a || 'MISSING'} sw:${s || 'MISSING'} json:${v || 'MISSING'}`;
  if (a !== s || a !== v) {
    return `THREE-STAMP LOCKSTEP BROKEN — dct-ios.html:${a}  sw.js:${s}  version.json:${v}. `
      + `All three move together or the service worker serves stale bytes under a new version.`;
  }
  return null;
}

function checkCompile() {
  const s = read(APP);
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
  const vm = require('vm');
  let m, i = 0, bad = [];
  while ((m = re.exec(s))) {
    i++;
    const line = s.slice(0, m.index).split('\n').length;
    try { new vm.Script(m[1], { filename: `inline-block-${i}` }); }
    catch (e) { bad.push(`block ${i} (near dct-ios.html:${line}): ${e.message}`); }
  }
  if (bad.length) return `INLINE SCRIPT DOES NOT COMPILE — ${bad.join(' | ')}`;
  const open = (s.match(/{/g) || []).length, close = (s.match(/}/g) || []).length;
  if (open !== close) return `CSS/JS BRACE IMBALANCE — ${open} { vs ${close} }. A dropped brace silently kills every rule after it.`;
  return null;
}

function checkSwCompile() {
  try { new (require('vm').Script)(read(SW), { filename: 'sw.js' }); } catch (e) { return `sw.js does not compile: ${e.message}`; }
  return null;
}

/** Branch topology gate: work lands on main; release is promote-only.
 *  v1.14.520 through .523 were committed straight onto release on 2026-08-27, bypassing
 *  main, and were orphaned the next day by a reset to main. They survive only because they
 *  were tagged after the fact (recovery-v1.14.520 .. .523). This refuses the commit that
 *  would repeat it. Promotion is unaffected: git merge --ff-only creates no commit. */
function checkBranchGate(cmd) {
  if (!/git\s+commit/.test(cmd)) return null;

  try {
    const head = read(path.join(REPO, '.git', 'HEAD')).trim();
    const m = /^ref:\s*refs\/heads\/(.+)$/.exec(head);
    if (!m) return null;                    // detached HEAD is not the failure this guards
    if (m[1].trim() === 'release') {
      return 'GATE: HEAD is on release, which is promote-only. Commit to main, then promote with '
        + 'git checkout release && git merge --ff-only main. (v1.14.520-.523 were committed here '
        + 'and lost to a reset; see tags recovery-v1.14.520 through recovery-v1.14.523.)';
    }
  } catch (e) {
    process.stderr.write(`[phantom-guard] branch gate check skipped (error): ${e.message}\n`);
  }

  return null;
}

/** VERIFIED token gate: version.json bumps are blocked until owner stamps the old version. */
function checkVerifiedGate(cmd) {
  if (!/git\s+commit/.test(cmd)) return null;

  const VERIFIED_FILE = path.join(REPO, 'VERIFIED');
  const { execSync } = require('child_process');

  try {
    // Check what files are staged
    const staged = execSync('git diff --cached --name-only', { cwd: REPO, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim().split('\n').filter(Boolean);

    // Block any attempt to commit changes to VERIFIED
    if (staged.includes('VERIFIED')) {
      return 'GATE: VERIFIED is owner-only. Never commit changes to this file.';
    }

    // If version.json is being modified, check that VERIFIED matches the old version
    if (staged.includes('version.json')) {
      let oldVersion = null;
      try {
        const oldVerJson = execSync('git show HEAD:version.json', { cwd: REPO, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
        oldVersion = JSON.parse(oldVerJson).version;
      } catch (e) {
        // If HEAD doesn't have version.json yet (first commit scenario), proceed
        if (e.toString().includes('exists on disk, but not in')) return null;
        return `GATE: Could not read old version from HEAD: ${e.message}`;
      }

      // Read VERIFIED file
      let verified = null;
      if (fs.existsSync(VERIFIED_FILE)) {
        verified = read(VERIFIED_FILE).trim();
      }

      if (verified !== oldVersion) {
        return `GATE: ${oldVersion} not stamped in VERIFIED. Owner must verify on device and update VERIFIED before the next ship.`;
      }
    }
  } catch (e) {
    // Fail open on internal errors
    process.stderr.write(`[phantom-guard] VERIFIED gate check skipped (error): ${e.message}\n`);
  }

  return null;
}

/** Backticks inside a commit body run as a subshell and silently eat the snippet. */
function checkCommitMessage(cmd) {
  if (!/git\s+commit/.test(cmd)) return null;
  if (/-F\s*-|--file|-F\s+\S/.test(cmd)) return null;      // heredoc / file: safe by construction
  const dashM = cmd.match(/-m\s+(['"])([\s\S]*?)\1/);
  if (dashM && dashM[2].includes('`')) {
    return 'BACKTICK IN COMMIT MESSAGE — it will run as a subshell and swallow the snippet. '
      + 'Use a quoted heredoc instead:  git commit -F - <<' + "'EOF'";
  }
  return null;
}

let input = '';
process.stdin.on('data', (c) => (input += c));
process.stdin.on('end', () => {
  let payload = {};
  try { payload = JSON.parse(input || '{}'); } catch (_) { process.exit(0); }

  const tool = payload.tool_name || '';
  const ti = payload.tool_input || {};
  const problems = [];

  try {
    if (tool === 'Edit' || tool === 'Write' || tool === 'NotebookEdit') {
      // POST-EDIT: only the two files whose line endings are load-bearing.
      const fp = ti.file_path;
      if (inRepo(fp)) {
        const base = path.basename(String(fp)).toLowerCase();
        if (base === 'dct-ios.html' || base === 'sw.js') {
          const r = checkLineEndings(fp);
          if (r) problems.push(r);
        }
      }
    } else if (tool === 'Bash' || tool === 'PowerShell') {
      const cmd = String(ti.command || '');
      const msg = checkCommitMessage(cmd);
      if (msg) problems.push(msg);

      // PRE-COMMIT: the full mechanical gate, but only when a commit would include the app.
      if (/git\s+commit/.test(cmd) && fs.existsSync(APP)) {
        // Branch topology gate runs first: a commit on release is wrong whatever the stamps say.
        const branchGate = checkBranchGate(cmd);
        if (branchGate) problems.push(branchGate);

        // VERIFIED token gate runs next (blocks before the mechanical checks)
        const verifiedGate = checkVerifiedGate(cmd);
        if (verifiedGate) problems.push(verifiedGate);

        for (const fn of [checkStamps, checkCompile, checkSwCompile]) {
          const r = fn();
          if (r) problems.push(r);
        }
        for (const f of [APP, SW]) {
          const r = checkLineEndings(f);
          if (r) problems.push(r);
        }
      }
    }
  } catch (e) {
    // FAIL OPEN — a broken guard must never block a real fix.
    process.stderr.write(`[phantom-guard] check skipped (internal error): ${e.message}\n`);
    process.exit(0);
  }

  if (problems.length) {
    process.stderr.write(
      'PHANTOM SHIP GUARD — BLOCKED\n\n' +
      problems.map((p, i) => `${i + 1}. ${p}`).join('\n\n') +
      '\n\nThese are the mechanical gates from CLAUDE.md, enforced rather than remembered.\n' +
      'Fix the cause; do not work around the guard.\n'
    );
    process.exit(2);
  }
  process.exit(0);
});
