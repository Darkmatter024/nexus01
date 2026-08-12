# PHANTOM — SESSION HANDOFF

**One session's worth of continuation. Overwrite this file each session; do not append a log.**
Durable facts belong in `PHANTOM_CURRENT_STATE.md`; durable lessons belong in memory.

---

## Last session — 2026-08-11/12

**Ended:** clean. Nothing in flight, nothing half-done, `main` in sync with origin.
**Live: `v1.14.453`** — and ✅ **`.438`–`.453` CLEARED ON HARDWARE 2026-08-12** (owner: *"clear"*).
**CALL 0 cap reset to 0 of 6.** No verify debt.

---

## ⭐ START HERE — there is no queued task

The renderer programme and Forge parity are both **complete and device-verified**. The queue is
empty by design (ship discipline 5: no new features during stabilisation). Everything below needs an
owner decision before it becomes work.

⛔ **Do not invent scope.** The four open items are listed in `PHANTOM_CURRENT_STATE.md` §9 and
every one of them is the owner's call, not a gap to be filled.

---

## What shipped (16 ships, `.438`–`.453`)

**Phase-card merge:** `.439` the refresh-surface dispatcher (and a LIVE defect: `.438`'s Assign
button threw the tech off Build) · `.440` step 3b, the phase-card builder extracted.

**The context fix:** `.441` — the one WebGL context now follows the surface the technician is
looking at. Build and the rack detail had been fighting over it, and the detail lost every exchange.

**Renderer programme (R1→R8), against the owner's directive now in `reference/`:**
`.442` R1-D the rack came above the fold · `.443` R2 cabinet depth · `.444` R3 families stop
inventing state · `.445` R4 material reuse + powder coat · `.446` R5 light rig onto the palette ·
`.447` R7 camera framing · `.448` R6 verified + CDU is cooling · `.449` R8 polish · `.450` coolant
plumbing gated on a declared CDU.

**Forge parity (P1→P3):** `.451` geometry extracted to `rackGeometry_build` · `.452` focused aisle
rack canonical · `.453` whole foreground window canonical, tiered.

---

## ⚠ THE PATTERN IN EVERY DEFECT THIS SESSION

**The renderer was asserting things the Master never said**, and none of it failed loudly:

- switch ports lit by `Math.random()`, reshuffled every render — a technician reading lit ports as
  connected ports was reading dice;
- green *blinking* LEDs claiming per-device health against telemetry PHANTOM does not receive;
- a CDU rendered, labelled **and tallied** as a PDU, because `_TMAP` never got the memo that the
  cooling channel was ruled a separate colour;
- coolant manifolds and pipes drawn on **every** rack, including air-cooled ones.

⭐ **The rule that came out of it, now in the source:** STATE colours (green/amber/red) may not be
used decoratively; ACCENT colours (cyan/violet/teal) may carry family identity; nothing blinks.
Randomness is a defect when it decides what the rack **depicts**, never when it places atmosphere.

## ⚠ AND THE PATTERN IN MY OWN MISTAKES, which cost more time than the code

Four times a **test** was wrong, not the app — and each was caught only by asking what the assertion
would do against correct code:

1. A spec grepped for `Math.random(` and went red because **the fix's own comment quoted the removed
   line**. Strip comments before grepping source.
2. "No randomness in the renderer" was the **wrong rule** — the scene scatters dust motes at random,
   which claims nothing. Scope the assertion to what depicts data.
3. A P1 outbound scan used a **hand-listed** set of names and missed `ledMats`; the `.397`/`.398`
   lesson is that a hand-listed registry drifts. Derive it from the code.
4. A leak check whose **own bookkeeping accumulated** reported 162→666 meshes and read as a leak.
   Nothing had leaked; the instrument counted a disposed scene.

⭐ **Before believing a red test, ask what it asserts against KNOWN-GOOD code.**

---

## Open, in the order recommended — all owner decisions

1. **The R1-D remainder.** The rack is at **176px** visible; §30 recommends 270–320. The arithmetic
   is in `R1-RENDERER-BASELINE.md` §3 — 651px of column, 475 spent before the rack. The only block
   big enough is the hero, whose phase sub-block is the same fact NEXT ACTION and the phase dock
   already show. Removing a triplicated fact is a product call.
2. ⭐ **WALK SHIFT AND SITE/SYSTEM** — owner-queued 2026-08-11, still never started. The two legs of
   the canonical technician flow that have never been walked. ⚠ Expect SHIFT to be findings-heavy
   and light on fixable code: it is *undoored, not unbuilt*, and 3 of its 9 questions have no data
   source (two are M3 deliverables). ⛔ Do NOT give it a nav pillar (D-1) and do NOT invent the
   missing three. 📌 SITE/SYSTEM is the likelier source of real fixes — the canonical flow says it
   is administrative/recovery only, so anything operational found there is in the wrong place.
3. **PHASE-ENGINE step text** and the **M3 data sources** — both the owner's. Note the chain:
   M3 → Shift can answer its 9 questions → Shift becomes a nav pillar → EXIT stops occupying a slot.
   The nav complaint is the LAST domino (D-1), not the first.

---

## Machine note

The dev box cannot produce a trustworthy multi-spec run. A six-spec run reported 1 failure and took
**18.0 hours**; all six then passed **alone** against the same bytes in about three minutes. WebGL
context exhaustion.
⭐ **Run renderer/Forge specs ONE AT A TIME, and never read a red multi-spec run as a regression.**
⚠ Also: `grep -E "[0-9]+ (passed|failed)" | tail -1` **hides the failure line**. Print every
pass/fail line or you will report a red suite as green — I did, once.
