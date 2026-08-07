# BATCH-VERIFY — consolidated device checklist (CALL 0, DIRECTIVE 2026-07-06)
**Protocol:** ships stack; owner runs THIS list once per batch (cap: every 6 stacked ships or before
any HIGH-risk ship). Every ship keeps its own rollback line. Claude Code appends; owner checks off.
**Batches .192-.197, .198-.201, .202-.212, .213-.214, and .215: RELEASED by owner (.202-.212 verified 2026-07-08; .213 boot plate + .214 deploy-tap FIX verified 2026-07-09; .215 crash-log hardening verified "all good" 2026-07-09). Batch .340-.345: RELEASED 2026-07-23 ("340-345 good") — cleared the 6-ship count cap and the MASTER FULL-INGEST HIGH-risk prereq. Batches .346-.350 (CLEARED 2026-07-24) and .351-.354 (CLEARED 2026-07-25) followed. **Batch .355-.363: RELEASED by owner 2026-07-30 ("everything is good to go all ships clear") — nine ships, three past the cap, incl. HIGH-risk .359 (BUILD banner rows). Cap RESET. Batch .364-.370: RELEASED by owner 2026-08-03 ("all good") — seven ships, one past the cap, incl. the .366 two-device pass and the .370 offline pass. Cap RESET. Batch .371-.375: RELEASED by owner 2026-08-04 ("all good") — five ships, cap RESET (detail at the `.375` block).** · Clear SW cache before the pass.

**⛔ HEADER RECONCILED 2026-08-06 — read this line, the two above it went stale.** This line had still
read "CURRENT BATCH: OPEN, .371-.372 (2 of 6)" long after that batch was released. **Two batches are
open right now, 25 ships between them:**

- **`.377`–`.384` (8 of 6) — device pass RUN, FAILED, never formally released.** The consolidated pass
  was run and it failed on the Build surface; `.385` records the finding: *"the device-verify failure
  was NOT a mis-mounted renderer, a wrong host, a bad gate or a cache. The Phase 2 Build workspace had
  never been built."* Cause understood and answered by the `.385`–`.396` arc, but **no release is on
  record** — the remaining boxes in those eight blocks were never checked off. Owner's call whether
  the arc supersedes them or they still need a pass.
- **`.385`–`.404` (20 of 6, contains the M2 renderer work — HIGH-risk) — OPEN.** Reconstructed
  block at the end of this file. **Cap blown by 14. Nothing should ship after `.404` until it clears.**
  (`.402` is an owner-directed correction made during verify, not new scope — it stays in this batch.
  `.403`/`.404` likewise: an owner-directed instrument and the regression fix it pointed at.)

⛔ **THE BATCH CANNOT BE RUN RIGHT NOW — the last two ships have never been served.** `main` is at
**`v1.14.404`**; the live URL is still serving **`v1.14.402`**. `.403` and `.404` are committed and pushed,
and every Pages deploy for them died during a GitHub platform incident (Actions + Pages `major_outage`) —
`build` green every run, `deploy` cancelled/failed every run. **Not a code fault.** The pass starts when the
live `version.json` reads `phantom-v1.14.404`, and not before. Detail in the `.404` block.

**✅ RESOLVED 2026-08-06 — the item that was blocking both batches is answered.** `.396` claimed the eight-ship
blank-rack arc closes; the owner confirmed **"rack draws"** against `v1.14.401`. **The `.389`→`.396` arc is
CLOSED** and the four ships that had stacked behind that silence are unblocked.

**What that pass does NOT cover, stated so nobody reads it as a batch release:** it establishes that the rack
RENDERS. Everything else in both batches is still unverified — in particular the `.401`/`.402` attachment
behaviour (single-entry transfer on Open Aisle, pause/resume on leaving Build, ×10 Build entries), which a
drawing rack does not establish, and the `?legacy=1` half of `.402`.

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

## v1.14.366 — OPS WALL CELL ART, BOTH SHELLS (`b5b8a9a`) · rollback: revert commit (cells return to flat tint, doors + readouts intact)
The nine wall cells now carry their tool raster behind the content. **⚠ TWO-DEVICE VERIFY — this is
the first ship in the batch whose correctness differs by shell.**

- [ ] Badge reads **v1.14.366**
- [ ] **iPhone 390px:** nine cells show art *filling* the cell behind the labels · every label legible
- [ ] **Laptop shell:** nine cells show the **WHOLE icon, centred and sharp** — NOT a cropped
      horizontal band. If you see a band, `--tfit` is not reaching the desk block
- [ ] ⭐ **ALL NINE CELLS STILL TAP THROUGH, both shells.** Art must never cost a door
- [ ] Cell height unchanged in both shells — **no growth, no reflow**. The wall must sit exactly
      where it did in `.365`
- [ ] `?legacy=1` unchanged

**If a label is marginal over art:** the lever is that shell's `--veil-b` (bottom alpha), **and only
that shell's** — the two shells declare their own veil values precisely so tuning one cannot move the
other. Phone base is on `.opswall`; desk is in the `@media (min-width:640px)` block. Both start at
`.55` top / `.85` bottom. Text legibility wins over art visibility, no exceptions.

**Why the fit differs by shell** (recorded so it is not "tidied" into one rule later): the cell is
**3.95:1 on desk** (348×88 at a 1280px viewport) while every source raster is **1:1**. Under `cover`
that fills the width then discards **75%** of the icon's height. It is an *aspect* problem, not a
resolution one — a 512 master would only have made the cropped band sharper. Phone keeps `cover`
because at 107×88 it still shows **82%** of the icon and filling the cell reads better there.

**Verified before push:** 62 checks green — wall confirmed **ONE shared markup block** (no second
block to half-ship into) · all nine rasters present on disk · all nine **already precached**, so
`sw.js` changed by the cache version *alone* (asserted as a 1-line diff) · `ops-cell` still exactly 9 ·
all nine doors and every text child byte-unchanged · `min-height` untouched · `DEPLOY_TOOLS` untouched.

**Batch `.364`–`.366` = 3 of 6.**

## v1.14.367 — ART DROP: 9 curated OPS wall rasters, final bytes (`5d16f6b`) · rollback: revert commit (restores the 9 previous rasters + stamps together)
Asset-only. `.366` wired the cells; the files behind them were stale bytes from **three** eras
(`.160` / `.185` / `.319`), so the wall was rendering a mix of two generations. All nine replaced.

- [ ] Badge reads **v1.14.367**
- [ ] ⭐ **THE SW MUST TURN OVER FIRST — nothing here is visible until it does.** Fully **quit** the
      PWA (swipe it out of the app switcher, *not* background it) and relaunch. The first launch
      after a ship routinely still serves the old cache. **Filenames did not change, so the cache
      bump is the ONLY thing pushing the new bytes** — an unchanged URL with changed bytes is served
      from the old cache indefinitely
- [ ] ⛔ **Do NOT "Clear History and Website Data" to force it** — that wipes `localStorage`: the
      Master file, every deployment, SOP, audit and optic record. Removing/re-adding the PWA is the
      same hazard. The cache bump lands on its own
- [ ] **AUDITS** and **BURNDOWN** first — they carried the oldest stale vintage, so the before/after
      is clearest there
- [ ] All nine cells still **tap through**. Art must never cost a door
- [ ] Both shells: phone art **fills** the cell · desk shows the **whole icon**, centred and sharp
- [ ] `?legacy=1` unchanged

**Verified before push:** 48 checks. Each of the nine base64 blocks was decoded in memory and checked
on **three independent axes** — exact byte length, sha256 against the drop's per-file checksum, and
RIFF/WEBP magic (bytes that decode cleanly are not necessarily a WebP). All 27 passed *before*
anything was written. Nothing generated, substituted or modified.

**Extra check the drop did not ask for — all nine confirmed 256×256, 1:1.** `.366`'s per-shell fit
was *derived* from a square-source assumption; a render arriving at a different aspect would have
required re-deriving that ruling rather than inheriting it. They are square, so `cover`/`contain`
stands and **no CSS changed**.

Net the icon set got **~47 KB smaller**. Zero files were already identical — genuinely new art.

**Batch `.364`–`.367` = 4 of 6.**

## v1.14.368 — ART-FIRST OPS WALL TILES (`fcf4843`) · rollback: revert commit (restores the veiled treatment, doors + bindings intact)
Owner ruling: **the render IS the tile.** Veil, accent wash, accent dot and the decorative subtitle
are all gone; text collapses to a corner block, bottom-left.

- [ ] Badge reads **v1.14.368** (fully quit the PWA and relaunch first)
- [ ] ⭐ **STAND-BACK TEST:** the wall should read as **nine finished renders with quiet corner
      labels** — not nine labels with art leaking through
- [ ] Cells are **square** and the wall is **taller than in `.367`**. That is the intended layout
      change, *not* a regression
- [ ] Corner block = **title (accent) + live status only**. The old subtitles (Parts, Gear, Cabling,
      Elevation, Procedures, Progress, Serials, Power map, Fiber · MPO) and the accent dot are gone
- [ ] Live values still correct and still update on each open — `NO MASTER`, `PASTE TO RUN`,
      `SCAN TO SEED`, counts. Only their **position** changed
- [ ] All nine cells still **tap through**, both shells. Art must never cost a door
- [ ] Both shells (phone + laptop)
- [ ] 👁 **Watch OPTICS** — it has bright slabs bottom-left exactly where the corner text now sits.
      If its status line fights the render, that **one cell** gets a text-shadow nudge. **Never** a
      gradient over the art, and never a wall-wide change
- [ ] `?legacy=1` unchanged

**⚠ Geometry note carried forward, checked not assumed:** the wall lives inside `.opsbody`, a
`max-height` collapsible. Square cells make the widest shell **1080px tall against a 1200px
ceiling** — it fits, with **120px headroom**, and the gate now asserts this every ship. It was *not*
raised (that changes the open animation, and the spec barred out-of-scope edits), but the margin is
thin: **widening `#work-grid` in future would clip the wall silently.**

**Verified before push:** 55 checks. Four initial failures were all *gate* bugs, not ship bugs, and
both of the same kind as [[feedback_grep_c_counts_lines_not_uses]] — `--tfit` still appeared in the
comment explaining its own removal, and `Parts`/`Gear`/`Elevation` are live labels **elsewhere** in
the app (a Ref subtab, a table header, a Master button). Checks now test declaration-and-usage and
scope the subtitle sweep to the wall block.

