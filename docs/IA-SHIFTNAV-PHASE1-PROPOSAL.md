# IA-SHIFTNAV — PHASE 1 IA PROPOSAL

**Commission:** `SHIP-HANDOFF-IA-SHIFTNAV.md` Phase 1 (P-1…P-5), amended by Addendum A.
**Owner ruling carried in:** *"Re-scope Ship 1 to findability — the ten tools are buried together;
the smallest honest first ship surfaces them as a group rather than doing Optics alone."*
**Grounded in:** `docs/IA-SHIFTNAV-PHASE0-NAV-CENSUS.md`, measured at 390×844 against `.557`.
**Status:** ⭐ **RULED BY OWNER 2026-08-31.** Design on paper; nothing shipped from Phase 1 itself.

## ⭐ OWNER RULINGS — 2026-08-31

1. **V-1 · VERIFY is a band inside BUILD.** Not a sixth pillar, not Tools. Contract A7 stands:
   Build is the operational center, and verify is the last leg of the job chain.
2. **Ship 1 is 1a · the tool door on BUILD** — the doctrinally correct host, consistent with the
   owner ruling of 2026-08-19 that Build's tool door IS the OPS row.
3. ⛔ **`ops_init` is fixed FIRST, as its own ship, before Ship 1.** The OPS row comes back rather
   than being retired; Ship 1 lands on a working mechanism, not around a broken one.

**Consequent ship order:** `ops_init` repair → Ship 1 (the OPS bay on Build, incl. the OPTIC LEDGER
rename) → Ship 2 (five-pillar dock) → Ship 3 (VERIFY band) → Addendum A8 phases.
Open questions 1, 2 and 5 below are **CLOSED** by these rulings; 3 and 4 remain open.

---

## ⛔ THE RULING THIS PROPOSAL NEEDS FIRST: VERIFY HAS NO HOME

Two organizing schemes are in play, and **they are not the same shape**:

| | Scheme | Source |
|---|---|---|
| **A** | ARRIVE · WORK · **VERIFY** · HAND OFF | this spec's THE MODEL |
| **B** | Command · Build · Scan · Tools · Shift | Contract A8 / R-02, Addendum A3's five-tab dock |

Mapping B onto A: Command = ARRIVE, Build + Scan = WORK, Shift = HAND OFF, Tools = reference,
which is cross-mode and belongs to no shift phase. **VERIFY gets no pillar in either scheme** — yet
it is where Deploy Optics, Audits, Port Map validation and Burndown all live, and it is the mode
this whole spec was commissioned to unstrand.

**This cannot be resolved by design; it is a product ruling.** Three ways out:

- **V-1 · VERIFY is a band inside BUILD.** ⭐ **Recommended.** Contract A7 says Build is the
  operational center, and the phase model already ends in `validation` — verify *is* the last leg
  of the job chain, not a separate destination. Costs no pillar, needs no new art, and keeps the
  five-pillar target intact.
- **V-2 · VERIFY becomes a sixth pillar.** Honest to the model, but contradicts A8's five and
  breaks Addendum A3's five-equal-tab dock. Six 44px targets at 390px is 65px each — under the
  Cold Aisle Filter for gloved hands.
- **V-3 · VERIFY lives in Tools.** Cheapest, and wrong: Tools is reference (works with no
  deployment); these tools are deployment-scoped. It blurs the zero-state test that Design Law 2
  draws.

**Everything below assumes V-1.** If you rule V-2 or V-3, P-1 and P-4 change and I re-author.

---

## P-1 · MODE ASSIGNMENT — every surface from E-1/E-2

| Surface | Mode | Notes |
|---|---|---|
| Command Deck (`#cmd-shell`) | **ARRIVE** | What happened, what's next, alerts |
| Handoff inherited / brief | **ARRIVE** | Currently reached via `cmd_route('work','handoff')` |
| Blockers / issues (`wk-issues`) | **ARRIVE** → acts in WORK | Surfaced on arrival, resolved in work |
| Build workspace (`pg-work`, `wk-deploy`) | **WORK** | The job chain |
| Rack detail | **WORK** | |
| Scan (`wk-scan`) | **WORK** | Pillar in scheme B |
| ISOLATE | **WORK** | Fault path; today an OPS tile |
| BOM · Manifest · Port Map · Rack Map · SOPs | **WORK** | Job-execution tools |
| **Deploy Optics** | **VERIFY** | Optic scan + inventory ledger |
| **Audits** | **VERIFY** | Serials |
| **Burndown** | **VERIFY** | Progress truth |
| **Blast Radius** | **VERIFY** | Power-map check |
| Shift handoff (`wk-handoff`) | **HAND OFF** | |
| Event log · notes · photos | **HAND OFF** | Addendum A7 |
| Optics *reference* · Platforms · CLI/IB · Parts · Know · Compass · Ghost Echo | **utility (cross-mode)** | Tools bay; works with no deployment |
| Master file / Site profile | **utility (settings)** | |
| EXIT / hold-to-freeze | **utility** | R-02a: not a pillar; re-homes into Shift |

