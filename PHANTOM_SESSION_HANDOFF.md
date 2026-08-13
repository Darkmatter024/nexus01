# PHANTOM — SESSION HANDOFF

**One session's worth of continuation. Overwrite this file each session; do not append a log.**
Durable facts belong in `PHANTOM_CURRENT_STATE.md`; durable lessons belong in memory.

---

## Last session — 2026-08-13

**Ended:** clean, two ships pushed and parked. **Live: `v1.14.455`** (`3545011`).
**CALL 0 cap: 2 of 6.** Verify debt: `.454`–`.455`, block at the TOP of `BATCH-VERIFY.md`.

⚠ **This file was STALE when the session opened, and that is the first thing to carry forward.**
It claimed the previous session ended clean at `.453` with nothing in flight. The working tree
actually held an unstamped, untested, uncommitted `v1.14.454` plus a spec that had never once been
executed. **A session ended without updating its own record of itself.** If a future session finds
`git status` disagreeing with this document, `git status` is the truth.

---

## What shipped

**`.454` — Forge is rack-centric, WALK AISLE is an explicit mode** (ruling 2026-08-12). Free orbit
replaced by one deterministic framing per rack; free movement became a named mode, default off,
not persisted, not a setting.

**`.455` — the locked pose became a real front elevation** (ruling 2026-08-13). See below; this is
the one worth reading.

---

## ⛔ THE BIG ONE: `.454` LOCKED THE WRONG POSE

`.454` froze the camera at the angles `setFocus` had always targeted — `LOCK_YAW 0.10`,
`LOCK_PITCH 0.08` — and called them canonical. **That is 5.7° of yaw and 4.6° of nose-down pitch.**
It stopped the drift and locked in a crooked shot: the cabinet leaned, rails converged, the
neighbour competed. The owner caught it on hardware and was explicit — **fix the MODEL, do not nudge
world coordinates until one rack looks acceptable.**

⭐ **The durable lesson: "these are the values the product already used" is not evidence the values
are right.** It felt like the safe, conservative choice. It was the defect.

⭐ **And the reason no test caught it: every `.454` assertion tested that the camera DID NOT MOVE,
never that it was SQUARE.** A frozen-but-crooked camera satisfied all of them. Spec 37 now owns the
front-elevation contract, and its bounds are chosen to exclude the old constants — `LOCK_YAW 0.10`
would put `|fwd.x|` near 0.0998 against a `1e-4` bound, so it cannot go green on a rebuild of `.454`.

**The model now:** pose solved from the selected rack every frame — target = rack world centre,
normal via `getWorldQuaternion`, position = target + normal × distance, world up + `lookAt`. Yaw,
pitch and roll are zero *by construction*, and `position.y === target.y` keeps the axis horizontal,
which is the whole reason rails project vertical. Usable viewport measured from the DOM;
`setViewOffset` slides the **projection** onto its centre, because moving the camera would
reintroduce the yaw the mode exists to remove.

---

## ⚠ FOUR TRAPS THIS SESSION, all worth not repeating

**1 · An early-return guard whose guarded path was the COMMON one.** `setWalkMode` wrote the rack
label into `#tagState` on the branch where `setFocus` bails — and "already focused" is exactly what
a look-around-and-come-back lands in. It also made a second writer of a pill the file gives one
writer per shape. ⭐ **When you add a caller to a function with an early-return guard, work out which
path is actually common.**

**2 · One convergence test across several axes.** The `.455` ease snapped on **total 3-D distance**.
Every rack shares one canonical y and z and only x differs, so the big x delta held the vector above
threshold and camera height crept `1.8869 → 1.8971 → 1.89925` across a walk. ⭐ **The axis with the
largest delta decides for all of them. Snap per axis.**

**3 · Fixed wall-clock waits against frame-based easing.** ⚠ **This harness renders at ~2.7 fps**
(measured: 8 renders in 3000 ms) against 60 on device. Spec 36's 3000 ms wait landed exactly on its
own 0.35 threshold. ⭐ **Poll for the condition. A 90-second probe that MEASURES the curve turns "is
this a real defect?" into a fact** — do that before touching app code on any timing-shaped failure.

**4 · ⛔ NEVER ROUND-TRIP `dct-ios.html` OR `sw.js` THROUGH A SHELL READ/WRITE.**
`(Get-Content -Raw) -replace … | Set-Content -Encoding utf8` **mojibaked 4,622 lines** — PS 5.1 reads
as ANSI and re-encodes. This is the `sed -i`/CRLF trap wearing PowerShell clothes. ⛔ **`phantom-guard`
does NOT catch it** — it checks line endings, not encoding, so a corrupted file would have sailed
through the gate. Caught only because the tool echoed the file back. **Use Edit. Always.**
Recovery was `git checkout -- dct-ios.html sw.js`; nothing was committed in that state.

---

## Runs (phone-webkit, each spec ALONE)

`37-locked-rack-pose` 4 · `36-forge-rack-centric` 4 · `02-build-forge` 14 · `08-forge-layout` 17 + 1
skipped. Gates: `phantom-guard` exit 0. Served bytes verified for both ships — stamps **and** markers
unique to each change, plus the *absence* of `LOCK_YAW` / `LOCK_RADIUS` / the `+0.4` eye offset.

---

## ⛔ Open — owner decisions, none started

1. **The device pass on `.454`–`.455`** — five checks at the top of `BATCH-VERIFY.md`. Check 1 is
   the S1:008 re-look.
2. ⭐ **The HANDOFF hero art.** Briefed 2026-08-13. ⛔ **No image generation in this session** — no
   `GEMINI_API_KEY`, and the `design` skill emits SVG, not photoreal edits. The prompt was handed
   over; the asset is the owner's. On arrival: new `-vN` name, move the `sw.js` PRECACHE entry
   (`:84`), three-stamp bump, and iOS needs the PWA removed and re-added.
3. **The locked drag says nothing** — a drag in locked mode moves nothing and the hint still hides
   itself, so the gesture reads as dead. Disclosed unruled since `.454`. ⛔ Do not invent a fix.
4. **The FOV literal.** The camera is constructed at `46` and reassigned to `LOCK_FOV` right after,
   so a stale literal sits in the source while the runtime is 34. Pure refactor, no runtime effect,
   not worth a version bump alone — fold into the next ship that touches `placeCamera`.
5. **The R1-D remainder** (rack at 176px vs §30's 270–320), **WALK SHIFT and SITE/SYSTEM**
   (owner-queued 2026-08-11, never started), **PHASE-ENGINE step text**, **M3 data sources**.
   ⛔ Do NOT give SHIFT a nav pillar — D-1 is the LAST domino, not the first.

---

## Machine note

The dev box cannot produce a trustworthy multi-spec run — WebGL context exhaustion. A six-spec run
once reported 1 failure and took **18.0 hours**; all six then passed alone in about three minutes.
⭐ **Run renderer/Forge specs ONE AT A TIME, and never read a red multi-spec run as a regression.**
⚠ Redirect to a file rather than piping — `| tail -N` prints nothing until the run ends and reads
exactly like a hang. Print every pass/fail line; `grep -E "[0-9]+ (passed|failed)" | tail -1` hides
the failure line.
⚠ GitHub threw **four consecutive 500s** on pushes this session and Pages served stale bytes for
several minutes after. Both are the documented transient; retry, then verify the SERVED bytes.
