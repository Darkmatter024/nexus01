# FIRST-DOOR · SHIP A — PHASE 0 EVIDENCE ("The first screen answers one question")

**Commission:** `SHIP-HANDOFF-FIRST-DOOR.md` §2, items **A-E1 … A-E6**.
**Baseline:** `main` @ `0fbe9b3`, **`phantom-v1.14.571`** — ⛔ not the `.570` the spec was written against.
**Method:** direct grep against the verified working-tree source. No graph, no probe, no device.
**Status:** ⛔ **EVIDENCE ONLY.** The spec says *"Stop. Report. Owner reviews A-E2/A-E3 lists and
confirms what moves where before patching."* **Nothing is patched and nothing is staged.**

---

## §0 · HEADLINE — THE NO-MASTER SCREEN IS ALREADY MOSTLY WHAT SHIP A ASKS FOR

⭐ **`#pg-cmd[data-master="0"]` already hides NINETEEN elements with `display:none!important`** in one
rule at `:9769`. The spec's §1 describes the first screen as *"~9 competing cards/CTAs, 0 clear next
step"* and A-S1 asks that they be removed. **In the no-Master state most of them are already off.**

⛔ **BUT THAT IS NOT THE SAME AS DONE, AND THE DIFFERENCE IS THE WHOLE SHIP.** §6 of the spec is
explicit: *"Remove, don't hide. No `display:none` retirements."* So Ship A's no-Master work is **not**
"clear the clutter" — the clutter is already visually gone. It is **converting nineteen CSS hides
into actual removals and re-homes**, which is a larger and more invasive edit than the spec's framing
implies, and it lands in markup and renderers rather than in a stylesheet.

⭐ **THE REAL WORK IS THE MASTER-LOADED STATE (A-E3), NOT THE EMPTY ONE.** That is where the competing
cards actually render, and where A-S2's headline-plus-picker has to displace them.

---

## §1 · A-E1 — THE FIRST-RUN SEQUENCE

| Step | file:line | What it writes |
|---|---|---|
| Splash / globe | `#boot` `:13370` | nothing — presentation |
| **Tap gate** | `.pe-enterhint` / `#pe-taphint` `:13380`, text set `:13405` | nothing — it is a gesture gate only |
| First-run confirm gate fires | `:18841`–`:18842` — `if (!siteProfile_isConfirmed() && typeof firstRun_show === 'function') firstRun_show();` inside the boot `setTimeout` | nothing yet; it only *shows* |
| Nameplate / confirm | `firstRun_show()` `:27927`, `firstRun_confirm()` `:28007` | reads `#fr-operator` (name, **required** — refuses empty with a toast), `#fr-facilityName`, `#fr-rackNaming`, `#fr-pdu`; writes once at the end with `confirmedAt` (`:27774` records that deliberate once-at-the-end write) |
| Command | `redesign_initToggle()` `:19392` | ⭐ **CHANGED AT `.571`** — now branches: a live active deployment lands on `deploy_showDetail`, otherwise `showMode('command')` |

✅ **BOOT-TAPGATE STANDS — CONFIRMED, NOT ASSUMED.** The tap gate writes no state and gates nothing but
the gesture; nothing in Ship A's rule touches it. ⚠ **But A-E1's stated sequence is now stale in one
place:** the spec describes *"globe → tap-to-enter → nameplate → **Command**"*. Since `.571` the last
step is **Command *or* the rack picker**, decided at `:19392`. **Ship A must state which of the two
its two-state rule governs** — the honest reading is that Ship A's rule governs `pg-cmd`, and `.571`'s
landing decides whether `pg-cmd` is reached at all. **That interaction is unruled and is flagged here
rather than assumed.**

---

## §2 · A-E2 — WHAT RENDERS ON `pg-cmd` WITH **NO** MASTER

`#pg-cmd` spans **`:13807`–`:14062`**. State is set by `cmd_renderZ0(site, loaded)` at `:23958`–`:23960`:
`pg.setAttribute('data-master', loaded ? '1' : '0')`.

### ⛔ Hidden by ONE rule at `:9769` — `display:none!important`, nineteen selectors

`.cc-rackline` · `.cc-rackhero` · `.cc-rackvitals` · `.nba` · `.lens` · `.stats` · `.trow` ·
`.sig-h` · `#cc-sig` · `.cmd-grid` · `.cc-asst` · `.cc-qtools` · `.cc-z0 .statusrow` · `.cc-agechip` ·
`#cc-sugg` · `#cc-chat` · `#cc-aistat` · `#cc-foot` · `#cc-openbay`

