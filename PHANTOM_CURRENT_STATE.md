# PHANTOM — CURRENT STATE

⭐ **THE SINGLE SOURCE OF TRUTH FOR STATE.** Live version, milestone, defects and verify debt are
recorded here and **nowhere else**. Before this file took that role, five documents each claimed a
different live version and none of them was correct. If another doc disagrees with this one, that
doc is stale — fix the doc, do not fork the fact.

**Last updated: 2026-08-11, after `v1.14.439` — the refresh-surface dispatcher; renderer work stopped by owner directive.**

---

## 1 · Live

| | |
|---|---|
| **Version** | **`phantom-v1.14.439`** (`7a7473c`) |
| Commits | `.416` through `.439` shipped 2026-08-08/11 |
| Stamps | `dct-ios.html` · `sw.js` · `version.json` — all three at `.439` |
| Verified | **`.438` confirmed in the SERVED bytes 2026-08-11** — merge step 2 present, with the QR door referenced from BOTH the detail and Build (the additive state this step is meant to be in). `.425`–`.437` each confirmed the same way; `.434` was verified by ORDERING rather than presence — `rackElevation_render3D` release@1013 acquire@7629, `forge3d_render` release@845 acquire@1548, both reversed before that ship |
| Branch | `main`, in sync with origin |
| Held | `m2b-step1-hold` — M2-b step 1, built, unpushed, blocked on a colour ruling |

Authoritative check: `curl -s https://darkmatter024.github.io/phantom/version.json`

## 1a · GOVERNING PROGRAMME — owner rulings 2026-08-08

📌 **THE SPEC IS IN THE REPO AS OF 2026-08-10.** It had lived only in `Downloads` — the document
`CLAUDE.md` names as the programme of record was outside version control, could not be diffed, and
was unreachable from any session that could not see that folder. Copied in **verbatim**:
**20,362 bytes · `sha256 50dad65a643a20bd…`**, byte-identical to the source at the time of import.
⚠ **It is FROZEN — a genuine contradiction gets REPORTED, never silently resolved, and never edited
into the file.** The hash is recorded so a future session can prove the repo copy is the one that
was frozen; if it ever fails to match, someone edited a frozen document and that is the finding.
*(Git stores it LF and checks it out CRLF under this repo's `autocrlf`, so compare the git blob, not
the working tree, if you re-verify.)*

⭐ **`SHIP-TECH-FLOW-V2-FROZEN.md` GOVERNS.** Owner ruled 2026-08-08: the frozen spec is the
programme of record. Its seven workstreams — PHASE-ENGINE → SITE-PROFILE → CONTEXT-CHIP →
NAV-LOCK → CONTEXTUAL-SCAN → HONEST-HANDOFF → FINISH-PASS — supersede the blueprint's M0→M6
ordering as the delivery sequence. **The blueprint is not retired**: its architecture rulings
(R-01…R-06, R-02a) and the RackEngine spec remain law. What changed is WHICH ORDER work lands in.
Where the two disagree on sequencing, the spec wins; where they disagree on architecture, the
owner rulings win and the conflict gets reported, never silently resolved.

⛔ **`?legacy=1`, the Cold Aisle Filter, Data Honesty, three-stamp lockstep and the iPhone gate
are unchanged** — the spec restates them as non-negotiable doctrine.

⭐ **SHIP GATE = THE COMMIT HOOK, NOT THE FOUR SUBAGENTS.** Owner ruled 2026-08-08. Spec §10
mandates passes from `lockstep-auditor`, `surgical-edit-reviewer`, `data-honesty-auditor` and
`cold-aisle-qa`. **Those four cannot run.** They exist as files in `nexus01/.claude/agents/`, but
the session CWD is the home directory, so they are not loadable — which is why `BATCH-VERIFY`
records *"Agents barred, equivalents run inline"* three separate times over ~40 ships. A gate that
has never executed is not a gate. **`tools/hooks/phantom-guard.js` replaces them** and blocks a
commit on broken three-stamp lockstep, a non-compiling inline script, brace imbalance, damaged
CRLF, or a backtick in a commit body. This is an amendment to a FROZEN spec and is logged here
rather than edited into the spec, per its own §10 "ambiguity resolutions must be logged".

