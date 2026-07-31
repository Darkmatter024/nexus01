# BATCH-VERIFY — consolidated device checklist (CALL 0, DIRECTIVE 2026-07-06)
**Protocol:** ships stack; owner runs THIS list once per batch (cap: every 6 stacked ships or before
any HIGH-risk ship). Every ship keeps its own rollback line. Claude Code appends; owner checks off.
**Batches .192-.197, .198-.201, .202-.212, .213-.214, and .215: RELEASED by owner (.202-.212 verified 2026-07-08; .213 boot plate + .214 deploy-tap FIX verified 2026-07-09; .215 crash-log hardening verified "all good" 2026-07-09). Batch .340-.345: RELEASED 2026-07-23 ("340-345 good") — cleared the 6-ship count cap and the MASTER FULL-INGEST HIGH-risk prereq. Batches .346-.350 (CLEARED 2026-07-24) and .351-.354 (CLEARED 2026-07-25) followed. **Batch .355-.363: RELEASED by owner 2026-07-30 ("everything is good to go all ships clear") — nine ships, three past the cap, incl. HIGH-risk .359 (BUILD banner rows). Cap RESET. CURRENT BATCH: OPEN, .364-.365 (2 of 6) — see the last section of this file.** · Clear SW cache before the pass.

---

## v1.14.192 — G-1c2 `.gsk` inline plates (`d1758b6`) · rollback: revert commit
- [ ] Rack Map floor view: empty card + rows machined
- [ ] Rack detail: phase card + audit-scan mono row machined
- [ ] Handoff log record cards machined · Deploy audit log entries machined
- [ ] BOM analyze result rows machined · optic scan alternate-match card machined
- [ ] Tombstone modal UNCHANGED (deliberately skipped)
- [ ] `?legacy=1` rack detail/audit log: identical pixels

## v1.14.193 — A-1 ticket intake (`8a63726`) · rollback: revert commit (stateless)
- [ ] (superseded by A-2 UI — verify via the .194 flow below; A-1 plumbing items only:)
- [ ] Import a .txt → chip shows name/KB · oversized (>256KB) file binned with message
- [ ] Deny clipboard permission → machined textarea fallback appears, ATTACH works
- [ ] Close/reopen sheet → ticket gone (stateless) · offline → existing fail-fast unchanged

## v1.14.194 — A-2 intent flow, auto-mic killed (`0c1a5e4`) · rollback: revert commit
- [ ] Tap Ask card → sheet opens, NO mic indicator anywhere in Safari chrome
- [ ] Four machined intent cards render (SPEAK cyan / PASTE violet / TYPE gold / IMPORT teal)
- [ ] SPEAK → mic starts only now · CANCEL → menu, mic off
- [ ] TYPE OR PASTE → native paste works, no permission prompt → ASK PHANTOM → answer addresses it
- [ ] ‹ MENU back leaves nothing stale
- [ ] PASTE TICKET → chip mounts above menu, SPEAK subtitle = "Ask about the attached ticket"
- [ ] SPEAK with chip → answer references ticket · composer + chip → answer uses BOTH
- [ ] ✕ clears chip · `?legacy=1`: va sheet + triage "Ask Assistant" tile unchanged (old behavior intact)

## v1.14.195 — T3 ask-card saturation (`pending`) · rollback: delete the `filter:none` line
- [ ] Ask card on Command: prism art reads clean (was hot/oversaturated) — `.155` precedent value
- [ ] Card still glass (ring/well/violet tint) — only saturation changed

## v1.14.196 — M-1 .mach recipe (CALL 3) · rollback: revert commit
- [ ] Rack Map SCAN-OR-TYPE input: unchanged look (same recipe, now from the .mach block) + cyan focus
- [ ] A-1 clipboard-deny fallback textarea: unchanged look + placeholder legible
- [ ] Any regression on Rack Map search flow (submit still works)

## v1.14.197 — G-1c3 CALL-1 + inline plates (`pending`) · rollback: revert commit
- [ ] Deploy command center: phase-matrix rows machined; a COMPLETE row rings green, PAUSED gold, BLOCKED red, normal slate; phase cells (per-phase colors/glows) unchanged
- [ ] ?legacy=1 deploy list: phase matrix rows show the OLD flat tints (runtime-gated)
- [ ] Optic ledger summary card + Masterfile reconcile card: machined CYAN ring (violet gone — CALL 1)
- [ ] Issue detail cards, handoff record cards, BOM-ingest step cards, EDP parse status, preflight card, nvidia-smi telemetry card: machined
- [ ] BOM-ingest SUCCESS (green) cards + TODAY red blocker rows: UNCHANGED (semantic, deliberately skipped)
- [ ] .195 ask card + .196 inputs items above

## v1.14.198 — G-1d Command + pt-btn · rollback: revert commit (primary = one rule)
- [ ] Command: OPS SIGNAL rows, KPI tiles, header back chip machined; hero lens + stat trio glass w/ cyan glow intact
- [ ] Command QA tile grid: machined housings, per-tile glow/text hues still locate groups at arm length (border tints gone — JUDGE THIS)
- [ ] ⭐ PRIMARY BUTTONS fleet-wide (LOAD MASTER, parse, exports…): now dark cask w/ cyan text + ring (was solid cyan/black text) — JUDGE THE AFFORDANCE; veto = one-rule revert
- [ ] Ghost/secondary buttons machined incl. clip-notch corners; warning/destructive buttons UNCHANGED (semantic)
- [ ] Header ghost button machined; its amber alert state unchanged; shift pill (green) unchanged

## v1.14.199 — S-1 client proxy key · rollback: revert commit (Worker unaffected)
- [ ] Any AI feature (Ask PHANTOM) round-trips normally against the grace-mode Worker
- [ ] (After Worker paste) Cloudflare log shows x-phantom-key arriving; unkeyed count trends to 0

## v1.14.200 — P-2 New Device v2 + .mach true-up · rollback: revert commit
- [ ] Fresh device (cleared localStorage): v2 screen — machined fields w/ brush, comet ring rotating, spotlight follows touch
- [ ] Save minimal (name+site) -> enters app -> SYS > SITE PROFILE shows saved values; floor fields editable later
- [ ] EXISTING-profile device NEVER sees the screen (backfill contract)
- [ ] ?legacy=1 fresh device: the OLD gate, verbatim
- [ ] Rack-ID input + ticket fallback textarea: deeper well + brighter cyan focus (true-up) — still reads right

## v1.14.201 — D-1a stat faces pilot · rollback: revert commit
- [ ] Platforms drill-ins / POWER + COOLING cards: 11 faces render (values collapsed-visible, mono, cyan); 12 procedural cards deliberately faceless
- [ ] ⭐ DENSITY CALL at arm length (gates D-1b): too busy? want the scent line? faces on the right cards?
- [ ] H100 Common Faults card: XID tags w/ gold numbers
- [ ] Spot-audit any face value against the card body it fronts (they must match verbatim)
- [ ] ?legacy=1: cards show NO faces (guard) — pixel-identical to before

## v1.14.202 — P-3 law + G-1 residue · rollback: revert commit
- [ ] TODAY dashboard: cyan panels + chart card machined w/ cyan ring; violet KPI tile rings violet; RED blocker cards unchanged
- [ ] Profile editor: cyan card machined; ORANGE info card unchanged
- [ ] Platforms drill-in DLC chip still violet (law codified, no visual change intended anywhere else)

## v1.14.203 — D-1b fleet stat faces · rollback: revert commit
- [ ] Fiber cards (OM3/OM4/OM5/OS2): reach faces collapsed-visible and correct vs their tables
- [ ] LC/SC/DAC/AOC/QSFP/SFP/IB/OLTS/baud cards: faces match their bodies verbatim (spot-audit any)
- [ ] CLI / OOB / console / triage checklist cards: deliberately faceless (28 of 42 — procedure-heavy by design)
- [ ] ?legacy=1: no faces anywhere
- [ ] QUEUE IS DRAINED — this pass closes batches .198-.203