## v1.14.369 — OPS wall rasters re-cut at 384 (`PENDING`) · rollback: revert commit (assets only)
- [ ] Badge reads **v1.14.369** — ⚠ **fully quit the PWA and relaunch.** Filenames did not change,
      so the `CACHE_VERSION` bump is the *only* thing pushing these bytes. A soft reopen serves the
      old cache and will read as a failed ship
- [ ] ⭐ **STAND-BACK TEST:** seven tiles — BOM, MANIFEST, RACK MAP, SOPS, BURNDOWN, AUDITS,
      OPTICS — are **visibly sharper** than in `.368`
- [ ] ⭐ **PORT MAP and BLAST are visibly SOFTER by comparison.** That contrast is the *proof* the
      swap landed. Both are **known gaps, not defects** — PORT MAP still carries the 1024 JPEG
      placeholder (family-style regen prompt is open), BLAST still carries
      `phantom-tool-power-256.webp` (no family-style BLAST render exists yet)
- [ ] Layout is **unchanged** — cells still square, wall still the same height. This ship moved
      raster bytes only: no markup, no CSS, no precache edit
- [ ] All nine cells still **tap through**, both shells. Art must never cost a door
- [ ] Live values still correct and still update on each open (`NO MASTER`, `PASTE TO RUN`,
      `SCAN TO SEED`, counts)
- [ ] Both shells (phone + laptop)
- [ ] 👁 **Watch OPTICS again** — the `.368` note stands, and the re-cut raises slab detail exactly
      where the corner text sits. If its status line now fights the render, that is a **one-cell**
      text-shadow nudge. **Never** a gradient over the art
- [ ] `?legacy=1` unchanged

**Owner ruling this ship implements:** *"384, ship it as .369."* Sizing was derived, not guessed —
`.368` squared the cell, the wall is `repeat(3,1fr)` with 8px gap inside 10px padding, so a cell is
**~108px CSS at a 390pt shell = ~324 device px at 3x**. The live 256 rasters were under-resolved by
roughly a quarter. Source renders are 1254².

**Two items carried, both owner calls, neither blocking:**
1. **PORT MAP regen** — the drop ships a family-style prompt (`PORTMAP-REGEN-PROMPT.md`, sha256
   `470ff9e4…`). On arrival it replaces the placeholder.
2. **NAMING DEBT** — the files keep their `-256` suffix while carrying **384px** content. Renaming
   means fourteen reference edits across `dct-ios.html` and `sw.js` PRECACHE for zero user-visible
   gain and real orphan-reference risk, so it was **not** taken on unasked. Rule as its own pass.

**Verified before push:** three-stamp lockstep 3/3 · `node --check` ×3 on `sw.js` + 4 inline script
blocks parse · CSS braces 4197/4197 balanced · surgical diff (1 line `dct-ios.html`, 1 line `sw.js`,
4 lines `version.json`, 7 binary swaps) · no line-ending damage · all 7 confirmed **384×384** in the
repo · all 9 tiles already in PRECACHE, so no `sw.js` list edit was needed · drop integrity
**sha256 12/12** against its own manifest. Encoded sharp 0.35.3 / libwebp 1.6.0 at
`quality 82 / alphaQuality 95 / effort 6` — the drop's locked `cwebp -q 82 -alpha_q 95 -m 6` knobs.
Precache cost +88KB (~124KB → ~212KB across the seven).

## v1.14.370 — OPS tile filenames renamed `-256` → `-384` (`PENDING`) · rollback: revert commit
- [ ] Badge reads **v1.14.370** (fully quit the PWA and relaunch)
- [ ] ⭐ **THE REAL TEST IS OFFLINE.** Relaunch online once so the new SW installs, then go
      **airplane mode and reopen.** All nine OPS wall tiles must still render. A missed reference
      404s to a blank tile **here and only here** — online, the network silently serves the new
      path and hides the bug
- [ ] Ref grid → **OPTICS card art renders** (that card is a real `<img src>`, the only one of the
      seven that is not a `--tim` background — the easiest ref to miss)
- [ ] Deploy tool grid: **no blank or broken tiles** (the `DEPLOY_TOOLS` table carries 7 of the 22)
- [ ] All nine wall cells still **tap through**, both shells
- [ ] Art itself is **unchanged from `.369`** — same pixels, new filenames. If a tile looks
      *different*, something re-encoded and that is a defect
- [ ] `?legacy=1` unchanged

**Owner ruling this ship implements:** *"rename them to -384."* Closes the naming debt `.369`
accepted and flagged.

**Why it could not ride on `.369`:** a rename changes a served **path** *and* a **precache key**.
Without its own three-stamp bump, an old-SW client keeps requesting the `-256` URL and 404s —
**an offline-only break that is invisible online.** Own version by rule, not preference.

**⚠ The sweep found more than `.369` estimated.** `.369`'s note said fourteen reference edits. The
real count is **22 across THREE consumers** — the two missed were the **`DEPLOY_TOOLS` table**
(7 `img:` fields, ~L28393–28407) and the **Ref-grid OPTICS card** (~L13397). Per file:
`dct-ios.html` 15, `sw.js` PRECACHE 7. This is exactly why the standing rule says check *every*
consumer, not just the one you already know about.

**NOT renamed, deliberately:** `phantom-tool-portmap-256.webp` and `phantom-tool-power-256.webp`.
Both really *are* 256 — PORT MAP is still the placeholder, BLAST still has no family render — so
their names are already honest. The other 40 `-256` files on disk are untouched.

**Verified before push:** dynamic icon paths **ruled out first** (grep for template-literal and
concatenated paths returns empty, so a literal sweep is provably complete) · lockstep 3/3 ·
`node --check` ×3 + 4 inline blocks · CSS braces 4197/4197 · **orphan check CLEAN BOTH DIRECTIONS**
across `dct-ios.html`/`sw.js`/`index.html`/`forge.html`/`manifest.json` — 7 files on disk, 7
distinct refs, no orphan file and no dangling ref · all 7 in PRECACHE · byte-length unchanged by
construction and CRLF count asserted equal before/after · **git recorded all seven as pure renames
with zero byte change**, proving the art did not re-encode.

**Docs left alone on purpose:** `design/SHIP-RACKS-IS-THE-DOOR.md` and `INTEGRATION-STATE.md`
2500/2554 still say `-256`. They record what was true at those ships and are corrected *forward*
by this entry, not rewritten.

**✅ Batch `.364`–`.370` = 7 of 6 — RELEASED by owner 2026-08-03 ("all good"). All seven verified in
one consolidated pass, including `.366`'s two-device check and `.370`'s offline (airplane-mode)
check — the one that proves no reference was missed in the `-256`→`-384` rename. CAP RESET; the
next ship opens a fresh batch at 1 of 6.**

## v1.14.371 — SHIP 4: `.tile` state family retokenised (`35e6a29`) · rollback: revert commit
- [ ] Badge reads **v1.14.371** (fully quit the PWA and relaunch)
- [ ] ⭐ **Complete a build step** → tile fill, underline, LED **and the card glow** all read **TEAL**.
      No green anywhere on the tile
- [ ] ⭐ **Block a step** → LED, border, **fill and underline** all read **MAGENTA**. No red
- [ ] An **in-progress** tile still reads **CYAN**, unchanged — `is-active` was already correct and
      was deliberately not touched
- [ ] PORT MAP tile accent matches the OPS wall (both teal); no green left in the Deploy tool grid
- [ ] **EXIT still reads RED** — `.317` exception survives this ship
- [ ] `?legacy=1` unchanged

**⚠️ MY STEP-0 INVENTORY WAS WRONG — worth reading, it nearly shipped a defect.** The `.tile` family
is **13 sites, not the 6** Step 0 catalogued. The first pass fixed the 6; a residual-token assertion
inside the block then flagged **7 more** — a second `.tile.is-blocked` border rule, the blocked
**fill** and blocked **underline**, `.tile-flag`, both `.tile-pip` states, and
`body.rd .tile-active-hdr .blk`. Both Step-0 greps were shaped by symptoms already seen: one filtered
for `box-shadow` (these have none), one for literal hex (these use `var()` tokens). Shipping on that
inventory would have produced **a blocked tile with a magenta LED and border sitting on a red fill
and underline** — visibly half-migrated, worse than not shipping. Caught because the assertion tested
the BLOCK for residual tokens rather than confirming the planned edits applied. **Lesson: assert the
absence of what must be gone, not just the presence of what you changed.**

**Two traps this ship was built around:** (1) every glow is a hard-coded `rgba()`, not a `var()` —
changing the token alone leaves a green glow under a teal fill, so both halves moved on every line.
(2) **Two different reds were in play** — `.tile.is-blocked` used `rgba(255,45,85)`, *not* the
`#ff453a` found elsewhere; a pattern-match on `#ff453a` would have missed the family entirely.

**Rule 7 checked, not assumed:** `.tile` is not `body.rd`-scoped, so legacy leak was a real risk. The
three emitters (`#tt-deploy`/`#tt-scan`/`#tt-handoff`) were confirmed inside `#pg-cmd`, routed via
`cmd_route()` — redesign house only.

## v1.14.372 — OPS wall unify @ 384 (`e81a766`) · rollback: revert commit
- [ ] Badge reads **v1.14.372** (fully quit and relaunch — four of the six filenames are unchanged,
      so the cache bump is the only thing pushing those bytes)
- [ ] ⭐ **OFFLINE PASS REQUIRED — two stems were renamed** (`portmap`, `power`, `-256`→`-384`).
      Relaunch online once so the SW installs, then **airplane-mode and reopen**: all nine tiles must
      still render. A missed reference 404s to a blank tile *there and only there*
- [ ] ⭐ **WALL TEST: nine renders, one photographer, one resolution.** No tile should look like it
      came from a different set
- [ ] ⭐ **PORT MAP and BLAST are no longer the soft ones** — they were the placeholder and the
      no-art tile through `.371`; they should now match their neighbours
- [ ] Watermark zones clean: bottom-right of **PORT MAP / OPTICS / BURNDOWN**, bottom edges of
      **BOM / BLAST**
