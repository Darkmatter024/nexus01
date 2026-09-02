# IA-SHIFTNAV v2 — PHASE 1 PROPOSAL (P-1…P-5)

**Commission:** `SHIP-HANDOFF-IA-SHIFTNAV-v2.md` §5. Phase 0 (v1 census + E-8/E-9/E-10) is the
evidence base; `docs/IA-SHIFTNAV-V2-PHASE0-EVIDENCE.md` is the anchor of record.
**Baseline:** `main` @ `c412bdc`, **`phantom-v1.14.563`**.
**Status:** ⛔ **PROPOSAL ON PAPER. NOTHING SHIPS FROM PHASE 1.** No code, no anchors re-cut.
**Owner rulings this proposal is built on (all 2026-09-01):** E-8 — the tools stay doors, no data
change · model depth — the deployment step stays, the picker resolves it · ISOLATE is not dangerous ·
SCAN is v2 §2 · SCAN-PILLAR retired.

---

## §0 · THE MEASUREMENT THE MODEL-DEPTH RULING REQUIRED

> *"Phase 1 measures it before drawing the picker."*

**Rack labels CAN collide across deployments. Record ids cannot.** From `deploy_seedRacksAndPhases`:

```js
var rackId = 'rack_' + deployment.id + '_' + idx;   // the RECORD id
allRacks.push({
  id: rackId,                              // embeds deployment.id -> GLOBALLY UNIQUE
  deploymentId: deployment.id,
  rackId: sr.name || ('Rack-' + (idx + 1)), // the LABEL, straight from the Master -> NOT scoped
  ...
});
```

⭐ **This resolves the residual in the picker's favour, with one condition.** `deploy_loadRacksFor(deployId)`
filters by `deploymentId`, and the working precedent at `:24005` searches **only the active
deployment's racks**. Inside one deployment a duplicate label is a Master data defect, not an app
defect. **So the picker is safe exactly as long as it scopes its search to the active deployment.**

⛔ **THE CONDITION, AND IT IS THE PICKER'S ONE HARD RULE:** if the picker ever offers
cross-deployment search, it owes a **disambiguation**, never a silent pick — Contract B14. A
scanned `s4:099` that exists in two deployments must ask, not choose.

---

## P-1 · ASSIGNMENT — NOTHING UNASSIGNED

### Rack-scoped (inside the rack screen)

| surface | why it qualifies at zero data cost |
|---|---|
| Five phases (MECH → PWR → NET → COMP → VAL) + checks | already rack-scoped |
| Devices list + U per row | `slot.uStart`/`uEnd` already render at `:41800` |
| Assign · QR · log note · photo evidence · flags | already on the rack screen |
| **ISOLATE** | sessions carry `rackId` — the only rack-keyed tool |
| **RACK MAP** | rack-*addressed by input*; seedable with the current rack, no store touched |
| `SEE IN AISLE` | **already exists** as `OPEN AISLE` `:41699` |

### Short-list doors (§1's list, kept)

Load / switch Master · **Rack picker** · Shift handoff · SYS · Exit (gesture, not a slot).

### Tool doors — KEPT, per the E-8 ruling

OPTIC LEDGER · AUDITS · BURNDOWN · BLAST RADIUS · MANIFEST · BOM · PORT MAP · SOPs.

