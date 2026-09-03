# FIRST-DOOR · SHIP A — PHASE 0 EVIDENCE ("The first screen answers one question")

**Commission:** `SHIP-HANDOFF-FIRST-DOOR.md` §2, items **A-E1 … A-E6**.
**Baseline:** `main` @ `e94bb8d`, **`phantom-v1.14.571`**.
**Method:** direct grep against verified working-tree source. No graph, no probe, no device.
**Status:** ⛔ **EVIDENCE ONLY. Nothing patched, nothing staged.** Awaiting owner confirmation of the
A-E2/A-E3 lists in §2 and §3.

> ⭐ **REVISION 2 — 2026-09-03. THE FIRST DERIVATION WAS WRONG, AND THE OWNER CAUGHT WHY.**
> Rev 1 built A-E2/A-E3 from the `cc-*` markup plus the `data-master` rule, trusting the comment at
> `:13813` that said the Command Deck renders *"only when `?cshell=1`"*. **That comment is false.**
> The owner ruled: *"Re-derive A-E2/A-E3 against the real code, not the comment."* This revision does
> that. **Both lists changed.** Every change is marked ⚠ **REV-2**.

---

## §0 · OWNER RULINGS THIS REVISION IS BUILT ON (2026-09-03)

| Ruling | Effect |
|---|---|
| ⭐ **`.571` WINS** — *"it's verified and it achieves Ship A's goal — boot lands on the picker."* | The picker is **not** mounted on `pg-cmd`. It stays where `.571` put it. |
| ⛔ **A-E4 is DROPPED**, and the parameterize-host path with it. | §5 of rev 1 is **struck**. ✅ **No Contract A2 issue arises** — nothing is duplicated because nothing moves. |
| ⭐ **Ship A re-scopes** to stripping `pg-cmd` to a two-state layout *"for anyone who does land there."* | No Master → `Load a Master to start.` + one `LOAD MASTER` button. Master loaded → **one line pointing to the picker on Build** — ⛔ **not the picker itself.** |
| ✅ **A-E5 ruled** — indeterminate gate state for unset, **no deletion**. | The readiness ring **stays**. §4 records what "indeterminate" must mean. |
| ✅ Every A-E2/A-E3 element still gets **removed or re-homed**. | §2/§3 are the lists that carry those destinations. |

⭐ **THE RE-SCOPE SHRINKS SHIP A AND NARROWS ITS BLAST RADIUS.** `pg-cmd` is now a **fallback**
surface — `.571` routes past it whenever a live deployment exists. **Ship A can no longer break the
main path, because the main path no longer goes through it.**

---

## §1 · A-E1 — THE FIRST-RUN SEQUENCE

| Step | file:line | What it writes |
|---|---|---|
| Splash / globe | `#boot` `:13370` | nothing |
| **Tap gate** | `#pe-taphint` `:13380`, text set `:13405` | nothing — a gesture gate only |
| First-run gate fires | `:18841`–`:18842` — `if (!siteProfile_isConfirmed() && …) firstRun_show()` | nothing yet; it only shows |
| Nameplate / confirm | `firstRun_show()` `:27927`, `firstRun_confirm()` `:28007` | `#fr-operator` (**required**, refuses empty), `#fr-facilityName`, `#fr-rackNaming`, `#fr-pdu` — written **once at the end** with `confirmedAt` (`:27774`) |
| Landing | `redesign_initToggle()` `:19392` | ⭐ **`.571`:** live active deployment → `deploy_showDetail`; otherwise → `showMode('command')` = `pg-cmd` |

✅ **BOOT-TAPGATE STANDS** — it writes no state, and Ship A does not touch it.
⭐ **Under the `.571` ruling this is now unambiguous:** `pg-cmd` is reached **only** when there is no
live active deployment. **That is exactly Ship A's "anyone who does land there."**

---

## §2 · A-E2 / A-E3 — ⭐ **REVISION 3: MEASURED ON THE REAL DOM. THE SOURCE CENSUS WAS WRONG.**

⛔ **THE OWNER RULED THE DOM CHECK, AND THE DOM CHECK OVERTURNED THIS DOCUMENT.** Rev 1 read a code
comment instead of the cascade. Rev 2 read the cascade but resolved one media-block boundary with a
heuristic instead of counting braces. **Rev 3 is what the phone actually paints**, captured by
`test/e2e/98-cmd-census.spec.js` at **390x844 / WebKit** (the `phone-webkit` project - verified as the
real viewport, not assumed from the project name).

### THE MEASUREMENT — BOTH STATES, IDENTICAL

