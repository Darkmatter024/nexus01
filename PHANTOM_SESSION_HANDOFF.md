# PHANTOM — SESSION HANDOFF

**One session's worth of continuation. Overwrite this file each session; do not append a log.**
Durable facts belong in `PHANTOM_CURRENT_STATE.md`; durable lessons belong in memory.

---

## Last session — 2026-08-09/10

**Ended:** clean. Nothing in flight, no uncommitted code, `main` in sync with origin.
**Live: `v1.14.433`** — confirmed in the served bytes.

### ⭐ START HERE — the one task that was explicitly deferred

**M2-b STAGE 2: THE RECLAIM BARRIER (I6).** Owner: *"do the barrier next session."*
The finding is already in hand and is written up in `PHANTOM_CURRENT_STATE.md` §2 — **read it there
before opening any code.** In one line: `rackElevation_render3D` ACQUIRES the new WebGL context
(`:37719`) roughly 1200 lines before `register()` RELEASES the old one (`:38926`), in the same
function and the same task, so I1 does not hold at the instant of acquisition. The fix is
release → double `rAF` → acquire.

⛔ It inverts the order of the most fragile function in the file. Its own ship, its own device pass
(verify items 3 and 4, the ×10 Build and aisle round trips). ⛔ And `attach`'s `update` / `setView` /
`promote` / `demote` still cannot be honestly implemented — see the state file for why.

### What shipped (10 ships, `.425`–`.433`)

`.425` Command Deck reaches the phone · `.426` stored Masters migrate themselves (derived caches are
not permanent truth) · `.427` the aisle returns the context to its lender · `.428` `--alert`
declared, three dead declarations revived · `.429`/`.430` one colour vocabulary, 2/11 → 8/11, colour
in the accent not the fill · `.431`/`.432` fold-and-revert of a duplicate first-run gate ·
`.433` M2-b stage 1, the data contract.

### Verify debt

✅ **`.385`–`.428` RELEASED**, CALL 0 cap reset to 1 of 6. One stated exception: **`.413` is NOT
released** — item 8's empty half has no live example, because `.424` resolved every cabinet in this
Master. A check that cannot be performed is not a check that passed.

### Seven new specs

16 normalization-migration · 17 re-import idempotence · 18 tap window + crash banner ·
19 design tokens + picker · 20 vocabulary · 21 first-run gate · 22 data contract.

### ⚠ Three mistakes worth not repeating — all the same shape

Every one was **acting on the absence of evidence rather than on evidence**, and each correction was
smaller than the mistake, which is the tell that each was avoidable by reading first.

1. **Six verify items were sent to the owner that a harness could do.** *"The harness SKIPS this"*
   was read as *"this needs hardware."* `05-offline` skips on `phone-webkit` because that browser
   never installs a service worker; the same suite runs 13/15 on `desktop-chromium`.
   ⭐ Owner ruling now in `CLAUDE.md`: **Claude owns automated verification.**
2. **`.429` put colour in `background`** without reading the `.229` rule four lines away that says
   these blocks are a dark tray with a colour ACCENT. It painted solid slabs. Fixed in `.430`.
3. **`.431` built a duplicate first-run gate** because a grep for the SPEC'S NAME (`siteSetup`)
   found nothing. The feature is `firstRun_*` and `launch()` names it in one line.
   ⭐ **Before building any flow, read the function that runs at the moment that flow would start.**

### Open, in the order recommended

1. **The reclaim barrier** (above) — deferred to this session by the owner.
2. **M2-b remainder** — `attach` (backable subset only), modes, then the §8 deletions LAST.
3. **Workstream 3 — CONTEXT-CHIP.**
4. **Owner's own:** the PHASE-ENGINE step text. Placeholder by design; inventing thirty
   authoritative-looking commissioning steps would be fabricated telemetry wearing a checklist.
5. **One-commit question, still unanswered:** `SHIP-TECH-FLOW-V2-FROZEN.md` — the document
   `CLAUDE.md` names as the programme of record — lives ONLY in `Downloads`. Outside version
   control, undiffable, and unreachable from a session that cannot see that folder.

### Machine note

The dev box could not produce a trustworthy full-suite run in one pass: 18 failures across a 1.0h
run that ALL passed on isolated re-runs (`08` 17/17, `02` 12/12), and the failing set moves between
runs — WebGL context exhaustion, not code. ⭐ **Re-run a Forge/WebGL spec ALONE before treating a red
full run as a regression.** A reboot is the cheap first try.