Nothing is unassigned. ⚠ **Blockers deliberately straddle** ARRIVE and WORK — you meet them on
arrival and act on them in work. Assigning them one mode would lie about how the shift runs.

---

## P-2 · PRIMARY NAV MECHANISM

**Keep the persistent bottom nav.** Phase 0 measured it healthy at 390: `#rd-botnav` is 122px tall,
four slots at 95×93px, all well clear of the 44px floor. **The nav is not the defect** — what's
missing is any route from it to the ten tools.

Proposed end state, per Contract A8 and Addendum A3: **Command · Build · Scan · Tools · Shift**,
five equal tabs, sliding thumb indicator (~200ms CSS transform), live blocker-count badge on BUILD,
`env(safe-area-inset-bottom)` padding, 44px minimums, PHANTOM's photoreal/glass materials — the
mock's flat aesthetic rejected.

At 390px, five equal slots are **78px wide** — still comfortably above the floor.

📌 **Art dependency is likely already met.** `icons/phantom-nav-scan-v3-256.webp` and
`phantom-nav-shift-v3-256.webp` are on disk (untracked); `sw.js` holds them out of `PRECACHE_URLS`
*"until a consumer draws them"*. Adding them to the dock makes that consumer. **Confirm the art is
the approved cut before the dock ship** — Addendum A3 asked this be flagged early.

⛔ **The dock is NOT Ship 1.** It needs the SHIFT pillar, which needs M3 data (defect D-1), and
EXIT's re-home into Shift (R-02a). That is a later ship.

---

## P-3 · TAP AND SCROLL, BEFORE vs AFTER

⚠ **A scroll column is mandatory.** Every OPS tool is already "one tap" and effectively unfindable;
a tap-count-only table reports this IA as healthy. Scroll is where the defect lives.

| Surface | Now: taps | Now: scroll | After Ship 1: taps | After: scroll |
|---|---|---|---|---|
| Deploy Optics | 1 | **2.9 screens** | 2 | 0 |
| ISOLATE | 1 | **2.9 screens** | 2 | 0 |
| Audits | 1 | 2.7 screens | 2 | 0 |
| Blast Radius | 1 | 2.7 screens | 2 | 0 |
| SOPs | 1 | 2.6 screens | 2 | 0 |
| Burndown | 1 | 2.6 screens | 2 | 0 |
| Port Map | 1 | 2.5 screens | 2 | 0 |
| Rack Map | 1 | 2.5 screens | 2 | 0 |
| BOM | 1 | 2.4 screens | 2 | 0 |
| Manifest | 1 | 2.4 screens | 2 | 0 |

⛔ **Ship 1 trades one tap for three screens of blind scrolling on all ten.** Under P-3's "must not
get worse" rule the tap count formally regresses 1→2, and **I am calling that out in bold rather
than burying it, as the spec requires.** The judgment: a tap you can see beats a tap you cannot
find. If you disagree, that is your ruling to make and Ship 1 changes shape.

Rack detail, Build, Scan, Handoff, Tools and Command are untouched by Ship 1 — no regression.

---

## P-4 · THE DEPLOY OPTICS DOOR

Under V-1, Deploy Optics is a **VERIFY** surface reached through Build's tool door, alongside
Audits, Burndown and Blast Radius.

⛔ **It already has a working door** (`:13914`, `rd_openOpsTool('optics')`, confirmed rendering
10,586 chars). **Ship 1 must not add a second one** — it re-homes the existing door into a findable
place. Two doors to one surface is exactly the "one canonical door" violation Contract A2 forbids.

⚠ **Disambiguation is part of the door, not polish.** Two surfaces are named "Optics": the
*reference* (Tools → OPTICS, 2 taps) and the *deployment tool*. Phase 0 found a tester told to
"find the optics tool" lands on the reference and believes they succeeded. Proposed aisle-language
labels, per Addendum A's rule:

