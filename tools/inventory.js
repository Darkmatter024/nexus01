'use strict';
// FIXTURE VERIFICATION - each failure class was reintroduced and confirmed to
// trip a named fixture (2026-08-04):
//   substring trap (regex per class)      -> rd-row-has-no-emitters
//   all-zeros instrument (empty map)      -> dl-chip-is-live, tile-is-live
//                                            (rd-row STILL PASSES - one witness
//                                            is not enough)
//   unterminated scope attribution        -> sw_pillTap-span (via spanOf) and
//                                            scopeOf-boundary-past-sw_pillTap
//                                            (via scopeOf, the attribution path
//                                            users actually read).
//                                            sw_pillTap-has-no-color-refs does
//                                            NOT trip: colorRefsIn filters by
//                                            the fixture's own hardcoded range,
//                                            never by scope.end.
//   column-anchored fn detection          -> indented-fn-logCrash-is-scoped,
//                                            indented-fn-logo_goHome-is-scoped
//   neon-token collision (\b vs lookahead)-> channels-reject-neon-variants
//   evidence truncation (slice from 0)    -> sanctioned-evidence-shows-its-marker
// Re-run this verification if the fixture set changes.
const fs = require('fs'), path = require('path');
const TARGET = path.join(__dirname, '..', 'dct-ios.html');

function loadTarget() {
  let src;
  try { src = fs.readFileSync(TARGET, 'utf8'); }
  catch (e) { console.error('inventory: cannot read ' + TARGET + ': ' + e.message); process.exit(1); }
  const lines = src.split(/\r?\n/);
  return { src: src, lines: lines, tokens: buildClassTokens(src), scopes: buildScopeIndex(lines) };
}

function rootHas(src, name) {
  const blocks = src.match(/:root\s*\{([\s\S]*?)\}/g);
  if (!blocks) return false;
  const content = blocks.map(function (b) { return b.match(/:root\s*\{([\s\S]*?)\}/)[1]; }).join(' ');
  return new RegExp('(^|[;\\s])' + name + '\\s*:').test(content);
}

// Tokenise EVERY class attribute once. Never a regex per class - that is
// what produced two false inventories (rd- matches inside card-/board-).
function buildClassTokens(src) {
  const tok = {};
  const re = /class\s*=\s*("([^"]*)"|'([^']*)')/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const v = m[2] !== undefined ? m[2] : m[3];
    v.split(/[\s+'"]+/).forEach(function (t) { if (t) tok[t] = (tok[t] || 0) + 1; });
  }
  return tok;
}

// Detect functions at ANY indentation, and track nesting with a stack so an
// inner function's closing brace cannot close its parent. Each frame records
// the brace depth it opened at; it closes when depth returns to that base.
function buildScopeIndex(lines) {
  const out = [];
  const stack = [];
  let depth = 0;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const m = l.match(/^\s*(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/);
    if (m) stack.push({ name: m[1], start: i + 1, base: depth, end: -1 });
    depth += (l.match(/\{/g) || []).length - (l.match(/\}/g) || []).length;
    while (stack.length && depth <= stack[stack.length - 1].base) {
      const f = stack.pop();
      f.end = i + 1;
      out.push(f);
    }
  }
  while (stack.length) { const f = stack.pop(); f.end = lines.length; out.push(f); }
  return out.sort(function (a, b) { return a.start - b.start; });
}

function spanOf(index, name) {
  for (let i = 0; i < index.length; i++) if (index[i].name === name) return index[i];
  return null;
}

// Innermost enclosing function wins - the one with the LATEST start that still
// contains the line. Without this, a nested line reports its outer function.
function scopeOf(index, line) {
  let best = null;
  for (let i = 0; i < index.length; i++) {
    const f = index[i];
    if (line >= f.start && line <= f.end) {
      if (best === null || f.start > best.start) best = f;
    }
  }
  return best === null ? '(markup)' : best.name + '()';
}

function emitters(tokens, cls) { return tokens[cls] || 0; }

const CHANNELS = {
  red: /var\(--red(?=[\s,)])|#ff453a|#ff3b30|#ff2d55|#ff5a4d|rgba\(\s*255,\s*(69|45|59)\s*,/i,
  green: /var\(--green(?=[\s,)])|#30d158|#34c759|#32d74b|rgba\(\s*(48|52|50),\s*(209|199|215)\s*,/i
};

// Shared window: 30 chars of lead-in, 110 total, '...' when clipped on the left.
function sliceAround(t, idx) {
  const start = Math.max(0, idx - 30);
  return (start > 0 ? '...' : '') + t.slice(start, start + 110);
}