## v1.14.204 — web-Claude fix pass (SUPERSEDES the .195/.198/.201/.203 render items above) · rollback: git revert
- [ ] Command: Ask PHANTOM card now ACTUALLY shows the glass (was invisible border-box on device); prism + arrow intact
- [ ] #omni-bar (active-deployment capture band): opaque, no card text ghosting through it
- [ ] Primary buttons: even glow, no bottom-heavy tilt (T3 tune)
- [ ] Reference cards WITH stat faces: card TITLE reads full-width, stat row wraps to its OWN line below (not crushed into the title) — this is the D-1 layout fix; re-judge density now that layout is correct
- [ ] ⚠ Watch pt-btn-primary specifically: if it looks flat/materialless like the old ask card did, flag it (same raw-<button> border-box risk, left in scope for a follow-up)

## v1.14.205 — pt-btn-primary padding-box fix · rollback: revert the rule to .204
- [ ] Primary buttons (LOAD MASTER, EXPORT, parse CTAs, CONFIRM actions): now show the dark cask w/ cyan ring + glow + cyan text (was possibly flat/invisible border-box) — this REPLACES the .198 primary flag
- [ ] Ghost/secondary + qa-btn: unchanged from .198 (still border-box; flag if any reads flat vs primary now)

## v1.14.206 — A-2 assistant-sheet buttons padding-box fix · rollback: revert commit
- [ ] Tap Ask PHANTOM: the 4 intent cards (SPEAK/PASTE/TYPE/IMPORT) now show their machined ring + accent (were likely flat/edgeless border-box on device)
- [ ] Composer: ASK PHANTOM + MENU buttons show ring; Listening: DONE + CANCEL show ring
- [ ] Clipboard-deny fallback: ATTACH chip renders; ticket-attached chip lit cyan
- [ ] These were last device-touched in .194 before the border-box bug was known — this is the corrective

## v1.14.207 — FIX Command deploy tile clickable (laptop) · rollback: remove aspect-ratio:auto
- [ ] LAPTOP/desktop Chrome: Command page — the DEPLOY/SCANNED/HANDOFF tiles are compact (~96px, not giant); Deploy tile is on-screen and clicking it opens the deploy flow
- [ ] PHONE: same tiles now their designed compact height (slightly shorter than before) — deploy tile still taps through

## v1.14.208 — PHASE CHECKLIST (per-phase item lists) · rollback: git revert
- [ ] Work › Deploy › open a rack: each phase card shows a CHECKLIST strip; in_progress phase auto-expanded, others collapsed
- [ ] Tap items → green ring-check; count meter + bar update live WITHOUT collapsing the accordion
- [ ] wantNote rows (torque/serial/XID/leak) show note field open; type a value, leave + reopen rack → persists
- [ ] `+ note` on a plain row reveals an input · `+ ADD ITEM` → new row on THIS rack AND every other rack (site-scoped)
- [ ] EDIT → per-row red ✕ (default→removed, user item→deleted) + tap label to rename; DONE exits
- [ ] DLC rack (GB200/GB300/NVL72) shows the 2 extra mechanical DLC rows; H100/H200 does NOT; unknown-GPU rack shows them (fail-open)
- [ ] in_progress phase, unchecked items, tap COMPLETE → "N items unchecked — complete anyway?" soft confirm (last check does NOT auto-complete)
- [ ] Complete the deployment → checklist read-only, notes shown, no add/edit
- [ ] `?legacy=1`: rack detail has NO checklist strip, COMPLETE shows no checklist confirm (byte-identical)
- [ ] ⚠ 7th ship in this batch (one past the 6-cap) — owner stacked by decision 2026-07-08

## v1.14.209 — LOG NOTE QUICK CHIPS (tap/long-press, site-editable) · rollback: git revert
- [ ] Work › Deploy › rack › action stripe LOG NOTE: prompt shows a chip wrap row above the input
- [ ] TAP a chip → label fills the box, cursor at end, keyboard focus; tap a 2nd → appends with '; '
- [ ] LONG-PRESS ~0.5s → logs instantly (haptic + "Note logged to <rack>" toast), sheet closes, no typing
- [ ] ⚠ Audit trail shows exactly ONE RACK_NOTE per long-press (no double-log)
- [ ] Start a long-press then scroll/drag off the chip → nothing logs (no misfire)
- [ ] `+` → prompt adds a chip that appears here AND next open (site-scoped)
- [ ] EDIT → red ✕ removes (default hidden / user deleted), tap label renames; DONE exits
- [ ] Typed-note flow still works (type → OK → logs) — chips are additive
- [ ] `?legacy=1`: LOG NOTE prompt has NO chip row, behaves exactly as before
- [ ] ⚠ 8th ship in this batch (2 past the 6-cap) — owner continued the stack 2026-07-08

## v1.14.210 — LOGO-HOME (single-tap wordmark → Command) · rollback: git revert
- [ ] Single-tap the PHANTOM wordmark from a rack detail → lands on Command Center
- [ ] 5 rapid taps still triggers BOOT REPLAY (toast + reload) — dev hatch intact
- [ ] Focus a checklist note field, type text, single-tap logo → confirm() prompt; cancel keeps you on the rack
- [ ] No double navigation from a 5-tap burst (home timer cleared in the ≥5 branch)
- [ ] Already on Command → single tap does nothing (no flicker/re-render)
- [ ] `?legacy=1`: single tap does NOT jump home (unchanged), but 5-tap replay still works
- [ ] 9th ship in this batch — owner continued the stack 2026-07-08

<!-- AUTO-VERIFY 2026-07-08 (Claude Code, desktop Chrome automation + Node logic tests): .208 + .209
     FUNCTIONAL items ALL PASS — checklist toggle-without-collapse holds; note persists; site-scope
     works; .209 long-press logs EXACTLY ONCE (RACK_NOTE before 0 / after 1); both ?legacy=1 = no
     .pcl/.pql markup; no console errors; 24/24 resolver logic assertions pass. CAVEAT: user's Chrome
     had no deployment data → ran against SYNTHETIC data via overridden read-loaders (feature code NOT
     patched); organic master-seeded path not exercised in-browser. .202-.207 = visual/CSS, device-only.
     STILL OWED BY OWNER: on-device pass for haptics, iOS visual/aesthetic, PWA — none automatable. -->
## v1.14.211 — FLOOR MAP ACTIVE STRIP (auto-derived mid-flight row) · rollback: git revert
- [ ] Open a Deploy with ≥1 in-progress or blocked rack → ACTIVE strip appears ABOVE the grid, correct count
- [ ] Header reads `ACTIVE · N RACK(S)` cyan; `· M BLOCKED` appended in red when any blocked
- [ ] Strip order = BLOCKED first, then active
- [ ] A mid-flight rack shows in BOTH the strip AND its grid row (not deduped) — intended
- [ ] Tap a strip tile → opens that rack's detail
- [ ] Strip tiles look pixel-identical to grid tiles (shared `deploy_floorTileHtml`)
- [ ] Deploy with only complete/pending racks → NO strip (grid only)
- [ ] 8+ mid-flight → strip scrolls horizontally, scrollbar hidden, right-edge mask-fade
- [ ] `?legacy=1`: floor map shows NO strip; grid identical to before
- [ ] ⚠ 10th ship in this batch — well past the 6-cap; owner continued the stack 2026-07-08

## v1.14.212 — RECONCILE web-Claude .204 superset (B1 root fix + last-row clip + back-btn chip) · rollback: git revert
- [ ] Work › Deploy › STAGE SCOPE: tap cab rows → selection count increments (bar no longer eats taps); STAGE SCOPE SNAPSHOT enables
- [ ] Scroll to last cab row (e.g. dh6:050) → fully visible above the nav, not clipped (short viewport)
- [ ] Sticky action bar still pins directly above the bottom nav
- [ ] Every BACK button (Work tool, Crash Cart drill-in, Platforms drill-in) → smaller 34px rounded chip, slate chevron
- [ ] Press-and-hold a BACK button → chevron + chip border light cyan
- [ ] BACK still navigates correctly; 56px tap area still catches gloved taps
- [ ] `?legacy=1`: no functional regressions
- [ ] ⚠ 11th ship in this batch — owner-directed reconcile, stack continued 2026-07-08

