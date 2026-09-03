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

## §2 · A-E2 — WHAT ACTUALLY RENDERS ON A PHONE, **NO MASTER** ⚠ REV-2

Three CSS layers decide this. **Rev 1 knew the first and third and missed the second.**

1. `#pg-cmd[data-master="0"]` `:9769` — hides **19** `cc-*` elements, `display:none!important`.
2. ⚠ **REV-2 — `body.rd.cshell` IS ON BY DEFAULT.** `cshell_isOn()` (`:19347`) returns true unless the
   `?cshell=0` rip-cord is pulled, and **`body.rd.cshell #cmd-shell { display:block }`** at `:58616`
   sits inside `@media (min-width:0px)` (`:58567`) — **the Deck renders at every width.** The same
   block hides the legacy band: **`body.rd.cshell #pg-cmd .cc-z0 { display:none }`** at **`:58626`**.
   ⛔ **Rev 1 listed the `.cc-z0` site label as visible. It is not, at any width.**
3. `.cs-dpanel { display:none }` `:59200`, re-enabled only ≥1024 (`:59352`, inside `:59326`).

### ✅ Corrected visible set — phone, no Master: **FIVE groups**

| # | Element | file:line | Renderer / state | Destination — owner fills |
|---|---|---|---|---|
| 1 | `.cs-hd` — Deck header | `:13816` | markup; hidden only ≥1024 (`:59334`) | ? |
| 2 | `.cs-microbar` — *"🔒 Secure session · On device"* | `:13826` | markup | ? |
| 3 | **`#cs-hero`** — Deck hero card | `:13832` | `cs_renderHero()` `:23668` | ? |
| 4 | `#cc-rail` — **empty container** | `:13964` | every child hidden by `:9769` | delete — it has no content |
| 5 | **`.cc-ingest-zone`** | `:14029` | shown by `:9770`; door `cmd_loadMaster()`; label `LOAD MASTER` `:14031` | ⭐ **KEEP — it becomes A-S1's button** |

⛔ **Hidden (rev 1 got some of these wrong or missed them):** `.cc-z0` `:58626` (**all widths**) ·
`#cs-shiftbar` `:13852` (inline `style="display:none"`) · `#cs-intel` `:13858` · `#cs-health` `:13874` ·
`#cs-build` `:13883` · `#cs-lower` `:13890` — **all four `.cs-dpanel`, phone-hidden** · `#cs-side` /
`#cs-top` `:59525` (≤1023) · plus the 19 `cc-*` from `:9769`.

### ⭐ THE FINDING THAT CHANGES A-S1

**`#cs-hero` renders with no Master and is NOT gated by `data-master`.** `cs_renderHero()` sets
`:23677` eyebrow → **`No active deployment`**, `:23678` title → **`Nothing deploying yet`**, `:23681`
hides the progress bar, and `:23692`/`:23695` take the CTA's label **and** action from `cmd_nba()`.

✅ **IT IS HONEST — NO A-S6 VIOLATION.** No fake CTA, no invented number; the zero-state says what is
true. ⛔ **BUT IT IS EXACTLY WHAT A-S1 FORBIDS:** *"Nothing else competes for the eye above the fold."*
A hero card announcing *"Nothing deploying yet"* above a `LOAD MASTER` zone is a second thing to read
before the one action.

⚠ **So the no-Master screen is NOT "already there", which is what rev 1 concluded.** It is **five
groups**, three of them Deck chrome rev 1 did not know rendered on a phone at all.

---

## §3 · A-E3 — WHAT RENDERS ON A PHONE, **MASTER LOADED** ⚠ REV-2

`:9769` stops applying so all 19 `cc-*` return; `.cc-ingest-zone` goes (base rule `:9768`); `.cc-z0`
**stays hidden** (`:58626`); the four `.cs-dpanel` panels **stay hidden** on a phone.

| # | Group | file:line | Renderer | Destination — owner fills |
|---|---|---|---|---|
| 1 | `.cs-hd` + `.cs-microbar` | `:13816`, `:13826` | markup | ? |
| 2 | `#cs-hero` (live: name, %, KPIs, CTA) | `:13832` | `cs_renderHero()` `:23668` | ? |
| 3 | `#cs-shiftbar` | `:13852` | JS-shown when a shift end is set | ? |
| 4 | `.cc-asst` — assistant card | `:13972` | `#cc-asst-summary` via `cmd_render` | ? |
| 5 | `.nba` — next-best-action | `:13981` | `#cc-nbah/p/r` `:13984`–`:13986`; copy `:23738`–`:23741` | ? |
| 6 | `.cc-qtools` — SCAN · LOG · BLOCKER | `:13991` | `:13995`–`:13997` | ? |
| 7 | `#cc-sugg` · `#cc-chat` · `#cc-aistat` | `:14002`, `:14009`, `:14011` | base `display:none`, desktop rail | delete — no phone home |
| 8 | `.stats` | `:14015` | `cmd_render` | ? |
| 9 | `.cc-rackline` | `:14017` | door `cmd_heroPickRack()` | ⭐ **candidate for the "one line to the picker"** |
| 10 | `.cc-rackhero` | `:14020` | `cmd_mountRackHero()` `:23884` | ⛔ **WebGL — see below** |
| 11 | `.cc-rackvitals` | `:14025` | fed from the elevation | ? |
| 12 | `#cc-openbay` | `:14027` | `cmd_openHeroBay()` `:24110` | ? |
| 13 | `.lens` — clocks | `:14034` | `cmd_clock()`, 15s interval `:19442` | ? |
| 14 | `.trow` | `:14048` | markup | ? |
| 15 | `.sig-h` + `#cc-sig` — OPS SIGNAL | `:14054`, `:14055` | `cmd_render` | ? |
| 16 | `#cc-foot` | `:14057` | desktop footer | delete — no phone home |

⛔ **SIXTEEN GROUPS — not the fifteen rev 1 said, and not §1's nine.** A-S2 replaces all of it with a
headline plus **one line pointing to the picker on Build**.

⛔ **`.cc-rackhero` (#10) IS THE ONE WITH TEETH, AND IT IS NOT MARKUP.** `cmd_mountRackHero()`
(`:23884`) mounts the INSPECT-3D WebGL scene, and `showMode()` disposes it on leaving Command
(`:19258`–`:19260`). **Removing it removes a live WebGL attachment and its disposal path** — Contract
A6 territory. ⭐ **It should be its own slice, verified separately from the markup strip.**

---

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

## §7 · WHAT THE OWNER IS ASKED TO CONFIRM

1. **§2 — five visible groups with no Master**, not the two rev 1 claimed. Specifically that
   **`.cs-hd`, `.cs-microbar` and `#cs-hero` render on the phone** and must be removed or re-homed.
2. **§3 — sixteen groups with a Master**, each needing a destination or an explicit
   *"deleted — no home."* **The `?` cells are the ones only the owner can fill.**
3. **`.cc-rackhero` (#10) as its own slice** — a live WebGL attachment with a disposal path, not markup.
4. **`.cc-rackline` (#9) as the "one line pointing to the picker"** — it already exists and its door is
   `cmd_heroPickRack()`. **Re-point it at the Build picker, or write a new line?**

---

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