⭐ **This single rule already removes from view: the NBA/next-best-action (`.nba`), the assistant card
(`.cc-asst`), QUICK TOOLS (`.cc-qtools`), the clocks (`.lens`), the stat cards (`.stats`), OPS SIGNAL
(`.sig-h`/`#cc-sig`), and every desktop rail organ.** Those are most of the "~9 competing cards" §1
names.

### ✅ What is left VISIBLE on a phone with no Master

| Element | file:line | Renderer | Note |
|---|---|---|---|
| `#cmd-shell` — the Command Deck | `:13815` | markup + `cs_*` renderers | ⭐ **renders at EVERY width** — see §4 |
| `.cc-z0` site label `#cc-z0-site` | `:13954`, `:13956` | `cmd_renderZ0()` `:23958` | its `.statusrow` and `.cc-agechip` siblings are hidden; the bare site label survives, rendering `—` when unset |
| `#cc-rail` container | `:13964` | markup | every child is hidden by `:9769`; at ≥1024 the container itself is hidden by `:9885`. **An empty box on the phone.** |
| **`.cc-ingest-zone`** | **`:14029`** | markup; door `cmd_loadMaster()` | ✅ **shown** by `:9770` — `display:flex`, `min-height:min(34vh,280px)`, dashed cyan border. Label `LOAD MASTER` at `:14031`, sub-line at `:14032` |
| `#cc-center` | `:14013` | markup | `:9778` gives it `flex:1 1 auto; justify-content:center` in this state — it centres the ingest zone |

⭐ **SO THE NO-MASTER PHONE SCREEN IS, IN SUBSTANCE, ALREADY "one headline + one action."** The
ingest zone *is* A-S1's full-width `LOAD MASTER` button, already ≥56px, already the single door,
already centred. **What it is missing against the spec's rule is only the one-sentence headline
`Load a Master to start.` and the below-fold "what's a Master" note.**

⛔ **AND WHAT IT VIOLATES IS §6, NOT §2:** all nineteen are **hidden, not removed**, and `#cc-rail`
is an empty container. **That is the ship.**

---

## §3 · A-E3 — WHAT RENDERS ON `pg-cmd` WITH A MASTER LOADED

With `data-master="1"` the `:9769` rule stops applying, so **all nineteen elements above return**,
plus the always-on ones from §2. In DOM order:

| # | Element | file:line | Renderer |
|---|---|---|---|
| 1 | `#cmd-shell` (Command Deck) | `:13815` | `cs_*` family; `cs_renderReady()` `:23599` called from `:23529` |
| 2 | `.cc-z0` — site · `.statusrow` · `.cc-agechip` | `:13954`, `:13957`, `:13959` | `cmd_renderZ0()` `:23958`; the age chip's door is `cmd_loadMaster()` |
| 3 | `.cc-asst` — AI assistant card | `:13972` | markup; `#cc-asst-summary` populated by `cmd_render` |
| 4 | `.nba` — next-best-action | `:13981` | `#cc-nbastep` `:13984`, `#cc-nbah` `:13985`, `#cc-nbap` `:13986`, `#cc-nbar` `:13987`; copy from the rung table at `:23738`–`:23741` |
| 5 | `.cc-qtools` — QUICK TOOLS | `:13991` | `SCAN` `:13995` · `LOG` `:13996` · `BLOCKER` `:13997` |
| 6 | `#cc-sugg` · `#cc-chat` · `#cc-aistat` | `:14002`, `:14009`, `:14011` | desktop rail; base `display:none` |
| 7 | `.stats` `#cc-stats` | `:14015` | `cmd_render` |
| 8 | `.cc-rackline` | `:14017` | shown by `cmd_mount*`; door `cmd_heroPickRack()` |
| 9 | `.cc-rackhero` | `:14020` | `cmd_mountRackHero()` `:23884` — the INSPECT-3D landing |
| 10 | `.cc-rackvitals` | `:14025` | fed from the elevation |
| 11 | `#cc-openbay` | `:14027` | door `cmd_openHeroBay()` `:24110` |
| 12 | `.lens` — clocks | `:14034` | `cmd_clock()`, 15s interval from `:19437` |
| 13 | `.trow` | `:14048` | markup |
| 14 | `.sig-h` "OPS SIGNAL" + `#cc-sig` | `:14054`, `:14055` | `cmd_render` |
| 15 | `#cc-foot` | `:14057` | desktop footer |