- [ ] All nine cells still tap through, both shells. Art must never cost a door
- [ ] `?legacy=1` unchanged

**Closes N-08 (PORT MAP family regen) and N-09 (BLAST art)** — both blocked on art since 2026-08-01.
The wall no longer carries a placeholder.

**Verified before push:** all six decoded from base64 and **sha256-matched the package manifest**,
then confirmed **384×384 RIFF/WEBP**, before anything was committed · ref counts asserted per file
before writing (2 in `dct-ios.html`, 1 in `sw.js`, per renamed stem) · old `-256` files `git rm`'d,
not orphaned · **orphan check CLEAN BOTH WAYS** across all five consumers — 9 tiles, 9 refs · stamps
3/3 · `node --check` ×3 · CSS 4197/4197 · CRLF and byte-length preserved.

**The `.369` package was refused first, and correctly** — it targeted `-256` names that `.370` had
renamed, asked to stamp an already-shipped version, and would have reverted the 384 ruling. Both of
the re-issued package's own gates fired as designed on the two stems that were still 256.

---

## v1.14.373 — Ship 5: channel retokenise (`e2f930d`) · rollback: revert commit
- [ ] Badge reads **v1.14.373**
- [ ] **MANIFEST**, active deployment: the **VERIFIED** pill and the meta block's **left rail** read
      teal, not green
- [ ] **DISCREPANCY sheet**: `DRAFT`/`READY` status, the **HIGH** severity chip when active,
      **Save Discrepancy**, and the photo **Remove** button — HIGH and Remove read **magenta**,
      Save reads **teal**
- [ ] ⭐ **PRESS TEST — this is the ruling that was folded in mid-ship.** Press and *hold*
      **Save Discrepancy** and the photo **Remove** button. The flash underneath must be **teal**
      and **magenta**. Any green or red frame, even for a moment, means a press state was missed
- [ ] **RESOLVE a discrepancy**: resolved eyebrow, **Mark Resolved** button, and the resolved-note
      rail all read teal
- [ ] **BLOCKER launcher** (deploy tools row): text, border **and the icon glyph** all magenta — the
      glyph is a separate hard-coded hex passed as a JS argument, so it can miss independently of
      the text. Tap it and confirm `blocker_quick` still opens
- [ ] ⛔ **EXIT and BLAST must still be RED.** Either one turning magenta is a **P0 revert**
- [ ] `?legacy=1` unchanged

**Scope, stated honestly: 10 of the 25 edits change nothing on screen.** The entire `.rd-` half of
the fence has **zero emitters** — every apparent one was a *substring artifact* (`rd-` matches
inside `card-`/`board-`, so `bp-card-status` and `disc-card-row` read as `rd-status`/`rd-row` under
a naive grep). Those lines are on-palette if ever wired. **The 15 that render are exactly what the
checklist above walks.** Nothing else should have moved.

**Owner ruling captured mid-ship:** three `:active` press states sat inside the standing
"all press states stay" fence, but each paints its *own* base rule's channel — leaving them would
have flashed the old colour under a gloved thumb. Ruled in, 22 → 25 sites. The blanket fence still
holds wherever the base rule is not moving.

**Verified before push:** stamps 3/3 · **4/4 inline script blocks compile** (`vm.Script`) ·
`sw.js` `node --check` OK · `version.json` valid JSON · **CSS braces balanced across all 12 style
blocks** · line endings unchanged (repo is all-LF at HEAD; `core.autocrlf=true` explains git's
warning) · diff **exactly 26/26** `dct-ios.html` (25 sites + stamp), 1/1 `sw.js`, 3/3
`version.json` · EXIT/BLAST confirmed **absent from the diff** · zero `!important` rules touch any
of the 15 live selectors, and both `body.rd` overrides lose on specificity or paint a different box.
⚠ **Agents were barred this session — `phantom-ship-gate` and `phantom-rd-reviewer` were NOT
invoked;** the gates above were run inline in their place.

**Residue declared, not done:** red/green is *reduced, not eliminated*. Thirteen sites outside this
fence still carry it (canvas `strokeStyle` L19090 · severity data L22166/22174 · issue chips
L22245/22247/22578/22616/22619 · BLOCKED display L32771 · advance-phase L35861 · `gx-green`
L8807/L32645 · qa-icon L13491 · inline L30892 · **`.bp-card-status.complete` L9731, which is
semantically the *complete* channel and should be teal**). All need a ruling.

**Correction to `SHIP4-STEP0-FINDINGS`:** it listed the `.rm-*` legend and type bars as green
breaches. **They are not.** `TYPE_COLORS` (L43227) is a nine-colour **type-identity** vocabulary —
green means *Server*, `#ff2d55` means *UPS*. Different taxonomy from the state channel, under
**RACK SCENE LOCK**. Forcing Server→teal would collide with `storage:#00bcd4` and break
legend-to-faceplate agreement. Left locked, deliberately.

---

## v1.14.374 — no silent failure on boot entry (`6e514c5`) · rollback: revert commit
- [ ] Badge reads **v1.14.374**
- [ ] ⭐ **TAP TO ENTER still enters normally** — cold launch AND relaunch. This is the only check
      that really matters; everything else here is the failure path
- [ ] Hint still reads **ENTERING…** during the dive, exactly as before
- [ ] ⛔ **`ENTRY FAILED — RETRY` must NEVER appear in normal use.** If you see it entering the app
      normally, that is a **regression — revert**
- [ ] `?legacy=1` unchanged

**What changed:** the tap handler swallowed its throw and silently reset, so a real failure looked
exactly like a missed tap — that is what cost the audit on 2026-08-03. Now: the bind guard warns
which element was missing, a new `bootFail(e)` warns the real error, and the splash *says* it
failed. `throw 0` replaced with a real `Error`. **Four lines + one helper, all inside the existing
`.64` IIFE.** No change to `fire()` structure, timings, the reduced-motion branch, the
`pe-dive`/`pe-flash` sequence, `launch()`, or any CSS.

**Visible text, not just a log — deliberate:** there is no console in a cold aisle. `phantomToast`
was rejected because the splash is a fixed full-screen layer and a toast under it is unverifiable.
20 chars, `inline-block` in a centred block with 26px padding → wraps, never overflows (Rule 1
holds at 320px).

**Correction carried from the audit:** I claimed a precache 404 would make `cache.addAll()` reject
and block install. **Not true for this SW** — v1.6.29 already moved to per-URL `cache.add()` under
`Promise.allSettled` for exactly that reason.

**Verified before push:** stamps 3/3 · 4/4 inline blocks compile (`vm.Script`) · `sw.js`
`node --check` · valid JSON · CSS brace delta **0** across 12 style blocks · all-LF preserved ·
diff **-4/+15** `dct-ios.html`, 1/1 `sw.js`, 3/3 `version.json`. ⚠ Agents barred — ship-gate and
rd-reviewer NOT invoked; equivalents run inline.

**Batch `.371`–`.375` = 5 of 6 — ✅ RELEASED by owner 2026-08-04 ("all good").** All five verified
in one consolidated pass, including `.374`'s boot-path front door, `.372`'s offline check, `.373`'s
press test, and both of `.375`'s INVERTED checks (EXIT still red, CRAC still green). **CALL 0 cap
RESET — next ship opens a fresh batch at 1 of 6.**

## v1.14.382 — COMMAND SHELL PHASE 1, behind `?cshell=1` (`2b250b4`) · rollback: revert the five-commit range `2c2f831..2b250b4`

Spec **6.3 / 6.4 / 8.1–8.7** under a new shell root `body.rd.cshell`. Five commits, one per plan task.

**The scoping is the whole safety story.** Every rule that paints is `body.rd.cshell`-scoped, the markup
is `display:none` by default, and the class is added only when `?cshell=1` is in the query string.
**The flag is NOT persisted** — `cshell_isOn()` reads `location.search` and never writes storage,
because a sticky preview is exactly the trap `.380` had to ship a way out of.

**Three plan corrections made during the build, each verified before acting:**
1. Brand mark is `phantom-prism.png`, **not** `phantom-shield-256.webp` — the plan named the
   overflow-menu button glyph, whose own inline comment reads *"site-node art; filename is legacy
   (was shield)"*. The prism is existing approved art, already precached, referenced by nothing until
   now, and is the header mark the redesign campaign already earmarked. Painted as a **CSS background**
   so a hidden shell never fetches it — the dead-weight class `.381` just purged.
2. Microbar text is `var(--slate)`, not `--slate-dim`, whose `:root` comment says **NEVER text**.
3. The site-health dot is **not** hardcoded healthy. `cmd_setSiteLabel` already has two states and can
   render SET UP PROFILE; a mint dot over that text would be a lie the aisle cannot see through.
   Confirmed → `var(--ok)` mint · unconfirmed → `var(--gold)`.

**Two defects found by the in-browser pass, not by eye:**
- Hero radius rendered **20px, not the spec's 26px** — `.cs-hero` is also a `.cs-card`, and the card
  rule carried `#cmd-shell` while the hero rule did not, so the card's radius out-specified it and the
  spec value lost silently. Hero selector now carries the id.
- The hero's bottom scrim faded out at 42%, landing the fade edge **exactly on the KPI row** — the three
  cards sat half on scrim, half on the bright GPU tray, borders washed. Moved to 58%. Overlay only.

**`!important` was NOT shipped on `.cs-card`, and that is verified rather than omitted.** The plan called
it required to beat the `.310` SURFACE-GLOW block. It is not: that block forces fills on a **named**
selector list (`.nba/.stat/.tile/.spill/.gx*`), and a sweep of every `!important` background/border rule
in the file found **zero** whose selector can reach a brand-new class. Confirmed in devtools — the
computed `background-image` is the 145deg gradient.

**No fake data.** The hero renders from the values `cmd_render` already computes for the NBA and the
telemetry tiles (`activeDep`/`activePct`/`rackCount`/`blockerCount`); no new data source. Values are
written with `textContent`, never interpolated into `innerHTML`. Empty state **removes** the progress
bar rather than showing 0% — a zero bar reads as started-and-stalled. The microbar's right slot carries
the real wall clock; the mock's *"Shift 01"* was **not** reproduced because no shift-number concept
exists and inventing one is fake telemetry.