// Centre the window on an arbitrary marker - used where the thing that must be
// visible is not the colour but the reason the row was selected.
function evidenceForPattern(line, re) {
  const t = line.trim();
  const m = t.match(re);
  return sliceAround(t, (m && m.index !== undefined) ? m.index : 0);
}

// Centre the evidence window on the actual match. A fixed slice from column 0
// silently omits the match on long lines, leaving a real row with unrelated
// evidence - the exact "looks right, is wrong" failure this tool exists to stop.
function evidenceFor(line, ch) {
  const t = line.trim();
  let idx = -1;
  if (ch === 'red' || ch === 'both') {
    const m = t.match(CHANNELS.red);
    if (m && m.index !== undefined) idx = m.index;
  }
  if (ch === 'green' || ch === 'both') {
    const m = t.match(CHANNELS.green);
    if (m && m.index !== undefined && (idx < 0 || m.index < idx)) idx = m.index;
  }
  return sliceAround(t, idx < 0 ? 0 : idx);
}

function colorRefs(ctx, opts) {
  const above = opts.above || 0, want = opts.channel || 'all', rows = [];
  for (let i = 0; i < ctx.lines.length; i++) {
    const n = i + 1;
    if (n < above) continue;
    const l = ctx.lines[i];
    const r = CHANNELS.red.test(l), g = CHANNELS.green.test(l);
    if (!r && !g) continue;
    const ch = r && g ? 'both' : (r ? 'red' : 'green');
    if (want !== 'all' && ch !== want && ch !== 'both') continue;
    rows.push({ line: n, channel: ch, scope: scopeOf(ctx.scopes, n), evidence: evidenceFor(l, ch) });
  }
  return rows;
}

function colorRefsIn(ctx, from, to) {
  return colorRefs(ctx, { above: from }).filter(function (r) { return r.line <= to; }).length;
}

