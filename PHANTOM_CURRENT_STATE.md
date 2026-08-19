# PHANTOM — CURRENT STATE

⭐ **THE SINGLE SOURCE OF TRUTH FOR STATE.** Live version, milestone, defects and verify debt are
recorded here and **nowhere else**. Before this file took that role, five documents each claimed a
different live version and none of them was correct. If another doc disagrees with this one, that
doc is stale — fix the doc, do not fork the fact.

**Last updated: 2026-08-13, after `v1.14.455` — LOCKED RACK MODE is now a canonical front elevation.
Proven by automation; ⏳ AWAITING HARDWARE. The batch before it (`.438`–`.453`) is cleared.**

---

## 1 · Live

| | |
|---|---|
| **Version** | **`phantom-v1.14.462`** (`f94203d`) |
| Commits | `.416`–`.453` shipped 2026-08-08/12 · `.454`–`.459` shipped 2026-08-13 · `.460`–`.462` shipped 2026-08-14 |
| Stamps | `dct-ios.html` · `sw.js` · `version.json` — all three at `.462` |
| Verified | ✅ **`.438`–`.453` CLEARED ON HARDWARE 2026-08-12** — owner: *"clear"*, six-check walk in `BATCH-VERIFY.md`, run against his real Master. Prior served-byte checks retained below. **`.438` confirmed in the SERVED bytes 2026-08-11** — merge step 2 present, with the QR door referenced from BOTH the detail and Build (the additive state this step is meant to be in). `.425`–`.437` each confirmed the same way; `.434` was verified by ORDERING rather than presence — `rackElevation_render3D` release@1013 acquire@7629, `forge3d_render` release@845 acquire@1548, both reversed before that ship |
| Branch | `main`, in sync with origin |
| Held | `m2b-step1-hold` — M2-b step 1, built, unpushed, blocked on a colour ruling |
| Verified | ✅ **`.454`–`.456` CLEARED ON HARDWARE 2026-08-13** — all six checks passed one at a time |
| Verified | ✅ **`.457`–`.459` CLEARED ON HARDWARE 2026-08-14** — both passes. **The SW UPDATE P0 is closed: one tap, `.458` → `.459`, data intact** |
| ⏳ Open | **`.460`–`.462` — CALL 0 cap 3 of 6.** ✅ `.460` SHIFT door passed 2026-08-14 (§1i) · ✅ `.462` Home card art passed 2026-08-19, §23 with it (§1k) · ⏳ **`.461` CONTINUE is the only leg still open** (§1j) |
| 🟡 Staged | **`.463` PASTE ANYTHING — BUILT, GATED, NOT PUSHED** (§1l). Eight commits ahead of origin; three stamps at `.463`; `phantom-guard` exit 0; 60 tests green on **phone-webkit**. Owner parked the push. **Live is still `.462` until it goes.** |

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

## 1b · ⭐ RACK RENDERER PROGRAMME + FORGE PARITY — COMPLETE AND DEVICE-VERIFIED 2026-08-12

Governed by `reference/PHANTOM_RACK_RENDERER_UPGRADE.md` (owner directive, imported to the repo
with its mockup and both hashes recorded). Baseline, findings and the corrected reference analysis
are in `R1-RENDERER-BASELINE.md`; the parity staging is in `FORGE-PARITY-PLAN.md`.

**R1** baseline · **R1-D** `.442` the rack came above the fold (visible pixels 0 → 176) ·
**R2** `.443` cabinet depth RD 4.5→9.0 · **R3** `.444` families stop inventing state ·
**R4** `.445` material reuse + powder coat · **R5** `.446` light rig onto the palette ·
**R7** `.447` camera framing · **R6** `.448` LOD verified + CDU is cooling · **R8** `.449` polish ·
`.450` coolant plumbing gated · **P1** `.451` geometry extracted · **P2** `.452` focused aisle rack
canonical · **P3** `.453` whole foreground window canonical.

⭐ **MEASURED END TO END, like for like.** The pre-programme build (`.441`) was checked out and run
against the IDENTICAL 19-device s4:099 seed: meshes 1610→1416, geometries 1547→1353, materials
351→306, triangles 57,200→51,542, draw calls 484→417. **Every count went down** — the rack looks
substantially better and costs ~14% fewer draw calls than before the programme started.

⛔ **THE DURABLE FINDING, worth more than the visuals: the renderer had been asserting four things
the Master never said.** Fabricated switch-port state drawn with `Math.random()` and reshuffled
every render · green blinking LEDs claiming per-device health against telemetry PHANTOM does not
receive · a CDU rendered, labelled and tallied as a PDU · coolant manifolds and pipes on every rack
including air-cooled ones. All four are now gated on real data or removed, and each is pinned by a
spec that was proven to catch it.

⭐ **THE RULE THAT CAME OUT OF IT, now in the source:** STATE colours (green/amber/red) may NOT be
used decoratively; ACCENT colours (cyan/violet/teal) MAY carry family identity; nothing blinks,
whatever its colour. And randomness is a defect when it decides what the rack DEPICTS — never when
it places atmosphere.

📌 **What the programme did NOT do, deliberately.** §26's floor reflection was NOT actioned: the
floor is a `MeshBasicMaterial` taking no light, no env and no shadow because `receiveShadow` was
REMOVED to kill a sweeping specular pool, and the subtle reflection §26 asks for is the wet clone
that already ships. Adding a contact shadow would revert a documented fix. The baked aisle face
(`DEPLOY_FORGE_FACE_B64`) was NOT retired: it is still referenced by the thirteen background shells
and empty pads, which §33 rules should stay cheap context.

## 1c · ⭐ `.454` — FORGE IS RACK-CENTRIC (owner ruling 2026-08-12). AUTOMATION GREEN, HARDWARE OPEN

The aisle was a free orbit that happened to start pointed at a rack: drag mutated yaw and pitch,
pinch and wheel mutated radius, and **nothing ever put them back** — so focusing the next rack only
slid `camX` sideways and inherited whatever angle the last drag left. Two technicians on the same
floor could read the same cabinet from different places and neither was the framing the rack was
designed to be read from. `LOCK_YAW`/`LOCK_PITCH`/`LOCK_RADIUS` are now the canonical framing —
**the values `setFocus` was already targeting**, so the locked view IS the view the product already
chose; what changed is that every navigation restores it. `walk()` routes through `setFocus`, so
the arrows and flanks inherit it through the same door.