⛔ **THIS IS THE LIST SHIP A ACTUALLY HAS TO DISPLACE**, and A-S2 replaces all of it with a headline
plus the rack picker. **Fifteen groups, not nine.** ⚠ **The owner is asked to confirm this list and
name a destination for each** — the spec requires every removal to carry *"its destination or
'deleted — no home'"*.

---

## §4 · A-E5 — SHIFT READINESS: TWO PREMISES THE SOURCE CONTRADICTS

### C-3 · IT DOES NOT RENDER ON THE PHONE

`#cs-ready` (`:13942`) carries **`class="cs-card cs-dpanel"`**. `.cs-dpanel { display: none; }` at
`:59200` is **unscoped and unconditional**, and is re-enabled **only** by
`body.rd.cshell .cs-dpanel { display: flex; … }` at `:59352`, which sits inside
**`@media (min-width: 1024px)`** opened at `:59326`.

⛔ **So Shift Readiness — and `#cs-fieldtools` with it — is DESKTOP-ONLY and is not on the phone's
first screen at any Master state.** A-E5 asks *"who reads it"* and the answer for the cold-aisle
surface is: **nobody on a phone.**

### C-4 · IT IS NOT A FAKE SCORE — `.383` ALREADY REFUSED THAT

`cs_renderReady()` `:23599`, and its own header at `:23594`–`:23598`:

> *"The spec's mock shows a fixed 82% ring. That number is NOT reproduced: a hardcoded readiness
> score is fake telemetry. The ring is four real gates the app can actually answer — site profile
> confirmed, Master loaded, zero open blockers, handoff started — so the number moves when the shift
> moves."*

⛔ **The spec's A-E5 line — *"a score for an unset state is not a number — it goes"* — is aimed at the
mock's 82%, which was never shipped.** The ring is four measured gates. ⚠ **This is the same finding
board v2 Q-1 already carries**, recorded in `PHANTOM_CURRENT_STATE.md`: the fix for an unset state is
**an indeterminate state for the vacuously-true gate, not removing the ring.**

⭐ **RECOMMENDATION (owner rules):** **do not delete the readiness ring under A-S1.** It is off the
phone already, it is honest, and deleting it would be the *"deleted — no home"* branch applied to a
panel that has both a home and real data. If the owner still wants it gone from the desktop Deck,
that is its own ruling and its own ship.

### C-5 · A STALE COMMENT THAT SAYS THE OPPOSITE OF THE CODE

`:13813`–`:13814` describes `#cmd-shell` as *"display:none unless body carries `.cshell`, **which only
`?cshell=1` adds and which is never persisted**."* **That has been false since `.412`/`.425.`**
`cshell_isOn()` (`:19347`) now returns **true unless the operator pulls the `?cshell=0` rip-cord`, so
`.cshell` is on **by default**, and `body.rd.cshell #cmd-shell { display: block; }` at `:58616`–`:58617`
sits inside `@media (min-width: 0px)` (`:58567`) — **every width**.

⭐ **THE CONSEQUENCE, AND IT REWRITES A-E2/A-E3:** **the Command Deck IS the phone Command screen.**
The `.425` note at `:59202` states the override in the owner's own terms — *"the Command Deck
composition renders at EVERY width."* ⚠ **A comment describing the opposite of the code is the class
of stale that `.564` fixed in the same stroke as its ship.** Flagged, not fixed — Ship A touches this
markup and should correct it in passing.

---

## §5 · A-E4 — WHERE THE PICKER LIVES, AND WHETHER IT CAN MOUNT ON `pg-cmd`

The picker is the one `.571` already lands on: the `RACK LIST` / `FLOOR MAP` toggle (`:37918`),
`#deploy-rack-lookup` (`:37923`) driven by the `rackLookup_*` state machine, and `#deploy-floor-map`
(`:37925`). It lives inside `deploy_showDetail`'s render.