⭐ **They do not move.** They stay in the **OPS row on Build**, which is already their canonical
door under the owner ruling of 2026-08-19 (*Build's tool door IS the OPS row*), restored at `.558`
and completed at `.559`. **This is the cheapest possible answer: the assignment is "no change."**

### Closed

| closed | what covers it instead |
|---|---|
| `#cs-fieldtools` (`:13912`) — second path to the same ten tools | the OPS row on Build, same `rd_openOpsTool` door |
| Command as the "status museum" first screen | the rack picker, per §2 |

⚠ **`#cs-fieldtools` is not a free close** — see P-4.

---

## P-2 · THE RACK SCREEN

```
┌──────────────────────────────────────────┐
│ ‹ BACK          s4:099          [flags] │   rack label + blocker count
├──────────────────────────────────────────┤
│  MECH ▸ PWR ▸ NET ▸ COMP ▸ VAL           │   phases spine — the job chain,
│  ●●●●●─────────────────────               │   current phase lit
├──────────────────────────────────────────┤
│  DEVICES (8)                    expanded │   ⭐ default OPEN (Ship 1 of
│   ┌────────────────────────────────────┐ │   RACK-ELEVATION-DEMOTE)
│   │ SW-LEAF-01   U42–U43        [TAG] │ │   sorted U descending
│   │ SRV-COMP-14  U12            [TAG] │ │   U — when unrecorded
│   │ …                                  │ │   ≥44px rows
├──────────────────────────────────────────┤
│  [ OPEN AISLE › ]                        │   exists at :41699
├──────────────────────────────────────────┤
│  ASSIGN    QR    LOG NOTE    PHOTO       │   rack actions, ≥44px
├──────────────────────────────────────────┤
│  ISOLATE · DOWN-LINK                     │   ⛔ NO destructive styling —
│                                          │   owner ruling, it is not dangerous
├──────────────────────────────────────────┤
│  RACK MAP (this rack)                    │   seeded with the current rack
└──────────────────────────────────────────┘
```

⛔ **What is deliberately NOT on this screen:** a `TOOLS` band listing the eight kept doors. That is
the chip row relocated, not closed — the §6 gate names it as the archetypal false-progress move.
The eight stay one level up, on Build's OPS row.

---

## P-3 · DOCK AND TAP COUNTS

**Proposed dock:** `RACKS` · `SHIFT` · `SYS` — three slots, per §2. Exit stays a hold gesture.
Scan lives on the rack and on the picker, never as a slot (ruled).

⚠ **Three slots at 390px is 126px each** — far above the 44px floor and *better* than today's 95px.
The `.530` label risk that forced COMMAND→DECK **evaporates at three slots**, which is why that
ruling is probably moot (recorded, not assumed).

### Tap counts — measured baseline, projected after

| action | now | after | note |
|---|---|---|---|
| Reach a rack from cold launch | 3 | **2** | picker is the first screen |
| Devices + U for this rack | 3 | **2** | expanded by default |
| ISOLATE for this rack | 4 | **3** | on the rack, not the row |
| RACK MAP for this rack | 4 | **3** | seeded |
| Any of the eight tools | 4 | 4 | ⛔ **unchanged — E-8 ruling** |
| Aisle view of this rack | 4 | 4 | already exists |
| Shift handoff | 3 | **2** | dock slot |
| Scan a device into this rack | 4 | **2** | on the rack |
| Scan a rack label to open it | — | **2** | new capability, on the picker |
| Exit / freeze | 1 hold | 1 hold | unchanged |

⛔ **The "now" column is projected from the `.557` Phase 0 census plus the `.558`/`.559` changes,
not re-measured at `.563`.** Phase 0's own table is the named baseline. **The ship that lands any
of this re-measures before and after** — every number here is a design target, not evidence.

⚠ **`03-tools:499` pins a stricter promise than the accepted trade.** It asserts ops tools are *one
tap from the Build landing* and is still an expected-failure at `.563`, because `48-ops-row-exists`
confirms the row is **collapsed at boot** — its doors are not visible until the tech taps OPS. The
owner accepted the 1→2 tap trade at `.559`. **The pin therefore encodes a promise the ruling has
superseded, and will stay red forever describing a defect that is no longer one.** It should be
re-pinned to the accepted standard or retired — an owner call, flagged here, not taken.

---

## P-4 · DOOR LEDGER

| path today | after |
|---|---|
| Command first screen (status museum) | **closed** — picker is first |
| `#cs-fieldtools` → ten tools (`:13912`) | **closed** |
| Build → OPS row → ten tools | kept — the one canonical tool door |
| Build workspace | kept, reached from the rack/picker |
| Tools bay (`pg-ref`) | kept — reference, zero-state |
| Shift handoff | kept, promoted to a dock slot |
| SYS | kept, promoted to a dock slot |
| EXIT dock slot | **closed as a slot** — stays as a hold gesture |
| `OPEN AISLE` `:41699` | kept — **not re-opened as `SEE IN AISLE`** |
| Rack picker | **new** — but it replaces the Command first screen, not an addition |

**Net: −3** (Command-as-first-screen, `#cs-fieldtools`, EXIT's slot) **against +1** (the picker,
which replaces what it closes). **Honest net: −2, and one of those is a slot rather than a
destination.**

⛔ **THIS IS THE ACHIEVABLE NET, AND IT IS SMALLER THAN v2 IMAGINED — SAID PLAINLY PER §7.** The
E-8 ruling keeps eight tool doors, so the closable set is duplicate *paths*, not the tools. **No
number is manufactured to satisfy P-4's own rule.**

⚠ **`#cs-fieldtools` is the only genuine tool-door close, and it has a measured cost** recorded at
`.559`: removing it *"would break `03-tools`' order-sensitive wall assertion **and** strip desktop
tool access at ≥1024."* **So it cannot simply be deleted.** Either the desktop keeps a path (making
this a re-home, not a close, and the net drops to −1), or the owner rules desktop tool access
expendable. **That is P-4's one open question.**