## v1.14.213 — BOOT PLATE SWAP (portrait hero 1024→2048 + SW bump) · rollback: git revert
- [ ] Hard-refresh / remove+re-add the PWA (URL cache-bust does NOT bypass a registered SW — let the new SW activate)
- [ ] App version reads `v1.14.213` after the SW updates
- [ ] Boot hero is visibly CRISPER on iPhone (portrait)
- [ ] If it looks unchanged → the SW cache-key bump didn't take (check this first)
- [ ] Landscape/iPad boot still fine (plate-wide.webp untouched)
- [ ] First ship of a new batch (prior .202-.212 released 2026-07-08)

## v1.14.214 — FIX deploy scope-picker cab taps eaten (STAGE never enables) · rollback: git revert
- [ ] WORK › Deploy › NEW / SCOPE A JOB (Master loaded) → tap cab rows → selection counter climbs
- [ ] STAGE SCOPE SNAPSHOT button ENABLES once ≥1 cab selected
- [ ] Action bar sits just ABOVE the bottom nav — NOT floating over the cab list
- [ ] Scroll the cab list → last cab clears the bar (not clipped)
- [ ] Works on PHONE and LAPTOP (the reported-broken surface)
- [ ] `?legacy=1`: scope picker unaffected
- [ ] Root cause: .212 padding bump floated the sticky bar over the list; reverted. transform:none (irrelevant to sticky) deleted.

## v1.14.215 — CRASH-LOG HARDENING (copy-out + version stamp + real auto-clear) · rollback: git revert
- [ ] Force a `window.onerror` on device → orange crash banner appears
- [ ] Tap banner → toast/haptic fires; alert header shows `v1.14.215`; each entry line shows ` · v1.14.215`
- [ ] Paste clipboard into Notes/Messages → FULL log landed (not just the 1400-char preview), with header + stamps
- [ ] Stale-clear: `.215` entries survive a reboot (same version kept); (opt) hand-edit an entry `.v` to a fake older version → dropped on reload, `.215` stays
- [ ] iOS clipboard-deny path: if no "Copied" toast, alert still shows the trace to screenshot (no dead-end)
- [ ] If banner/version reads unchanged → SW cache-key bump didn't take (check first)
- [ ] First ship of a new batch (prior .213-.214 released 2026-07-09)

## ⏸ DORMANCY GAP — .216 → .329 not tracked here
- This file went dormant after .215 (2026-07-09). Ships **.216 → .329** were verified out-of-band (owner device passes + per-ship `version.json` notes + git log), NOT via this file. Absence of a block below does NOT mean a ship was unverified. Re-activated .330 on owner directive (2026-07-21). Source of truth for that gap = `version.json` history + memory `project_repo_sync_v1133.md`.

## v1.14.330 — INSPECT-3D landing: first Master rack live in the Command hero · rollback: `git revert 76375fb`
- [ ] Hard-refresh / clear SW cache first → version chip reads **v1.14.330**+ (else cached). Not in legacy (`?redesign=1` once if nav shows word-tabs — feature is redesign-only).
- [ ] **Load a real Master** → HOME (Command) auto-lands with the **first rack live in 3D** at the top, above the status pills / NEXT BEST ACTION; caption reads `RACK · <id>`.
- [ ] It's **live 3D on the phone** (pan/orbit responds) — not a flat image. Rack shown is a real rack from your loaded file (active-deployment lead rack, else first in Master).
- [ ] Leave HOME → BUILD/TOOLS → back to HOME: rack **re-appears** cleanly (no blank, no doubled scene). Phone shouldn't warm from a background render (teardown-on-leave).
- [ ] **Before any Master loaded** (fresh install): HOME looks **exactly like .329** — no rack slot, nothing shifted. Hero only appears once a Master is in.
- [ ] `?legacy=1` → old 5-tab app totally unaffected (no rack hero anywhere). No new console errors on load / entering HOME.
- [ ] If blank/wrong: report (a) caption present but no 3D, or (b) nothing at all, and (c) whether WebGL works elsewhere in the app.