```
=== NO MASTER ===      data-master=0   body="rd cshell"
=== MASTER LOADED ===  data-master=1   master_hasMaster=true

  #cmd-shell                                   [2849px]
    #cs-grid                                   [1279px]
      #cs-hero        .cs-card.cs-hero          [425px]
      #cs-shiftbar    .cs-card.cs-shiftbar      [ 83px]
      #cs-intel       .cs-card.cs-dpanel        [225px]
      #cs-health      .cs-card.cs-dpanel        [377px]
      #cs-build       .cs-card.cs-dpanel         [109px]
    #cs-lower         .cs-dpanel                [1437px]
      #cs-fieldops    .cs-card.cs-dpanel        [497px]
      #cs-fieldtools  .cs-card.cs-dpanel        [601px]
      #cs-ready       .cs-card.cs-dpanel        [309px]
```

⛔ **THE TWO STATES PAINT IDENTICALLY.** `data-master` flips 0 to 1 and **not one painted element
changes**. That single fact invalidates the premise both earlier revisions were built on.

### ⛔ FOUR THINGS THIS OVERTURNS

**1. THE ENTIRE `cc-*` LEGACY COMMAND PAGE IS DEAD ON THE PHONE.** `.cc-z0`, `#cc-rail`, `#cc-center`
and everything inside them paint at **zero height**. The Deck replaced them. ⛔ **So the 19-selector
`#pg-cmd[data-master="0"]` hide rule at `:9769` - the rule rev 1 and rev 2 built their lists from -
governs elements that DO NOT PAINT AT ALL on a phone.** It is dead CSS on this surface.

**2. `.cc-ingest-zone` DOES NOT RENDER.** Rev 1 called it *"already A-S1's button"* and recommended
keeping it. **It paints nothing.** The load-Master door on the phone today is `#cs-hero`'s CTA, which
`cmd_nba()` labels `LOAD MASTER` and points at `cmd_loadMaster()` (branch `:23740`).

**3. C-3 WAS WRONG - SHIFT READINESS IS ON THE PHONE, AT 309px.** Rev 2 concluded `#cs-ready` was
desktop-only because `body.rd.cshell .cs-dpanel { display:flex }` (`:59352`) looked like it sat inside
`@media (min-width:1024px)` (`:59326`). **Counted properly, that block CLOSES before `:59352`** - brace
depth returns to 0 - so the rule is unscoped by width and every `.cs-dpanel` paints on the phone.
⭐ **A-E5 still holds and the ruling still stands** (indeterminate gate, no deletion) - but it is a
**phone-visible** panel, not a desktop-only one, so it is squarely inside Ship A's surface.

**4. `#cs-fieldtools` PAINTS AT 601px** - and that is **P-4's duplicate ten-tool path**, the one the
door ledger wants closed on the phone. It is live, on the first screen, 601px tall.

### ✅ THE REAL LIST SHIP A MUST ACT ON — NINE PAINTED GROUPS, ONE SURFACE

| # | Painted element | Height | Assignment |
|---|---|---|---|
| 1 | `#cs-hero` | 425px | **KEEP, reshaped** - it already carries the NBA verb and the LOAD-MASTER door. This is where A-S1/A-S2 land |
| 2 | `#cs-shiftbar` | 83px | **-> SHIFT door** |
| 3 | `#cs-intel` | 225px | deleted - no home (assistant keeps its own doors) |
| 4 | `#cs-health` | 377px | **-> SYS** (diagnostics) |
| 5 | `#cs-build` | 109px | **-> the picker line** (it is the Build summary) |
| 6 | `#cs-lower` | 1437px | container - goes with its three children |
| 7 | `#cs-fieldops` | 497px | **-> rack** (field ops metadata is rack-keyed) |
| 8 | `#cs-fieldtools` | 601px | ⭐ **deleted - P-4's duplicate ten-tool path; the OPS row on Build is the canonical door** |
| 9 | `#cs-ready` | 309px | **KEEP** - A-E5 ruled: indeterminate gate for unset, no deletion |

⭐ **SHIP A IS NOW A DECK SHIP, NOT A `cc-*` SHIP.** Every element it must remove or re-home is a
`cs-*` Deck card. **The `cc-*` work in revisions 1 and 2 was aimed at markup that does not paint.**

⚠ **AND THE TWO-STATE RULE HAS TO BE BUILT, NOT RESTORED.** A-S1/A-S2 assume the first screen already
distinguishes no-Master from Master-loaded. **On the phone it does not** - the Deck is identical in
both. Ship A does not *strip down to* two states; it **creates** them.

⚠ **`.cc-rackline` (row 10 of the old table) DOES NOT PAINT EITHER**, so "keep it and re-point
`cmd_heroPickRack()`" cannot be implemented as written. **The one line to the picker has to live in
`#cs-hero`** - which is also where ruling (a-iii)'s re-pointed NBA verb lands. ⭐ **The two rulings
converge on the same element, which is the first thing in this campaign that has gotten SIMPLER.**

⛔ **THE OLD §2/§3 SOURCE LISTS ARE SUPERSEDED AND MUST NOT BE PATCHED FROM.** They are kept only in
git history, as the record of how a source census can be read wrong twice in a row.