⛔ **IT CANNOT BE MOUNTED ON `pg-cmd` BY CALLING IT. THE RENDERER IS BOUND TO A HARDCODED HOST ID.**
`document.getElementById('deploy-rack-lookup')` appears **6 times**, including
`rackLookup_render()` (`:38369`) and `rackLookup_refreshBody()` (`:38648`); `deploy_applyRackView()`
(`:38065`) additionally hardcodes `deploy-floor-map`, `rv-tab-list` and `rv-tab-map`.

**So A-E4's question — "can it be mounted without duplicating its renderer?" — has three answers, and
only two are legal under Contract A2 (one canonical engine per concept):**

| Option | Cost | Verdict |
|---|---|---|
| **(a) Move the picker markup onto `pg-cmd`** and have Build reach it there | Build's deployment detail loses its in-place picker; `.571`'s landing must be re-pointed | legal, but it re-opens the `.571` ship |
| **(b) Parameterize the host** — `rackLookup_render(hostId)` and friends take the mount | 6 `getElementById` sites plus `deploy_applyRackView`'s four ids; one renderer, two hosts | ⭐ **legal and canonical — the recommended path** |
| **(c) Duplicate the renderer for `pg-cmd`** | — | ⛔ **FORBIDDEN.** Contract A2, and the exact defect §1 of the spec is written against |

⚠ **Whichever is chosen, it interacts with `.571`.** If the picker becomes `pg-cmd`'s content, then
`.571`'s boot landing — which deliberately routes *past* `pg-cmd` to `deploy_showDetail` — is
answering a question Ship A is about to answer differently. **Owner ruling needed on the order of
precedence; this Phase 0 does not assume one.**

---

## §6 · A-E6 — TESTS THAT ASSERT ON FIRST-SCREEN CONTENT (Healer's worklist)

Specs referencing `pg-cmd` / `cc-ingest` / `cc-nba` / `cmd-shell`:

| Spec | Why it matters to Ship A |
|---|---|
| `01-nav.spec.js` | asserts *"the redesign lands on its OWN home, never pg-triage"* and the 3-slot dock — **the closest thing to a first-screen contract that exists** |
| `06-composition.spec.js` | composition/width behaviour — the `.cshell` finding in §4 lands here |
| `02-build-forge.spec.js` | Build workspace, reached from the first screen |
| `05-offline.spec.js` | ⚠ already failing at `.570` and `.571` (stash-verified pre-existing) |
| `26-rack-detail-surface.spec.js` | rack detail, the picker's destination |
| `44-tool-reachability.spec.js` | tool doors from the first screen |

⚠ **No spec asserts the CONTENT of the no-Master first screen** — that there is one headline and one
action. **Ship A's own acceptance bar (T1: *"the screen names the action"*) has no test today.**
Per the owner's standing ruling on B-1, **Generator should write T1/T2 coverage before the edit.**

---

## §7 · WHAT THE OWNER IS ASKED TO CONFIRM

1. **The A-E2 list (§2)** — that the no-Master phone screen is already the ingest zone plus a site
   label, and that Ship A's work there is **converting nineteen hides into removals** (§6 of the
   spec), not clearing visible clutter.
2. **The A-E3 list (§3)** — fifteen groups, each needing a destination or an explicit
   *"deleted — no home."*
3. **C-3/C-4 — the readiness ring.** Recommendation: **do not delete it.** Off the phone already,
   honest since `.383`, and Q-1's real fix is an indeterminate gate state.
4. **A-E4 (§5)** — option **(b) parameterize the host** is recommended; **(c) duplicate** is forbidden
   by Contract A2.
5. **The `.571` interaction** — if the picker becomes `pg-cmd`'s content, what happens to `.571`'s
   boot landing? **Unruled, and Ship A cannot be built without the answer.**

---

## BOUNDS

- ⛔ **Paper. No code, no anchors re-cut, nothing staged.**
- ⛔ **Every `file:line` is valid at `.571` only** and must be re-swept by the ship that uses it (F-4b).
- ⚠ **This is a SOURCE census, not a rendered-DOM census.** No probe was run and no device was used.
  A rule's presence is not proof of what paints; the spec's own §5 stranger test measures that.
- ⚠ **§0.2/§0.3 of the spec — Playwright server and the iPhone profile — were NOT confirmed**, the
  same deviation recorded in the B-1 Phase 0. They gate patching, not this evidence.
- ⚠ **`graphify . --update` was NOT run** — the flag does not exist in build 0.9.15. Anchors come
  from direct source grep, which the spec's baseline requires.
