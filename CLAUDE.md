# CLAUDE.md — PHANTOM (darkmatter024/phantom)

Offline-first single-file iOS Safari PWA (`dct-ios.html`, ~48.5k lines) for CoreWeave DCTs.
Live: darkmatter024.github.io/phantom/dct-ios.html. Owned by John (Lead DCT); his word is final.
Ships site-agnostic — the loaded Master supplies every site-specific fact (Law A6).

**State lives in `PHANTOM_CURRENT_STATE.md`, and nowhere else.** Do not record live version,
queue, or open defects in this file — five documents once claimed five different live versions and
none was correct. Start a session with `PHANTOM_SESSION_BOOTSTRAP.md`.

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
4. **Device verify is a HARD STOP.** Critical iPhone/WebGL behaviour is verified on physical
   hardware or it is not verified. After push, hand John the checklist and PARK.
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