⭐ **WALK AISLE is a MODE, not a setting.** Default off, `aria-pressed`, lit cyan while engaged.
⛔ **Deliberately NOT persisted and NOT a preference** — a stored camera lock would make the aisle
behave differently for two technicians on the same floor. Leaving snaps back to the framing of the
rack the tech is **nearest to**, not the one focused on entry.

⛔ **THE DEFECT THIS SHIP FOUND IN ITS OWN FIRST CUT, and the file already had the rule.**
`setWalkMode` hand-wrote `#tagState`, which has **one writer per SHAPE** (`writeStatusPills`) — a
rule recorded there because a caller once put a concatenated string into a pill that owns a single
clause. Worse: **`setFocus` early-returns when the rack is already focused**, which is exactly what
a look-around-and-come-back lands in, so the *common* exit wrote the rack LABEL into the pill that
owns `n/m RACKED · ⚠n FLAGGED` — duplicating `#tagId` and dropping the flagged warning until the
next focus change. Fixed by lifting the write into `writeStatusForRack` and routing the mode banner
through `writeStatusMessage`.
⭐ **The generalisation, worth more than the fix: when you add a second caller to a function with an
early-return guard, work out which path is actually COMMON.** The guarded path was not the edge case.

📌 **Camera-target vars were authored ~500 lines below the two functions that write them**, safe only
because every caller runs async. Colocated with `camTargetX`/`radiusTarget` above both writers.

⚠ **DISCLOSED AND UNRULED — in locked mode a drag moves nothing**, and the hint still hides itself
on drag, so the gesture reads as dead. WALK AISLE is one tap away. Whether a locked drag should
*say* so is a product call and is **not** to be invented.

**Runs (phone-webkit, each spec ALONE):** `36-forge-rack-centric` 4 · `02-build-forge` 14 (incl. the
×10 round trip, one live context every round) · `08-forge-layout` 17 passed / 1 skipped.
**Gates:** `phantom-guard` exit 0 — three-stamp lockstep at `.454`, inline blocks compile,
`node --check sw.js`, valid JSON, brace balance, 0 bare LF.

## 1d · ⭐ `.455` — LOCKED RACK MODE IS A CANONICAL FRONT ELEVATION (owner ruling 2026-08-13)

⛔ **`.454` LOCKED THE WRONG POSE, and the owner caught it on hardware.** It froze the camera at the
angles `setFocus` had always targeted — `LOCK_YAW 0.10`, `LOCK_PITCH 0.08` — and called them
canonical. That is **5.7° of yaw and 4.6° of nose-down pitch**: a three-quarter shot held steady, so
the cabinet leaned, its rails converged and the neighbour competed with it. ⭐ **Locking a pose and
having a canonical one are different things, and "the values the product already used" was not
evidence that those values were right.** The owner's instruction was explicit and correct — fix the
MODEL, do not nudge world coordinates until one rack looks acceptable.

**Three more faults in the same function, all found by reading it rather than by the report:**
· a bare `+ 0.4` on the eye's y with **no matching target offset**, tilting the axis even at pitch 0,
so the rails could never project as vertical · the look target was `(camX, RH*0.5, 0)` — the eased
camera x plus the **hardcoded aisle origin**, i.e. derivation from world origin, not from the rack
· FOV **46°**, a cinematic aisle lens on what is an inspection surface.

**The model now.** Solved from the selected rack every frame and from nothing else:
`target` = rack world centre · `normal` = `(0,0,1)` through `getWorldQuaternion` (so a rotated slot
would still read square) · `position` = `target + normal * distance` · world up + `lookAt` ⇒ yaw,
pitch and roll zero by construction. ⭐ **`position.y === target.y` makes the axis HORIZONTAL, and
that is the entire reason vertical rails project as vertical lines.** No read of previous camera,
previous rack, accumulated pan, orbit state or origin.

📌 **The usable viewport is MEASURED.** The canvas is not the visible area — the scene-utility rail
hangs into its top-right and the bottom stack covers its foot. `lockUsableRect` reads both from the
DOM at the moment of use (`:13544` records what happens when that clearance becomes a constant), and
`setViewOffset` slides the **projection** onto the usable centre. ⛔ **Recentring by moving the
camera would reintroduce the exact yaw the mode exists to remove** — the projection is the only
honest lever. Same mechanism buys label headroom with **zero degrees of pitch**.

⛔ **THE DEFECT MEASUREMENT FOUND, and the durable shape of it.** The first cut snapped the ease on
**total 3-D distance**. Every rack shares one canonical y and z and only x differs, so the large x
delta held the whole vector above threshold: y and z never snapped and crept `1.8869 → 1.8971 →
1.89925` across a walk — **a camera height that depended on how many racks you had visited.**
⭐ **When several axes share one convergence test, the axis with the largest delta decides for all of
them.** Snap PER AXIS. The first lock is also instant now, because Forge opening must *present* the
canonical pose, not glide into it from wherever the camera was constructed.

**Measured at 390×844:** `s1:010 −4.70` · `s1:001 −2.35` · `s4:100 0` · `s4:099 +2.35`, every one at
**y 1.9, z 10.32353, forward (0,0,−1), roll 0**. The cycle out and back returns bit-identical.
Vertical framing corrected from a measurement, not by eye: at `LOCK_BIAS_Y 0.06` the shot had 63px
of slack above the label and 16 below the feet in a 620px band, so the cabinet stood on the bottom
edge with its base under the hint; `0.023` splits it 40/25.

📌 **Deliberately NOT done: orthographic.** The ruling permitted it. It would thread a second camera
type through RackEngine, the light rig and the fog — all under RACK SCENE LOCK, where **only the
`camera` term is open**. A 34° perspective already gives square verticals because the axis is exactly
horizontal and centred; the remaining convergence is on the NEIGHBOURS, which is honest depth, not
distortion of the selected rack. No second renderer.

🟡 **Known cleanup, deliberately not shipped.** The camera is still *constructed* at `46` and
reassigned to `LOCK_FOV` immediately after, so a stale literal survives in the source while the
runtime FOV is 34 (spec 37 asserts it). Fixing it is a pure refactor with no runtime effect and
would cost a version bump purely to keep version identity honest — it belongs to the next ship that
touches this function.

