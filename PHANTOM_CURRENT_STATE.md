# PHANTOM — CURRENT STATE

⭐ **THE SINGLE SOURCE OF TRUTH FOR STATE.** Live version, milestone, defects and verify debt are
recorded here and **nowhere else**. Before this file took that role, five documents each claimed a
different live version and none of them was correct. If another doc disagrees with this one, that
doc is stale — fix the doc, do not fork the fact.

**Last updated: 2026-08-08, after `v1.14.415`.**

---

## 1 · Live

| | |
|---|---|
| **Version** | **`phantom-v1.14.415`** |
| Commits | `08430a0` (contract) + `aad8181` (stamps) |
| Stamps | `dct-ios.html` · `sw.js` · `version.json` — all three at `.415` |
| Verified | Served bytes confirmed on Pages 2026-08-08, not just the stamp |
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
auto-credited to the Site Lead. This SUPERSEDES the earlier architecture-reset wording
("name = configured Site Lead, role = Site Lead"), and `v1.14.417` implements the split.

## 2 · Milestone

**Programme: `SHIP-TECH-FLOW-V2-FROZEN.md` (see §1a).** Workstream 1 = PHASE-ENGINE, not started.
Workstream 2 = SITE-PROFILE, **partially landed ahead of order**: `v1.14.417` ships S0 (the root
record + migration + identity split), which is inert scaffolding rather than UI. ⚠ **Logged as a
deviation, not resolved**: the spec says each step gates the next, and S0 is workstream-2 work
that landed before workstream 1. It was authorised directly by the owner before the spec arrived.

**Carried from the blueprint (architecture, still law):** M2-b is owed — `RackEngine.attach`, the
reclaim barrier (I6), modes, the data contract, `Vocabulary` normalisation. M2-a ✅ (`.401`).

**Phase posture: no new features outside the governing spec.** Its add-nothing rule is stricter
than the previous wording: the ONLY permitted data additions are `PHASE_MODEL`, the Event Log and
the Blocker record. Everything else is routing, folding and relabeling of existing capability.

## 3 · Verify debt — 30 ships, OPEN

**`.385`–`.415`** (minus the never-stamped `.412`). **Run the consolidated section at the top of
`BATCH-VERIFY.md` — 11 surface-grouped checks — not the per-ship blocks.**

✅ **`.376`–`.384` RELEASED** by owner ruling 2026-08-08 (`.377`–`.384` superseded by the
`.385`→`.396` arc; `.376` closed by ruling because no checklist for it ever existed).

The automated baseline has already taken the `.401`/`.402` attachment behaviour, tier composition,
zero overflow and the 44px floors off the human list. What it structurally **cannot** do — and why
the pass survives — is the service worker (will not install in that webkit, 9 tests skip) and
`env(safe-area-inset-top)` (resolves to 0 in the harness).

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
