# LEGACY-RETIRE — THE STRANDED ROWS

**Required by the owner ruling of 2026-08-29** (`SHIP-HANDOFF-LEGACY-RETIRE-RULING.md`), which
pulled Stage 5 from this campaign: *"This is feature work, not deletion. The 3 unresolved rows get
their redesign doors built under **SHIP-HANDOFF-IA-SHIFTNAV** … Do not build doors here. Document
the 3 rows in a short note and stop."*

**Nothing is built here. This is the handover.**
**Re-verified against live `v1.14.544`, 2026-08-30.** `PHASE0-CENSUS.md` is anchored at `v1.14.166`
and is **378 versions stale**, so every claim below was re-checked in source rather than inherited.

---

## ⭐ THE HEADLINE: it is ONE row, not three

The census listed six STRANDED rows, three already marked resolved. Of the three the ruling
inherited, **only one is still stranded.** The other two resolved themselves in ships nobody went
back to reclassify.

| Row | Census verdict (`.166`) | Verdict at `.544` | Goes to IA-SHIFTNAV? |
|---|---|---|---|
| **Deploy Optics tab** | STRANDED | ⛔ **STILL STRANDED** | ✅ **Yes — one door** |
| **pg-twin** | STRANDED, re-home "half-done" | ✅ **RESOLVED** — re-homed, door exists | ❌ No |
| **pg-triage** | "RETIRED as a redesign surface" | ✅ **SUPERSEDED**, not stranded | ❌ No |

---

## 1 · Deploy Optics tab — ⛔ GENUINELY STRANDED. This is the one.

**What it is.** `renderOpticsTab()` (`:52644`) — a complete optic scanner and inventory surface.

**Why it is stranded, precisely.** It is reachable only through `OPS_TABS.optics` (`:24955`), whose
sole door is one `.stab` at `:16432`:

```html
<div class="stab" data-tab="optics" onclick="showOpsTab('optics')">Optics</div>
```

That strip is `#ops-tab-strip` (`:16422`), which lives inside **`<div class="page" id="pg-sop">`**
(`:16421`) — a page the redesign never shows. So the door exists in exactly one house.

⭐ **THE SURFACE ITSELF IS NOT BROKEN, AND THAT MATTERS FOR THE ESTIMATE.** `optics` is **not** in
the `_unhomedOps` list at `:25022` (`rackmap`, `bom`, `manifest`, `portmap`), so `showOpsTab('optics')`
renders through `deploy_opsHost()` — which resolves to `#wk-deploy` **under the redesign**. The
panel would draw correctly in the redesign frame today. **What is missing is a door, not a surface.**
Calling `showOpsTab('optics')` from a redesign control is very likely the whole fix.

⚠ **Do not simply un-hide the legacy strip.** That strip carries nine other tabs with their own
routing and their own homes; exposing it wholesale would import legacy nav into the redesign, which
is what Stage 7 exists to end.

## 2 · pg-twin — ✅ RESOLVED. Do not build a door.

The census called this *"STRANDED, not RE-HOMED — the re-home is HALF-DONE."* At `.544` it is done:

- `redesign_homeIssues()` (`:23148`) re-parents the live `#issue-page` node out of `pg-twin` into
  `#wk-issues` at `DOMContentLoaded`, keeping `issue_renderList`'s `getElementById('issue-page')`
  target intact — a move, not a rebuild.
- **A redesign door exists** at `:14165`: a `.stab` with `data-wk="wk-issues"` that calls
  `showStab(this,'work-sub','wk-issues')` and then `issue_pageOpen()`.
- `wk-issues` is a registered `work-sub` panel (`:17624`).

**What remains of `pg-twin` is an empty shell** — `:16445`–`:16447` contain only `#issue-page`, which
is moved out at boot. ⛔ That makes it **Stage 6/7 work** (a re-homed shell whose organ has left),
**not Stage 5 work.** It needs a deletion, not a door.

📌 The census's other half — *"Memory/Twin — Stage 4 will re-home its data"* (`:16641`) — refers to a
data concept, not a reachable surface. Nothing renders it.

## 3 · pg-triage — ✅ SUPERSEDED, not stranded. Do not build a door.

The legacy NOW dashboard. The census already said it was *"intentionally SUPERSEDED by the pg-cmd
rebuild"*, and that holds: `#pg-cmd` is the redesign's Command surface and covers the same job.
A stranded surface has no equivalent; this one has a **replacement**. Building it a door would
re-introduce the page the redesign was built to replace.

Its remaining children are `#triage-mission-bar`, `#triage-brief-bar`, `#qa-deploy-card`,
`#today-dashboard`, `#cmd-blocker-card`, `#cmd-handoff-card`, `#fr-chip`.

---

## ⚠ Findings this re-verification turned up — NOT acted on, and not IA-SHIFTNAV's either

Both are the **dead-render-host** shape: live code painting into `pg-triage`, which the redesign
never displays. Neither is a stranded surface, so neither belongs in this handover — recording them
here only because this pass is what found them.

1. **`firstRun_renderChip()` paints into a hidden node.** `#fr-chip` has exactly **one** markup
   instance, inside `pg-triage`, and one JS writer. It is called from `firstRun_confirm` — so on
   every setup, under the redesign, it writes into a page nobody sees.
2. **`#qa-deploy-card` is the same shape** — one markup instance inside `pg-triage`, one live writer.
3. Already recorded in `PHANTOM_CURRENT_STATE.md`: **`today_render` runs in full at every boot**
   into `#today-dashboard`, also inside `pg-triage`.

⭐ These three share one cause, and it is worth naming once: **`pg-triage` is a page the redesign
never shows but the app never stopped writing to.** A single ship could re-point or retire all
three; it belongs to no stage yet, and it is a *correctness* question, not a cleanup one.

---

## What IA-SHIFTNAV inherits

**One door: Deploy Optics.** Not three. The surface already renders correctly in the redesign frame;
it needs a redesign-side control that calls `showOpsTab('optics')`, and nothing more.

⛔ **`SHIP-HANDOFF-IA-SHIFTNAV.md` does not exist on this machine.** Addendum A has been held for
that reason since before this campaign began. Until the base spec is in the repo, this row has
nowhere to go — that is a blocker on the owner, not on the work.

**STOP. Per the ruling, no doors are built here.**