## v1.14.331 — fold the 2 rd-review nits on the INSPECT-3D hero (polish) · rollback: `git revert f59c288`
- [ ] Folds into the .330 check — the hero should look **the same**: cyan frame / glow / caption on the rack landing (token swap is a negligible within-hue shift, corrected to the page's true `--cyan` #5cf2ff).
- [ ] No behavior change: rack still lands / tears down / re-mounts exactly as .330.
- [ ] (Diagnostic-only) if a D1 rack-resolution anomaly ever occurs it now logs to SYS › ERRORS instead of being swallowed — nothing to see unless it fires.
- [ ] Both P3 gate agents (`phantom-ship-gate` + `phantom-rd-reviewer`) returned PASS on f59c288 pre-push.

<!-- append new ships above this line; checkpoint when 6 deep or before HIGH-risk -->

---

## ⚠ FILE DRIFT NOTE (appended 2026-07-23)
Maintained through `.215`, then drifted. `.216–.339` verify status = git log + INTEGRATION-STATE, not here. Resuming batch tracking at `.340`.

## CURRENT BATCH TO RUN — `.340–.344` (5 ships stacked, unverified)
**Prep:** unregister SW + delete caches, reload, confirm top-right build badge = `v1.14.344` (hard-refresh alone will NOT bypass the SW). `?legacy=1` must stay pixel-identical throughout.

### v1.14.340 — device fix (OPEN BAY clip + back-to-Home, ghost, nav clearance) (`b02fec8`) · rollback: revert commit
- [ ] OPEN BAY: bay art not clipped at the edge
- [ ] Back from OPEN BAY returns cleanly to Home
- [ ] Assistant ghost present; content clears the bottom nav

### v1.14.341 — global nav clearance + ghost co-star (`24111f4`) · rollback: revert commit
- [ ] Scroll every page to the bottom — nothing hides behind the nav strip (`--rd-navclear`)
- [ ] Assistant ghost sits as co-star, not cropped

### v1.14.342 — device fix #3 (hero=bay truth, land-3D, nav-icon baseline, pills) (`f3bb9af`) · rollback: revert commit
- [ ] Hero rack shows the SAME rack as an OPEN BAY (one truth)
- [ ] Landing 3D intact · nav icons on baseline · pills sized right

### v1.14.343 — Home card-surface unification (`bbe0554`) · rollback: revert commit
- [ ] Every Home card = the same near-black as the 98 RACKS stat tile (assistant/quick-tools/suggestions/rackline no longer blue)
- [ ] Zero visual pop between cards

### v1.14.344 — assistant-card tap→openVaSheet (`d72e1c8`) · rollback: revert commit
- [ ] Home: tap AI ASSISTANT card ANYWHERE → Phantom assistant sheet opens
- [ ] `CHAT →` chip visible bottom-right of the card · sheet's own close returns to Home
- [ ] Desktop: card tap AND the CHAT WITH PHANTOM button both open the same sheet

**On release:** owner marks this batch RELEASED → clears the CALL-0 HIGH-risk gate for MASTER FULL-INGEST Phase 2.

### v1.14.345 — GHOST IS THE DOOR: assistant doors land on intent menu (`5a5dada`) · rollback: revert commit
**⚠ SUPERSEDES the .344 "tap card → sheet opens" item above — that door opened BLANK (bare openVaSheet()). .345 fixes it.**
- [ ] Tap AI ASSISTANT card (and desktop CHAT WITH PHANTOM) → the FOUR-DOOR intent menu opens EVERY time (SPEAK / PASTE TICKET / TYPE OR PASTE / IMPORT FILE), never blank
- [ ] CHAT chip → same menu · sheet's own close returns to Home
- [ ] SPEAK is the ONLY control that starts the mic (no surprise mic on any other tap)
- [ ] `?legacy=1` pixel-identical

**Batch is now `.340–.345` = 6 ships → at the CALL-0 count cap. Verify + release before the next ship.**

---
## ✅ BATCH `.340–.345` — RELEASED by owner 2026-07-23 ("340-345 good")
All 6 ships device-verified on iPhone. CALL-0 6-ship count cap **cleared** + the MASTER FULL-INGEST HIGH-risk prereq **cleared**. Next ship opens a new batch.

---

# ▶ OPEN BATCH — starts at `.346` (count 1 of 6)

## v1.14.346 — MASTER FULL-INGEST Phase 2: SITE-VARS (`38bb94a`) · rollback: revert commit
**HIGH-risk surface:** sacred parse path + a user-data write. Both gates PASS; 25/25 offline
assertions against `test/MASTER-US-CENTRAL-AUS03-TEST.xlsx` executing the shipped bytes.
**Clear the SW cache first, then load the AUS03 test Master.**

- [ ] Load the test Master → SITE PROFILE sheet shows a violet **FROM MASTER · SITE-VARS (18)** block, all 18 rows readable, nothing running off the right edge at phone width
- [ ] FACILITY ID / RACK NAMING / PDU TYPE / STANDARD OPTICS fill themselves **only if they were blank**
- [ ] Type your own value over PDU TYPE → save → load the Master again → **your value is still there** (merge, never overwrite)
- [ ] A Master with no SITE-VARS sheet still ingests normally; the FROM MASTER block simply does not render
- [ ] Console after a load: `stats.sheetsParsed` includes `SITE-VARS`, and it is gone from `sheetsSkipped`
- [ ] Force-quit and cold-start the app → the FROM MASTER block is still populated (siteVars survives the restore)
- [ ] `?legacy=1` → site profile editor and first-run gate look exactly as before

**Known deviation to rule on:** spec asked for a read-only setup screen (name-only editable).
Fields are pre-filled + provenance-tagged but left EDITABLE — a locked field with no override
strands you on a wrong Master. One-line change to lock if you want it locked.

**Separate pre-existing bug found, NOT fixed here (owns its own ship):** saving the SITE PROFILE
editor drops `operator` — your name is wiped from sign-offs and the editor has no field to put it
back. It also drops the new `sources` map, which makes Master-filled fields permanently
hand-entered after any editor save (fail-safe, never a clobber).

## v1.14.347 — OPERATOR WIPE fix: site-profile save destroyed your name (`09d142b`) · rollback: revert commit
**HIGH-risk surface:** user-data write path. Both gates PASS; 9/9 offline assertions on the shipped
save path, .346 suite still green. **This is a live bug that has been eating names — verify it first.**

- [ ] SITE PROFILE sheet → a **YOUR NAME** field now sits at the top, showing your operator name (blank if a past save already ate it — type it back in)
- [ ] Change PDU TYPE → SAVE PROFILE → reopen the sheet → **your name is still there** (before .347 it vanished silently)
- [ ] Clear the YOUR NAME box → SAVE → reopen → your name is **unchanged** (blank = no change, never an erase)
- [ ] Load the AUS03 Master again → the PDU TYPE you typed **survives**; fields you never touched still refresh from the Master
- [ ] Your name still appears on a sign-off / handoff after a profile save
- [ ] `?legacy=1` → profile editor looks exactly as before (no YOUR NAME field there — it is redesign-only)

**Note:** names already lost to a pre-.347 save are gone — localStorage was overwritten. The new
field is how you put yours back.

**Batch `.346–.347` = 2 of 6.**

## v1.14.348 — ASSIGN RACK destroyed other deployments' racks (`9d9b371`) · rollback: revert commit
**HIGH-risk surface:** deployment record storage. Both gates PASS; 10/10 offline assertions.
**Needs TWO deployments with racks to verify — with one deployment the bug was invisible.**

- [ ] Deployment A → open a rack → ASSIGN to a tech → then open deployment B: **all of B's racks are still there**, with their slots and phase state (pre-.348 they were silently deleted)
- [ ] The assignment itself still lands, and shows on the rack in A
- [ ] Unassign (blank name) still clears it, and still destroys nothing
- [ ] Single-deployment device: assign works exactly as before
- [ ] Phases/optics for B still line up with B's racks (nothing orphaned)

**Note:** racks already destroyed by this bug are gone — the key was overwritten. This stops the bleeding.

**Batch `.346–.348` = 3 of 6.**

## v1.14.349 — saver rename cleanup, all four now `deploy_saveAll*` (`b8a54fe`) · rollback: revert commit
**LOW risk — pure mechanical rename, zero behavior change**, proven: 15 sites, occurrence-count parity,
zero residue, and after excluding renamed identifiers the only changed lines are the version stamps.
Both gates PASS; all three prior suites re-run green. **Regression sweep only, no new feature to check.**

- [ ] Open a deployment → advance a phase → it sticks after closing and reopening
- [ ] Block a phase, add a blocker note → note persists
- [ ] Tick a phase-checklist item and add an item note → both persist
- [ ] Dispense / install an optic → counts persist and the ledger still adds up
- [ ] Audit trail still records each of the above
- [ ] Nothing visual changed anywhere

**Batch `.346–.349` = 4 of 6.**

## v1.14.350 — loader arity split, .347/.348 bug class made unrepresentable (`1734dc9`) · rollback: revert commit
**Larger diff (158/111) but no new feature — it splits each deployment loader into a scoped door and an
all door so a scoped read can never silently become a whole-store write.** Both gates PASS; new .350 suite
(20 assertions) + all prior suites green. Falsy-id branch is a dormant tripwire, unreachable through the app
today (rd-review traced every entry point to a guard). **Regression sweep — confirm nothing leaks between
deployments or vanishes.**

- [ ] TWO deployments loaded: open each and confirm its racks / phases / optics / audit are ITS OWN and complete
- [ ] Advance a phase, block one with a note, tick a checklist item, add a checklist item, dispense an optic, assign a rack — each in deployment A
- [ ] Reopen deployment B: everything still present and correct, nothing leaked in from A, nothing vanished
- [ ] Audit log for each deployment shows only its own events
- [ ] Nothing visual changed anywhere

**Batch `.346–.350` = 5 of 6. Next ship hits the CALL-0 count cap — verify + release this batch before or at .351.**

---
## ✅ BATCH `.346–.350` — CLEARED by owner 2026-07-24 ("all good moving on")
All 5 ships cleared in one call. CALL-0 count cap **reset** — the next ship opens a new batch at 1 of 6.

**Recorded honestly:** the owner cleared the batch in chat rather than checking the boxes above
item-by-item. The `.348` / `.350` two-deployment cross-contamination checks in particular were
**not reported back individually**. Both ships carry offline proof (10/10 and 20/20 assertions on
the shipped bytes, both gates PASS) and both are independently revertible by their own commit, so
this is a low-exposure clear — but if racks or phase state ever look wrong across two deployments,
**start here**: `git revert 9d9b371` (.348 data fix) and `git revert 1734dc9` (.350 split) are
independent of each other.

---

# ▶ OPEN BATCH — starts at `.351` (count 1 of 6)

## v1.14.351 — desktop nav edge-to-edge + phase-strip clearance (`c2a0da1`) · rollback: revert commit
**CSS only** — no JS, no markup, no data path. Ships §1 + §2 of `design/FIX-DESKTOP-NAV-CARDS.md`;
§3/§4 held for a separate ship. Both gates PASS. **Two shells to check — this one is not desktop-only.**

**⭐ The §2 bug was mis-diagnosed by the spec and it affects your PHONE too.** The phase strip
(`#ph-dock`) is a *second* fixed strip stacked above the nav on rack detail, and page clearance only
ever paid for the nav — so the bottom ~51px of every rack detail has been sitting behind the phase
strip at full scroll, in both shells. It was only ever reported from the laptop.

- [ ] **PHONE** — open a rack detail (phase strip MECH/PWR/NET/COMP/VAL visible), scroll to the absolute bottom: **LOG NOTE / ASSIGNED TO / the QR button now clear the strip completely** and are fully tappable. This is the one that has been broken all along.
- [ ] **DESKTOP ≥1024** — bottom nav is ONE black strip edge to edge; no page content visible either side of it; it reads as a floor, not a floating box
- [ ] Desktop: the four icons (HOME · BUILD · TOOLS · EXIT) are still centered as a group at their **current spacing** — they should NOT have spread across the monitor
- [ ] Desktop BUILD scrolled to the bottom: same clearance check as the phone
- [ ] **Home and TOOLS scroll exactly as before** — the extra clearance must NOT appear where the phase strip is absent (this is the regression to watch)
- [ ] Deploy STAGE SCOPE picker: cab rows still tap, action bar still sits just above the nav (`.212`/`.214` surface — verified mutually exclusive with the new rule, but eyeball it)
- [ ] Phase strip itself is unchanged in height and look (the new `min-height` is a derived no-op)
- [ ] `?legacy=1` pixel-identical

### ✅ `.351` PHONE-VERIFIED by owner 2026-07-24 ("yes looks good on the phone")
The §2 phase-strip clearance — the half that was actually broken, and broken on the phone the
whole time — is confirmed fixed on device. Desktop §1 (edge-to-edge strip, centered icon group)
was eyeballed but **not separately confirmed on a ≥1024 browser**; it is CSS-only and reverts
with the same commit. Ship stays in the open batch as `1 of 6` rather than being released, since
a batch of one has nothing to gain from an early release.

**Batch `.351` = 1 of 6.**

## v1.14.352 — hero card: unified fill + the stage moved onto the mount (`bc5c24f`) · rollback: revert commit
**CSS only, two declarations.** §3 (partial) + §4 of `design/FIX-DESKTOP-NAV-CARDS.md`. Both gates PASS —
rd-review verified the load-bearing claim against live code (the hero canvas is `alpha:true` with no
`scene.background`, so it composites onto the card and both declarations genuinely render).
**LOCKED reh3d exposure/lights/fog NOT touched** — the lift is hero-mount-local.

- [ ] Home with a Master loaded: the hero rack's **populated trays are distinguishable from empty space at a glance, at arm's length** (they read as void today)
- [ ] The hero card's **EDGES** are the same black as the 98 RACKS stat tile and the assistant card — no blue or grey cast
- [ ] The glow sits **behind the rack**, not as a band across the top of the card (it was anchored at the top edge before, above the rack rather than behind it)
- [ ] ⭐ **JUDGE THE VALUE:** the stage is `.14`. Too dark, too washed, or correct? If the trays still do not read, say so — the next lever is the LOCKED exposure and that needs your ruling, I will not touch it. If it reads hazy, it drops toward `.10`. One-number change either way.
- [ ] OPEN BAY still opens from the hero tap; rack still mounts/tears down cleanly leaving and re-entering Home
- [ ] `?legacy=1` pixel-identical (`#pg-cmd` is redesign-only)

**Still held:** the "DEVICES section" card fill — the spec never identifies it, best match is the COMPONENTS
card (`~:35331`, inline `background:var(--surf-1)`), owner ID outstanding. The 22-site inline `--surf-1`
sweep stays parked.

**Batch `.351–.352` = 2 of 6.**

## v1.14.353 — SHIP B core: FLAT dies, 3D is the rack-detail view, one OPEN AISLE door (`4f84c65`) · rollback: revert commit
**HIGH-risk (LR-2) — WebGL mount inversion. This ship CAPS the batch: per the CALL-0 rule a HIGH-risk ship
triggers the device pass, so run `.351–.353` as one consolidated pass now rather than stacking further.**
Executes `design/SHIP-B-BUILD-PLAN.md` edits 1–8 (owner rulings F1/F2). Edit 9 (the B4.3 reflow) is HELD —
needs your placement call (below). Both gates PASS (ship-gate 6/6, rd-review 10/10). **RACK SCENE LOCK not
touched** — mount reveal path + control-strip contents + one card only.

- [ ] **Open a rack in a deployment** → it opens straight into the **3D elevation** (not flat, and there is **no FLAT|3D|AISLE pill**)
- [ ] A single **OPEN AISLE** door (cyan, ›) sits above the rack; tapping it opens the FORGE aisle
- [ ] In 3D the **CABLES chip + FRONT/ISO/TOP/REAR + EXPLODE** controls still appear in/under the strip (the container was kept as their anchor)
- [ ] Tapping a **device in the 3D rack** still opens its detail sheet (raycast wiring untouched)
- [ ] **Close the aisle** → returns to the **3D rack** (not flat)
- [ ] The phase-overrun warning ("… min on POWER … Unlogged blocker?") appears **once** — inside NEXT ACTION — not twice
- [ ] **No-WebGL check** (if you can force it / an old device): the rack shows the **flat elevation**, not a black box — this is the F2 fallback
- [ ] ⭐ **PLACEMENT CALL (edit 9, held):** right now the page order is unchanged — 3D elevation still sits mid-page, above NEXT ACTION. B4.3 wants "opens on NEXT ACTION." Tell me where the 3D block should land: (a) just below the NERVE/NEXT ACTION card, or (b) NEXT ACTION lifted above the COMPONENTS card too. One word and I ship the reorder as `.354`.
- [ ] ⚠️ **Advisory (not a hold):** the OPEN AISLE door is ~25px tall — below the 44px gloved floor, though a hair taller than the segments it replaced. Same family as the parked `.reh-3d-seg` 22→44px backlog. Want it bumped to a full gloved target? Your ruling.
- [ ] `?legacy=1` pixel-identical (the reh3d block is redesign-only; the legacy flat branch is untouched)

**Batch `.351–.353` = 3 of 6 — HIGH-risk `.353` caps it; ready for the consolidated device pass.**

## v1.14.354 — SHIP B edit 9: 3D elevation below NEXT ACTION (redesign-gated) + OPEN AISLE 44px (`9c0c4de`) · rollback: revert commit
Finishes SHIP B. Two owner rulings (a) 3D just below NEXT ACTION, and 44px door. **A naive first pass was
CAUGHT BY BOTH GATES as a `?legacy=1` byte-identity break** (deploy_showRackDetail is a SHARED function —
an ungated reorder moved the legacy page too); reverted and redone with the reorder **redesign-gated**.
Both gates PASS on the fix. **RACK SCENE LOCK not touched.** Verify on the SAME rack detail as `.353`:

- [ ] **REDESIGN rack detail** — the page now leads with header/nav/phase-dots/COMPONENTS, then the **NERVE card (NEXT ACTION)**, and the **3D elevation sits BELOW NEXT ACTION** (it was above it on `.353`)
- [ ] Nothing doubled or dropped — the elevation renders exactly once; 3D still mounts, tap a device → sheet, OPEN AISLE still opens the aisle, CABLES/rail/EXPLODE present
- [ ] The **OPEN AISLE door is now ~44px tall** (a full gloved target); the CABLES chip beside it is the same height, text centered
- [ ] ⚠️ **`?legacy=1` rack detail** — section order is **UNCHANGED** from `.353` (elevation still ABOVE Ghost Echo/NERVE). This is the byte-identity the gates flagged and the fix restored — worth an explicit eyeball on `?legacy=1`.

**Batch `.351–.354` = 4 of 6 — SHIP B complete (.353 core + .354 reflow); still capped by the HIGH-risk .353, consolidated device pass ready.**

---
## ✅ BATCH `.351–.354` — CLEARED by owner 2026-07-25 (iPhone PWA, offline)
Recorded verbatim (not "all good"). Full per-ship detail + gate marks are in `INTEGRATION-STATE.md` →
**DEVICE-PASS CLEAR** block. Summary:
- `.351` PASS (phone rack-detail clearance + Home/TOOLS unregressed) · **desktop §1 PARTIAL** (≥1024 not tested)
- `.352` PASS (hero trays readable, edges match stat-tile black, `.14` verdict correct, OPEN BAY opens)
- `.353` PASS (3D-is-the-view, OPEN AISLE→forge, CABLES/rail/EXPLODE, device-tap→sheet, close→3D, overrun once) · **no-WebGL fallback PARTIAL** (not iPhone-testable)
- `.354` PASS (3D below NEXT ACTION, nothing doubled, ~44px door, `?legacy=1` order unchanged)
- Gates: `?legacy=1` byte-identical PASS · three-stamp on device (badge v1.14.354) PASS · offline relaunch data intact PASS

**PARTIAL revert anchors:** `.351` desktop §1 → `git revert c2a0da1` · `.353` no-WebGL fallback → `git revert 4f84c65`.
CALL-0 count cap **reset** — next ship opens a new batch at 1 of 6. **`.355` (§3 Option A) is unblocked but owner-deferred ("not tonight").**

---
# ✅ RELEASED BATCH — `.355`–`.363` · CLEARED by owner 2026-07-30 · cap RESET

> **READ THIS FIRST — this batch is TWO visual checklists, not six.**
> `.356`, `.357` and `.358` are **asset-and-stamp ships with ZERO markup change** — the entire
> `dct-ios.html` diff in each is one version constant. `.360` adds two `<img>` references to a
> page `.359` already built. So the whole batch reduces to:
>
> 1. **`.355`** — the COMPONENTS card fill on **rack detail**. Its checklist below.
> 2. **`.359` + `.360`** — the **BUILD page**, rebuilt and then completed. Both checklists at
>    the end of this file. **Verify them together, on one screen, in `.360`'s state.**
>
> Verify those two screens and the batch is verified. The three asset ships contribute exactly
> **one** check of their own — offline boot — and the BUILD checklist re-runs it anyway, because
> `.359`/`.360` are the ships that actually *reference* those rasters.
>
> ⚠ **STALE BADGE LINES.** `.355` says "badge reads **v1.14.355**" and `.358` says
> "**v1.14.358**". The device will read **v1.14.362**. Read them as "the current live stamp."
>
> ⛔ **`.359`'S HATCH INSTRUCTION IS SUPERSEDED BY `.360`.** `.359`'s checklist told you DEPLOY
> and HANDOFF *should* show a diagonal accent hatch instead of a photograph, because their art
> was held. The owner released both holds in `.360`. **All five rows now carry a photograph.**
> If you see the hatch on any row, that is a FAILURE — see the `.360` block.
>
> ⚠ **Why the pass is due now, twice over:** `.359` replaces an entire page's markup — HIGH-risk
> under CALL-0, which fires the consolidated pass regardless of count — **and** `.360` puts the
> batch at 6 of 6, the count cap itself. **No further ships until this clears.**
> The owner accepted a **coarse rollback** for `.359`: if the BUILD page is wrong, the revert
> takes the whole banner port, not one edit. `.360` reverts independently of it.
>
> Carried over from the `.351`–`.354` pass, same rack-detail screen, cheap to fold in:
> the `.352` rack-detail clearance reconfirm and the `.352` `.14` hero-stage value.

## v1.14.355 — §3 COMPONENTS card → stat-tile black (Option A) (`e0bcfad`) · rollback: revert commit
**CSS + one redesign-gated class marker.** FIX-DESKTOP-NAV-CARDS §3, owner-ruled Option A (2026-07-25).
The COMPONENTS card on the rack-detail page (`deploy_showRackDetail`) was the last card still on the
lighter `.gsk` glass skin; it now renders the 98 RACKS stat-tile black (`--rd-cardfill`) under redesign.
Both gates PASS (ship-gate 7/7; rd-review all rules, one non-blocking advisory below). The old
"swap the inline `--surf-1`" mechanism was DEAD (overridden by `body.rd .gsk{…!important}`); fixed via a
higher-specificity `body.rd .gsk.gsk-flat` rule + a redesign-gated `gsk-flat` marker. **RACK SCENE LOCK not touched.**

- [ ] **REDESIGN rack detail** (open a rack in a deployment): the **COMPONENTS card** (COMPONENTS / N DEVICES header + the GPU / NETWORK SWITCHES / STORAGE / … category bars) reads the **same near-black** as the 98 RACKS stat tile and the assistant card — **no lighter blue/grey cast**
- [ ] The card's **border, corners, and shadow are unchanged** — only the fill went darker (fill-only)
- [ ] ⭐ **JUDGE THE LOCAL CONTRAST (advisory, not a hold):** this card is now darker than its **sibling phase/state cards on the same page** (they stay on the lighter glass skin — they were never in §3's scope). Option A was card-scoped by design. If that contrast reads wrong on device, say so — it reverts in one commit and we reconsider (close it, or take the whole `.gsk` set as a bigger ship).
- [ ] `?legacy=1` rack detail: the COMPONENTS card is **UNCHANGED** (lighter glass skin — plain `.gsk` + inline `--surf-1`) — pixel-identical to `.354`
- [ ] three-stamp on device: badge reads **v1.14.355** — ⚠ STALE, see the batch header. Reads **v1.14.360** now.

---

## v1.14.356 — stage 3 BUILD banner rasters (`6a852ac`) · rollback: revert commit
**Assets + precache only. ZERO markup change.** Adds `phantom-banner-{scan,master,ops}-1170.webp`
(1170×403) to `icons/` and registers all three in `sw.js` `PRECACHE_URLS`. Nothing in the app
references them. Both gates PASS.
Prepared with five assets, shipped with three — `phantom-rd-reviewer` returned CHANGES-REQUESTED on
`deploy` and `handoff` and the owner ruled to ship the clean three. Those two shipped separately
in `.357`/`.358` after their own rulings.
Also fixed here: the MASTER master is letterboxed (22 dead bottom rows, real content aspect 2.99174),
which the first cut baked into the banner as a black band. The cutter now de-letterboxes before
fitting.

- [ ] Nothing to see. **No visual change is expected anywhere** — if anything looks different, that
      is a bug, not a feature.

## v1.14.357 — DEPLOY banner raster + record three owner rulings (`88a5296`) · rollback: revert commit
**Assets + precache + docs. ZERO markup change.** Adds `phantom-banner-deploy-1170.webp`. Records
§5.5, B5 and the HANDOFF scoped overrule in `design/OWNER-RULINGS.md`. Both gates PASS.
Shipped because the owner ruled away both holds on 2026-07-30: §5.5 (baked text is a size rule
measured in the ship cut, 10px bar; hardware faceplate markings pass) and B5 ("GB300 stays, it's
aspiration not a defect"). DEPLOY measures 6.6px in the cut and nothing resolves at 390px.

- [ ] Nothing to see. **No visual change expected.**

## v1.14.358 — HANDOFF banner raster, completes the phone set (`5011b87`) · rollback: revert commit
**Assets + precache + docs. ZERO markup change.** Adds `phantom-banner-handoff-1170.webp`, completing
the five-row phone set (~247KB, precached, referenced by nothing). Both gates PASS.
Shipped after the owner ruled on the tablet screen title, which measures **exactly 10px** in the ship
cut against §5.5's "no text taller than 10px" bar — at the limit, not over it. Read that case
narrowly; see `design/OWNER-RULINGS.md`.

- [ ] Nothing to see. **No visual change expected.**
- [ ] ⭐ **THE ONE REAL CHECK FOR ALL THREE ASSET SHIPS — clear the service worker → airplane mode →
      hard reload → app boots fully offline.** This exercises the enlarged precache (74 entries).
      An online eyeball check does NOT test this. If the app boots offline, the banner precache is good.
- [ ] Badge reads **v1.14.358** — ⚠ STALE, reads **v1.14.360** now. The offline-boot check above
      is superseded by the `.360` version of it (same test, now with all five rasters referenced).

## v1.14.359 — BUILD BANNER ROWS: 12-tile grid retired, five rows + a 3x3 OPS wall (`0c365e5`) · rollback: revert commit
**HIGH-risk — an entire page's markup replaced.** The BUILD landing's 12 `.rf-card` tiles become
five full-width 2.90:1 banner rows (DEPLOY · SCAN · HANDOFF · MASTER FILE · OPS); OPS expands **in
place** into a 3×3 nine-cell tool wall. Every row and cell reuses the **exact handler its tile
used** — no new doors. `.356`/`.357`/`.358`'s rasters are referenced for the first time here.
Both gates PASS (three-stamp; 4/4 JS blocks + sw.js compile; braces balanced in all 12 style
blocks; diff surgical at +142/-15; shared `.rf-*` CSS intact; `?legacy=1` unreachable —
`#work-grid` is `display:none` outside `body.rd`).

**⭐ ROLLBACK IS COARSE, BY YOUR OWN RULING.** One commit carries markup, CSS, handlers, registry
and asset refs together. If the BUILD page is wrong, `git revert 0c365e5` takes the whole port
back to the 12-tile grid — not one edit. That was the trade for one verification cycle instead
of five.

**Go to BUILD. Everything below is that one screen.**

- [ ] BUILD shows **FIVE full-width rows**, top to bottom: DEPLOY · SCAN · HANDOFF · MASTER FILE · OPS
- [ ] ~~SCAN, MASTER FILE and OPS carry photographs; DEPLOY and HANDOFF show a diagonal accent
      hatch~~ ⛔ **SUPERSEDED BY `.360` — all five rows now carry photographs. See the `.360`
      block below; check it there, not here.**
- [ ] ⭐ **EVERY ROW TAPS THROUGH.** DEPLOY → deploy flow · SCAN → scan · HANDOFF → handoff ·
      MASTER FILE → master file. **A row that does nothing is a ship failure**, not a nit.
- [ ] Tap **OPS** → the row expands **in place** into a 3×3 grid, and the chevron rotates. Tap again → collapses.
- [ ] **OPS at 2.90 geometry** — when collapsed it is the same shape as the other four rows, **not
      a short 96px strip**. (The mock had this wrong; the asset was always right.)
- [ ] ⭐ **ALL NINE WALL CELLS OPEN THEIR TOOL:** BOM · MANIFEST · PORT MAP · RACK MAP · SOPS ·
      BURNDOWN · AUDITS · BLAST · OPTICS. Tap every one. Back returns to BUILD each time.
- [ ] **No label text crosses the middle of any row** (labels clamp to the left 45%, over the scrim).
      Check DEPLOY and MASTER FILE especially — those two labels are the longest.
- [ ] **Nothing on this page states a number.** No "3 staged", no port counts, no percentages. The
      mock had them; every one was invented. If you see a value anywhere on BUILD, that is a bug.
- [ ] Gloved test: the nine wall cells are ~108×88px. **Tap each with a glove on.** If any is fiddly, say so.
- [ ] ⭐ **THE REAL GATE** — ⛔ superseded by `.360`'s version of the same check (five photographs,
      not three). Run it once, in the `.360` block.
- [ ] Badge reads **v1.14.359** — ⚠ STALE, reads **v1.14.360** now.
- [ ] `?legacy=1` → the old 5-tab app is **unchanged**; none of this exists there

**⚠ EXPECTED, NOT A BUG — flagged for a separate ruling:** the Deploy/Scan/Handoff/Issues subtab
strip still sits below the rows, so **three of the five rows now have a duplicate door** on the
same screen. Left alone deliberately — resolving it is its own ship and needs your call on which
door survives.

**Known gaps, deliberate, both reversible:** the wall cells show **name + meta only, no live data**
(binding nine Master accessors is a bigger ship than this one — the alternative was the mock's
fabricated readouts, which were dropped). ~~DEPLOY and HANDOFF art is still HELD~~ — **released in
`.360`.** Four now-orphaned tile icons and their precache entries were **retained**, not deleted
— they fold into the same cleanup ship as the 16 pre-existing dead entries.

## v1.14.360 — the two held banners release, all five rows carry art (`1f29d44`) · rollback: revert commit
**Two `<img>` references. Nothing else.** Owner rulings 2026-07-30 released both holds: **B5 =
ACCEPT** (DEPLOY ships as-is with GB300 / NVL72 branding legible — "the app is site-agnostic but
the art does not have to be"; CLOSED, not to be re-raised) and **§5.5 = WAIVED FOR THE HANDOFF
BANNER ONLY** (its legible baked workflow text ships as owner-accepted debt — logged, and
explicitly **not a precedent**; §5.5 still binds every future banner render).

The `.359` rows, OPS wall, handlers, registry and CSS are **untouched** — the gate proved it
mechanically: each changed row line is byte-identical to its predecessor once the `<img>` is
removed, and no other added line contains markup. `PRECACHE_URLS` needed no change (both rasters
were registered by `.357`/`.358` when they were staged). The hatch fallback **stays in the CSS**
by instruction — it is the standing mechanism for any future missing asset, now dormant, not dead.

**This block supersedes the `.359` art and offline-boot items. Run these instead.**

- [ ] ⭐ **ALL FIVE ROWS CARRY A PHOTOGRAPH.** DEPLOY and HANDOFF must **no longer show the
      diagonal accent hatch**. If either still does, its raster is not loading — that is the
      failure this ship exists to remove, and the hatch is doing exactly its job by showing you.
- [ ] **DEPLOY art:** GB300 / NVL72 branding is visible on the faceplates. **That is accepted and
      closed** — it is not a bug, do not re-flag it.
- [ ] **HANDOFF art:** baked workflow text is legible. **Accepted debt under a one-asset §5.5
      waiver** — also not a bug here. ⭐ If it reads badly *at arm's length on the phone*, say so:
      the waiver was for the asset as-cut, and a re-cut is still open to you.
- [ ] Both rows still tap through (DEPLOY → deploy flow, HANDOFF → handoff). Nothing about the
      handlers changed, but it is a two-second regression check.
- [ ] The five rows are the **same height and alignment** — all five rasters are 1170×403, so
      nothing should shift or letterbox.
- [ ] ⭐ **THE REAL GATE — clear the service worker → airplane mode → hard reload → all FIVE
      photographs still render offline.** This exercises the full ~247KB banner set for the first
      time; until `.359`/`.360` the rasters were precached but referenced by nothing. **An online
      eyeball does NOT test this.** If rows go blank offline, the precache is broken.
- [ ] Badge reads **v1.14.360**
- [ ] `?legacy=1` unchanged

**⚠ FILENAME DEVIATION — reported in `.360`, RULED and RESOLVED in `.361`.** The release ruling
named `DEPLOY-phone@3x.webp`, a file that existed nowhere; `.360` referenced the real `.357` asset
and reported the mismatch instead of guessing. Owner then ruled the name — see `.361` below.

**Both rulings are now mirrored into `design/OWNER-RULINGS.md`** (`f9ad297`), alongside where
`.357`/`.358` recorded theirs.

## v1.14.361 — rename the deploy raster to `DEPLOY-phone@3x.webp` (`3842fd5`) · rollback: revert commit
**A rename. Three things moved and nothing else:** the file (`git mv`, 100% similarity — **zero
byte change to the raster**, still 1170×403 / 43134 bytes), the `<img src>` in the DEPLOY row, and
the `PRECACHE_URLS` entry. Owner ruling 2026-07-30: *"yes rename it to DEPLOY-phone@3x.webp"*.
The gate asserts the whole ship as one equality — the DEPLOY row line is byte-identical to its
predecessor apart from the filename inside `src=""`.

**This block folds into the `.360` checks above — it is the same row on the same screen.**

- [ ] **BUILD: the DEPLOY row still shows its photograph.** If it shows the diagonal hatch, the
      rename broke the reference and the fallback is doing its job by telling you.
- [ ] The other four rows are unchanged.
- [ ] ⭐ **THE CHECK THAT MATTERS FOR THIS SHIP — clear the service worker → airplane mode → hard
      reload → all five photographs still render.** An online browser fetches the new path from the
      network **even if the precache entry were wrong**, so an online eyeball proves nothing here.
      Only the offline pass proves the cache key actually matches the reference.
- [ ] Badge reads **v1.14.361**

⚠ ~~Naming is now MIXED across the set~~ — **resolved in `.362`, which renamed the other four.**

## v1.14.362 — rename the other four banners, convention complete (`917d523`) · rollback: revert commit
**Four more renames, same shape as `.361`.** `phantom-banner-{scan,master,ops,handoff}-1170.webp`
become `{SCAN,MASTER,OPS,HANDOFF}-phone@3x.webp` — all `git mv`, 100% similarity, **zero byte
change to any raster**, all still 1170×403. Owner ruling: *"rename the other four to match"*. The
gate asserts it as four independent equalities: each changed row line is byte-identical to its
predecessor apart from the filename inside `src=""`.

**Folds into the `.360`/`.361` checks — same five rows, same screen. One check matters here:**

- [ ] **BUILD: all five rows still show their photographs.** Any row showing the diagonal hatch
      means *that row's* rename broke its reference — and the hatch tells you exactly which one.
- [ ] ⭐ **CLEAR THE SERVICE WORKER → airplane mode → hard reload → all five still render.**
      **THIS IS THE ONLY CHECK THAT CAN PROVE THE RENAMES.** An online browser fetches every new
      path from the network even if all four precache entries were wrong, so an online eyeball
      **cannot fail here no matter what is broken.** Four paths and four cache keys moved at once.
- [ ] Badge reads **v1.14.362**

**One judgement call, recorded because the ruling didn't cover it:** the pattern read off DEPLOY is
"uppercase the existing stem, keep the suffix" — unambiguous for scan/ops/handoff. **MASTER wasn't:**
its stem is `master`, its row label is **MASTER FILE**, and DEPLOY gave no signal (its stem and
label were identical). Shipped as `MASTER-phone@3x.webp`, preserving the stem. **One line to change
if you meant the label form.**

## v1.14.363 — FIX: MASTER FILE had no exit under redesign (`736a44e`) · rollback: revert commit
**Found by the owner mid-pass.** `rd_openMasterFile()` calls `showPage('master')` raw; `#pg-master`
is a LEGACY page with no per-page back header, and Rule A (v1.14.122) hides `#nav-back-btn` under
`body.rd` — so the surface the MASTER FILE row opens had **zero back affordance**. Fixed with a
`#master-back` header mirroring `#ref-back`, base `display:none`, `body.rd` the only gate.

⚠ **The spec said `showMode('build')`; there is no `'build'` key** (the map is
`{command,work,ref}`, and the function returns early on an unknown key). That would have shipped a
**dead** back button — "no exit" replaced by "an exit that lies". Shipped as `showMode('work')`,
the mode key for the page the nav *labels* BUILD. The gate now asserts the back target's key exists
in `showMode`'s own map, so this cannot silently regress.

- [ ] rd: BUILD → MASTER FILE row → back chevron top-left → tap → lands on the BUILD banner rows
- [ ] `?legacy=1`: `pg-master` unchanged, no `#master-back`, legacy header chevron still works

---
## ✅ BATCH `.355`–`.363` — CLEARED by owner 2026-07-30 ("everything is good to go all ships clear")
**Nine ships cleared in one call.** CALL-0 count cap **RESET** — the next ship opens a new batch at
1 of 6. The `.359` HIGH-risk gate is **cleared**; the coarse-rollback exposure it carried is closed.

**Recorded honestly, same as the `.346`–`.350` clear:** the owner cleared in chat rather than
checking the boxes above item-by-item. The batch ran **three past the cap** (9 of 6) and contained
one HIGH-risk ship, so the exposure is worth naming rather than burying:

- `.359` replaced an entire page's markup. Its per-row and per-cell tap checks were **not reported
  back individually**; the owner reported the page working. If a single row or wall cell turns out
  dead later, **start at `git revert 0c365e5`** — but note that takes the whole banner port.
- `.361`/`.362` moved five served asset paths and five precache keys. The owner ran the offline
  pass, which is the only check that can catch a bad cache key, and reported it good. If a banner
  row ever goes blank offline, `917d523` (four) and `3842fd5` (DEPLOY) revert independently.
- `.363` landed mid-pass and was verified in the same session.

**Advisory judgement calls, all resolved by the blanket clear** (each was phrased "say so if it
reads wrong"; nothing was said, so each stands as shipped — **veto any one and it reverts alone**):
`.352` hero-stage `.14` value · `.355` COMPONENTS card darker than its sibling phase cards
(Option A, card-scoped by design) · HANDOFF's baked workflow text at arm's length, which was the
one thing the §5.5 waiver left open to the device.

**Still open, not part of this batch — each needs its own word:**
- The `.subtab-strip` (Deploy/Scan/Handoff/Issues) **duplicates three banner rows** on BUILD.
  Flagged since `.359`, deliberately never resolved. Which door survives?
- `MASTER-phone@3x.webp` kept the file **stem**, not the row label — `MASTER-FILE-phone@3x.webp`
  if you meant the label form. One line.
- Four orphaned tile icons + their `PRECACHE_URLS` entries, retained not deleted, to fold into the
  same cleanup ship as the 16 pre-existing dead entries.
- The `.359` OPS wall cells carry **no live data** — name + meta only. Binding nine Master
  accessors was scoped out; it is a ship of its own if wanted.

---

# ▶ OPEN BATCH — starts at `.364` (count 1 of 6)

## v1.14.364 — CLEANUP: 20 dead precache entries purged, 4 orphan icons deleted (`bbfcf33`) · rollback: revert commit
**Owner-approved cleanup ship**, run to his method: read-only sweep first, then one commit, nothing
else rides along. `PRECACHE_URLS` 74 → 54 — **228.4 KB** that every cold install was fetching and
storing for nothing. His two figures reconciled exactly: 4 files + 16 entries = the 20 dead entries
found, because the four `.359` orphans still carried entries of their own. **File deletions are
exactly the four he named**; the other 16 files stay on disk, orphaned-but-retained — only their
precache entry went.

**Nothing should look different anywhere. This ship removes only bytes nothing asked for.**

- [ ] Badge reads **v1.14.364**
- [ ] ⭐ **THE REAL CHECK — clear SW → airplane mode → hard reload → then WALK THE APP:** Home ·
      BUILD and all five banner rows · the nine OPS wall cells · TOOLS and its seven cards · the
      platform picker · rack detail. **Every icon must still render.** A wrongly-purged entry is
      invisible online — the network fills the gap silently — so offline is the only way it shows.
- [ ] Any visual change at all is a **bug**, not a feature. Report what changed and where.
- [ ] `?legacy=1` unchanged

**Verified before push:** every asset any consumer references is still on disk AND still precached ·
every surviving entry resolves to a real file · the 4 deletions gone with zero residual references ·
the 16 retained files confirmed present · `dct-ios.html`'s diff is the version stamp ONLY (1 line).

**⚠ Finding, out of scope, NOT actioned:** six PWA install icons / favicons (`apple-touch-icon`,
`icon-192`, `icon-512`, `icon-512-maskable`, `favicon-16`, `favicon-32`) are referenced but have
**never** been in `PRECACHE_URLS` — verified against HEAD, so this predates the ship and is not a
hole it opened. Left alone per "nothing else rides along". Needs its own decision.

**Batch `.364` = 1 of 6.**

## v1.14.365 — OPS WALL LIVE DATA (`bbebf7c`) · rollback: revert commit (wall returns to static labels, doors intact)
Owner ruled SHIP-BUILD-BANNER-ROWS-SPEC §8 IS the spec, releasing the block. Nine cells now read
their tool's real store on every open, with an explicit marker when there is nothing.

- [ ] Badge reads **v1.14.365**
- [ ] BUILD → tap **OPS**: wall opens as before, each cell now carries a readout line under its label
- [ ] ⭐ **ALL NINE CELLS STILL TAP THROUGH.** A readout must never cost a door — this is the one
      check that matters most, because the nine doors were the whole point of `.359`
- [ ] Cells with data show a count; cells without show a **dimmed marker, never a blank**
- [ ] With no Master loaded: **RACK MAP** reads `NO MASTER` · **PORT MAP** always reads `PASTE TO RUN`
      (it is a paste-and-validate tool — it has no store and never will, so that is correct, not a bug)
- [ ] Load a Master → re-open the wall → cabinet count appears **with no reload** (reads on every open)
- [ ] Cell height unchanged — the wall must not have grown taller (value line was sized to fit the
      existing 88px floor; if rows moved, that calculation was wrong)
- [ ] `?legacy=1` unchanged

**Where each number comes from** (only RACK MAP is Master-backed — the rest read the store belonging
to the tool that cell opens): RACK MAP → `racksByCab` · SOPS → SOP library · OPTICS → scan inventory ·
BURNDOWN → jobs, `!archived` · AUDITS → audits · MANIFEST → deployments (active/paused/complete) ·
BLAST → active deployment's racks via the scoped `.350` door · BOM → IndexedDB (async, paints `—` then
resolves) · PORT MAP → no store by design.

**Verified before push:** 76 mechanical checks green (three-stamp lockstep · 4 inline JS blocks + sw.js
compile · 12 style blocks balanced · `ops-cell` still exactly 9 · all nine handlers byte-unchanged ·
exactly 3 files touched) **plus a functional smoke test** running the shipped code against stub stores
in three scenarios — cold (nine non-blank markers), loaded (correct counts, correct singular/plural,
draft deployments excluded), hostile (three sources throwing → each degrades alone, unaffected cells
stay correct, failures warned not swallowed).

**Batch `.364`–`.365` = 2 of 6.**

<!-- append new ships above this line — checkpoint at 6 deep or before any HIGH-risk ship -->