---

## P-5 · SHIP SLICING

Smallest honest sequence. One visible change each. **None is authorised by this document.**

| # | ship | why here | risk |
|---|---|---|---|
| **1** | **DEVICES defaults expanded, sorted U-descending, Cold Aisle sizing, explicit `U —`** | RACK-ELEVATION-DEMOTE Ship 1, already specced and measured; the U ranges already render at `:41800`. Closes no door but makes the rack screen the place the U data lives | **low** — one `<details>` attribute, a comparator that already exists at `:41086`, and sizing |
| **2** | **Rack picker becomes the first screen after Master load** | the single biggest §0 move; retires the status museum | **medium** — new surface, must scope search to the active deployment |
| **3** | **Dock → `RACKS · SHIFT · SYS`** | three slots, EXIT loses its slot and keeps the gesture | **medium** — nav change, one device verify, `01-nav` re-pins |
| **4** | **ISOLATE + RACK MAP onto the rack screen, seeded** | the only two tools that can be rack-scoped at zero data cost | low-medium |
| **5** | **`#cs-fieldtools` disposition** | needs P-4's open question ruled first | **held** |

⭐ **Ship 1 is deliberately not a door change.** §5 asks for "the most doors closed for the least
code," but under the E-8 ruling the door-closing ships all carry surface risk, and Ship 1 is the one
that makes the rack screen *worth* landing on — which every later ship depends on. **Stated as a
deviation from §5's suggestion rather than silently reordered.**

---

## BOUNDS

- ⛔ **Paper. No code, no anchors re-cut.** Every `file:line` here is carried from
  `docs/IA-SHIFTNAV-V2-PHASE0-EVIDENCE.md` at `.563` and must be re-verified by the ship that uses it.
- ⛔ **P-3's tap counts are design targets, not measurements.** The "now" column is projected from the
  `.557` census plus `.558`/`.559`; nothing was re-measured at `.563` and nothing was measured on a
  device.
- ⛔ **P-2's layout is a sketch of order and grouping, not a visual design.** Spacing, type and
  materials come from `PHANTOM_DESIGN_SYSTEM.md`, which is the lock.
- ⚠ **P-4 has one open question** (`#cs-fieldtools` versus desktop tool access) and **P-3 has one**
  (whether `03-tools:499` is re-pinned or retired). Both are owner calls and neither is taken here.
- 📌 **The picker's one hard rule is in §0 above:** scope the search to the active deployment, or owe
  a disambiguation. It is repeated in P-5's Ship 2 risk column because that is where it bites.