📌 **Identity is TWO people (spec §2), not one.** `siteLead` = authority; `currentOperator` = the
actor doing the work on this device. Every Event Log entry credits the ACTOR — work is never
auto-credited to the Site Lead. Implemented `.417`/`.418`.

⭐ **RE-AFFIRMED 2026-08-09 — THE SPLIT HOLDS.** The SITE-PROFILE architecture reset was re-issued
verbatim, and its §8 reads *"name = configured Site Lead, role = Site Lead"* — a single identity.
That is **superseded** by the frozen spec's §2 and by this ruling. Owner confirmed when the
conflict was raised rather than resolved silently: **the split holds.** Reverting it would
re-break who gets credited for work, which is the one thing the Event Log exists to get right.
⛔ **Do not "restore" §8's single-identity wording from the reset document.** It is the older text.

✅ **`.425` IS DEVICE-VERIFIED AND RELEASED** — owner, 2026-08-09: *"command deck looks right on the
phone."* Verify item 15 and its three legs are ticked.

⭐ **`.426` — DERIVED CACHES ARE NOT PERMANENT TRUTH (owner ruling, 2026-08-09).** A
parser/normalization upgrade **must not require the user to re-upload the Master**. If persisted
data was built under an older normalization: detect it, preserve the source data, rebuild the
derived inventory with the current normalizer, and persist the upgrade atomically.

📌 **The failure that produced that rule, worth not repeating.** `.424` was correct and served —
three stamps matched and the bytes carried the normalization — and the device verify still FAILED
with `s4:099` at 0 components. ⛔ **`.424` derived components only inside `phantom_parseMaster`, so
the fix ran at IMPORT and nowhere else**; `adoptRestored` normalizes nothing, so a device that
already held a Master restored the old normalizer's output forever. Correct code in front of data
built by code that no longer exists. **The general shape: when a fix is proven present but absent
in behaviour, ask which generation of code built the DATA in front of it.** `schemaVersion` could
not answer that — it says whether a payload can be READ, never which normalizer BUILT it.
✅ **CLOSED ON HARDWARE THE SAME DAY — `.424` AND `.426` ARE RELEASED.** Owner: *"s4:099 shows 19
components now"* · *"19 after reload"* · *"0a and 0c pass"*. All four behavioural legs of verify
item 0 are green: the rebuild happens with no re-import, it is stamped so it does not re-apply
(19 and not 38), SITE-HOSTS racks are not padded, and the Master keeps its identity through the
re-save. **The P0 that blocked the entire verify list is done.**

✅✅ **THE BATCH IS RELEASED — `.385`–`.428` CLEARED 2026-08-10. CALL 0 CAP RESET TO 1 OF 6.**
Final hardware pass, owner: *"offline pass good, no notch issues"* — closing items 1 and 2, the last
legs that genuinely required real iOS. **The verify debt that stood at 30+ open ships is cleared.**
🟡 **One stated exception: `.413` is NOT released.** Item 8's empty half has no live example —
`.424` resolved every cabinet in this Master — so the CYAN-not-red check has nothing to run against.
Left open rather than ticked: a check that cannot be performed is not a check that passed.

⭐ **THE LESSON OF THE LAST STRETCH, worth more than the ships.** Two real defects were found by
AUTOMATING work that had been delegated to the owner, and both had lived inside green suites for
months: the **one-way aisle transfer** (`.427`) behind an assertion whose bound *permitted* the
defect, and the **dead `--alert` token** (`.428`) behind a failure class no gate could see. Neither
would have surfaced from another device pass. ⛔ **And the mistake that had been sending them to the
device: "the harness SKIPS this" was being read as "this needs hardware."** They are not the same —
`05-offline` skips on `phone-webkit` because that browser never installs a service worker, and the
same suite runs 13/15 on `desktop-chromium`. **Check another project before spending a device pass.**

