# PHANTOM — SESSION HANDOFF

**One session's worth of continuation. Overwrite this file each session; do not append a log.**
Durable facts belong in `PHANTOM_CURRENT_STATE.md`; durable lessons belong in memory.

---

## Last session — 2026-08-09/11

**Ended:** clean. Nothing in flight, nothing half-done, `main` in sync with origin.
**Live: `v1.14.438`** — confirmed in the served bytes.

---

## ⭐ START HERE — the task the owner deferred

**RACK-DETAIL MERGE, STEP 3b: extract the phase-card builder.** Owner: *"do 3b next session."*

⭐ **READ THIS BEFORE THE PLAN — `.439` CHANGED 3b's SHAPE AND ITS SIZE.** The plan's step 3a
section says the coupling is 4 `onclick` strings and prescribes an `onRefresh` **callback**. Both
are wrong, measured 2026-08-11:

- **It is 13 sites, not 4.** Nine sit outside the IIFE — four resume after a modal
  (`ge_captureSkip:30238`, `ge_captureSave:30255`, `ge_onCompleteTap`'s fallback `:30285`,
  `ta_resolveUnblock:30471`) and five are emitted inside the card markup (`checklist_addItem:29037`,
  `_removeItem:29048`, `_renameItem:29060`, `_toggleEdit:29065`, `deploy_flagPhaseReverify:29621`).
- **A callback cannot reach nine of them** — the builder's scope is gone by the time they run.
  `.439` shipped the mechanism instead: **`phase_refreshSurface(surface, deployId, rackId)`**, a
  string key that survives an onclick attribute and a stored context object. `'detail'` is the
  default, so untouched callers stay byte-identical.

**So 3b is now: thread `surface` through the 12 remaining sites, then lift the IIFE to**

```js
deploy_buildPhaseCards(deployId, rackId, rackPhases, rack, surface, opts)
```

- Lift the IIFE at **`:40019`–`:40095`** (the plan says `:40094`; the closing `})();` is `:40095`).
  ⚠ Line numbers shifted +29 at `.439` — re-anchor on the verbatim strings, not these.
- The block also reads **`dep`** and **`rackAudit`**, which the plan's signature omits. Pass them
  (`opts = {dep, rackAudit}`) rather than re-deriving: the detail already has both, and re-loading
  the audit on a hot render path is a cost for nothing.
- Detail passes `'detail'` → ⭐ **byte-identical behaviour on the existing surface is the bar.**
- Build passes `'build'`.
- `ge_openCaptureModal` / `ge_onCompleteTap` / `ta_open` each need the key threaded into
  `_geCaptureState` and `_ta_ctx` so the post-modal refresh lands on the right surface. Default
  every added parameter to `'detail'`.

⚠ **Two-cold-boot rule for any refresh test.** `deploy_showRackDetail` re-renders Build on FIRST
entry and not on the second; a baseline taken on the same page contaminates the reading. `.439`'s
spec 27 has the working pattern.

**Why it was deferred, not skipped:** it rewrites the path controlling START / COMPLETE / OVERRIDE —
`phdock_render`'s own comment calls the sheet *"the ONLY door to the phase cards"*. A half-finished
edit there means a technician who cannot complete a phase. It wants a full context window.

⚠ **Do NOT do 3c (re-parent the dock) before 3b.** The dock takes `cardsHtml`; re-parenting first
strands the cards and produces a phase control that cannot complete a phase.

---

## What shipped (14 ships, `.425`–`.438`)

**Renderer / engine (M2-b) — STOPPED at owner directive after 3b:**
`.425` Command Deck reaches the phone · `.426` stored Masters migrate themselves · `.427` the aisle
returns the context to its lender · `.428` `--alert` declared · `.429`/`.430` one colour vocabulary,
2/11 → 8/11, colour in the ACCENT not the fill · `.431`/`.432` fold-and-revert of a duplicate
first-run gate · `.433` data contract (I8/I9) · `.434` reclaim barrier (I6) · `.435` flat path +
`attach` (3a/3b).

