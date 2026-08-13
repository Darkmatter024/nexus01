# PHANTOM — SESSION HANDOFF

**One session's worth of continuation. Overwrite this file each session; do not append a log.**
Durable facts belong in `PHANTOM_CURRENT_STATE.md`; durable lessons belong in memory.

---

## Last session — 2026-08-13

**Ended:** clean, one ship pushed and parked. **Live: `v1.14.454`.**
**CALL 0 cap: 1 of 6.** Verify debt: `.454`, awaiting hardware — the block is at the TOP of
`BATCH-VERIFY.md`.

⚠ **This file was STALE when the session opened, and that is the thing worth carrying forward.**
It said *"ended clean at `.453`, nothing in flight"*. The working tree actually held an unstamped,
untested, uncommitted `v1.14.454` plus a new spec that had never once been executed. **A previous
session ended without updating this file, so its own record of itself was wrong.** If a future
session finds `git status` disagreeing with this document, `git status` is the truth.

---

## What shipped — `.454`, Forge is rack-centric

Owner ruling 2026-08-12. The aisle was a free orbit that happened to start pointed at a rack: drag
mutated yaw and pitch, pinch and wheel mutated radius, and nothing ever put them back — so focusing
the next rack only slid `camX` sideways and inherited whatever angle the last drag left. Now
`LOCK_YAW`/`LOCK_PITCH`/`LOCK_RADIUS` are the canonical framing and every navigation restores it;
`walk()` routes through `setFocus`, so the arrows and flanks inherit it through the same door.

**WALK AISLE** is an explicit mode — default off, `aria-pressed`, lit cyan while engaged,
deliberately **not persisted and not a setting**. Leaving snaps back to the framing of the rack the
tech is *nearest to*, not the one focused on entry.

---

## ⚠ THREE THINGS THIS SESSION FOUND, all in work that was already written

**1 · A second writer on a single-clause pill.** `setWalkMode` hand-wrote `#tagState` twice.
That pill has **one writer per shape** (`writeStatusPills`), and the comment above it records why —
a caller once put a concatenated string into a slot that owns one clause. Worse: `setFocus`
**early-returns when the rack is already focused**, which is exactly what a look-around-and-come-back
lands in, so the *common* exit wrote the rack LABEL into the pill that owns `n/m RACKED · ⚠n FLAGGED`
— duplicating `#tagId` and dropping the flagged warning until the next focus change.
⭐ **The generalisation: when you add a second caller to a function with an early-return guard, the
guarded path is not the edge case — work out which path is actually common.**

**2 · A test that failed against correct code, for the fourth time in two sessions.** Spec 36's
snap-back check waited a fixed 3000ms. The ease is **frame-based** (0.12/frame), so wall-clock
convergence is a function of harness frame rate — **measured at 2.67 fps here against 60 on device.**
The convergence curve on known-good code is `0.833 · 0.582 · 0.354 · 0.214 · 0.146 · 0.088 · 0.060`
of the original distance at t=1..7s, so a 3000ms wait lands on **0.354** — sitting on top of its own
`0.35` threshold. It was measuring the machine. Replaced with a poll to a 30s cap, threshold
tightened to 0.20.
⭐ **A probe that MEASURES the curve cost ninety seconds and converted "is this a real defect?" into
a fact.** Do that before touching app code on any timing-shaped failure.

**3 · A hand-listed registry that drifted the moment it could.** `08-forge-layout` asserts the 44px
gloved floor on `#loadoutBtn` and `#searchBtn` **by ID**. `.454` added a third button to that cluster
and neither assertion could see it — on the one surface that has already shipped a sub-44px control.
The sweep is now **derived** from `.scene-utils .hudbtn`, so the next button is covered for free.
⭐ This is the `.397`/`.398` lesson again. **A hand-listed set of names is a liability the day
someone adds the fourth thing.**

---

## Runs (phone-webkit, each spec ALONE)

`36-forge-rack-centric` 4 · `02-build-forge` 14 · `08-forge-layout` (see the ship's
`PHANTOM_CURRENT_STATE.md` entry). Gates: three-stamp lockstep at `.454`, inline blocks compile,
`node --check sw.js`, valid JSON, brace balance, 0 bare LF — `phantom-guard` exit 0.

---

## ⛔ Open — all owner decisions, none of them started

1. ⭐ **The locked drag says nothing.** `.454` makes a drag a no-op until WALK AISLE is tapped, and
   the hint text still hides itself on drag, so the gesture reads as dead. Disclosed unruled in the
   release notes and in `BATCH-VERIFY`. **Do not invent a fix** — whether a locked drag should
   prompt is a product call.
2. **The R1-D remainder.** The rack is at **176px** visible; §30 recommends 270–320. Arithmetic in
   `R1-RENDERER-BASELINE.md` §3. The only block big enough is the hero, whose phase sub-block is a
   fact NEXT ACTION and the phase dock already show. Removing a triplicated fact is a product call.
3. ⭐ **WALK SHIFT AND SITE/SYSTEM** — owner-queued 2026-08-11, still never started. ⚠ Expect SHIFT
   to be findings-heavy and light on fixable code: *undoored, not unbuilt*, and 3 of its 9 questions
   have no data source. ⛔ Do NOT give it a nav pillar (D-1) and do NOT invent the missing three.
   📌 SITE/SYSTEM is the likelier source of real fixes.
4. **PHASE-ENGINE step text** and the **M3 data sources** — both owner's. The chain: M3 → Shift can
   answer its 9 questions → Shift becomes a pillar → EXIT stops occupying a slot. **D-1 is the LAST
   domino, not the first.**

---

## Machine note

The dev box cannot produce a trustworthy multi-spec run — WebGL context exhaustion. A six-spec run
once reported 1 failure and took **18.0 hours**; all six then passed alone in about three minutes.
⭐ **Run renderer/Forge specs ONE AT A TIME, and never read a red multi-spec run as a regression.**
⚠ **The aisle renders at ~2.67 fps in this harness** (measured 2026-08-13, 8 renders in 3000ms).
Any test that waits a fixed wall-clock period for an eased animation is measuring the box, not the
product — poll for the condition instead.
⚠ `grep -E "[0-9]+ (passed|failed)" | tail -1` **hides the failure line.** Print every pass/fail
line, and redirect to a file rather than piping — `| tail -N` prints nothing until the run ends and
reads exactly like a hang.