- Reference stays **OPTICS** (fiber, form factors, MPO).
- Deployment tool becomes **OPTIC LEDGER** — what a tech calls the scanned-and-recorded list.

---

## P-5 · SHIP SLICING

**Ship 1 · THE OPS BAY** *(re-scoped per owner ruling — findability, all ten together)*
One visible change: the ten OPS tools gain a findable, grouped entry point; the buried
`#cs-fieldtools` tiles stop being the only route. No changes inside any tool. Includes the
OPTICS/OPTIC LEDGER rename, because shipping the door without it makes the collision worse.

Two candidate hosts — **your ruling**:

- **1a · A tool door on BUILD.** ⭐ **Doctrinally correct under V-1.** Contract A7 (Build is the
  operational center), and it matches your 2026-08-19 ruling that *Build's tool door IS the OPS
  row*. ⛔ **But that row is the disabled `ops_init` path** (`:19204`, off for phone-webkit layout
  and CORS failures). Ship 1a must either fix that or bypass it — which makes it **not the smallest
  ship**, and puts a known-broken mechanism on the critical path.
- **1b · An OPS bay on TOOLS.** Cheapest and lowest-risk: `pg-ref` is one tap from anywhere, is
  already a card grid, and `ref_filterCards` matches on name + meta + aria-label for **any** card in
  the grid wrap — so ten new cards inherit type-to-find for free, which attacks findability
  directly. Does not touch the owner-approved Command Deck composition. ⚠ **Costs conceptual
  purity:** Tools is the reference bay (works with no deployment), and these tools are
  deployment-scoped. Design Law 2's zero-state test says they don't belong there.

**My recommendation: 1a, but only after a small ship that re-enables or replaces `ops_init`.**
1b ships faster and would work, but it puts deployment-scoped tools in the reference bay and we
would be re-homing them again at the dock ship. 1a puts them where the model says they live, once.

**Ship 2 · THE FIVE-PILLAR DOCK** — Command · Build · Scan · Tools · Shift, per A3. Gated on the
SCAN/SHIFT art confirmation and on SHIFT having something to show (D-1 / M3).
**Ship 3 · VERIFY band in Build** — groups Optic Ledger, Audits, Burndown, Blast under one heading.
**Ship 4+ · per Addendum A8's phase map** (A2 NEXT chain, A4 Build items, A5 Scan + D-1, A7 Shift).

Each its own handoff, each held for owner slotting. **No self-scheduling.**

---

## DEVICE-VERIFY FOR SHIP 1 (draft, for your amendment)

1. Cold launch → reach Deploy Optics using only visible UI, **no scrolling hunt**. Count taps.
2. Enter it, leave it, land somewhere sane. Repeat with gloves.
3. Type "opti" in the tool filter (1b) or open the OPS door (1a) — the ledger is findable by name.
4. Nothing else moved: ISOLATE, rack detail, deploy flow at their pre-ship paths.
5. **Stranger test** (this is the point of the spec): hand the phone to someone who has never seen
   PHANTOM, say *"find the optic ledger"*, count taps and seconds. Then *"get me to ISOLATE."*

---

## OPEN QUESTIONS — owner rules, I do not

1. ✅ **CLOSED — V-1.** VERIFY is a band inside Build.
2. ✅ **CLOSED — 1a.** The Build tool door, with `ops_init` repaired first.
3. ⏳ **OPEN — the P-3 1→2 tap regression.** Accepted in exchange for removing three screens of
   scroll? Not yet ruled. ⚠ Ship 1 does not need this answered to proceed, but the device-verify
   wording does, so it must be settled before the Ship 1 verify gate is written.
4. ⏳ **OPEN — OPTIC LEDGER.** Is that the aisle word? The rename rides with Ship 1, so this needs
   an answer before that ship, not before the `ops_init` repair.
5. ✅ **CLOSED.** The OPS row comes back.

---

## BOUNDS

- ⛔ **This is paper.** No code was written, no anchors verified for the patches implied.
  Ship 1 needs its own anchor pass against the then-current stamp before any edit.
- ⛔ **Scroll depths are one measurement** — one seeded deployment, one rack, phone-webkit at
  390×844. A real Master may lengthen the Command Deck and push the tiles further down.
- ⛔ **The five-slot 78px figure is arithmetic, not a measurement.** The dock ship must measure it.
- ⛔ **I have not validated the four-mode model against a real shift.** It is the spec's doctrine
  and I designed to it; whether ARRIVE/WORK/VERIFY/HAND OFF matches how AUS-01 actually runs is
  owner knowledge, not mine.