**Runs (phone-webkit, each spec ALONE):** `37-locked-rack-pose` 4 · `36-forge-rack-centric` 4 ·
`02-build-forge` 14 · `08-forge-layout` 17 + 1 skipped. **Gates:** `phantom-guard` exit 0.

## 1e · `.456` — THE HANDOFF CARD ART STOPS FABRICATING STATUS

The shipped raster baked readable status into the image: `RACK BUILD Complete`, `CABLE REPORT
Complete`, `POWER CHECK Complete`, `INTAKE SYNC Complete`, `READY FOR HANDOFF`. **None of that is
data PHANTOM has** — fabricated completion state rendered as real, on the card a tech taps to reach
the handoff flow. Contract 10, and it had been shipping behind an owner override of the
honesty-lock hold. The replacement carries no readable text and no logo, so **the override is
retired rather than renewed.**

⛔ **WHAT THIS SHIP DOES NOT CLAIM, recorded so nobody reads it as a completed brief.** The owner's
brief also asked for a ticked checklist, rack status blocks and a port-map detail on the tablet
screen, and for the exchange to read unmistakably as one hand releasing while the other receives.
**The delivered art has none of the three widgets and the grip still reads as two people holding.**
It shipped because the honesty fix is live-affecting while the rest is aesthetic refinement.

📌 **No image tooling on this box and none was installed** — no `cwebp`, `sharp` or ImageMagick.
Playwright's Chromium did the conversion via `canvas.toDataURL('image/webp', 0.86)`: 2172×724 /
1468 KB PNG → **1170×403 / 44 KB**, the 39px cover-crop taken entirely from the LEFT because a
centre crop would eat the receiving hand while the left is empty black by design. ⭐ **That is the
reusable raster path on this machine.**
⚠ New `-v2` filename because overwriting a precached asset in place serves the old bytes.
**Device verify needs the PWA removed and re-added, not a reload.**

## 1f · ⭐ SHIP-CONTEXT-INJECT-369 V3 — RESCOPED BY OWNER RULING 2026-08-13

The frozen spec (`Downloads/SHIP-CONTEXT-INJECT-369-V3-FROZEN.md`) was written without sight of
live code and **§1 and §6 describe building what already exists.** Owner ruled: execute the
INTENT against live code, report deviations. ⛔ **Do NOT build a second site-profile store.**

**Already built — do not rebuild:** `SITE_PROFILE_KEY = 'phantom_site_profile_v1'` :24091 (the
spec's exact key, on a **V2** schema via `siteProfile_migrateV1toV2` :27128, so §1.1's
`schemaVersion: 1` would REGRESS it) · `siteProfile_load/save/isConfirmed/resetToDefaults` ·
`siteProfile_getContextBlock()` :27548 = §1.2's `toPromptBlock()` · `siteProfile_showEditor()`
:29561 = §7's editor · **`activeContext_getContextBlock()` :27668 is already the single choke
point** and its own comment says so · **§6's call sites are already wired** at :36365, :46801,
:47812, :49064, :49465, :50000, :53042.

**The genuinely new ship:** the §3.1 honesty guard header (absent — the block starts straight into
`SITE PROFILE —`) · §3.2 token cap, boundary-only truncation, drop order · §3.3 deterministic
MASTER slice · §4 evidence discipline · §5 `AI_PERMISSION` + `assertAIPermission` (**confirmed
absent**) · §7 CONTEXT PREVIEW · and four JobState fields.

