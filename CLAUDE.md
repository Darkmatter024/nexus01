# CLAUDE.md — PHANTOM (darkmatter024/phantom)

Offline-first single-file iOS Safari PWA (`dct-ios.html`, ~48.5k lines) for CoreWeave DCTs.
Live: darkmatter024.github.io/phantom/dct-ios.html. Owned by John (Lead DCT); his word is final.
Ships site-agnostic — the loaded Master supplies every site-specific fact (Law A6).

**State lives in `PHANTOM_CURRENT_STATE.md`, and nowhere else.** Do not record live version,
queue, or open defects in this file — five documents once claimed five different live versions and
none was correct. Start a session with `PHANTOM_SESSION_BOOTSTRAP.md`.

⭐ **The governing programme is `nexus01/SHIP-TECH-FLOW-V2-FROZEN.md`** (owner ruling 2026-08-08;
**added to the repo 2026-08-10** — it had lived only in `Downloads`, outside version control and
unreachable from a session that could not see that folder). It sets
the delivery ORDER; the contracts below and the blueprint rulings remain the law it delivers
against. It is FROZEN — a genuine contradiction gets **reported, never silently resolved**, and
every ambiguity resolution is logged in `PHANTOM_CURRENT_STATE.md` §1a.

---

## THE CONTRACTS — architecture and data law

These are contracts, not reminders. They do not expire, and they are not subject to the
behavioral-rule test. Changing one requires an owner ruling.

**A · Product / architecture**
1. **ONE ACTIVE MASTER.** Exactly one authoritative Master at a time — never one in memory and
   another in storage, never a candidate half-active. `PHANTOM_MASTER` is the only writer of both
   halves; it persists FIRST and goes live SECOND. Parsers return candidates; only acceptance writes.
2. **One canonical engine per concept.** No second renderer, no second door, no parallel
   implementation of a thing that already exists. New entry points call the one canonical function.
3. **Physical topology creates racks; the Master populates them.** (blueprint R-06) A rack exists
   because the floor has one, not because a spreadsheet mentions it.
4. **Empty racks remain real and visible.** A cab with no devices says what that means — it is
   never hidden, never silently zeroed, never treated as absent.
5. **Forge uses the canonical Rack Engine.** No private renderer inside Forge.
6. **Only the active foreground rack window gets full interactive 3D.** Five foreground racks;
   everything else is scenery. One live WebGL attachment, ever (spec I1).
7. **Build is the operational center.** The shift runs from Build; Command is situational
   awareness, Tools is reference.
8. **SHIFT is a primary product pillar.** Primary nav is **Command · Build · Scan · Tools · Shift**
   and `EXIT` does not occupy a pillar slot (**R-02**, blueprint §3.4). Removing that slot removes
   the slot, **not the feature** — hold-to-freeze re-homes into Shift (**R-02a**, §3.4a).
   **Delivered at M4, gated behind M3** — 3 of Shift's 9 questions have no data source yet.
   The shipped nav is 3 slots + EXIT; `01-nav.spec.js` pins that as a **pre-M4 checkpoint, not a
   specification.** ⛔ Do not restore the slot early — see `PHANTOM_CURRENT_STATE.md` D-1.
9. **Offline-first, not offline-only.** Full function with no network; the network is an
   enhancement, never a precondition.

9a. **Identity is two people, not one.** `siteLead` = **authority**, set at Site Setup and changed
   only in SITE/SYSTEM. `currentOperator` = the **actor** working on this device now. Usually the
   same person; the model never assumes it. **Every Event Log entry credits the ACTOR — work is
   never auto-credited to the Site Lead.** (spec §2; supersedes the earlier single-identity
   wording. Landed `v1.14.417`.)

**B · Data / safety**
10. **Real data only.** Never fabricate telemetry, never label a panel after data PHANTOM does not
    receive, never present a mock's number as a measurement. Structural no-data is correct, not
    unfinished. Caption where a number came from.
11. **User data is preserved.** Merge, never overwrite — Master loads fill gaps; hand-entered
    values always win and always survive reloads. Never rebuild a persisted object as a fresh
    literal. Never destroy known-good data for a candidate that cannot be kept.
12. **Cache identity and invalidation.** Every Master-derived cache carries the Master's identity
    and is checked on read. A cache may accelerate the active Master, never outlive it.
    (`if (cache[id])` treats an empty array as a hit — check identity, not truthiness.)
13. **No base64 images in localStorage.** Ephemeral or IndexedDB only.
14. **No silent failures.** Never `if (!x) return;` on a user-facing path. Fail loudly:
    `console.warn` + `phantomToast`. A tappable control that does nothing is a violation.