**Verified before push:** stamps 3/3 · 3/3 inline blocks compile (`vm.Script`) · `sw.js` `node --check` ·
valid JSON · CSS brace delta **0** · all-LF preserved · whole-range deletions are **only** the version
stamp and the `cmd_setSiteLabel` body (a strict superset of its old behaviour) · no precache change.
**In-browser at 390×844:** bare URL has no `.cshell`, shell computes `display:none`, `.cc-z0` still
`flex`; with the flag, hero 343px, CTA 49px, padding 0/14/118, `scrollWidth === innerWidth`.
⚠ Agents barred — ship-gate and rd-reviewer NOT invoked; equivalents run inline.

**DEVICE-VERIFY — the bare URL is the most important check.** (1) badge reads `v1.14.382`. (2) **Bare URL
must be visually identical to `.381` on every page** — if anything moved, the scoping leaked.
(3) `?legacy=1` unchanged, RETURN TO NEW UI still works. (4) Add `?cshell=1` on Command: prism mark,
PHANTOM / FIELD INTELLIGENCE SYSTEM, site pill, lock microbar, deployment hero; the old site/status band
gone, the top app header still there **on purpose** (it carries the version badge and SW pill this verify
reads — Phase 2 re-homes them). (5) **The hero crop needs your eyes** — art is 1170×403 in a ~square box,
so `cover` shows about a third of its width at 78%. A bad crop is a `background-position` tune, not a
revert, and needs no recut. (6) Empty state must read *No active deployment* with **no** progress bar.
(7) Unconfirmed profile → **gold** dot, not mint. (8) Zero horizontal overflow at 390 and 430.
(9) Remove `?cshell=1` and reload — the shell must **vanish**, proving the flag did not stick.

**⛔ BATCH `.377`–`.382` is now 6 of 6 — CALL 0 CAP REACHED. Consolidated device pass required before
the next ship.**

## v1.14.383 — COMMAND SHELL DESKTOP (`52fb96d`) · rollback: revert commit (mobile was never touched)

Owner on device: *"the desktop layout is still behaving like a stretched mobile interface."* Correct — `.382`
shipped only the phone composition, so at desktop the shell had no rules of its own and inherited the legacy
Command layout. Desktop is now a **separate composition** per spec §9: 246px persistent left nav, 76px topbar,
three-column dashboard with the hero spanning two rows, three-column lower grid, **no bottom nav above 851px**.

**All artwork existing and approved**, each confirmed on disk AND in `PRECACHE_URLS` before use. Both documented
naming traps honoured: **BLAST is fed by the POWER raster, OPTICS is a `ref-` file.** Items with no approved
icon use a two-letter mono token rather than a substitute icon. Every control routes to an existing door.

**Five defects found by the in-browser pass, not by reading.** The load-bearing one: the legacy desktop rules
target `#cc-center` **by ID** (two ids), out-specifying any class-scoped shell rule — the shell was trapped in a
226px grid row with legacy content overlapping it. Also: `.page` is `position:absolute;inset:0` so padding on
`.main` moved it zero pixels; `cs_renderReady` sat behind two early returns and silently never ran on cold start;
Field Ops spans ran together on one line; readiness warn dots targeted the wrong class so every OPEN gate showed
a healthy mint dot.

---

## v1.14.384 — HONEST NAMING + SCOPE-FREEZE VERIFICATION (`PENDING`) · rollback: revert commit

Owner froze the batch: no new features, correct the defects, prove no desktop styling leaks into the phone.
**This ship adds no features.** Three corrections, then the owner's seven-step verification end to end.

1. **The panel name was dishonest.** *Site Health* implied facility/power/cooling/fabric telemetry PHANTOM does
   not receive and has no path to receive. Now **LOCAL SYSTEM STATE**, captioned in-panel *"Read from this device.
   PHANTOM receives no facility telemetry."* Rows are only what the app genuinely knows locally. **Zero** power,
   cooling, fabric or infrastructure rows exist anywhere in the shell region (verified by grep, not by eye).
2. **Readiness is transparent and clearly local.** Still four real gates, still no hardcoded 82%. The summary now
   reads as a **count** — *"N of 4 ready"* — because a count reads as a calculation rather than a monitoring
   readout, and the panel is captioned *"Calculated on this device from the four gates below."* Every gate shows
   its own OK/OPEN so the number can be checked against its inputs.
3. **The flag accepts both spellings.** The owner's verification order says `?shell=1`; the ship said `?cshell=1`.
   `cshell_isOn()` now accepts either. A flag that silently does nothing on the URL someone actually types is a
   guaranteed field failure. Still non-persistent either way.

**Hardening:** the `.cs-dpanel` hide was scoped to `body.rd.cshell`, so the desktop-only panels relied on
`#cmd-shell` being `display:none` to stay hidden on the bare URL. That worked by inheritance rather than on their
own terms — correct-by-accident is not correct. Now unscoped.

**SEVEN-STEP VERIFICATION — ALL PASSED, MEASURED:** (1) phone at `?shell=1`, all six desktop panels + both chrome
elements `display:none`. (2) Command Deck unchanged from `.382` — hero 334×343 @26px, 20/18/17 padding, shell
362×634 @0/14/118, bottom nav + app header + phone header + microbar present, `#pg-cmd` still `flex` at `left:0`,
zero overflow. (3) **851 boundary clean both sides** — at 850 full mobile with bottom nav and `left:0`; at 851 full
desktop compact, 82px rail, no bottom nav, `left:82px`. No bleed either way. (4) 1200/1440 — 246px sidebar, labels
visible, grid `minmax(520,1.55fr)/minmax(300,.8fr)/minmax(270,.68fr)`, lower `1.1/1.1/.8`, bottom nav `none`.
(5) Bare URL clean, legacy Command layout untouched at `display:grid`/720px/`left:0`; `?legacy=1` clean, body class
empty, every shell element `none`, RETURN TO NEW UI present. (6) Command→Build→Tools→Command all route, sidebar and
topbar persist at 246px on every page, bottom nav hidden throughout, active item follows, panels re-render, 6 tool
tiles, **zero console errors**. (7) No new feature started.

**⚠ ONE FALSE ALARM WORTH RECORDING FOR ANYONE REPEATING THIS.** Mid-verification the body class went completely
empty and the shell vanished — it looked like a serious regression. It was **test contamination, not a bug**:
step 5 loads `?legacy=1`, which pins `phantom_legacy` in localStorage **for the whole origin**, so the next tab
booted into legacy exactly as designed. The `.380` rip-cord was working correctly. **Clear `phantom_legacy`
between step 5 and step 6, or run them in separate browser profiles.**

**Verified before push:** stamps 3/3 · 3/3 inline blocks compile · `node --check sw.js` · valid JSON · CSS brace
delta **0** · all-LF · no precache change. ⚠ Agents barred — equivalents run inline.

**⛔ BATCH `.377`–`.384` is 8 deep, PAST the 6-ship CALL 0 cap.** `.383` and `.384` were owner-directed corrections
during his verify rather than new scope, but the batch still needs a consolidated device pass before anything else
ships. **Scope is frozen; no further feature work until this passes.**

**Deferred to their own batches, deliberately:** Live Activity (§9.12) — needs the offline-first append-only local
event log the owner specified, with existing actions writing real events; **never fake events**. Desktop scanner
modal (§9.17). The open `#6c2bd6` fault value.

---

# ⚠ RECONCILIATION — batch `.385`–`.401` · 17 ships · added 2026-08-06

**The tracker went dark after `.384`.** Seventeen version-stamped ships landed with no BATCH-VERIFY
entry. Two programs ran back to back: the **Phase 2 Active Build Workspace arc** (`.385`–`.396`) and
the **Architecture Blueprint program** (`.395`–`.401`, milestones M0/M1/M2-a). Both ran as
owner-directed iterative device loops — the owner was reporting defects **from the physical iPhone
ship by ship**, and each ship answered the last device report. That is not the CALL 0 protocol, but
in the arc it was *tighter* than it, not looser. It stopped being tighter at `.396`, where the loop
went quiet and four more ships stacked behind it.

**⛔ THIS BLOCK IS A RECONSTRUCTION FROM COMMIT BODIES AND `version.json` NOTES — NOT FROM OWNER
SIGN-OFFS.** A box is checked ONLY where a later ship's notes record in writing that the owner
confirmed it on device; the quote is cited inline. Everything else is UNCHECKED, **including ships
that very likely passed.** An unchecked box here means "no written record", not "known broken".

**The batch is 17 deep against a cap of 6, and it contains the M2 renderer work — HIGH-risk by any
reading.** Nothing should ship after `.401` until this clears.

## v1.14.385 — Phase 2 Active Build Workspace, phone (`c261d28`) · rollback: revert commit
Honest finding that preceded it: the Phase 2 Build workspace **had never been built** — `#pg-work`
held static markup, no renderer, and `.373`–`.384` never touched it. So this was never a regression.
New `#bw-shell` in `#pg-work` via `bw_render()`, gated on `body.rd`; legacy `#work-grid` **hidden, not
deleted** (`#pg-work.bw-on`).
- [ ] Phone bare URL: BUILD opens the Active Rack workspace — header, site context, LOCAL ACTIVE state, rack hero, phase + progress, CONTINUE, Next Action, 3D preview, OPEN AISLE, four metrics, SCAN / PORT MAP / LOG BLOCKER, bottom nav
- [ ] `?legacy=1` keeps the untouched launcher and the old `#work-grid` — rip-cord intact

## v1.14.386 — three purpose-built shells, laptop corrected (`a1c6e7a`) · rollback: revert commit
Owner device review found the three-column Mission Control grid forced into a laptop viewport.
Measured, not guessed: at 1280 a 246px sidebar + 56px padding leaves 978px; three columns need 1200.
**The overflow was CLIPPED, not scrolled.**
- [ ] Laptop 1280 **and** 1440: two columns, dominant hero, readable rail, aligned topbar, no bottom nav
- [ ] 1500+: three columns · phone unchanged · `?legacy=1` unchanged