**§2.1 field mapping — the gate, answered:**
· **Already emitted:** SITE · DEPLOYMENT · ACTIVE RACK
· **INCLUDE (new):** PHASE (`phantom_phase_model_v1`; ⚠ emit state, never the placeholder step
prose) · AUDIT (`phantom_audits_v1`, `phantom_active_audit`, `phantom_deploy_audit_v1`) ·
LAST SCAN (`phantom_scan_collection` :23152) · SHIFT/OPERATOR (`phantom_current_user_v1`,
`phantom_identity` — **credit the ACTOR, Contract 9a**)
· **INCLUDE degraded:** MANIFEST — `phantom_manifest_last_deploy` :31880 holds a deployment **id
string only**, so a presence flag is all it can honestly say
· ⛔ **EXCLUDE:** BOM match % (no computed figure exists; §2.2's own condition unmet) · PORT MAP
(no persisted state key) · BURNDOWN (**no `phantom_burndown_*` key**)
⭐ **BURNDOWN is the honesty trap in this spec.** Open counts ARE derivable from
`phantom_deploy_issues_v1` / `phantom_discrepancies_v1` / `phantom_blockers_v1` — but labelling
that "BURNDOWN" binds a panel to a NAMED SOURCE rather than to the truth. It ships as
`OPEN ISSUES / BLOCKERS` or not at all. **Owner ruling still owed on the label.**

✅ **SHIPPED AS `.457` — 2026-08-13.** The device pass cleared, the hold was spent, and the owner
ruled the last open label (`OPEN ISSUES / BLOCKERS`). See §1g.

## 1g · ⭐ `.457` — THE CONTEXT ENGINE SHIPPED (369 V3, rescoped)

`buildContext()` is the single entry for all **7** AI calls. Honesty guard header first and
**never dropped**, then the existing site/deployment block, `jobState_snapshot()`, a deterministic
MASTER slice, then caller `extra` — under ~2200 tokens, truncating **only at line boundaries** with
`[+N more records omitted]`. ⭐ **A prompt cut mid-record hands the model half a fact that reads as
complete**, which is worse than omitting it. `AI_PERMISSION = 'READ'`; `assertAIPermission` runs at
the choke point; SUGGEST and CHANGE both throw and **CHANGE has no implementation path anywhere.**

⛔ **IT WRAPS THE EXISTING DOOR — there is no second site-profile store and no second choke point.**
Anyone reading the frozen spec later will find §1 and §6 describing work that was already done;
that is why §1f exists.

**Three honesty decisions inside the field set, all recorded because each one is a place the spec
asked for a number the app does not have:**
· **`OPEN ISSUES / BLOCKERS`** (owner ruling) — the counts are real; "BURNDOWN" is not a record
· **`AUDITS RECORDED`** — the spec asked for "N warnings"; **no warning count is computed anywhere**,
so emitting one would invent a figure
· **`MANIFEST`** degraded to a presence flag — its key holds a deployment id string and nothing else
· **BOM match % and PORT MAP excluded outright** for having no backing source

⛔ **THE PLACEHOLDER TRAP, and it would have been invisible.** `PHANTOM_PHASE_MODEL` seeds every
step with the label *"step not yet defined for this site"* because real commissioning procedure is
site knowledge the app does not have (§2). Emitting those labels would have fed a model fabricated
procedure wearing a checklist — and it would have READ as authoritative. **PHASE emits state only**,
and spec 38 pins that the placeholder string can reach neither the snapshot nor the prompt.

📌 **`OPERATOR` resolves through `identity_getUser()`, never `phantom_current_user_v1` directly.**
:24106 records that the raw key was a SECOND persisted answer to "who is working", demoted to a
migration fallback — reading it here would have resurrected the split-brain `.418` deleted.

📌 **CONTEXT PREVIEW is built by CALLING `buildContext`, not by describing it.** A preview from a
second code path would eventually disagree with what actually ships, which would make the one
surface built for debugging attribution the thing that lies to you.

⚠ **Deliberate deviation:** the callers' system prompts are NOT routed through `extra`. Each site
concatenates its whole feature prompt after the context block and `extra` is capped at 500 tokens,
so routing them would have silently truncated the instructions that make each feature work. **The
~2200 cap governs the context ENGINE's output; the feature prompt is separate and always was.**

**Runs:** spec 38 (7) · `10-site-profile-root` (18) · `03-tools` (28), each ALONE.

## 1h · ⛔ `.458`/`.459` — P0: THE SW UPDATE BUTTON DID NOT COMPLETE THE UPDATE

Reported on a real installed iPhone PWA at `.457`: the purple **SW UPDATE** control appeared and
tapping it did not move the app to the new build. Owner's **case C compounded with case F** — a
badge shown with no worker waiting, and a reload answerable by a stale shell.

⛔ **ROOT CAUSE: `sw.js` called `skipWaiting()` during INSTALL, so a worker NEVER reached
`waiting`.** Everything downstream was built on the assumption that it did, and each fault hid the
next: the app posted `SKIP_WAITING` only `if (reg.waiting)` — therefore never · **`sw.js` had no
`message` listener**, so the message had no receiver either way · **there was no `controllerchange`
listener anywhere in the app**; the reload was a blind **80ms `setTimeout`**, which on a real phone
always fires before a worker can take control · and `phantom_versionFileBackstop` forced the badge
on a `version.json` mismatch alone, so it could appear with nothing installing and nothing waiting.

⭐ **A SIXTH FAULT MADE THE RELOAD UNRELIABLE EVEN IF THE REST HAD WORKED.** Navigations were
*described* as network-first but called plain `fetch(event.request)`, which uses the **default HTTP
cache mode** — Pages serves these with a `max-age` — so the browser's own cache could return the OLD
shell **while reporting success**. Separately `version.json` was served **cache-first** from
`PRECACHE_URLS`, so the backstop meant to catch stalled detection was answered out of the old
build's own cache. ⭐ **`cache: 'no-store'` is an HTTP directive and does NOT bypass a service
worker** — that mistake is easy to repeat.

**The fix is one path:** install → **WAIT** → badge only if `phantom_swActionable()` finds a waiting
worker → one tap → `phantom_swApplyUpdate()` (the single door; the byte-identical copy inside
`sw_pillTap` is deleted) → `SKIP_WAITING` → the new message handler promotes it → activation →
**one gated `controllerchange`** → **one** reload. Navigations fetch `cache:'reload'`; `version.json`
is network-first. The control shows `UPDATING…`, ignores repeat taps, and on failure restores itself
and says why.

⛔ **TWO DEFECTS THE NEW SPEC CAUGHT INSIDE THIS SHIP, both mine, and the second is the one to
remember.** First: the failure path called `sw_pillRefresh` to restore the control, but the honesty
guard added in the same change refuses to paint UPDATE with nothing waiting **and** refuses to touch
a `busy` pill — so a failed activation left the button reading `UPDATING…` forever. *The guard
against dishonesty reintroduced exactly it.* Second, and worse: **the `controllerchange` listener
was ungated.** On a first load there is no controller, so `clients.claim()` moves the page from
uncontrolled to controlled and fires `controllerchange` by itself — **the app reloaded itself on
every first load.** `05-offline` caught it as a page silently resetting mid-test; in a cold aisle it
is an app rebooting under a technician's hands for no visible reason. The reload is now gated on
`_swUpdating`: it happens only as the completion of an update the technician asked for.
⭐ **Proven by stash-and-rerun** — baseline passed, the change failed, and after the gate `05-offline`
returned to its documented 13 passed / 2 skipped. **That is the technique for "is this mine?".**

📌 **`.459` is a NO-OP TEST PAYLOAD — three stamps, a two-line code diff, no behaviour change.** It
exists so the update mechanism can be verified with nothing else able to explain a version change.
⚠ **It only proves anything if the device is already RUNNING `.458`.** A device on `.457` is still on
the broken path and will jump straight to `.459` without exercising the fix.

**Runs:** spec 39 — **7 passed on desktop-chromium AND 7 on phone-webkit** · `05-offline` 13 passed /
2 skipped on desktop-chromium. ⭐ **The lifecycle is automatable because Chromium installs service
workers** — the standing lesson that "the harness skips it" is not "it needs hardware".

## 1i · ⭐ `.460` — THE SHIFT WALK: ITS DOOR WAS DEAD

Owner-queued 2026-08-11, walked 2026-08-14 by **opening the surfaces**, not reading their CSS.

⛔ **SHIFT WAS NOT UNDOORED — IT WAS DEAD-DOORED, and the record said otherwise.** D-1 read *"It
renders today as one pill on Command."* It rendered nowhere a technician could see.
`shift_openSheet` had **exactly one caller in the entire app** — an onclick on `#cc-shiftpill` —
and that pill measured **0×0, unreachable at 390 AND 1440**, because it sits inside `.lens` →
`#cc-center`, both `display:none`. `.lens` is the pre-`.425` phone composition the Command Deck
replaced; the pill was left inside it, in the retired `cc-` Crash-Cart namespace.
`shift_renderHero()` wrote into that hidden node successfully on **every clock tick** — no warn, no
toast, and **no way for a technician to set a shift end at all.**

⭐ **THE FIRST RE-HOME LANDED IN A SECOND HIDDEN NODE, and that is the durable part.** `.382` had
left a note saying the microbar slot `#cs-shift` was where "Phase 2 re-homes it properly", so that
is where it went — and **`.cs-microbar` is itself `display:none` at 390** (`:58507`, the same phone
rule that hides `.cs-hd`). Present, wired, correct and dead, exactly like the pill it replaced.
**Spec 40 caught it only because it measures GEOMETRY and hit-testing rather than presence.** A test
asking *"is the control there and wired"* would have passed through both defects.
📌 **The door is now `#cs-shiftbar`, a row in `#cs-grid` — the deck's own flow container — where
visibility is STRUCTURAL: it cannot be switched off by a composition rule without being visibly
removed.** The microbar keeps its clock and `cmd_clock` stays its only writer.

📌 **TWO THINGS ARE BOTH CALLED "SHIFT". Do not conflate them** (also corrected in D-1). What ships
is a **shift-END timer** — 6 AM / 6 PM / +12h / custom / clear, a healthy sheet, 6 controls all
≥44px. The **9-question SHIFT pillar** D-1 argues about is a different, larger concept. Making the
timer reachable does not advance the pillar.

✅ **SITE/SYSTEM PASSED ITS WALK AND NEEDED NO CODE.** 13 visible controls, **zero dead handlers,
nothing under 44px**, contents purely administrative. The brief's specific suspicion — operational
features misplaced on an administrative surface — was **unfounded**. The walk also confirmed `.457`
live there: honesty guard, evidence rule, SITE PROFILE block, `JOB STATE: OPERATOR`, token count.

⚠ **Disclosed, not fixed:** a `"Loading storage metrics…"` line that never resolved during the walk
(verify on device before calling it a defect) · `"CONTEXT INJECTION ACTIVE"` names **three** AI
surfaces when `.457` wired **seven** — understated rather than false, but now inaccurate copy on an
honesty-adjacent panel.

## 1j · `.461` — BUILD'S CONTINUE CAN NO LONGER FAIL SILENTLY

Reported: CONTINUE on BUILD / FIELD MODE looked active and did nothing. State `s1:002` ·
*Platform not in Master* · Phase 1 of 5 MECHANICAL · 0%.

⚠ **THE HONEST BOUND ON THIS SHIP: that state REPRODUCES CLEANLY in the harness and CONTINUE
WORKS.** 326×56, hit-tests to itself, `pointer-events: auto`, nothing covering it, calls
`deploy_showRackDetail` without throwing, host renders 390px with a back control. **This ship does
NOT claim to have fixed the reported failure and must not be read as having done so.** What it
fixes is why that failure was **invisible**.

⛔ **THREE SILENT EXITS ON ONE PATH:**
· `deploy_showRackDetail` held a bare `if (!c) return;` — **and bailed AFTER its side effects**:
`ops-detail` on `<body>`, `nav_push`, `activeContext_setRack`, `stripeView_setRack`,
`wakeLock_evaluate`. **The app believed it had navigated to a rack detail it never drew**, and the
CTA's own `try/catch` could not help because *nothing throws*.
· `deploy_ensureDeployPanelVisible` gave up silently when the deploy sub-tab button was absent,
leaving the host switched off for a caller about to render into it.
· **Nothing checked that the render landed anywhere visible.** `innerHTML` into a hidden or
zero-height host succeeds perfectly — the recorded *silent-success-into-a-hidden-node* class.

**Fixed surgically:** the missing-host return warns, toasts the reason, and **clears `ops-detail`**
so the app stops believing it navigated · the missing sub-tab warns · a **deferred `rAF`** measures
the host after `innerHTML` and reports a hidden or zero-height render.
⚠ **The `rAF` defer is load-bearing** — measuring synchronously at `innerHTML` reports a false zero
on a host that is about to lay out correctly.

⭐ **AN ENVIRONMENT ARTIFACT NEARLY PRODUCED A FIX FOR NOTHING.** The first diagnostic seeded storage
then reloaded **after** boot, which re-showed the splash and left `#pe-tapcatch` (its full-screen
`inset:0` catcher) over the page. `elementFromPoint` duly reported the splash intercepting CONTINUE
— **which looks exactly like the reported symptom.** Seeding through the fixture made it vanish.
**Prove an environment artifact is not the cause before fixing what it appears to show.**

## 1k · `.462` — HOME CARD ART: SHIFT HANDOFF AND SITE PROFILE (owner directive 2026-08-14)

Asset replacement, **not a redesign**. No logic, routing, Master state, handoff data, Site Profile
data or navigation changed.

**Was:** the stylised portal / transfer-machine panel `phantom-feat-handoff-v2.webp` on **two**
handoff surfaces — the Work→Handoff hero and the Command Deck FIELD OPERATIONS tile — and the
**PLATFORMS** art in the Site Profile sheet's hero slot, which described a sub-section of that sheet
rather than the sheet.
**Now:** `icons/phantom-feat-handoff-v3.webp` on **both** handoff surfaces (one canonical source)
and `icons/phantom-feat-siteprofile-960.webp` on the Site Profile hero.

⛔ **A STANDING OWNER OVERRIDE IS RETIRED, AND THAT IS RECORDED IN PLACE RATHER THAN DONE QUIETLY.**
The old handoff art shipped baked `SOURCE_SYNC 88% / STEP 4 OF 9` under an explicit **2026-07-21**
ruling whose comment read *"do NOT correct it back."* The new directive retires that image and
forbids baked labels, percentages and fake telemetry in this artwork. **The later ruling wins; the
override is spent, not ignored** — and the code comment now says so, so nobody restores the old art
citing the old permission. ⭐ **Neither replacement carries any readable text**, which also means
this art no longer needs an honesty-lock exception at all.

📌 **NO NEW DOORS.** §8 asked for the Site Profile artwork on a Site/System hero and forbade
creating a duplicate door to show it. **That hero slot already existed** — the asset swapped in
place and no surface was added.

**Sizing, and why the attributes moved.** Both are 960×540 — 3× the 320px `.pfeat__art` actually
renders at — and both keep the sources' native 16:9, so `height:auto` lays them out undistorted.
⚠ **The `width`/`height` attributes moved from `720×720` to `960×540`**: left square they would have
reserved the wrong box and shifted layout on load.

📌 **Converted through Playwright's Chromium canvas at q0.88** — the path proven at `.456`, since
there is no `cwebp`/`sharp`/ImageMagick here and none was installed. **238 KB JPG → 43 KB · 1822 KB
PNG → 56 KB.** The 1.8 MB source would otherwise have gone into `PRECACHE_URLS`. Both retired assets
stay on disk, orphaned-but-retained per repo precedent; only their precache entries went, which also
keeps the `?legacy` rip cord byte-compatible.

**Measured at 390×844:** Site Profile hero **320×180, ratio 1.778** — exactly the source aspect.
Command Deck tile **324×209** under `background-size:cover` with the tablet exchange centred, and
`.cs-op-scrim` already supplies the dark gradient the card text needs, so **no new overlay was
invented**. No failed image requests.

⚠ **NOT VERIFIED, and it is a device check:** the **Work→Handoff feature hero measured 0×0** in the
harness because that sub-surface did not come up from the automated door. The asset is wired and
loads; its on-screen framing is unconfirmed.

## 1l · 🟡 `.463` — PASTE ANYTHING: BUILT AND GATED, PUSH PARKED BY OWNER

One door that does not make the technician name the format first. Paste a port map, elevation, CLI
output, BOM CSV or vendor EDP into one box; PHANTOM says which of the five it looks like, offers
**one** route, and opens that parser **with the text already in it**. ⛔ **It classifies and never
parses**, and every one of the five keeps the door it already had — no parser was modified, no
second engine added, no existing route removed (Contract A2).

⭐ **THE DURABLE FINDING — STRUCTURE SEPARATES A PASTE FROM A SENTENCE; VOCABULARY CANNOT.** Three
fix rounds each narrowed keyword rules and each was defeated by a fresh phrasing — *and* each
narrowing started refusing REAL pastes (a port map under a comment banner, a CLI echo behind a
capture timestamp). ⛔ **Prose can always contain the keywords, so that line has no good point on
it.** Real pastes are line-oriented, repetitive and delimited; prose is sentences. A structural gate
now runs ahead of all format scoring and carries the false-positive load, which is what lets the
format rules stay generous enough for messy real data. **A lone sentence cannot classify however
many trigger words it holds.**
📌 Round 4 applied that same principle to the one rule exempted from it: the EDP `^field:` anchor
was never the weak part — **the QUANTITY of evidence it was asked to carry was.** One field plus the
acronym is a status note *about* an EDP; fields are now counted.

⛔ **`bw-on` HIDES THE WHOLE WORK BANNER STACK, AND THIS SHIP ONLY DISCOVERED IT — IT DID NOT CAUSE
IT AND DID NOT FIX IT.** `bw_render()` adds `bw-on` to `#pg-work` in **all three** of its routing
branches and **nothing in the file ever removes it** (3 adds, 0 removes); it runs on every
`showMode('work')`. So `body.rd #pg-work.bw-on #work-grid { display:none }` (:58425) hides the
five-row stack — DEPLOY · SCAN · HANDOFF · MASTER FILE · **OPS and its nine tools** — from the first
Work visit onward. **OWNER RULING OWED:** was `#bw-shell` (`.385`) meant to supersede the banner
landing (`.359`)? The PASTE door was built inside `#bw-shell` because of it; a row in the stack
would have been present, wired, correct and **dead** — the SHIFT-pill defect a third time.
⭐ **How it was caught, and this is the reusable method: the row measured 0×0, and the SIBLINGS were
measured BEFORE the markup was touched.** All four shipped banners and the OPS row read 0×0 too,
which says *the container is hidden*, not *this control is broken*. **A 0×0 on a new control is only
evidence about that control once its neighbours are proven non-zero.**

⚠ **A STALE CLAIM WAS INHERITED AND REPEATED — RECORDED SO IT DIES HERE.** The session ledger said
`phone-webkit` was **down machine-wide** on a `libegl.dll` system-runtime gap, and that was carried
into three commit messages before anyone retested it. **It launches and runs green.** The ship is
verified on the primary gate after all: spec 42 (6), spec 43 (12), `03-tools` (28), `01-nav` (14) —
**60 passed on phone-webkit**. ⛔ **Retest an environment claim before inheriting it into a ship
record**; "the harness is broken" is exactly the kind of assertion that gets copied forward unread.

📌 **Deviations from the authored briefs, all found by reading live code first:** the tenth
`ops-cell` would have broken a 3×3 wall of exactly nine and falsified its own *"Nine tools on this
build"* copy · no shared sheet-positioning selector existed to join (profile and errors each held a
byte-identical copy, so one was extended rather than a third added) · a parse-time
`addEventListener` IIFE became an `oninput` attribute, since an ordering assumption is how controls
die · and the router's unconditional `box.value = text` now **states** an overwrite of hand-entered
content (Contract 11).
⚠ **`.bnr` cannot be used without art, deliberately** — its own background is the missing-raster
hatch, authored so a 404 "looks WRONG instead of empty". PASTE is a `.pasterow` control strip.