✅ **WORKSTREAM 2 — SITE-PROFILE IS COMPLETE (2026-08-10, `.432`).** `.415` atomic swap · `.417`
root record + migration · `.418` identity split · `.422` staging + ACTIVATE SITE · `.423` restore
re-enters boot · **`.432` the first-run gate finally has a destination worth arriving at.**
⛔ **THE HELD "BOOT GATE" NEEDED NO NEW CODE, AND THE HOLD WAS DESCRIBING A RISK THAT WAS NEVER IN
THE SPEC.** It has been wired into `launch()` since `v1.6.70` (`!siteProfile_isConfirmed()` →
`firstRun_show()`). Two things were recorded wrongly and both are worth correcting here:
· The hold read *"invalid profile → SITE SETUP only"*. The spec §3 says **"no `ACTIVE_SITE_PROFILE`"**
  — ABSENCE, not invalidity. `validity()` fails on SIX conditions including a blank `operator`
  (which `.418` deliberately made possible) and a missing `activeMasterId`, so gating on
  `isValid()` would route a device carrying a working 4,143-host Master into setup. **That is the
  cold-aisle lockout the hold existed to prevent, and it came from the summary, not the spec.**
· What the gate actually lacked was a **Site Lead field** (it predates the identity split) and a
  **Master step** (it could pre-fill FROM a Master but never load one). Both folded in at `.432`.

⛔ **AND THE MISTAKE THAT COST A SHIP: `.431` BUILT A SECOND DOOR.** Asked for the gate, I searched
for the SPEC'S NAME (`siteSetup`, `SITE SETUP`) rather than the CONCEPT, found nothing, and reported
a whole feature missing. The feature is called `firstRun_*` and is built against an approved mock
with a legacy branch. `.431` shipped a parallel flow — a Contract A2 violation — and `.432` reverted
it (−225 lines net) and folded the two genuinely-missing pieces into the canonical door. ⭐ **Before
building any flow, read the function that runs at the moment that flow would start.** `launch()`
answered it in one line and was never opened. A name-based grep is evidence about NAMING, never
about EXISTENCE, and specs routinely rename what the code already has.

✅ **SECTION B — THE RENDERER TRIO IS CLOSED, 2026-08-10.** Verify items **3, 4 and 5** all pass on
hardware: *"rack holds all 10, no slowdown"* · *"rack stays in build after close, all 10"* ·
*"legacy rack renders flat, no errors, no heat."* **Releases `.390`–`.396`, `.401`, `.403`, `.404`,
`.405` and the `.402` legacy half.** This is the HIGH-risk section the CALL 0 cap exists for, and it
is the arc that cost eight ships to stabilise. ⚠ Item 4 only passed because `.427` fixed a defect
that section had been carrying unseen since the aisle shipped — see below.

