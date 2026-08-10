# PHANTOM — CURRENT STATE

⭐ **THE SINGLE SOURCE OF TRUTH FOR STATE.** Live version, milestone, defects and verify debt are
recorded here and **nowhere else**. Before this file took that role, five documents each claimed a
different live version and none of them was correct. If another doc disagrees with this one, that
doc is stale — fix the doc, do not fork the fact.

**Last updated: 2026-08-09, after `v1.14.425` (Command Deck reaches the phone).**

---

## 1 · Live

| | |
|---|---|
| **Version** | **`phantom-v1.14.426`** (`a4d818d`) |
| Commits | `.416` through `.426` shipped 2026-08-08/09 |
| Stamps | `dct-ios.html` · `sw.js` · `version.json` — all three at `.426` |
| Verified | **`.426` confirmed in the SERVED bytes 2026-08-09** — both stamps plus `MASTER_NORM_VERSION`, `master_migrateStoredNormalization` and `master_normalizeEndpoints`. `.425` was confirmed the same way. `.418`–`.423` were pushed but never re-polled |
| Branch | `main`, in sync with origin |
| Held | `m2b-step1-hold` — M2-b step 1, built, unpushed, blocked on a colour ruling |

Authoritative check: `curl -s https://darkmatter024.github.io/phantom/version.json`

## 1a · GOVERNING PROGRAMME — owner rulings 2026-08-08

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

**Carried from the blueprint (architecture, still law):** M2-b is owed — `RackEngine.attach`, the
reclaim barrier (I6), modes, the data contract, `Vocabulary` normalisation. M2-a ✅ (`.401`).

**Phase posture: no new features outside the governing spec.** Its add-nothing rule is stricter
than the previous wording: the ONLY permitted data additions are `PHASE_MODEL`, the Event Log and
the Blocker record. Everything else is routing, folding and relabeling of existing capability.

## 3 · Verify debt — 40 ships, OPEN · ⛔ P0 ITEM 0 BLOCKS THE REST

**`.385`–`.424`** (minus the never-stamped `.412`) = **40 ships**. **Run the consolidated section at
the top of `BATCH-VERIFY.md` — 19 surface-grouped checks — not the per-ship blocks.** The EIGHT
ships of 2026-08-08/09 added only FOUR checks, because six of them render nothing at all.

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