## v1.14.387 — Build Progress step labels shortened (`f44aea4`) · rollback: revert commit
Owner-directed. Five full phase labels truncated to `MECHAN…` / `VALIDAT…` in the 320px laptop rail.
Now MECH / PWR / NET / CPU / VAL, verified unclipped at 1280 by `scrollWidth` vs `clientWidth`.
- [ ] Laptop 1280: rail reads MECH PWR NET CPU VAL with exact counts and the full current-phase name below
- [ ] Phone and `?legacy=1` unchanged

## v1.14.388 — Phase 2 desktop Build workspace (`050e956`) · rollback: revert commit
Build opens INSIDE the Phase 1 persistent Command Shell — sidebar and topbar stay, only the centre changes.
- [ ] At `?shell=1` tap BUILD: sidebar + topbar stay, BUILD is the active nav item, no bottom nav
- [ ] 1440: hero left, context rail right, rack queue below · 1600+: three columns, queue left
- [ ] CONTINUE, OPEN AISLE, SCAN, PORT MAP, LOG BLOCKER all still route
- [ ] Phone at 390 unchanged from `.385` · `?legacy=1` unchanged

## v1.14.389 — Phase 2 feature-complete, eight items (`f065ad0`) · rollback: revert commit
All writes go through the existing hardened path (`checklist_toggle`, `checklist_setNote`,
`deploy_advancePhase`) — no new writer, no raw `localStorage` write, no new key.
- [x] **Owner reviewed on device and it FAILED with two defects** — `.390` opens "TWO DEVICE DEFECTS, FIXED SEPARATELY". Re-verify below via `.390`+.
- [ ] Camera rail, CABLES, OPEN AISLE · all four tool tabs open, Back returns to Build
- [ ] Worklist toggles persist across reload · evidence notes save · phase completion advances
- [ ] Airplane mode · laptop persistent nav, no third column, no clipping · desktop 1440/1600/1728
- [ ] `?legacy=1` launcher intact, RETURN TO NEW UI works

## v1.14.390 — rack mount lifecycle (D1) + Build spacing system (D2) (`1b4c2fb`) · rollback: revert commit
D1: canvas mounted every time in a desktop harness and failed on device ⇒ **lifecycle defect**, not a
missing call or CSS collapse — `bw_render()` runs the instant `showPage('work')` fires, so `#bw-mount`
can measure ZERO mid-transition. D2: ONE spacing system on `#bw-shell` (outer 15, gap 15, card 17,
control 9, radius 20, secondary 46, primary 56); all one-off local margins deleted.
- [x] **Its on-device diagnostic worked** — `.394`: "The device diagnostic shipped in `.390` did its job and named the real cause".
- [ ] Build reads as one surface, not stacked legacy blocks — hierarchy in the required order
- [ ] Rack draws on first open (superseded by `.391`/`.392`/`.394`/`.396` — verify at the end of the arc)

## v1.14.391 — rack first-mount lifecycle (iOS) + three visual defects (`e998a35`) · rollback: revert commit
Root cause with in-repo precedent: `showMode()` disposes the Command hero context then calls
`bw_render()` **synchronously in the same call stack**. Visual D3: PORT MAP appeared twice — action
removed, contextual tab kept (**one door per feature**).
- [ ] Cold load → Command (live hero) → first Build open: canvas present, no diagnostic; away and back: present; real phase-completion re-render: present
- [ ] Canvas count stable at 5 across all three (no context leak) · phone header clean at 393 · desktop overlap gone at 1280 · zero horizontal overflow
- [ ] ⚠ **Disclosed as still open at `.391`, needs your ruling:** bottom nav 4th item is **EXIT** where the approved reference shows **SHIFT** · rack-preview control rail wraps 4-then-1 and carries REAR + EXPLODE, which the reference does not show · metrics render honest em-dashes (harness rack has no Master-linked platform) so the **metrics layout has never been seen against a populated rack**

## v1.14.392 — deterministic rack stage + event-driven recovery (`540e14a`) · rollback: revert commit
The captured device log was **from a different surface than the one under repair** — "hero mount not
laid out after 600f" is emitted by `cmd_rackHero3D` (Command `#cc-rackhero-mount`), not the Build mount.
- [x] ✅ **DEVICE-CONFIRMED BY OWNER** — `.393` records it verbatim: "The rack now loads in the Build workspace on device, confirmed by the owner on v1.14.392."
- [ ] Leave to Command and return; complete a phase; draws every time

## v1.14.393 — Command hero gets the same event-driven recovery (`301ba2d`) · rollback: revert commit
Closes the other half of the identical defect, on `#cc-rackhero-mount`.
- [x] **Was on device** — the "no webgl context granted (after 12 re-arms)" capture that drove `.394` came from this build.
- [ ] Cold load to Command with a Master loaded: RACK HERO draws untouched → open Build, that rack draws → return to Command

## v1.14.394 — one live rack, and it belongs to Build (`71d4279`) · rollback: revert commit
iOS Safari was never failing to lay the box out (`.392` fixed that) — it was **REFUSING A SECOND LIVE
CONTEXT**. Command surrenders the live rack to Build.
- [ ] Cold load, open Build, rack draws on the FIRST open
- [ ] Command now shows the DOM elevation rather than a live 3D rack — **that is intended, judge it**
- [ ] If Build still reports a refused context, a THIRD context owner is alive and the card says so

## v1.14.395 — M0: build the instrument before changing what it measures (`68dd5a9`) · rollback: revert commit
First ship of the approved ARCHITECTURE BLUEPRINT program. **Zero visual change, zero behaviour change
except honesty.** Renderer counts must be comparable before and after.
- [x] **Instrument ran on device** — `.396` root cause was "found with the M0 instrument on the first run and proven in-browser".
- [ ] Rack behaviour identical to `.394`: if it drew before it draws now, if it refused before it still refuses — only the measurement changed

## v1.14.396 — the rack was never refused a context; the check asked the wrong question (`956f262`) · rollback: revert commit
three.js r128 creates a **WebGL2RenderingContext**. Per spec a canvas already holding `webgl2` returns
**NULL** for `getContext('webgl')` — a mismatched type is refused, not created. The capability check
was asking the wrong question and reporting a refusal that never happened.
- [x] ✅ **CONFIRMED BY OWNER 2026-08-06 — "rack draws".** Verified against the build Pages was serving at the time, **`v1.14.401`**, which carries this fix. **THE EIGHT-SHIP ARC `.389`→`.396` IS CLOSED.** The root cause holds: three.js r128 creates a WebGL2 context, a canvas holding `webgl2` returns NULL for `getContext('webgl')`, and the capability check had been reporting a refusal that never happened.
  ⚠ **Scope of this pass:** it establishes that the rack RENDERS. It does **not** establish the `.401`/`.402` attachment behaviour — single-entry transfer on Open Aisle, pause/resume on leaving Build, or ×10 Build entries without climbing. Those are separate checks and still open.

## v1.14.397 — M1-a: backup coverage is derived, not remembered (`35b9f37`) · rollback: revert commit
`exportAllData` hand-listed FIFTEEN sections; the app has ~63 keys, sixteen uncaptured ones being real field work.
- [x] ⚠ **DEVICE-VERIFIED AND IT FAILED** — `.398`: "The `.397` registry was verified on a live device immediately after shipping and it was INCOMPLETE." Three real keys were missing. Superseded by `.398`; verify there.

## v1.14.398 — M1-b: coverage measured against live storage (`9b01d25`) · rollback: revert commit
Adds `deploy_forge_loadout_v1`, `deploy_forge_view_v1`, `phantom_audits_v1` (completed audits).
- [ ] Real deployment loaded → EXPORT FULL BACKUP → **no** unrecognised-key toast
- [ ] Downloaded JSON has a `keys` object and `unclassifiedKeys` is an **empty array**

## v1.14.399 — M1-c: every write path guarded, PDF import works offline (`2eae342`) · rollback: revert commit
ST1, the highest data-loss exposure in the app: the private wrapper behind `phantom_node_status_v1`
(per-node racked/verified state).
- [ ] Mark a node racked in the aisle view, reload, confirm it persisted
- [ ] With storage throttled or a nearly-full device, mark a node → **"Storage full" toast, not silence**
- [ ] Fully offline, import a PDF → works with no connection prompt

## v1.14.400 — M1-d: the read side · M1 COMPLETE (`f762a68`) · rollback: revert commit
`safeGet`/`safeRemove` land; 84 call sites migrated by script with paren-delta verification, 0 leftover.
**ABSENT stays silent; PRESENT-BUT-UNPARSEABLE is a data-loss event — loud, and the bytes are kept.**
- [ ] Normal use: nothing looks different anywhere
- [ ] Safari console: `localStorage.setItem('phantom_audits_v1','{{{broken')` then reload → toast **naming the key**, app still working, `phantom_quarantine_v1` holds the original broken bytes
- [ ] Export a backup and confirm `phantom_quarantine_v1` travels in it

## v1.14.401 — M2-a: the graphics lifecycle has an owner (`a94bb5f`) · rollback: revert commit
Opens M2, **structural half only** — `RackEngine.attach`, the reclaim barrier (I6), modes and the
Vocabulary normalisation are M2-b. Registration now happens at the boundary that CREATES the renderer,
so the single-context guard is an invariant instead of a convention. Both `WebGLRenderer` sites register.
Per-attachment `IntersectionObserver` closes the invisible-canvas drain (`document.hidden` is NOT set by
a `display:none` ancestor).
- [ ] Build open, rack renders → console `PhantomGL.diag()` → `attachments` shows **exactly one** entry for the Build mount
- [ ] Build → Open Aisle → Build: **one** entry at every step (transferred, not added); rack still there on return
- [ ] Leave Build for Tools → that attachment reports `paused: true`; return → `paused: false` and animating
- [ ] Enter Build **×10**: `attachments` never exceeds one, canvas count does not climb
- [ ] Everything else identical to `.400`
- [x] ⚠ **Shared-house flag — ✅ RULED AND CLOSED by owner 2026-08-06: "gate the observer on body.rd".** Shipped as `.402`. Verify there, not here.

