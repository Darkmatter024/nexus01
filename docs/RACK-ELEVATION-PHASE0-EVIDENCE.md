# RACK-ELEVATION-DEMOTE — PHASE 0 EVIDENCE

**Commission:** `SHIP-HANDOFF-RACK-ELEVATION-DEMOTE.md` Phase 0 (E-1…E-5).
**Baseline:** `main` @ `f28b0b3`, **`phantom-v1.14.563`** — ⛔ **not** the `.562` the handoff names.
**Method:** verified source, direct grep against the live file. No graph, no probe, no device.
**Status:** EVIDENCE ONLY — no design, no patches, nothing shipped. Ship 1 is not started.
⏳ **E-6 and E-7, added by Addendum A, are NOT answered here.** They gate Ship 3 only.

---

## ⛔ HEADLINE: SHIP 1 IS MOSTLY ALREADY SHIPPED, AND S-14 CANNOT BE EXECUTED

Two findings outrank everything below.

**1. The U information the spec is built to preserve is already on screen.** S-1 asks that every
device row gain a U-position element. `:41800` already emits it. What actually remains of Ship 1 is
sorting, default-expanded, Cold Aisle sizing, and an explicit `U —` for unrecorded values. **Ship 1
as written would re-deliver done work** — the same shape as `.559`, and it should be narrowed and
say so rather than narrowed quietly.

**2. S-14's grep gate is unreachable.** Addendum A directs that the renderer be deleted with *"zero
references."* It has **five** call sites and only two are rack-detail; the other two are the Command
Deck hero's fallback and a **public method on `RackEngine`**, which is under R-05. See E-1.

---

## BASELINE DRIFT — RE-ANCHOR BEFORE QUOTING

The handoff states baseline `.562` and forbids assumed anchors. `.563` shipped after it was written
and removed four net lines from `dct-ios.html`. Offsets for anything quoted against `.562`:

| region | shift |
|---|---|
| before `:9962` | 0 |
| `:9962` – `:9995` | −1 |
| `:9996` – `:16612` | 0 |
| `:16613` – `:19262` | −1 |
| after `:19265` | −4 |

**Every anchor in this document is against `.563` and was re-verified by grep, not carried over.**

---

## E-1 · THE ELEVATION CARD

⭐ **It is the FLAT 2D path. RACK SCENE LOCK does not apply to it.**

| | |
|---|---|
| Container chain | `.rack-hybrid` (flex) → `.rack-hybrid-canvas#reh3dCanvasHost` → `#rehFlatWrap.reh-flat-wrap` → `#rackCanvas` |
| Built at | `:41710-41712` (redesign branch) · `:41714` (legacy branch) |
| Renderer | **`rackElevation_buildHtml`, `:40903`** |
| Data in | `rack.slots[]`, `totalU = rack.totalU \|\| 42` |
| Filter | `:40910-40916` — drops `uStart == null`, and drops any slot spanning **≥80%** of the rack as a placeholder |

⚠ **The two call sites are `if`/`else`, not two draws.** `_rehRd` selects redesign or legacy. Only
one renders. There is no duplicate elevation from this path.

### The `.557` guard is not where the handoff expects it

It is at **`:39246`**, inside `rackElevation_ensure3D` — *"resolve the mount before touching the
class, and bail if it is gone."* ⛔ **That is the 3D path, which rack-detail no longer calls:**
`.531` removed `#reh3dMount` and the `reh3d_restore(rack)` call with it. The guard protects other
callers and is **shared**. S-6's *"remove the `.557` guard if it now guards nothing"* is therefore
based on a false premise — it still guards something, just not this surface.

### ⛔ THE RENDERER IS SHARED — FIVE CALL SITES

| line | consumer | in scope? |
|---|---|---|
| `:23705` | `cmd_rackHeroFlat` — Command Deck rack hero, no-WebGL flat fallback | **NO** |
| `:38841` | **`RackEngine.renderFlat`** — public API method, *"render a rack flat into a host, with no GL context"* | **NO** |
| `:40903` | definition | — |
| `:41711` | rack-detail, redesign branch | yes |
| `:41714` | rack-detail, legacy branch | yes |

**S-9 is live.** The base spec's own scope line says the desktop rail is untouched *unless Phase 0
shows shared rendering* — it does. **S-6's grep gate must be scoped to rack-detail's two call sites
or it will take out the Command Deck hero and a RackEngine method.** S-14 (Addendum A) needs an
owner amendment for the same reason: zero references is not reachable inside this spec's scope.

---

## E-2 · THE RIGHT-HAND STRIP — A SEPARATE COMPONENT

Not a second call of the elevation renderer.

| | |
|---|---|
| Renderer | **`scrubbar_buildHtml`, `:41073`** |
| Rendered into | `.rack-hybrid-minimap`, at `:41716` |
| Host markup | `.scrubbar-host.scrubbar-host-minimap` → `.scrubbar#scrubbar[data-total-u]` |
| Layout | `.rack-hybrid-canvas{flex:1;min-width:0}` `:11022` · `.rack-hybrid-minimap` `:11031` |
| Header text | the literal string `MINI` |