**Gates:** three stamps at `.463` · `phantom-guard` exit 0 · `node --check sw.js` · valid JSON ·
0 bare LF · 0 mojibake · inline blocks compile.

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

## 3 · Verify debt — ⏳ `.460`–`.462` OPEN (3 of 6). Everything before it is cleared

✅ **(a) `.460` — the SHIFT door. PASSED on hardware 2026-08-14.** The shift-end timer is reachable
in production for the first time; the row was confirmed rendering on the deck in the `.462` capture
too (`SET SHIFT END · "Not set — the countdown stays off until you do"`).

⏳ **(b) `.461` — CONTINUE on Build.** ⭐ **Every outcome is informative.** It opens → good. It says
*"Build surface is not mounted"* or *"drew off-screen"* → that names the cause. **It stays
completely silent → that rules out all three instrumented paths and points at pointer interception
on real iOS, which the harness cannot see.** Report which.

✅ **(c) `.462` — the Home card art. PASSED on hardware 2026-08-19.** All three surfaces carry the
new photographic art with no portal/machine panel surviving, **including the Work→Handoff hero —
the one leg automation could not reach.** ⭐ **§23 is proven with it:** the pass required updating
onto `.462` first, so a normal SW UPDATE demonstrably replaced the **cached** old artwork rather
than leaving the machine panel in place.