## v1.14.402 — owner ruling: the visibility observer is redesign-house only (`1f47b87`) · rollback: revert commit
Answers the `.401` flag above; **adds nothing.** `_observe` returns early unless `document.body` carries
`rd`, so under `?legacy=1` no observer exists, `att.paused` stays false for the life of the attachment, and
both renderers behave exactly as they did on `.400`. Functional diff is **one line plus the stamp** — the rest
is comment. ⛔ **The single-live-context guard (`releaseOthers`, I1) is deliberately NOT gated** — two live GL
contexts on iOS is the crash class this milestone exists to close, and legacy is entitled to that fix. Only the
observer is house-scoped; the invariant is not.
- [ ] Bare URL: open Build, leave for Tools, return — `PhantomGL.diag()` still shows the attachment `paused: true` while away and `false` on return, exactly as `.401` did
- [ ] `?legacy=1`: reach a rack surface, confirm the rack renders and **keeps** rendering as it did before `.401`; `RackEngine.report()` lists the attachment with `paused: false` throughout
- [ ] ⚠ **Clear `phantom_legacy` between the two** — a `?legacy=1` visit pins it for the whole origin and the next tab boots legacy by design (the `.384` false alarm; see that block)

## v1.14.403 — aisle lifecycle trace (`4d02cf3`) · rollback: revert commit
**INSTRUMENT ONLY, zero behaviour change.** Owner-directed after a physical reproduction, and written so the
owner never has to read a console: it writes through the existing `phantom_logErr` into the existing
`phantom_crash_log` ring, readable **on the phone at SYS → ERRORS**. No new storage key — a new key would have
needed M1 registry classification, so the one existing door is reused. Records, in order: `OPEN_AISLE_CLICK`,
`AISLE_OPEN_REQUESTED`, `AISLE_HOST_CREATED` (measured mount w/h), `ENGINE_ATTACH_STARTED`, `ENGINE_ATTACHED`,
`FIRST_FRAME` (one-shot), `AISLE_PAUSED`, `AISLE_RESUMED`, `AISLE_TEARDOWN` (+stack), `AISLE_CLOSE_REQUESTED`
(+stack), `AISLE_CLOSED_OBSERVED`, `UNDERLYING_ROUTE_REVEALED`, `AISLE_HOST_REMOVED` — each with a state
snapshot (open flag, in-DOM flag, `body.rd`, mount child count, rack `is-3d`, redesign mode, `document.hidden`,
full `RackEngine.report()`).

⛔ **THIS SHIP HAS NEVER BEEN SERVED — it was stamped, pushed, and its Pages deploy died. See the `.404` block.**

⚠ **Its stated premise was WRONG and `.404` supersedes it.** `.403` was written against *"the sheet closes
itself"*; the owner's screenshots then established the aisle **stays open** and only the **viewport** is blank.
The close-handler theories are abandoned. **The instrument is deliberately RETAINED** — it costs nothing and it
is what will confirm `.404` on the device. Verify it as part of the `.404` pass below, not separately.
- [ ] Ring is readable at **SYS → ERRORS** on the phone after one Open Aisle, no console needed
- [ ] Entries appear **in order** and each carries its state snapshot
- [ ] `FIRST_FRAME` is present exactly **once** per aisle open
- [ ] Nothing else in the app behaves differently (it is an instrument, not a fix)
- [ ] 📌 **Honest limit, written into the code:** a `MutationObserver` callback runs in its own microtask, so the
      stack captured there is the observer's, not the mutator's — which is why `forge3d_close` is instrumented
      separately; the presence/absence of **its** entry is the discriminating fact

## v1.14.404 — blank Forge aisle fixed, a `.401` regression (`cc0b6c0`) · rollback: revert commit
**Two functional lines plus the stamp; everything else in the diff is comment.** The reproduction: tap OPEN
AISLE, PHANTOM navigates correctly, the page **stays open**, header/metadata/close/rack-strip/focus-card/bottom
controls all render — and the 3D viewport is **completely blank**. The Forge HUD is **static markup** inside the
sheet (`:13104`), so it renders the instant `.open` is added, entirely independent of whether the 3D ever
initialises: **a perfect shell with a blank viewport is exactly what a stopped render loop looks like, and is
NOT evidence the mount succeeded.** `forge3d_render` calls `frame()` once synchronously while the scene is still
**empty**; the cabinets arrive **asynchronously** on hero decode (`:19859` → `setLoadout`), and `assignSlot`
mutates the THREE scene, which is only visible on a **later frame**. `.401` then installed a per-attachment
`IntersectionObserver` whose `pause()` cancels the animation frame — landing between first frame and hero decode
kills the loop before the cabinets are ever drawn. Easy to hit, because `forge3d_open` adds `.open` and renders
in the **same synchronous task**, so the observer is installed before the browser has laid out the newly-shown
sheet. Also why the aisle passed at `.353` and fails now: before `.401` the loop never stopped.
**FIX 1 — never observe the aisle**, by exclusion, not tuning: it is a full-screen modal **disposed on close**,
so it never sits hidden-but-alive and I4 protects nothing there. **The rack keeps its observer** — it lives in a
page that goes `display:none` while staying mounted, which is the real drain I4 was written for.
**FIX 2 — repaint after population:** `setLoadout` restarts the loop through `frame()` if it is not running and
the scene is not disposed (`frame()` places the camera, renders, and reschedules; a bare `renderer.render` would
draw with an unplaced camera). This makes a populated-but-invisible scene **structurally impossible**, so the
defect class cannot return through a different door.
**NOT DONE, deliberately:** no route changed (owner barred it), no fallback, no retry, no special case, no
fabricated data, RACK SCENE LOCK untouched, no scene internals modified.
**GATES:** 3 inline blocks compile ×3, `node --check sw.js`, valid JSON, CSS braces 4557/4557 (Δ0), line endings
unchanged all-LF, PRECACHE untouched, three-stamp lockstep, functional diff exactly two lines.

⛔ **NEITHER `.403` NOR `.404` HAS EVER REACHED A DEVICE — `main` is at `.404`, but Pages is still serving
`v1.14.402`.** Six Pages runs on 2026-08-06 (`4d02cf3`→`8ed007d`): `build` succeeded **every time**, `deploy`
cancelled/failed **every time**, during a GitHub platform incident with **Actions and Pages both
`major_outage`**. Three empty re-trigger commits were spent, and two of the six runs died as *cancellations*
caused by re-pushing on top of a run in flight. **This is not a code fault and nothing in the diff caused it.**
See [[reference_pages_deploy_lock]]. **Do not start this pass until `version.json` on the live URL reads
`phantom-v1.14.404`.**
- [ ] **Clear the service-worker cache first** (unregister SW + delete caches — a URL cache-buster does not bypass a registered SW)
- [ ] Confirm the app reports **`v1.14.404`** before trusting anything below
- [ ] Build → **OPEN AISLE**: the aisle **DRAWS ITS CABINETS**, not just its HUD ⭐ *this is the whole ship*
- [ ] Walk the flanks — geometry is there and animates
- [ ] Focus a rack — focus card matches the drawn cabinet
- [ ] **Close and reopen ×5** — it draws **every time**, not just the first
- [ ] Leave Build for Tools and return — rack still there, still animating
- [ ] SYS → ERRORS: the `.403` ring shows `FIRST_FRAME` present, and **no** `AISLE_PAUSED` immediately after `ENGINE_ATTACHED`
- [ ] `PhantomGL.diag()` — still **exactly one** attachment for the Build mount; the aisle is no longer observed
- [ ] `?legacy=1` — unchanged from `.402` (clear `phantom_legacy` afterwards)

## v1.14.405 — blank Forge aisle, PROVEN root cause (`6d862e5`) · rollback: revert commit
✅ **DEVICE-CONFIRMED BY OWNER 2026-08-06: "aisle draws and holds."** The `.390`→`.404` blank-aisle
arc is **CLOSED**. Found by a focused regression pass against the last device-verified good aisle
(`v1.14.353`, `4f84c65`, batch `.351`–`.354` CLEARED 2026-07-25) — **not** by another device-log cycle.

**Cause: an interaction of three ships, none of which is wrong alone.** `.391` gave `bw_mount3D` a
bounded re-arm — 12 × 400ms ≈ **five seconds** of `setTimeout` retries — guarded only by
`document.body.contains(mount)`. `.401` made release **symmetric** (any registration disposes all
others via `releaseOthers`, I1). **Opening the aisle never removes `#bw-mount` from the DOM** — the
aisle is a separate full-screen sheet, a direct child of `#app` — so Build's re-arm kept firing for
five seconds *after* the aisle opened and each retry re-registered `bw-mount` and **disposed the live
aisle.** The Forge HUD is static markup, so it stayed perfect while only the scene died.
`.404` removed only the **observer** half of `.401` and left `releaseOthers`, which is why it missed.

**Fix: correct the guard, add no machinery.** `draw()` aborts while the aisle sheet is open. No
timeout, no retry, no fallback, no instrumentation, no special-case path — it *removes* work on a path
that must not run. **I1 was not weakened**; `releaseOthers` is unchanged.
- [x] Build → OPEN AISLE draws its cabinets **and holds past the five-second window** — owner confirmed
- [ ] Close and reopen ×10 — draws every time
- [ ] Build's rack returns after closing the aisle
- [ ] `?legacy=1` unchanged

⚠ **This pass confirms the aisle DRAWS AND HOLDS and nothing more.** It does **not** release either
batch. `.377`–`.384` remains unreleased; `.385`–`.405` remains OPEN at 21 of 6.

## v1.14.406 — no silent failures: two P0 storage defects + the false crash banner (`997716e`) · rollback: revert commit

**First ship found by automation rather than by the owner in the aisle.** All three defects came out of
the new `test/e2e` baseline, and all three are one family: *the app knew something and did not say it.*

**P0-1 — the Master save was invisible on failure.** `PHANTOM_MASTER_STORE.save` wrote through a raw
`setItem` whose quota branch `console.warn`ed and returned `false` with no toast and no haptic, and its
single caller **discarded the boolean**. On a full device: operator loads a Master, parse succeeds, UI
reports success, **nothing persists** — gone at the next cold start. Largest payload in the app; a
4000-host site compresses to ~6.5MB against a ~5MB Safari origin quota. Both branches now toast +
haptic + raise `__phantomStorageFull`; the caller records a false return. Message is
capability-specific on purpose — `safeStore`'s generic *"Storage full"* does not tell a tech the Master
still works **this session** and must be re-imported after a restart.