📌 **It already sorts by U descending** — `slots.sort((a,b) => (b.uStart||0) - (a.uStart||0))`.
**S-2 should reuse this comparator rather than author a second one.**

### ⚠ THE CLIPPED "U48" — A MISMATCH, NOT A ROOT CAUSE

The handoff places the clipped label **on the strip**. Source does not support that: the strip's
header renders `MINI`, and the only U-label emitter found is `.rack-canvas-u-marker` **in the
elevation**, positioned `top: uH(totalU - u)` — which for the topmost U computes to `top: 0`, flush
against the container edge where it clips.

⛔ **Reported unresolved.** Either the label belongs to the elevation and the handoff attributes it
to the wrong half, or a third emitter exists that this pass did not find. **A screenshot or a device
look settles it; source alone does not.** S-8 says the defect is "resolved by removal" — that is only
true if the label is on something being removed, which is currently unproven.

📌 Probable cause of the related *"48U showing ~7U"*: `.rack-hybrid-canvas .rack-canvas
{height:100%;max-height:60vh}` at `:11026-11029`, against `rackFlat_applyFit`'s `--u-h` fit.

---

## E-3 · THE `DEVICES` COLLAPSIBLE — ⭐ THE U POSITION IS ALREADY THERE

Markup **`:41794-41808`**. Native `<details>`/`<summary>`. **No JS handler** — the browser owns
expand/collapse.

**`:41800`:**

```js
if (slot.uStart != null) html += ' · U' + slot.uStart + (slot.uEnd && slot.uEnd !== slot.uStart ? '-' + slot.uEnd : '');
```

**Field names: `slot.uStart`, `slot.uEnd`.** Rows also carry `slot.name`, `slot.model`, and
`slot.serial` rendered as `TAG` (`:41805`, added `.6.97`).

### What Ship 1 actually still owes

| spec | status |
|---|---|
| S-1 U range per row | ✅ **already shipped** at `:41800` |
| S-1 `U —` when unrecorded | ❌ real gap — today the element is **omitted entirely**, so absent and not-recorded look identical |
| S-1 format | ⚠ emits `U42-U43` (hyphen); spec asks `U42–U43` (en dash) |
| S-1 monospace | ✅ already `font-family:var(--mono)` |
| S-2 sort U descending | ❌ real gap — `rack.slots.forEach` in stored order. Comparator exists at `:41086` |
| S-3 default expanded | ❌ real gap — one attribute |
| S-4 ≥44px row, ≥14px U text | ❌ real gap — `padding:6px 10px`, `font-size:var(--fs-caption)` |

---

## E-4 · EVERY OTHER READER

| reader | line | what it depends on |
|---|---|---|
| `rackFlat_applyFit` | `:41037` | **measures** the canvas and sets `--u-h`; up to 5 rAF retries; resize timer `:41067-41069` querying `#rehFlatWrap .rack-canvas-grid` |
| `rackHybrid_initSync` | `:38556` | touch sync between canvas and minimap |
| `railSel_bindFlat` | `:41010` | flat rail selection binding |
| direct query | `:41042` | `#rehFlatWrap .rack-canvas` |

All three functions are called at **`:41719-41721`**, inside a double-`requestAnimationFrame`.

⚠ **S-6 must neutralize all four, not just the markup.** `rackFlat_applyFit`'s resize timer
re-queries on every resize; left in place against a removed host it becomes a permanent no-op
polling a node that will never exist — inert, invisible, and exactly the class `.563` was cut to
remove.

---

## E-5 · DEFAULT STATE OF `DEVICES`

**Collapsed.** `<details>` at `:41794` carries **no `open` attribute**.

**Not persisted.** No store read or write touches this element — nothing in the `iso_`, `deploy_` or
`safeStore` paths references it. S-3's change is therefore a pure default, with no migration and no
stored state to honour.

---

## ⚠ WHAT S-5 WILL FIND, AND IT IS NOT A BUG

S-5 keeps both surfaces for one ship so the phone check can confirm *"the list agrees with the
drawing."* **They will not fully agree, by design:**

- `DEVICES` renders **every** slot in `rack.slots`
- the elevation **filters** — no `uStart`, or spanning ≥80% of the rack, and the slot is dropped
  (`:40910-40916`); the scrubbar applies the same filter (`:41077-41085`)

**A rack with placeholder or U-less slots will show more rows in the list than blocks in the
drawing.** That expected difference must be stated before the device check, or a correct app reads
as a defect.

---

## BOUNDS

- ⛔ **Source only.** Nothing was run, rendered, or measured on a device. The `~7U` and the clipped
  label are the owner's observations; this pass found a plausible mechanism for each and **proved
  neither**.
- ⛔ **E-2's label attribution is unresolved** and is the one open question in this report.
- ⛔ **E-6 / E-7 are not answered.** Forge's Master sharing and its focus mechanism gate Ship 3 only,
  and Addendum A requires Ship 3 to **stop and report** if the two apps hold divergent data.
- 📌 **`forge.html` was not read.** It carries no version stamp and ships outside `version.json`'s
  scope; E-6/E-7 are where it enters this spec.
- ⛔ **Nothing here is design.** Where a spec item is measured as already-shipped or unexecutable,
  the finding is reported for owner amendment — it is not narrowed, resequenced or rewritten.