**C · Presentation**
15. **Approved PHANTOM visual identity.** `PHANTOM_DESIGN_SYSTEM.md` is the lock (approved
    2026-08-07). Verify token NAMES against `:root` before use — an undefined `var()` invalidates
    the whole declaration silently. ⛔ R-E: no mass refactor of the 1116 literals; per-screen only.
16. **Intentional compositions per tier.** Phone / tablet / laptop / desktop are designed, not
    stretched. Desktop composition is automatic at ≥1024 via media query. Rule 1: nothing pushes
    the viewport past 100vw, ever.
17. **No legacy UI leakage.** `?legacy=1` is byte-identical behavior. Nothing under `body.rd` may
    `nav_push` a legacy `p:` value. Gate the PRESENTATION, never the INVARIANT — Rule 7 protects
    legacy from churn, not from crash fixes.

---

## Branch topology — SHIP-GATE-LOCKDOWN (owner ruling 2026-08-27)

**Two branches, one gate.**

- **`main`** — where Claude Code works. All edits, all commits, all merges.
- **`release`** — what GitHub Pages serves. Only John advances it.

Claude Code NEVER commits to, merges to, pushes to, or fast-forwards `release`. Promotion is John's alone:
```
git checkout release && git merge --ff-only main && git push
```

A commit that bumps `version.json` is blocked by hook unless John has verified the old version on device and stamped it in the `VERIFIED` file. The gate is mechanical, not a promise. 

**Live serves from `release` branch.** A push to `main` changes nothing on the iPhone until John promotes.

---

## Ship discipline