**Technician workflow — the current priority:**
`.436` one mode, one Build (Home's CTA drilled past the workspace into the deploy list) ·
`.437` a rack detail brings its own surface (the fixed phase dock floated over Home, no back) ·
`.438` the rack detail's ASSIGN / QR / LOG NOTE come home to Build (merge step 2 of 4).

**Verify debt:** `.385`–`.428` RELEASED, CALL 0 cap reset. One exception: **`.413` is NOT released** —
item 8's empty half has no live example since `.424` resolved every cabinet in this Master.

**Specs added:** 16–27.

---

## ⚠ THE PATTERN IN EVERY DEFECT THIS SESSION

**Something proven present but absent in behaviour**, and never failing loudly:

- `.424`'s fix was in the served bytes but ran only at IMPORT — restored data kept the old inventory.
- `.427`'s I1 invariant held one line too late (acquire before release).
- `.429` put the colour in the right file and the WRONG CHANNEL (fill, not accent).
- `.431` built a door that already existed under another name (`firstRun_*`, not `siteSetup_*`).
- `.436`/`.437` were callers assuming a surface was already showing.

⭐ **Three rules that came out of it, all now in `CLAUDE.md` / memory:**
1. **The owner is not the test harness.** "The harness SKIPS this" ≠ "this needs hardware" — check
   another project first (`05-offline` runs 13/15 on `desktop-chromium`, skips on `phone-webkit`).
2. **Before building any flow, read the function that runs when that flow starts.** `launch()`
   answered "what happens at first boot" in one line and was never opened.
3. **When an assertion is a BOUND, ask what the failure value is and whether the bound admits it.**
   `attachments.length <= 1` permitted the defect value `0` for months.

---

## Open, in the order recommended

1. **3b** (above), then **3c** (dock into Build), then **3d/step 4** (retire the detail as a
   destination — LAST, the back-nav restore path lands there).
2. ⭐ **WALK SHIFT AND SITE/SYSTEM** — owner-queued 2026-08-11, same session as 3b. The two legs of
   the canonical technician flow that have **never been walked**. Walk them the way HOME/BUILD/
   FORGE/TOOLS were walked: seed a real shift state, inventory each surface, and ask the owner's
   questions — why am I here, what is the primary action, is there another door doing this, is this
   exposing machinery, is a legacy surface leaking, does the tech have to understand PHANTOM to use
   PHANTOM. **Make the product decisions; only escalate what genuinely changes product behaviour.**
   ⚠ **Expect SHIFT to be findings-heavy and light on fixable code.** It is *undoored, not unbuilt* —
   12 `shift_*` functions, a sheet, a hero and a report generator already exist, and it renders today
   as ONE PILL on Command. But **3 of its 9 questions have no data source** (the Store write journal,
   the derived readiness gate list, `PhantomIntelligence.queue` — all 0 references, two are M3
   deliverables). ⛔ So do NOT give it a nav pillar (D-1) and do NOT invent the missing three — that
   is fabricated telemetry. Report what it can and cannot answer.
   📌 **SITE/SYSTEM is the likelier source of real fixes:** the canonical flow says it is
   *administrative/recovery functions only*. Anything operational found in there is in the wrong
   place, and that is exactly the class the last three ships were.
   *(The walk harness pattern that worked: seed state, `showMode`, then inventory visible headings /
   actions / nav / legacy per surface. It found `.436`, `.437` and `.438`.)*
3. **Renderer stages 3c–3e** — STOPPED by owner directive; plan written in
   `M2B-CONSOLIDATION-PLAN.md`. §8 ends by deleting `forge3d_render`; largest blast radius left.
4. **Owner's own:** the PHASE-ENGINE step text, and the **M3 data sources**. ⛔ Note the chain:
   **M3 → Shift can answer its 9 questions → Shift becomes a nav pillar → hold-to-freeze re-homes
   there → EXIT stops occupying a pillar slot.** The nav complaint is the LAST domino, not the first
   (D-1). Do not "restore the nav slot" as a quick win.

---

## Machine note

The dev box cannot produce a trustworthy full-suite run in one pass — an overnight run took **17.5
hours** and reported 2 failures that both passed on isolated re-runs. WebGL context exhaustion.
⭐ **Re-run a Forge/WebGL spec ALONE before reading a red full run as a regression.**
