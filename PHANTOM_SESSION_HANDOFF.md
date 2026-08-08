# PHANTOM — SESSION HANDOFF

**One session's worth of continuation. Overwrite this file each session; do not append a log.**
Durable facts belong in `PHANTOM_CURRENT_STATE.md`; durable lessons belong in memory.

---

## Last session — 2026-08-08

**Ended:** clean. Nothing in flight, no uncommitted app code.

### What shipped

**`v1.14.415` — SINGLE-MASTER LAW** (`08430a0` contract + `aad8181` stamps). Live and verified in
the served bytes. Owner ruling: exactly one authoritative Master. Six reachable split-brain paths
closed; the mechanism is an inversion — `PHANTOM_MASTER.replace()` persists first and goes live
second, so a candidate that cannot be persisted never becomes active.

The ship exists because **`.414`'s own overwrite guard created the forbidden state**: `save()`
refused, and the caller assigned the candidate live anyway. It was described in `.414`'s notes as
"costs nothing in-session". It cost the invariant.

### What was cleaned up

- **Verify debt reconciled.** The running tally was wrong — 39 ships, not 29, found by enumerating
  every stamp against git history. `.376`–`.384` **RELEASED** by owner ruling. **30 remain
  (`.385`–`.415`), consolidated into 11 surface-grouped checks** at the top of `BATCH-VERIFY.md`.
- **`.412` was never stamped** — its desktop-shell work shipped inside `.413`. A live ship is filed
  under another ship's title. Still needs verifying; it is pass item 10.
- **Instruction-surface compaction** (this session): archive created, hooks installed, CLAUDE.md
  rewritten, memory consolidated. See `PHANTOM_CURRENT_STATE.md` §10.

### Owner rulings given this session

1. Fold the parser save into commit 1; one stamp `.415`.
2. `.377`–`.384` superseded by the `.385`→`.396` arc — **released**.
3. `.376` — **released** (no checklist for it ever existed; a ruling was the only instrument).
4. **SHIFT stays a pillar** — now Contract A8. The nav does not yet reflect it.
5. Use hooks instead of the blocking-agent gate; apply the compaction.

### Open, needing an owner ruling

- **SHIFT vs the shipped nav.** Contract A8 says pillar; the nav carries EXIT in slot 4 and
  `01-nav.spec.js:65` pins its absence. Restoring SHIFT is a product change nobody has scoped.
- **M2-b step 1b** — blocked on a channel-colour ruling (`TYPE_COLOR` and the flat CSS disagree on
  pdu / storage / server). Step 1 is built and HELD unpushed on branch `m2b-step1-hold`.
- `.391`'s two remaining disclosures: the rack-preview control rail wraps 4-then-1 and carries
  REAR + EXPLODE, which the approved reference does not show; and the Build metrics layout has
  never been seen against a populated rack.

### Next action

**Nothing autonomous.** The device pass is owed and is John's — 11 checks, `BATCH-VERIFY.md`,
top section. No feature work is authorised until it clears (Contract, ship discipline 5).

If asked to continue: the highest-value non-blocked work is **verifying the `.412` desktop-shell
ship** (item 10) since it is live and nobody knows it shipped.