⭐ **`.427` — THE AISLE GIVES THE CONTEXT BACK TO WHOEVER LENT IT.** Verify item 4 failed on
hardware at `.426` (*"rack is gone from build after close"*) and passes at `.427` (*"rack stays in
build after close, all 10"*). **Releases `.403`, `.404`, `.405`.** `forge3d_close` used to restore
ONE hardcoded surface (rack-detail, via a call that no-ops elsewhere by its own admission), so an
aisle opened from Build never gave the context back. Now `forge3d_open` captures the attachment it
is about to displace — **before** `releaseOthers` destroys it — and close hands it back to that
lender. The `reacquire` callback is generic because `rackElevation_render3D` is the one renderer
behind every rack surface.

⛔ **THE DURABLE LESSON IS NOT THE FIX — IT IS HOW IT HID.** The test covering this asserted
`attachments.length <= 1` after close, and the defect value is **0**. **A bound that PERMITS the
defect reads as coverage**, and the spec header claimed "the aisle round trip leaves Build intact"
while no assertion ever checked it. Months of green suites, on the operational centre. ⭐ **When an
assertion is a bound (`<=`, `>=`, `toBeTruthy`, `not.toBeNull`), ask what the FAILURE value is and
whether the bound admits it.** Prefer naming the expected thing (`toBe('rack:bw-mount')`) over
bounding it.

⚠ **HARNESS NOTE 2026-08-09 — 18 FAILURES IN THE `.426` FULL RUN WERE ENVIRONMENTAL, NOT CODE.**
The full phone-webkit suite (199 tests) reported 172 passed · 9 skipped · **18 failed**, all in
`02-build-forge` and `08-forge-layout`, and the run took **1.0h against 22.1min** for the same suite
earlier the same day. Cause: WebGL context exhaustion on a loaded box. **Proven three ways, not
assumed** — `08` re-ran alone on the identical bytes 17/17 green; `02` re-ran alone 12/12 green;
and `09-master-binding`, which had failed 5 in isolation earlier, PASSED inside this run. The set
of failures moves between runs, which is resource exhaustion, not a deterministic fault. Earlier
the same day a stash-and-rerun proved `09`'s failures reproduce identically on unmodified `.425`.
⭐ **Before treating a Forge/WebGL failure as a regression, re-run that spec ALONE.** A red full
run on this machine is not evidence by itself.

⚠ **Round-trip trap fixed in the same ship, and it generalises:** `PHANTOM_MASTER_STORE.save()` read
`sourceFileHash`/`totalCables` from `.stats`, which **only a fresh parse has** — a restored payload
carries them at top level. Re-saving a restored Master wrote `null` over both. Any code that feeds
a RESTORED Master back into a function written for a PARSED one must be checked field by field.

⭐ **OWNER OVERRIDE 2026-08-09 — COMMAND DECK LAYOUT (`.425`).** The approved Command Deck mock
was ported into the real app's Command page **ahead of NAV-LOCK**, an explicit override of the
sequencing rule that barred visual redesign before that workstream completes. ⛔ **The override is
scoped to the Command Deck layout and nothing else** — it did not authorise changes to the baked
percentage artwork ruling, data-honesty behaviour, navigation architecture, state logic, gates,
metadata, the 44px floor, or any other screen. Do not cite it to justify a second redesign.
**Two follow-on rulings in the same exchange:** the deck composes **single-column at tablet (834)**
as well as phone — laptop and desktop are unchanged two-column; and the port was authorised for
push after the phone screenshot was reviewed. `?cshell=0` remains the rip cord back to the older
phone Command page.

📌 **`.425` did not build a new layout.** `#cmd-shell` already carried the whole deck, gated
`@media (min-width:1024px)` since `.412` because no phone composition had ever been authored. The
ship opened that gate and added one `max-width:1023px` adaptation block. ⚠ **The trap it exposed,
worth remembering:** opening a desktop gate downward also imports that composition's *chrome
contract*. The desktop block stands `.app-header` and `#rd-botnav` down because `#cs-side`/`#cs-top`
replace them — organs that only exist at ≥1024 — so the phone briefly had **no navigation and no
version/SW/network pills**. Those rules are now sub-gated at their own source. Hiding chrome and
reclaiming the gutter it reserved are also two separate edits: the first alone left `.page` inset
246px and read as a broken layout, not as missing chrome.

## 2 · Milestone

**Programme: `SHIP-TECH-FLOW-V2-FROZEN.md` (see §1a).**

✅ **Workstream 1 — PHASE-ENGINE: COMPLETE** (2026-08-09). P0 `.418` one operator identity ·
P1 `.419` the Event Log folded into the existing hash-chained audit log rather than built beside
it · P2 `.420` the Blocker record, adopting pre-existing blockers instead of invalidating them ·
P3 `.421` the step model, state machine and four platform templates.
⚠ **The step TEXT is a placeholder by design.** Real per-platform commissioning procedure is site
knowledge the code does not have, and inventing thirty authoritative-looking steps would be
fabricated telemetry wearing a checklist. **Filling those in is the owner's, and it is what
PHASE-ENGINE needs next to be useful to anyone.**

🔄 **Workstream 2 — SITE-PROFILE: substantially landed, one piece deliberately held.**
`.415` atomic swap · `.417` root record + migration · `.418` identity split · `.422` staging, the
validation summary and explicit ACTIVATE SITE, plus §4.3 proven (events survive a Master swap and
still name the Master that produced them) · `.423` the restore path re-enters boot instead of
returning to a half-updated app — the LAST split-brain door, now closed (§9 RECOVERY ONLY).
⛔ **HELD BY OWNER RULING — the boot gate** (invalid profile → SITE SETUP only). It is the single
riskiest change available: a misfire locks an operator out of a working app in a cold aisle. It
waits until after a physical device pass.

⚠ **Sequencing deviation, logged not resolved:** `.417` (workstream 2) landed before workstream 1.
Authorised directly by the owner before the spec arrived, and it is inert scaffolding rather than
UI — but the spec says each step gates the next, so it is recorded rather than argued away.

✅ **M2-b STAGE 1 LANDED (`.433`) — the data contract (§7, I8 + I9).** `RackEngine._resolve(rackId)`
returns `{id, label, units, devices, source, dataState}`, wraps `master_rackToElevation` rather than
re-implementing it, normalises every `type` through `Vocabulary`, and makes R-06 representable —
`empty` (Master holds the cab, no devices) and `unassigned` (Master never heard of it) are now
different answers. Three call sites routed, including the `master_renderHit` reshape. Spec 22.

✅ **M2-b STAGE 2 LANDED AND IS DEVICE-VERIFIED (`.434`) — the reclaim barrier (§6, I6).**
Owner on hardware 2026-08-10: *"rack holds, aisle opens same speed."* Verify items 3 and 4 still
hold under the restructure, and — the half the runner could not answer — **the two-frame barrier is
imperceptible on the device.** The spec claimed ~33ms would be; that is now measured by the only
instrument that counts.

**What shipped:** `releaseOthers` reports how many it released; both renderers release at the TOP,
before any renderer is constructed; the barrier arms ONLY on a real release (a cold first render is
not delayed for a reclaim that never happened); one pending acquisition, collapsing to the last
request; a timer fallback so a hidden tab cannot strand it. Verified in the SERVED bytes —
`rackElevation_render3D` release@1013 acquire@7629, `forge3d_render` release@845 acquire@1548.
Before `.434` both were the other way round.

⚠ **The claim discipline stands and is in the code:** the ordering was certain; a field failure
caused by it was never proven, and this must not be cited as the explanation for the historical
blank-rack arcs. A stated invariant simply was not being held, and now is.

⭐ **`.439` — THE REFRESH SURFACE IS NOW A PARAMETER, AND STEP 3a's INVENTORY WAS SHORT BY NINE.**
Found while scoping merge step 3b, and it corrects a number the plan is built on. The question
"what does the phase-card block contain" returns 4 refresh sites; the question **"which code
assumes the surface it refreshes is the rack detail"** returns **13**. The other nine are outside
the block 3b was scoped to lift: four resume **after a modal** (`ge_captureSkip`, `ge_captureSave`,
`ge_onCompleteTap`'s rack-missing fallback, `ta_resolveUnblock`) and five are emitted **inside the
card markup** (`checklist_addItem` / `_removeItem` / `_renameItem` / `_toggleEdit`,
`deploy_flagPhaseReverify`).
⛔ **So `onRefresh` as a CALLBACK cannot work** — nine of the thirteen run after the builder's scope
is gone. `phase_refreshSurface(surface, deployId, rackId)` takes a **string** key, which survives an
onclick attribute and a stored context object. `'detail'` is the default, so every pre-`.439` caller
is byte-identical.

📌 **It was a LIVE defect, not a hypothetical.** `.438` moved ASSIGN into Build; `deploy_assignRack`
still ended with `deploy_showRackDetail`, so Assign-from-Build saved and then threw the technician
onto the detail — `.436`'s wrong-landing, one ship after `.436` fixed it, introduced by the ship
that moved the control. QR and LOG NOTE have no refresh tail and were clean. ⭐ **A hardcoded
destination is invisible for exactly as long as there is only one destination** — every remaining
merge step adds a second one, so the other twelve sites are now the known work, not a surprise.

⚠ **And a test that failed against correct code, worth not repeating.** `deploy_showRackDetail`
**also re-renders Build on FIRST entry** via its own nav path — true at `.438` — and does not on a
second call into an already-open detail. Baseline and measurement therefore only compare from
**two cold boots**; sharing one page let the baseline contaminate the reading. The invariant is not
*"the default caller never touches Build"* but *"it does what a direct detail render does and
nothing more."*

⛔ **STAGE 3 IS WHAT REMAINS OF M2-b.** `attach` (BACKABLE SUBSET ONLY — see below), modes, and the
§8 deletions LAST. §8 ends by deleting `forge3d_render` as a separate renderer, which is the single
largest blast radius left in the file and wants its own ship with a device pass.
📌 **HISTORY — the finding that produced `.434`, kept because the reasoning is the durable part.**
**I1 does not hold at the INSTANT of acquisition.** Read from the ordering inside
`rackElevation_render3D`, not measured:

    :37719   new THREE.WebGLRenderer(...)          ← the new context is ACQUIRED
      …      (~1200 lines later, same function, SAME TASK)
    :38926   RackEngine.register(mountEl, …)  →  releaseOthers()   ← the old one is RELEASED

So on a cross-host handoff — Build → Aisle is exactly that shape — the new context is taken while
the other host's is still live. I1 holds *after* `register` runs, never at acquisition. That is
precisely what §6 exists to close: *"no context is acquired in the same task as a release."*
⚠ **Claim discipline: the ordering is certain; a field failure caused by it is NOT proven.** Desktop
tolerates two live contexts. Do not assert this explains the historical blank-rack arcs.

**Shape of the fix:** release → **double `rAF`** → acquire. §6 is explicit that a single `rAF` can
still land in the same compositor frame on iOS, and that two frames (~33ms) is a guarantee rather
than a hope. ⛔ **This inverts the order of the most fragile function in the file** and needs its own
ship plus a device pass on the ×10 Build and aisle round trips (verify items 3 and 4).

⛔ **WHAT `attach` CANNOT HONESTLY SHIP YET, so nobody re-scopes it by accident.** §5's `demote`
keeps an attachment's data and re-renders it **flat**, and no attachment has a flat render path
today. So `update`, `setView` and `promote`/`demote` cannot be backed — shipping them as stubs
would be dead controls (Contract 14). The backable subset is `attach` + `detach` / `suspend` /
`resume` / `state` / `setMode`, plus `RackEngine.interactive`.

**Carried from the blueprint (architecture, still law):** M2-b is owed — `RackEngine.attach`, the
reclaim barrier (I6), modes, the data contract, `Vocabulary` normalisation. M2-a ✅ (`.401`).

**Phase posture: no new features outside the governing spec.** Its add-nothing rule is stricter
than the previous wording: the ONLY permitted data additions are `PHASE_MODEL`, the Event Log and
the Blocker record. Everything else is routing, folding and relabeling of existing capability.

## 3 · Verify debt — ✅ CLEARED 2026-08-10 (one exception)

✅ **`.385`–`.428` RELEASED 2026-08-10.** The consolidated pass in `BATCH-VERIFY.md` is complete:
every item closed or automated. **CALL 0 cap reset to 1 of 6.** 🟡 One exception, open on purpose:
**`.413`** — item 8's empty half has no live example, because `.424` resolved every cabinet in this
Master. A check that cannot be performed is not a check that passed.

✅ **`.376`–`.384` RELEASED** by owner ruling 2026-08-08 (`.377`–`.384` superseded by the
`.385`→`.396` arc; `.376` closed by ruling because no checklist for it ever existed).

The automated baseline has already taken the `.401`/`.402` attachment behaviour, tier composition,
zero overflow and the 44px floors off the human list. What it structurally **cannot** do — and why
the pass survives — is the service worker (will not install in that webkit, 9 tests skip) and
`env(safe-area-inset-top)` (resolves to 0 in the harness).

## 3a · P0 — CLOSED IN CODE, OPEN ON HARDWARE (`v1.14.424`)

⛔ **The owner stop-condition stands: no other milestone resumes until `s4:099` populates on the
physical iPhone.** It is **item 0** of the pass.

**What was wrong.** SITE-HOSTS was the ONLY source of rack components since `v1.6.26` — the first
Master parser ever shipped. Git proves it: the line reading column D has exactly **one** real
commit (the one that wrote it), the host push is byte-identical today, and cables only ever
populated `cablesOut`/`cablesIn`. **This was never a regression — the capability never existed.**
`v1.6.61` even shipped a *host-less cab cabling list* around it.

**Why it mattered here.** In `MASTER-US-WEST-10A-US-SPK03-SPARKS.xlsx`, SITE-HOSTS carries 4,143
rows and **not one is an s4 cab**, while CUTSHEET names 98 s4 racks. **215 of 511 racks (42%) exist
only as cable endpoints.** `s4:099` explicitly holds nine GPU-B300 nodes, eight power shelves, an
SN2201 and a CDU — with model, DNS and RU — and the app said `NO HOST DATA IN MASTER`.

**The fix.** Cable endpoints carry `LOC:CAB:RU` + DNS + MODEL — explicit Master records — and are
normalised into the SAME inventory SITE-HOSTS feeds, so Build and Forge get identical data without
either choosing a source (both read `master_rackToElevation`). Three rules, in order:
**SITE-HOSTS wins** where both describe a U · **dedupe by identity, not by cable** (68 refs → 19
components; one-per-cable would have invented 68 devices) · **provenance kept**
(`SITE_HOSTS` / `CUTSHEET_ENDPOINT`).

**Measured through the real parser:** 511 racks · 7,574 components (4,143 + 3,431) · 28,264 cables ·
`s4:099` = 19 at the exact RUs · `s1:002` unchanged at 19, all SITE_HOSTS · compressed payload
1.36 MB against the ~5 MB quota.

⭐ **NEW STANDING RULE (owner).** Any change to Master parsing, the normalized rack inventory,
storage restoration, `ACTIVE_MASTER`, or RackEngine data binding must keep
`test/e2e/15-dual-source-master.spec.js` green **before it ships**. Its rows are lifted verbatim
from the real workbook and it runs the PRODUCTION parser, not a copy of it. The owner should never
again have to discover that a working rack went empty.

## 4 · Open defects

| # | Defect | Status |
|---|---|---|
| D-1 | **SHIFT is a pillar (Contract A8) but the nav does not carry it.** ✅ **SCOPED, NOT UNANSWERED — the resolution is owner ruling R-02 + R-02a, delivered at M4.** See below | **Scheduled (M4), not open** |
| D-2 | **`.412` was never stamped.** Its desktop-shell work (auto-desktop at ≥1024, notch pill, type sizes) shipped inside `.413`, so a live ship is filed under another ship's title | Live, unverified — pass item 10 |
| D-3 | M2-b step 1b blocked: `TYPE_COLOR` and the flat CSS disagree on **pdu** (gold/green), **storage** (pink/gold), **server** (light-blue/slate). Owner ruled patch/media/unknown stay GREY for now | Blocked on ruling |
| D-4 | Rack-preview control rail wraps 4-then-1 and carries REAR + EXPLODE, which the approved reference does not show | Disclosed `.391`, unruled |
| D-5 | Build metrics layout has never been seen against a populated rack | Disclosed `.391`, unruled |
| D-6 | `handoffDraft` truthiness bug at the `phantom_handoff_v1` read | Deferred to M4 with Shift |
| D-7 | Two RESERVED `.askrow` slots unnamed · `#ff8a00` AUDITS accent off-token · 2 icon assets with 0 refs · inert `.164 body.rd .ask` rule | Cosmetic residue |

### D-1 in full — SHIFT is scheduled, not unanswered

Scoped 2026-08-08 against the approved blueprint. **The nav is two pillars short, not one:** R-02 specifies
**Command · Build · Scan · Tools · Shift**, and *both* `Scan` and `Shift` have zero nav references today.
**`EXIT` is removed** — but per **R-02a**, hold-to-freeze **moves into Shift**; the slot goes, the feature does not.

**SHIFT is undoored, not unbuilt** — 12 `shift_*` functions, a sheet, a hero, a report generator, and
`phantom_shift_end` already hardened through `safeStore` at `.406`. It renders today as one pill on Command.

**Why it cannot be pulled forward: 6 of Shift's 9 questions have sources, 3 have nothing** —
the `Store` write journal (§6.1), the derived readiness gate list, and `PhantomIntelligence.queue` (§7.5)
all measure **0 references** in the live file, and two of the three are **M3 deliverables.** Shift cannot
answer its own questions before M3 exists, which is why the blueprint puts it at M4. Current milestone is
M2, and the standing directive stops broad UI work until M2 passes on hardware.

**Geometry was never the constraint:** 390px − 12px padding ÷ 5 = **75.6px per slot** against a 44px floor.

⛔ **Do not "restore the nav slot" as a quick win.** A pillar door onto a modal that cannot answer 3 of its
9 questions is a dead door under Contract 14, and all of it would be rebuilt at M4.
`01-nav.spec.js:65` pins the **pre-M4** nav deliberately — it is a checkpoint, not a specification.

## 5 · Locks in force

⛔ **RACK SCENE LOCK.** The `camera` term is OPEN. Everything else — materials, the JOHN-LOCKED
light rig, fog, tone mapping, tray geometry/internals, type colours, bezel strips, **floor**,
reflection, boot — is **LOCKED**. No change without a new owner ruling; if a task would touch it,
STOP AND ASK. The floor is UNLIT BY RULING — any sheen/gloss ask is a P0 revert; the lever is the
tile paint, never the lights.

⛔ **DESIGN SYSTEM LOCK** — `PHANTOM_DESIGN_SYSTEM.md`, approved 2026-08-07. R-E: no mass refactor
of the 1116 literals; per-screen only.

⛔ **Legacy deletion (R1)** is gated on census sign-off — `PHANTOM-PUNCH-LIST.md` item 6.
Hide, never cold-delete. Crash-Cart Mode is RETIRED but not physically removed.

## 6 · Regression baseline

`test/e2e` — 9 specs, **128 tests**, `retries: 0`, 5 viewport projects.
Last full run against `.415`: **phone-webkit 119 passed / 9 skipped / 0 failed** (14.9 min).
Skips are environment gates (no service worker in that webkit, `navigator.share` absent, desktop
rail). No *"Expected to fail, but passed"* — every pinned defect still fails as pinned.

`phone-webkit` is the declared primary gate. The full matrix is 640 tests at `workers: 1` ≈ 4 hours.

## 7 · Deployment

GitHub Pages from `main`. Intermittent failure mode of record: `build` ✅ but `deploy` ❌ while
githubstatus is all-green — a transient repo-side lock, **not code**. An empty commit re-triggers.

## 8 · Last physical-iPhone verification

**2026-08-06**, against `v1.14.405` — owner confirmed *"aisle draws and holds"*, closing the
`.390`→`.404` blank-aisle arc. That pass established the aisle renders **and nothing more.**
Everything from `.385` onward remains unverified on hardware.

## 9 · Next action

**Nothing autonomous.** The 11-check device pass is owed and is John's. No feature work is
authorised until it clears.

## 10 · Instruction-surface compaction — 2026-08-08

Applied this session, per owner approval. Live corpus **218,086 → ~66,000 words**; always-loaded
context **5,479 → ~2,000 words**. Nothing deleted — superseded material is in `archive/2026-08-08/`
with a tombstone left at each original path so no reference dangles.

Structural changes worth knowing:
- **`CLAUDE.md` is now contracts + discipline only** (3,652 → 1,233 words). The 2,417-word
  current-state section that lived there — and was stale by seven ships — moved here.
- **Four prose rules became a hook.** `tools/hooks/phantom-guard.js` blocks a commit on broken
  lockstep, non-compiling script, brace imbalance, damaged CRLF, or a backtick in a commit body.
  It replaces a gate that said *"a ship is blocked until lockstep-auditor and data-honesty-auditor
  report PASS"* — **agents that were never loadable from this session's CWD**, which is why
  `BATCH-VERIFY` records *"Agents barred, equivalents run inline"* three times.
- **Memory 64 → 34 files**, merged by failure class.
- Six contradictions found; five resolved, D-1 (SHIFT) escalated to an owner product decision.