## §4 · A-E5 — READINESS: ✅ RULED, NO DELETION

✅ **Owner ruling: indeterminate gate state for unset; the ring is not deleted.** Recorded so the ship
builds the right thing:

- `#cs-ready` is `.cs-dpanel` (`:13942`) → **desktop-only**; not on the phone first screen at all.
- `cs_renderReady()` `:23599`; its header `:23594`–`:23598` records that the mock's fixed 82% was
  **not** reproduced and that the ring is **four real gates**.
- ⭐ **What "indeterminate" must mean:** the gate that reads vacuously true with no deployment
  (`No open blockers`) renders **indeterminate**, not passing. That is Q-1's real fix, it is a
  **desktop Deck** change, and it is therefore **outside Ship A's phone re-scope** — its own ship.

---

## §5 · ~~A-E4~~ — ⛔ STRUCK BY OWNER RULING

Rev 1 asked whether the picker could mount on `pg-cmd` and recommended parameterizing its host.
⛔ **Struck: `.571` wins, the picker stays on Build, nothing moves.** ✅ **No Contract A2 issue arises.**
`pg-cmd` gets **a line pointing to the picker**, not the picker.

⚠ **One rev-1 measurement is retained as a fact for whoever reopens this:** the renderer is bound to
`#deploy-rack-lookup` across **six** `getElementById` sites, and `deploy_applyRackView()` (`:38065`)
hardcodes three more ids. **Move the element or parameterize the host — never duplicate the renderer.**

---

## §6 · A-E6 — TESTS ON FIRST-SCREEN CONTENT (Healer's worklist)

| Spec | Relevance |
|---|---|
| `01-nav.spec.js` | *"the redesign lands on its OWN home, never pg-triage"* + the 3-slot dock — the closest thing to a first-screen contract |
| `06-composition.spec.js` | width/composition — where §2's `.cshell` correction lands |
| `02-build-forge.spec.js` · `26-rack-detail-surface.spec.js` · `44-tool-reachability.spec.js` | surfaces reached from the first screen |
| `05-offline.spec.js` | ⚠ already failing at `.570` **and** `.571` — stash-verified pre-existing, not Ship A's |

⚠ **No spec asserts the CONTENT of the no-Master first screen.** Ship A's own T1 bar
(*"the screen names the action"*) has **no test today**. Per the owner's standing tests-first ruling,
**Generator writes T1/T2 before the edit.**

---

## §7 · ✅ ASSIGNED — WHAT REMAINS FOR THE OWNER

⭐ **Every cell in §2 and §3 is now assigned.** Four rulings closed the table (2026-09-03):
`.cc-rackhero` leaves Ship A as **RACKHERO-RELOCATE** · `.cc-rackline` is **kept and re-pointed** and
is *the* one line · every other cell follows **v2 §1** · and **Generator diffs the real DOM before any
deletion**.

### Confirm before patching

1. **The completed §3 table** — 23 assignment rows. Read the *Basis* column; it is where a wrong
   assignment would hide.
2. ⛔ **The `cmd_nba()` flag** — rows 3 and 6 delete its only two faces, which makes it dead code
   (`.473` shape). **(a)** the picker line carries the NBA verb, or **(b)** retire `cmd_nba()` in the
   same ship with a zero-caller grep gate. **This is the one open decision in the table.**
3. **`.cc-rackvitals` (#12)** — assigned to the rack, but flagged: verify it does not duplicate what
   the rack screen already shows before it is moved there.

### Sequenced next, not now

- **RACKHERO-RELOCATE** — `.cc-rackhero` (`:14020`) to the Forge 3D aisle view, **carrying its
  disposal path** (`cmd_mountRackHero()` `:23884`; `showMode` disposal `:19258`–`:19260`). Contract A6.
- **Generator writes T1/T2 and the DOM diff** at iPhone 15 / WebKit — **before** any deletion.
- **Readiness indeterminate-gate** (§4) — desktop Deck, outside Ship A.

## BOUNDS

- ⛔ **Paper. No code, no anchors re-cut, nothing staged.**
- ⛔ **Every `file:line` valid at `.571` only** (F-4b). Eleven rev-1 anchors were stale on first write —
  `.571` shifted everything past `:19392` — and were corrected and re-verified before commit.
- ⚠ **SOURCE census, not a rendered-DOM census.** No probe, no device. A rule's presence is not proof
  of what paints; §5's stranger test measures that. ⭐ **Rev 2 exists because rev 1 trusted a COMMENT
  over the cascade** — the same class of error, one layer up. **Do not take §2/§3 to the patch without
  one on-device or Playwright look at the real DOM.**
- ⚠ **`graphify . --update` NOT run** (no such flag in build 0.9.15); **§0.2/§0.3 Playwright + iPhone
  profile NOT confirmed.** Both gate patching, not this evidence.