**P0-2 — shift end swallowed everything.** `shift_end_write` was a raw `setItem` in a bare
`catch(_){}`: on quota it stored nothing, threw nothing, warned nothing, toasted nothing, while the hero
kept rendering a countdown that would not survive the next launch. `phantom_shift_end` is
registry-classified **user data**. Now through `safeStore` — the fix **removes** the hand-written
swallow rather than adding a second handler.

**P1 — the instrument reported a crash on every success.** `.403`'s `aisle_trace` routes 14 NORMAL
lifecycle events through `phantom_logErr`, which force-shows the shared `#crash-banner` reading
*"JS ERROR"*. A healthy Open Aisle raised it every time. **This blocked this very batch pass** — every
tester would have reported a crash that never happened. `phantom_logErr` gains an optional third arg
(`opts.trace` → `type:'trace'`, never raises the banner); optional and defaulting to prior behaviour, so
**all 64 existing call sites are byte-identical**. One new predicate `phantom_crashErrors` is the single
definition of *"is this ring entry an error"*, used by the banner, the boot banner and the SYS header
count. The ERRORS sheet is **deliberately unfiltered** — listing the traces is the point of `.403`.

⚠ **`?legacy=1` IS NOT BYTE-IDENTICAL AND THAT IS DELIBERATE**, on the `.402` precedent (*only the
presentation is house-scoped, the invariant never is*). The two quota toasts now fire in **both** houses
where legacy was silent — gating honesty to redesign would preserve a data-loss bug for the sake of the
rule. Filtering traces from the boot banner (which is **not** rd-gated) **restores** legacy's pre-`.403`
behaviour. The banner mutation inside `phantom_logErr` stays `redesign_isOn()`-gated; the SYS count is
only ever invoked under `rd`. No legacy markup, render path, `showPage`/`showOpsTab` or `#ops-tab-strip`
is touched.

**GATES:** 3 inline blocks compile · `node --check sw.js` · valid JSON · CSS braces 4557/4557 (Δ0) ·
**CRLF intact, 0 lone LF** (baselined at 54,749 pairs before the first edit) · PRECACHE untouched ·
three-stamp lockstep. `dct-ios.html` diff: 64 added / 11 removed — **34 comment, 30 functional.**

**PROOF BEFORE PUSH:** the three regression tests that pinned these at `.405` all flipped to *"expected
to fail but passed"*; annotations removed so a regression now fails loudly. Full suite re-run green
(**96 passed, 8 skipped**). Trace/error separation verified directly in WebKit: 3 traces → banner
hidden, SYS count `NONE`, ERRORS sheet still lists them labelled `TRACE`; then 1 real error → banner
raises reading `(1 entries)`, SYS count `1` — **not 4**.

**Live confirmed 2026-08-06:** all three stamps serving `phantom-v1.14.406` ~40s after push. No Pages lock.

- [ ] **Clear the service-worker cache first**, then confirm the app reports **`v1.14.406`**
- [ ] Build → **OPEN AISLE**: **NO** "JS ERROR" banner appears on a healthy open ⭐ *this is the whole P1*
- [ ] SYS → ERRORS still **lists** the `AISLE/...` entries, now labelled **TRACE** — the `.403` instrument is intact
- [ ] Header SYS error count reads **NONE** while only traces are present
- [ ] `?legacy=1` — open the aisle, reload: **no** "JS ERROR" banner (clear `phantom_legacy` afterwards)
- [ ] Master + shift-end quota toasts are device-only and fold into the M1 storage checks below

## v1.14.408 — the Forge toast moves above the row (`73acdb1`) · rollback: revert commit

**Owner ruling**, closing the one item `.407` escalated rather than absorbed.

⭐ **THE 96px IS DELETED, NOT RETUNED.** Last magic clearance in the stack, twin of the 92px removed
at `.407`. `.407` made it *total*: the row grew to 58px, so the toast stopped merely clipping the row
and began lying **entirely inside it**, hit-testable for its full 4s over the pill strip. `#toast` is
now a **child of `.hud-bottom` at `bottom:100%`** — clears the row and the focus card at any height.

**Why it couldn't be done at `.407`, and what unblocked it.** Two requirements were in direct tension:
the toast must clear the row, **and** it must still paint above the **open detail panel** — the
status-toggle handler fires with that panel up, so a toast sealed underneath takes **UNDO** with it and
the tech silently loses the ability to revert a RACKED/PENDING change. Both were impossible while
`.hud` carried `position:fixed`, because **a fixed element ALWAYS establishes a stacking context**
whatever its z-index, capping every child below the strip's own `z-index:10` and so below the panel's 40.
**The lever is one declaration:** `.hud` → `position:absolute` + `z-index:auto` establishes **no**
stacking context, so the toast's `z-index:60` resolves in `#forge3d-hud`'s context and beats the panel
(40), search overlay (50) and picker (55) — while `.toprow`/`.herotag` stay at auto and remain correctly
covered by all three. Costs nothing today (the sheet's rect was **measured identical** to the viewport
rect on both tiers) and is more correct tomorrow: it now anchors to the **sheet**, which is what it
always described. Inherited from a full-window mock; `.233` fixed only the JS half.

**Two smaller things fell out.** `left:50%` + `translateX(-50%)` retires for `margin-inline:auto` +
`width:fit-content`, so the element carries **no transform at rest** (a transform makes it a containing
block for any future fixed descendant — the `.212` trap). And `--forge-gap` is **named**, because 10px
stopped being one element's margin and became a **shared term** the moment the toast joined the caption
in that slot. The two now share one slot and may not stack: the caption yields via
`.toast.show ~ .hint` and returns over its own 800ms fade (hence `#toast` is emitted **before** `#hint`).

**MEASURED:** the gap above the row is **exactly 10.0px in all six** combinations — short card, wrapping
zero-state card, forced 3-line card × 390 and 834. With the panel **open**, `elementFromPoint` at the
toast's own centre returns the toast and **UNDO is hit-testable**.

⚠ **Three false failures were found in the PROBE, not the CSS**, and the method note is now in the spec:
`.toast` animates `translateY(20px)→0` over 250ms, so measuring in the same turn samples it **mid-flight
up to 20px low**; and `.hint` carries its **own 800ms** fade, so a 300ms wait catches it at 0.6 opacity
returning. Also relearned: **`showToast` is IIFE-scoped** and unreachable at page scope (the trap that
bit M2-b), so the probe drives the DOM state it produces.

**GATES:** 3 inline blocks compile · `node --check sw.js` · valid JSON · braces **4559/4559** (+1
caption-yields rule) · CRLF intact, 0 lone LF · three-stamp lockstep · RACK SCENE LOCK respected ·
`?legacy=1` unaffected. **GUARD:** `08-forge-layout.spec.js` → **11 tests**; two of the three new ones
assert the **lever directly** (the strip must not be `fixed`, must not carry a z-index), so restoring
either fails here rather than in the aisle at 2AM. Full suite **115 tests — 106 passed + 9 skipped**.
**Live confirmed 2026-08-07:** all three stamps serving `phantom-v1.14.408` ~40s after push.

- [ ] Clear the SW cache, confirm **`v1.14.408`**
- [ ] Change a rack's loadout so the toast fires — it appears **ABOVE the pill row**, never across it ⭐
- [ ] Open a rack's detail panel, toggle a row RACKED/PENDING — the toast is visible **over the panel**
      and **UNDO actually reverts it** ⭐ *this is the half that was in tension*
- [ ] The caption disappears while the toast is up and returns after
- [ ] Bottom strip still clears the home indicator — ⚠ `env(safe-area-inset-bottom)` is **0** in the
      harness, so this is verified by **nothing** off-device

## v1.14.407 — Forge bottom control stack, one clean pass (`a8360df`) · rollback: revert commit

Owner-directed after Forge began rendering: *"the bottom rack-strip controls are clipping/overlapping…
this is a layout/composition defect, not a rendering defect."* Measured by three read-only agents,
fixed by one, then reviewed by three more — **the review found a blocker the first six had not seen,
because they were reading CSS and it opened the aisle and looked.**

**ROOT CAUSE, ONE SENTENCE: the control row had no declared height, so every control in it was sized
by a sibling.** `.hudbtn` declared `width:46px` and no height, taking whatever `align-items:stretch`
handed it from the chips. Measured **46×24.5** on a fresh device and **46×35** populated against the
app's own 44px `--tap-s`. The pills were 76×33 and they carry click handlers, so they were sub-floor
too. Provenance: `git log -L` returns **exactly one commit per rule** (`25a1e29`, `.233`) and the CSS
was still byte-identical to `MOCKUP-FORGE-HYBRID-AISLE-v2.html` — a mock authored as a **full-window
demo and never validated at 390px inside a sheet.**

| | before | after |
|---|---|---|
| utility buttons, fresh device | 46 × **24.5** | 46 × **44**, matched pair |
| utility buttons, populated | 46 × **35** | 46 × **44** |
| rack pills (click handlers) | 76 × **33** | 76 × **44** |
| row height | 24.5 / 35 — emergent | **58px constant**, empty or full |
| active pill's glow room | **0.00px** above a declared 14px blur | **7px / 7px**, derived |
| `.chips` overflow | `auto / auto` — y-axis clipped silently | `auto / hidden`, both declared |
| caption vs pill row | drawn **on top of the pills** | **10px clear**, structurally |
| caption width @390 | **472.70px**, cut 41px off each end | 390px, wraps, readable |
| pill-strip centre tap | returned `span#toastUndo` — swallowed | returns the pill |

⭐ **THE 92px IS DELETED, NOT RETUNED.** The caption is now a **child** of the strip it must clear, at
`bottom:100%`. The guard proves it is derived: **the gap holds at 10px across a stack forced from 142
to 300px.** This is the repo's own fixed-strip-clearance rule (`.341`, `.351`) satisfied by *removing*
the constant. Its `white-space:nowrap` went too — it forced 59 characters to 472.70px inside a 390px
viewport, unreadable at both ends.