✅ **`.457`–`.459` RELEASED ON HARDWARE 2026-08-14.** Both passes cleared.

⭐ **THE SW UPDATE P0 IS CLOSED.** One tap took the installed iPhone PWA from `.458` to `.459` with
field data intact, no reinstall and no Safari cache clearing. **Delivery works again**, which is
the precondition for every ship after this one.

📌 **The test worked because `.459` was a deliberate no-op** — three stamps, a two-line code diff —
so nothing but the update mechanism could account for the version moving. ⭐ **To verify a delivery
mechanism, ship a payload that can prove nothing except the thing under test.**

✅ **`.454`–`.456` RELEASED ON HARDWARE 2026-08-13.** All six checks passed. Cap was reset to 0 of 6
and `.457` takes it to 1.

⚠ **`.455` exists because `.454` failed its device look** — the owner reported the locked rack
reading off-axis with the neighbour competing. **No assertion in `.454` could have caught it: every
one tested that the camera did not MOVE, never that it was SQUARE**, so a frozen crooked pose
satisfied all of them. Spec 37 now owns that contract with bounds that exclude the old constants.
⭐ **That is the durable shape — a suite can be fully green on a feature that is visibly wrong when
the assertions test the wrong property.**
Everything a suite could reach was proven first, per the standing rule that the owner is not the
test harness. What is left genuinely needs a real GPU and a real hand: whether every rack *arrives*
at the same framing across a walk, and whether "nearest rack" feels right on leaving WALK — the
latter is a product judgement, not an assertion.

