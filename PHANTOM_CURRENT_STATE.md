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

## 2 · Milestone

**M2 IN PROGRESS** (`ARCHITECTURE-BLUEPRINT.md`). M0 ✅ · M1 ✅ · M2-a ✅ (`.401`, RackEngine owns
the graphics lifecycle). **M2-b is owed:** `RackEngine.attach`, the reclaim barrier (I6), modes,
the data contract, `Vocabulary` normalisation, and the deletions in spec §8. M3–M6 not started.

**Phase posture: STABILIZATION / UI-FINISH. No new features** (CLAUDE.md ship discipline 5).

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
| D-1 | **SHIFT is a pillar (Contract A8) but the nav carries EXIT in slot 4.** `01-nav.spec.js:65` pins the absence — **that test pins a KNOWN GAP, not a spec.** Revisit it when SHIFT lands | **Needs an owner-scoped product change** |
| D-2 | **`.412` was never stamped.** Its desktop-shell work (auto-desktop at ≥1024, notch pill, type sizes) shipped inside `.413`, so a live ship is filed under another ship's title | Live, unverified — pass item 10 |
| D-3 | M2-b step 1b blocked: `TYPE_COLOR` and the flat CSS disagree on **pdu** (gold/green), **storage** (pink/gold), **server** (light-blue/slate). Owner ruled patch/media/unknown stay GREY for now | Blocked on ruling |
| D-4 | Rack-preview control rail wraps 4-then-1 and carries REAR + EXPLODE, which the approved reference does not show | Disclosed `.391`, unruled |
| D-5 | Build metrics layout has never been seen against a populated rack | Disclosed `.391`, unruled |
| D-6 | `handoffDraft` truthiness bug at the `phantom_handoff_v1` read | Deferred to M4 with Shift |
| D-7 | Two RESERVED `.askrow` slots unnamed · `#ff8a00` AUDITS accent off-token · 2 icon assets with 0 refs · inert `.164 body.rd .ask` rule | Cosmetic residue |

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