0. **Batching (CALL 0, owner-delegated).** Ships may stack; device verification is one consolidated
   pass via `BATCH-VERIFY.md` — run the consolidated section at the top, not the per-ship blocks.
   Cap: every 6 stacked ships or before any HIGH-risk ship. *(This supersedes the old "one ship per
   version" rule, which contradicted it in the same section.)*
1. **OODA first.** `curl` live `main` before any edit. If live ≠ the spec baseline, STOP and
   re-anchor. Verbatim strings are truth; line numbers are hints.
2. **Surgical edits only.** Unique anchors, no rewrites, no drive-by refactors.
3. **Mechanical gates are enforced by hook, not by memory** — `tools/hooks/phantom-guard.js` blocks
   a commit on broken three-stamp lockstep, a non-compiling inline script, brace imbalance, damaged
   CRLF, or a backtick in a commit body. Do not work around it; fix the cause.
   ⭐ **THE HOOK IS THE GATE** (owner ruling 2026-08-08). Spec §10 names four subagents —
   `lockstep-auditor`, `surgical-edit-reviewer`, `data-honesty-auditor`, `cold-aisle-qa` — which
   are **not loadable from this session's CWD** and have never once run; `BATCH-VERIFY` records
   *"Agents barred, equivalents run inline"* three times. Do not block a ship waiting for them.
4. **Device verify is a HARD STOP.** Critical iPhone/WebGL behaviour is verified on physical
   hardware or it is not verified. After push, hand John the checklist and PARK.
   ⛔ **THE OWNER IS NOT THE TEST HARNESS** (owner ruling 2026-08-10). **You own automated
   verification.** Before requesting ANY physical-device test, exhaust what can be proven locally:
   unit/integration tests, parser fixtures, Playwright flows, responsive screenshots, DOM/state
   assertions, console and page-error checks, storage/cache tests, service-worker simulation,
   reload/restart behaviour, regression tests, known-good fixture comparisons. **Never ask the
   owner to manually verify what automation can prove.**
   **Physical iPhone verification is reserved for behaviour that materially depends on real iOS
   hardware/runtime:** installed Home-Screen PWA service-worker behaviour · real iOS safe-area ·
   iOS WebGL/GPU lifecycle · camera/scanner hardware · OS-level Share/AirDrop · other *proven*
   hardware-specific conditions. "The harness skips it" is NOT the same as "it needs hardware" —
   check whether another project (e.g. Chromium, which installs service workers) can run it first.
   **When hardware truly is required:** finish all automation first, then ask for **ONE concise
   test** — exactly what to do, exactly what PASS and FAIL look like. **Do not ask him to read
   consoles or engineering internals** unless genuinely unavoidable.
   **He approves product behaviour; he does not perform routine QA.**
5. **No new features during the current stabilization / UI-finish phase.** The queue is empty by
   design. New scope needs an owner ruling.

## Design law

1. **Shift-shape, not history-shape.** COMMAND = situational awareness · BUILD/WORK = the job chain
   in execution order · CRASH CART = zero-state bench.
2. **Zero-state test.** Works with no deployment → CRASH CART reference. Needs deploy state → lives
   inside the Deploy flow.
3. **Additive over surgery.** Re-homed legacy organs get new layers routed into existing content.
4. **Cold Aisle Filter.** Every feature must help a gloved tech in the aisle *now*. Tap depth
   matters; four taps to a reference is a defect. **Mock the phone first — 390 before 1080.**
5. **Aesthetic bar: "$10M, not cheesy."** Minimum formatting, no clutter. Values live in
   `PHANTOM_DESIGN_SYSTEM.md` — that file, not this one, is the source of truth for tokens.
6. **Site data flows from the Master; the app carries only fleet truth.**

## Roles

- **John** — owner. All gate decisions, all device verifies. Terse and field-operational: lead with
  status, state deviations plainly, no cheerleading. He rewards honest pushback and penalizes churn.
  When parked, say exactly what you are waiting on, in one line.
- **web-Claude** — authors `.md` handoff specs with verbatim anchors. Its zips may restamp a version
  already shipped: diff against the shared base and re-apply on top of live, never drop-in.
- **You** — execute, verify, push. You may fix draft-spec bugs against live code; report every
  deviation in the commit message.

## Working rules

- **Match process to task size.** Localized UI/CSS is your own work: inspect → implement →
  verify → finish. Reach for specialists only at architecture boundaries, data safety, WebGL
  lifecycle, offline/storage, or independent release verification.
- **When John hands BYTES, reproduce them VERBATIM.** No silent improvements. Stop and ask before
  any change; only the named target moves.
- **After a push, close the loop** — show `git log -1 --oneline` and `git status` so he can verify
  origin actually has it before anything else proceeds.
- **Tests carry the mechanical truth.** `test/e2e` — 128 tests, `retries: 0`. A `test.fail()` is a
  PINNED DEFECT; *"Expected to fail, but passed"* is proof a fix landed. Never widen the console
  allow-list to get green. Automation does not replace the iPhone gate.

## New-rule policy

Do not create a permanent behavioral rule after every correction. Correct the issue, and prefer
automated enforcement. Add a permanent rule only when the same meaningful failure **recurs**, or
when the mistake could cause data loss, architectural corruption, or a critical release regression.
**Architecture and product rulings are exempt — they are recorded on first statement.**

---

## PHANTOM DESIGN SYSTEM — LOCKED (Claude Code reads this before any UI work)

PHANTOM is a vanilla JS/HTML/CSS single-file PWA (`dct-ios.html`). The design system is LOCKED. Design skill recommendations inform decisions but PHANTOM's own tokens are the authority.

### Locked design tokens (never override these)
```
--bg:    #04060a   (deep space black — the floor)
--cyan:  #28e0ff   (primary — HUD, active state, links)
--vio:   #8a4bff   (secondary — permission tiers, elevated UI)
--mag:   #ff2bd6   (alert — fail states, critical)
--teal:  #1fffd0   (success — pass states, completed)
--gold:  #ffcb45   (warning — blocked, hold, caution)
```

### Locked fonts
Orbitron (display/headings) · Chakra Petch (UI labels) · Rajdhani (body)
No new font imports. No Inter, no system-ui, no "just a quick Google Fonts."

### Locked architecture
Single file: `dct-ios.html` (~52k lines). No build system, no npm, no React.
str_replace edits only. Three-stamp lockstep: dct-ios.html / sw.js / version.json.

### How to use the design skills with PHANTOM
- **UI UX Pro Max**: run `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "field tool dark UI" --domain style` to find relevant style guidance. Use it to inform motion, spacing, and layout decisions — not color or font choices.
- **Taste Skill**: use to audit any new surface before shipping. "Does this look like AI slop?" is the question. If yes, fix it.
- **Design Motion Principles**: use when adding CSS transitions, animations, or the View Transitions spec. Lean Emil Kowalski (restraint, speed, purpose) — PHANTOM is a field tool, not a portfolio.
- **Awesome Claude Design**: if you need a reference aesthetic, check `.claude/references/awesome-claude-design/` — Linear, Vercel, and Raycast are the closest matches to PHANTOM's sensibility.
- **Frontend Design**: Anthropic's own skill. Activates automatically for UI/UX work. Defers to the locked tokens above when it conflicts.

### Cold Aisle Filter (never violated)
44pt minimum tap targets. Gloved hands. No tiny controls for floor actions. Data hall is loud.