### Historical — the batch before it

✅ **`.438`–`.453` RELEASED ON HARDWARE 2026-08-12.** Sixteen ships, ten past the cap: the
phase-card merge (`.439`/`.440`), the context fix (`.441`), the renderer programme R1-D→R8
(`.442`–`.450`) and Forge parity P1→P3 (`.451`–`.453`). **CALL 0 cap reset to 0 of 6.**

⭐ **What that pass uniquely bought, because it is the part no suite could reach:** real safe-area
(the harness resolves `env(safe-area-inset-top)` to 0, so the fold position was genuinely
unverified), the **asynchronous iOS GPU reclaim** behind `.441` — the whole reason a rack could be
live in one surface and blank in another — and sustained thermals across a ten-rack aisle walk.
Everything else in the batch was proven by automation first, per the standing rule that the owner
is not the test harness.

### Historical — the previous clearance

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
| D-3 | ✅ **RESOLVED — verify the entry, not the memory.** The pdu/storage/server disagreements were settled by the `.429` bay-canonical ruling (pdu gold, storage pink, server light-blue) and are pinned green by `20-vocabulary` at 8 of 11 codes. The **cooling** half was the last open piece and is closed by the 2026-08-12 CDU ruling: `cdu` is its own display key on the ruled cooling green. patch/media/unknown still GREY per the standing 2026-08-06 ruling | **Closed 2026-08-12** |
| D-4 | Rack-preview control rail wraps 4-then-1 and carries REAR + EXPLODE, which the approved reference does not show | Disclosed `.391`, unruled |
| D-5 | Build metrics layout has never been seen against a populated rack | Disclosed `.391`, unruled |
| D-6 | `handoffDraft` truthiness bug at the `phantom_handoff_v1` read | Deferred to M4 with Shift |
| D-7 | Two RESERVED `.askrow` slots unnamed · `#ff8a00` AUDITS accent off-token · 2 icon assets with 0 refs · inert `.164 body.rd .ask` rule | Cosmetic residue |

### D-1 in full — SHIFT is scheduled, not unanswered

Scoped 2026-08-08 against the approved blueprint. **The nav is two pillars short, not one:** R-02 specifies
**Command · Build · Scan · Tools · Shift**, and *both* `Scan` and `Shift` have zero nav references today.
**`EXIT` is removed** — but per **R-02a**, hold-to-freeze **moves into Shift**; the slot goes, the feature does not.

⛔ **RECORD CORRECTED 2026-08-14 BY AN ACTUAL WALK — the sentence here was wrong, and it had been
informing this ruling.** It read *"It renders today as one pill on Command."* **It did not render
anywhere a technician could see.** `shift_openSheet` had exactly ONE caller in the whole app — an
onclick on `#cc-shiftpill` — and that pill measured **0×0 and was unreachable at every viewport,
390 and 1440 alike**, because it sits inside `.lens` → `#cc-center`, both `display:none`. `.lens` is
the pre-`.425` phone composition the Command Deck replaced; the pill was left inside it, and `cc-`
is the retired Crash-Cart namespace besides. `shift_renderHero()` wrote into that hidden node
successfully on every clock tick — no warn, no toast. **Fixed at `.460`: the door is `#cs-shiftbar`,
a row in the deck's own flow container.**

📌 **AND TWO THINGS ARE BOTH CALLED "SHIFT". Do not conflate them.** What ships is a **shift-END
timer** (6 AM / 6 PM / +12h / custom / clear) — a healthy sheet, 6 controls, all ≥44px. The
**9-question SHIFT pillar** this D-1 entry argues about is a different, larger concept. The timer
being reachable does not advance the pillar, and the pillar's data gaps do not affect the timer.

**SHIFT-the-pillar is undoored, not unbuilt** — `shift_*` functions, a sheet, a hero and
`phantom_shift_end` hardened through `safeStore` at `.406`.

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

✅ **2026-08-14, against `v1.14.459`.** Both passes of the `.457`–`.459` batch. **Pass A closed the
SW UPDATE P0** — one tap moved the installed PWA from `.458` to `.459`, reloading once, clearing the
badge, and leaving Site Profile, Active Master and rack/work/event data intact; no reinstall, no
Safari cache clearing. **Pass B** cleared the context engine: every line of CONTEXT PREVIEW traced
to a real record, no blank-stubbed rows, no placeholder step text in the prompt.