⭐ **BLOCKER THE REQUEST DID NOT NAME:** the zero state opened with a **RED ERROR BAR across both
utility buttons.** `deploy_forge_zeroState` called `phantomToast` with **no type**, and `phantomToast`
defaults `colors[type] || colors.error`, so an expected, honest condition — no Master on a fresh
device — was painted `rgba(255,59,59,.9)`. It was also the **fourth copy of the same sentence** on one
screen. Deleted rather than re-coloured; `console.warn` keeps the diagnostic. **A zero state is not an
error** — the never-label-absent-telemetry rule, applied to a colour.

**THREE OF THE OWNER'S OWN SUSPICIONS REFUTED BY MEASUREMENT, and no change was manufactured to satisfy
them:** the focus card never overlapped the row (**−12.00px**, a clean constant gap — the `.hint` was
the intruder, so requirement 4 was already met) · **no ancestor clips these controls** (`#forge3d-mount`
is the HUD's *sibling*; the only clipping box was `.chips`, on its own children, clipping a **shadow**)
· **zero negative lengths** exist anywhere in the block. Also refuted: the patch-stacking premise —
nothing here had ever been patched, so the ban was forward-looking and the discipline was to not
*author* the first hack.

**STYLE UNCHANGED** — glass, blur, borders, radii, colours, fonts and sizes verified byte-identical in
computed values. Structure, spacing and stacking only.

**GATES:** 3 inline blocks compile · `node --check sw.js` · valid JSON · CSS braces **4558/4558** (+1
deliberate token rule) · CRLF intact, 0 lone LF · PRECACHE untouched · three-stamp lockstep.
**RACK SCENE LOCK respected** — nothing under `#forge3d-mount`, `forge3d_render`, `drawGuts` or the
camera rig. **`?legacy=1` unreachable** — the sheet is `body.rd`+`.open` gated and a sweep of all 12
style blocks confirms zero uses of these classes outside a `#forge3d-sheet`-scoped selector.
**GUARD:** new `test/e2e/08-forge-layout.spec.js`. Suite now **112 tests — 103 passed + 9 skipped**,
reconciling exactly to the 104-test baseline plus this spec.
**Live confirmed 2026-08-07:** all three stamps serving `phantom-v1.14.407` ~40s after push.

- [ ] Clear the SW cache, confirm the app reports **`v1.14.407`**
- [ ] Open the aisle with **NO Master**: **no red bar**, and no caption lying across the pills ⭐
- [ ] Both utility buttons and the rack pills are comfortably tappable **with a glove**
- [ ] Load a Master: pill row and focus card cleanly separated, active pill's glow not cut
- [ ] Bottom strip still clears the home indicator — ⚠ `env(safe-area-inset-bottom)` resolves to **0**
      in the harness, so the real notch clearance is verified by **nothing** off-device
- [ ] `?legacy=1` unchanged (clear `phantom_legacy` afterwards)

⛔ **OPEN — OWNER RULINGS, ESCALATED NOT ABSORBED.** (1) The **Forge toast** still carries a magic
`96px` and still overlaps the control row while shown, and this ship made that overlap *worse* (the
stack grew 23px, so it now sits entirely inside the row band instead of clipping 66% of it). It cannot
be fixed without a ruling: moving it under `.hud-bottom` — the same structural fix that worked for the
caption — puts it **behind the open detail panel** at one of its two call sites and destroys the UNDO
affordance. (2) At the real **5-rack loadout cap, 2 of 5 pills are off-screen at 390px** with no
affordance; both available fixes are restyles the brief forbade. (3) `--forge-tap` is bound to
`--tap-s` 44px while the app's own token comment argues the gloved-realistic minimum is **~50px** and
`--tap-m` (48px) already exists — now a **one-token edit**. (4) `.rd-sheet-close`, the aisle's only
exit, is **40×40**; `.detail-close` is **32×32**.

---

# ⚖ OWNER RULINGS 2026-08-06 — batch `.377`–`.384` DISPOSED, three `.391` items CLOSED

Issued during the regression-baseline session, alongside the first automated test suite
(`test/e2e/`, 7 specs). These rulings change what must be verified on device and what must not.

## RULING 1 — `.377`–`.384` disposed, ship by ship

> *"Mark `.377`–`.384` superseded where the current architecture and approved UI have replaced them.
> Preserve any unique data-safety work that is still valid."*

The batch ran a device pass on 2026-08-03 and **FAILED** on the Build surface; that failure is what
`.385` diagnosed. No release was ever recorded. Re-verifying eight ships against a Build workspace
that has since been rebuilt would spend device time on a surface that no longer exists.

Classified individually rather than written off wholesale — three of these carry work that is still
load-bearing today.

| Ship | Disposition | Basis |
|---|---|---|
| `.377` OPS wall re-cut at 768 | **SUPERSEDED IN PLACE** | The nine-cell OPS wall it re-cut is currently **unreachable**: `bw_render()` adds `bw-on` on every branch (`:20458`/`:20471`/`:20489`) and `:54055` then hides `#work-grid`, which contains the wall. Verifying its art is moot until the wall has a door again. **The assets are on disk and precached — nothing is lost.** The reachability regression is tracked as an open P1, not as this ship's debt. |
| `.378` TOOLS art-first card face, phone | **PRESERVED — now automated** | The `#pg-ref` cards render and are exercised by `03-tools.spec.js` (all 7 static cards `:13546`–`:13552`) and `06-composition.spec.js` on all five tiers. |
| `.379` remove the glowtune dev tool | **CLOSED** | A deletion. Absence confirmed; nothing to verify on device. |
| `.380` the rip-cord gets a way back | **PRESERVED — load-bearing, now automated** | RETURN TO NEW UI is the only exit from the legacy house. `01-nav.spec.js` verifies `?legacy=1` boots with no `body.rd`, `#rd-botnav` hidden, legacy `.tab-nav` visible, `#pg-triage` active, `phantom_legacy='1'` persisted, and a subsequent bare-URL reload **stays** legacy. This is Rule 7's safety net and it is proven. |
| `.381` wire desktop TOOLS to the 768 art | **PRESERVED — now automated** | Covered by `06-composition.spec.js` on `laptop-chromium` and `desktop-chromium`. |
| `.382` COMMAND SHELL PHASE 1 (`?cshell=1`) | **SUPERSEDED** | `ARCHITECTURE-BLUEPRINT.md` D-06 / §10.3 rules `#cmd-shell` is a **complete second Command implementation** that is capability-ported and then **deleted**; `#pg-cmd` becomes the single Command at every tier, wrapped in the `.cshell` chrome. The preview shell is a dead end by ruling. `06-composition.spec.js` asserts the current correct behaviour: `.cshell` is opt-in and never persisted, so a bare URL at 1440px is still the phone composition. |
| `.383` COMMAND SHELL DESKTOP | **SUPERSEDED** | Same ruling. Rebuilt at Stage 7 / M5. |
| `.384` HONEST NAMING + transparent readiness | **PRESERVED — invariant, do not regress** | *Site Health* → **LOCAL SYSTEM STATE**, captioned *"Read from this device. PHANTOM receives no facility telemetry"*; readiness as **"N of 4 ready"**, a count of real gates, never a hardcoded score. This is the never-label-absent-telemetry rule, and it is the same principle the blueprint later encodes as **D-15** (Shift readiness is a gate list with a met/total count, never a percentage). **Any future change that reintroduces a fabricated score or a facility-telemetry label is a P0 revert.** |

**Net: 3 superseded · 1 closed · 4 preserved (all four now covered by automation).**
Batch `.377`–`.384` is **DISPOSED**. It is not on the device pass. Batch `.385`–`.405` remains OPEN.

## RULING 2 — SHIFT is the fifth pillar; EXIT is an APPROVED MISMATCH until M4

> *"SHIFT is the intended fifth product pillar. EXIT must not remain the permanent fourth navigation
> destination. Do not redesign navigation yet — record this as an approved mismatch for the relevant
> milestone."*

**Measured today** (`01-nav.spec.js`, and independently by `06-composition.spec.js`): primary nav is
**three `.botitem` destinations + `#rd-exit`** — `bn-command` Home · `bn-work` Build · `bn-ref` Tools ·
`rd-exit` Exit. **No Scan. No Shift.** Target per R-02 is five slots: Command · Build · Scan · Tools · Shift.
Delta is **+Scan, +Shift, −Exit**.

**This is a KNOWN, ACCEPTED mismatch. It is not a defect to be fixed opportunistically.**
Nav is not to be touched until **M4 / blueprint Stage 6**, where Shift ships as a pillar and
`EXIT` leaves slot 4 in the same ship. Any earlier nav change is out of scope and must be refused.
Closes `.391` open item 1.

## RULING 3 — the Build rack control rail matches the approved composition, later

> *"The Build rack control rail must ultimately match the approved Build composition. Do not polish
> it during baseline work."*

The rail wraps 4-then-1 and carries REAR + EXPLODE, which the approved reference does not show.
`.reh-3d-seg` measures **22px** on phone (`06-composition.spec.js`, CSS-rule probe at `:10657`) against
the app's own `--tap-s` 44px gloved floor. **Both facts are recorded, neither is to be changed during
baseline work.** Owned by the Build composition milestone (W2 / M2-b). Closes `.391` open item 2.

## RULING 4 — a populated Master/rack fixture is required

> *"Add a representative populated Master/rack fixture so Build metrics, phases, devices, platform,
> blockers, and Forge can be tested against real populated state."*

Every one of the six baseline specs reported the same limitation: the harness had **no Master loaded**,
so only the zero state was ever exercised. `bw_render()` routes away before creating `#bw-mount` with no
deployment (`:20457`) or no active rack (`:20470`); the `.reh-3d-seg` pills are built by JS
(`:36049`/`:36097`/`:36107`) only once a rack elevation exists; the four `bw-tab` tool doors (`:20632`)
exist only in the populated branch; the aisle states NO MASTER LOADED.

Fixture lands as `test/e2e/fixtures-populated.js` + `test/e2e/07-populated.spec.js`. Per **R-06** it
**must include at least one host-less, cable-endpoint-only cabinet** — ~42% of cabs on a real site
resolve with empty `hosts[]`, and a fixture where every cabinet is populated would hide the most
expensive data class in the app. Closes `.391` open item 3 — the Build metrics layout gets seen against
a populated rack.

---

<!-- append new ships above this line — checkpoint at 6 deep or before any HIGH-risk ship -->