// Derived from the file, never remembered. EXIT and BLAST are owner-sanctioned red.
function exitLines(ctx) {
  const out = [];
  for (let i = 0; i < ctx.lines.length; i++) {
    if (/#rd-exit/.test(ctx.lines[i]) && CHANNELS.red.test(ctx.lines[i])) out.push(i + 1);
  }
  return out;
}

function sanctioned(ctx) {
  const rows = [];
  exitLines(ctx).forEach(function (n) {
    rows.push({ line: n, kind: 'EXIT', evidence: evidenceForPattern(ctx.lines[n - 1], /#rd-exit/) });
  });
  for (let i = 0; i < ctx.lines.length; i++) {
    const l = ctx.lines[i];
    if (/BLAST|blastradius/i.test(l) && CHANNELS.red.test(l)) {
      rows.push({ line: i + 1, kind: 'BLAST', evidence: evidenceForPattern(l, /BLAST|blastradius/i) });
    }
  }
  return rows.sort(function (a, b) { return a.line - b.line; });
}

const FIXTURES = [
  { name: 'root-defines-teal', run: function (ctx) {
      const a = rootHas(ctx.src, '--teal');
      return { ok: a === true, expected: 'true', actual: String(a) }; } },
  { name: 'root-omits-mag', run: function (ctx) {
      const a = rootHas(ctx.src, '--mag');
      return { ok: a === false, expected: 'false', actual: String(a) }; } },
  { name: 'rd-row-has-no-emitters', run: function (ctx) {
      const a = emitters(ctx.tokens, 'rd-row');
      return { ok: a === 0, expected: '0', actual: String(a) }; } },
  { name: 'dl-chip-is-live', run: function (ctx) {
      const a = emitters(ctx.tokens, 'dl-chip');
      return { ok: a > 0, expected: '> 0', actual: String(a) }; } },
  { name: 'tile-is-live', run: function (ctx) {
      const a = emitters(ctx.tokens, 'tile');
      return { ok: a > 0, expected: '> 0', actual: String(a) }; } },
  { name: 'sw_pillTap-span', run: function (ctx) {
      const s = spanOf(ctx.scopes, 'sw_pillTap');
      const a = s ? ('L' + s.start + '-L' + s.end) : 'not found';
      return { ok: a === 'L12617-L12633', expected: 'L12617-L12633', actual: a }; } },
  { name: 'scopeOf-boundary-past-sw_pillTap', run: function (ctx) {
      const a = scopeOf(ctx.scopes, 12634);
      return { ok: a === '(markup)', expected: '(markup)', actual: a }; } },
  { name: 'indented-fn-logCrash-is-scoped', run: function (ctx) {
      const a = scopeOf(ctx.scopes, 17295);
      return { ok: a === 'logCrash()', expected: 'logCrash()', actual: a }; } },
  { name: 'indented-fn-logo_goHome-is-scoped', run: function (ctx) {
      const a = scopeOf(ctx.scopes, 18015);
      return { ok: a === 'logo_goHome()', expected: 'logo_goHome()', actual: a }; } },
  { name: 'sw_pillTap-has-no-color-refs', run: function (ctx) {
      const a = colorRefsIn(ctx, 12617, 12633);
      return { ok: a === 0, expected: '0', actual: String(a) }; } },
  { name: 'channels-reject-neon-variants', run: function () {
      const ok = CHANNELS.green.test('color:var(--green-neon)') === false
              && CHANNELS.red.test('color:var(--red-neon)') === false
              && CHANNELS.green.test('color:var(--green)') === true
              && CHANNELS.red.test('color:var(--red, #ff453a)') === true;
      return { ok: ok, expected: 'true', actual: String(ok) }; } },
  { name: 'exit-has-two-code-sites', run: function (ctx) {
      const a = exitLines(ctx).join(',');
      return { ok: a === '9562,9575', expected: '9562,9575', actual: a || '(none)' }; } },
  { name: 'sanctioned-evidence-shows-its-marker', run: function (ctx) {
      const rows = sanctioned(ctx);
      const bad = rows.filter(function (r) {
        return r.kind === 'BLAST' ? !/BLAST|blastradius/i.test(r.evidence)
                                  : r.evidence.indexOf('#rd-exit') < 0;
      });
      const a = bad.length === 0 ? 'all rows show their marker' : bad.map(function (r) { return 'L' + r.line; }).join(',');
      return { ok: bad.length === 0, expected: 'all rows show their marker', actual: a }; } }
];

function runFixtures(ctx) {
  const failures = [];
  FIXTURES.forEach(function (f) {
    let r;
    try { r = f.run(ctx); }
    catch (e) { r = { ok: false, expected: '(no throw)', actual: 'threw: ' + e.message }; }
    if (!r.ok) failures.push({ name: f.name, expected: r.expected, actual: r.actual });
  });
  return failures;
}

function main() {
  const ctx = loadTarget();
  const failures = runFixtures(ctx);
  if (failures.length) {
    console.error('inventory: FIXTURE FAILURE - refusing to emit results.');
    failures.forEach(function (f) {
      console.error('  ' + f.name + ': expected ' + f.expected + ', got ' + f.actual);
    });
    process.exit(1);
  }
  const cmd = process.argv[2];
  if (!cmd) { console.error('usage: inventory <emitters|colors|scope|sanctioned> [args]'); process.exit(2); }
  if (cmd === 'emitters') {
    const cls = process.argv[3];
    if (!cls) { console.error('usage: inventory emitters <class>'); process.exit(2); }
    const n = emitters(ctx.tokens, cls);
    console.log((n > 0 ? 'LIVE' : 'UNPROVEN') + '  ' + cls + '  class-attr occurrences: ' + n);
    if (n === 0) {
      console.log('  NOTE: UNPROVEN is not a claim of unused. Classes toggled at');
      console.log('  runtime via classList.add never appear in a class="..." attribute.');
    }
    process.exit(0);
  }
  if (cmd === 'scope') {
    const n = parseInt(process.argv[3], 10);
    if (!n) { console.error('usage: inventory scope <line>'); process.exit(2); }
    console.log('L' + n + '  ' + scopeOf(ctx.scopes, n) + '  |  ' +
      (ctx.lines[n - 1] || '').trim().slice(0, 110));
    process.exit(0);
  }
  if (cmd === 'colors') {
    const opts = { above: 0, channel: 'all' };
    for (let i = 3; i < process.argv.length; i++) {
      if (process.argv[i] === '--above') opts.above = parseInt(process.argv[++i], 10) || 0;
      else if (process.argv[i] === '--channel') opts.channel = process.argv[++i];
    }
    if (['red', 'green', 'all'].indexOf(opts.channel) === -1) {
      console.error('usage: inventory colors [--above N] [--channel red|green|all]'); process.exit(2);
    }
    const rows = colorRefs(ctx, opts);
    rows.forEach(function (r) {
      console.log('L' + String(r.line).padEnd(7) + r.channel.padEnd(6) +
        r.scope.padEnd(30) + r.evidence);
    });
    console.log('-- ' + rows.length + ' ref(s)');
    process.exit(0);
  }
  if (cmd === 'sanctioned') {
    const rows = sanctioned(ctx);
    rows.forEach(function (r) {
      console.log('L' + String(r.line).padEnd(7) + r.kind.padEnd(7) + r.evidence);
    });
    console.log('-- ' + rows.length + ' sanctioned site(s) - these must NEVER be retokenised');
    process.exit(0);
  }
  console.error('inventory: unknown subcommand "' + cmd + '"'); process.exit(2);
}

main();