⭐ **Pass A is the most load-bearing device verification in this file, because it verifies the
DELIVERY of every future one.** While it was broken, no ship could reach the phone by the intended
route. ⭐ And it was only conclusive because the payload was a no-op — nothing but the mechanism
could have moved the number.

### Historical

✅ **2026-08-13, against `v1.14.456`.** All six checks of the `.454`–`.456` pass, reported one at a
time: the rack dead straight and square on S1:008 · no framing drift across ten racks · a locked
drag moving nothing · WALK AISLE lighting cyan and freeing the camera · leaving it snapping back
onto the nearest rack with its `n/m RACKED` count restored · and the HANDOFF card showing the new
art with no readable words after a PWA remove-and-re-add.

⭐ **Check 1 is the one that mattered most, because it was the owner's own defect report re-looked
at.** A camera that is mathematically square still has to LOOK square on a real panel. Check 5
confirmed a product judgement — that "nearest rack" feels right — and check 6 required a real iOS
PWA reinstall, because a precached raster does not yield to a reload.

### Historical

✅ **2026-08-12, against `v1.14.453` — owner: *"clear"*.** The consolidated six-check walk in
`BATCH-VERIFY.md` was run on the phone against his real Master and passed: the rack visible above
the fold without scrolling, reading as matte steel with real depth; the rack drawing on BOTH Build
and the rack detail across the round trip; a phase run end to end landing where it started; ASSIGN
from Build staying on Build; and the aisle front row all real cabinets across a ten-rack walk with
no slowdown and no heat spike.

⭐ **This is the pass the whole `.439`→`.453` arc was waiting on, and it is the first hardware
confirmation of the iOS-only behaviour nothing in the harness could reach** — real safe-area (the
harness resolves `env(safe-area-inset-top)` to 0), the asynchronous GPU reclaim behind `.441`, and
sustained thermals across a ten-rack aisle walk.

*(Prior: 2026-08-06 against `v1.14.405`, which established only that the aisle renders.)*

## 9 · Next action

**PARKED ON `.462`. Nothing autonomous.** ⏳ **CALL 0 cap 3 of 6** — see §3. One of the three
(`.460`) has already passed.

⭐ **The `.461` check is a DIAGNOSTIC, not just a pass/fail.** The reported CONTINUE failure does
not reproduce in the harness, so the useful outcome is *which* message appears — or that none does.
Silence would eliminate host resolution, sub-tab reveal and hidden-host rendering in one report.

Open, none started, all owner decisions:
- **The `"Loading storage metrics…"` line** and the **`CONTEXT INJECTION ACTIVE` copy naming 3 of 7
  AI surfaces** — both found in the `.460` walk, both disclosed and unfixed (§1i).
- **The locked drag says nothing** (§1c) · **the FOV literal** (§1d) · **the HANDOFF gesture** (§1e).
- **369 follow-ons:** the auto-detecting paste parser is the spec's own named next candidate; the
  EVIDENCE UI card waits for response formats. ⛔ Next-best-action, readiness scores, Rack
  Intelligence and auto-handoff each need data-reality scoping first — **the `.457` field inventory
  is the model for how to do that.**
- **The R1-D remainder** · **PHASE-ENGINE step text** · **M3 data sources**. ⛔ D-1 is the LAST
  domino — and note §1i corrected the sentence D-1 was partly resting on.

Open items, none started, all needing an owner decision first:
- **The locked drag says nothing** (§1c) — disclosed unruled since `.454`. ⛔ Do not invent a fix.
- **The FOV literal** (§1d) — pure refactor, no runtime effect; fold into the next ship that
  touches `placeCamera`.
- **The HANDOFF art gesture** (§1e) — the exchange still reads as two people holding rather than
  one releasing. Aesthetic, and the honesty fix already shipped.
- **369 follow-ons the spec itself listed as non-goals:** the auto-detecting paste parser is named
  the strongest NEXT candidate; the EVIDENCE UI card waits for response formats to stabilise.
  ⛔ Next-best-action, readiness scores, Rack Intelligence and auto-handoff each need their own
  data-reality scoping first — the `.457` field inventory is the model for that.
- **The R1-D remainder** (rack at 176px vs §30's 270–320) · **WALK SHIFT and SITE/SYSTEM**
  (owner-queued 2026-08-11, never started) · **PHASE-ENGINE step text** · **M3 data sources**.
  ⛔ D-1 is the LAST domino, not the first.

⚠ **One ruling is owed and it is small:** the locked drag does nothing and says nothing (§1c). It is
disclosed, not fixed, because the answer is a product call.

📌 **Owner-queued, not started — the HANDOFF feature-hero art.** An updated `icons/phantom-feat-
handoff-v*.webp` was briefed 2026-08-13 (unmistakable two-technician exchange; screen reads as a
deployment handoff package; no readable text). ⛔ **No image generation exists in this session** —
no `GEMINI_API_KEY`, and the `design` skill's generators emit SVG, not photoreal edits — so the
asset is the owner's to produce. When it lands: new `-vN` filename (overwriting in place serves
stale), move the `sw.js` PRECACHE entry (`:84`) to the new name, three-stamp bump, and iOS needs the
PWA removed and re-added to show it. ⭐ The brief's "no readable text" moves this art back INTO
data-honesty compliance — the current one ships baked decorative text under an owner override.

Open items, none of them started, all needing an owner decision first:
- **The R1-D remainder.** The rack sits at **176px** visible where the directive's §30 recommends
  270–320. The arithmetic is in `R1-RENDERER-BASELINE.md` §3: 651px of column above the fold, 475
  of it spent before the rack. The only block big enough is the hero, whose phase sub-block is the
  same fact already shown by NEXT ACTION *and* by the phase dock. Removing a triplicated fact is a
  product decision.
- **PHASE-ENGINE step text** — still placeholder by design; real per-platform commissioning
  procedure is site knowledge the code does not have. Owner's.
- **M3 data sources**, which gate Shift → the nav pillar → D-1. The nav complaint is the LAST
  domino, not the first.
- **The SHIFT and SITE/SYSTEM walks** — owner-queued 2026-08-11, never started. See the handoff.

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
