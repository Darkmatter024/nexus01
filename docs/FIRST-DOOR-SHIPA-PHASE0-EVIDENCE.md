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

| # | Element | file:line | Renderer / state | ✅ Assignment (same as §3) |
|---|---|---|---|---|
| 1 | `.cs-hd` — Deck header (brand lockup + `#cs-sitepill`) | `:13816` | markup; hidden only ≥1024 (`:59334`) | **lockup deleted — no home**; **site absorbed into A-S1/A-S2 headline** |
| 2 | `.cs-microbar` — *"🔒 Secure session · On device"* | `:13826` | markup | **deleted — no home** |
| 3 | **`#cs-hero`** — Deck hero card | `:13832` | `cs_renderHero()` `:23668` | **deleted — no home.** ⚠ In THIS state it is the *"Nothing deploying yet"* zero-state card, so nothing covers it — it simply goes |
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

⭐ **COMPLETED 2026-09-03 BY OWNER RULING.** Every cell is assigned per **IA-SHIFTNAV v2 §1**:
rack-keyed → the rack · identity → SYS · everything else **deleted — no home**.
⚠ **v2 §1 is applied AS RULED, NOT AS WRITTEN** — its "tools as rack-scoped views" line was struck by
the E-8 ruling, and its "ISOLATE is dangerous" line was struck twice. Neither superseded clause is used.

| # | Group | file:line | ✅ Assignment | Basis |
|---|---|---|---|---|
| 1 | `.cs-hd` brand lockup (PHANTOM / Field Intelligence System) | `:13816` | **deleted — no home** | decoration; not rack-keyed, not a §1 door |
| 1b | `#cs-sitepill` — the site | `:13824` | **absorbed into A-S2 headline** | A-S2 already reads `N racks on <site>`; the site survives as the headline, not a pill |
| 2 | `.cs-microbar` — "Secure session · On device" | `:13826` | **deleted — no home** | reassurance text; no function, no door |
| 3 | `#cs-hero` — Deck hero + CTA | `:13832` | **deleted — covered by #10** | its CTA is `cmd_nba()`; the one line to the picker replaces it |
| 4 | `#cs-shiftbar` | `:13852` | **→ SHIFT door** | §1 short list: *shift handoff keeps a door* |
| 5 | `.cc-asst` — assistant card | `:13972` | **deleted — duplicate** | `openVaSheet(` has **8** call sites; the assistant keeps its own doors |
| 6 | `.nba` — next-best-action | `:13981` | **deleted — no home** | ⚠ **not free — see the flag below** |
| 7a | `.cc-qtools` → `SCAN` | `:13994` | **→ rack + picker** | §1, and FIRST-DOOR B-2: one SCAN, two contexts |
| 7b | `.cc-qtools` → `LOG` | `:13995` | **→ rack** | §1: *log note* is rack-scoped |
| 7c | `.cc-qtools` → `BLOCKER` | `:13996` | **→ rack** | §1: *flags / blockers for this rack* |
| 8 | `#cc-sugg` · `#cc-chat` · `#cc-aistat` | `:14002`, `:14009`, `:14011` | **deleted — no phone home** | desktop rail, base `display:none` |
| 9 | `.stats` — fleet stat cards | `:14015` | **deleted — no home** | fleet tallies; not rack-keyed, not a §1 door |
| 10 | `.cc-rackline` | `:14017` | ✅ **KEEP — re-point `cmd_heroPickRack()` at the Build picker** | ⭐ **owner ruling: it IS the one line the Master-loaded screen needs. Do not write a new one.** |
| 11 | `.cc-rackhero` | `:14020` | ⛔ **OUT OF SHIP A → `RACKHERO-RELOCATE`** | ⭐ **owner ruling:** under the rack model it belongs in the **Forge 3D aisle view**, not the first screen. New board item, **and it carries its disposal path**. |
| 12 | `.cc-rackvitals` — RACKED / OPEN / BLOCKERS / NEXT-U | `:14025` | **→ rack** | rack-keyed. ⚠ verify it does not duplicate what the rack screen already shows |
| 13 | `#cc-openbay` | `:14027` | **deleted — covered by the rack OPEN AISLE** | §1 *SEE IN AISLE* is rack-scoped **and already exists there** — a genuine door closed, not moved |
| 14 | `.lens` — clocks | `:14034` | **deleted — no home** | not rack-keyed, not a door; iOS already shows the time |
| 15a | `.trow` → `#tt-deploy` | `:14049` | **deleted — covered by #10** | same destination as the picker line |
| 15b | `.trow` → `#tt-scan` | `:14050` | **→ rack + picker** | merges into the one SCAN (7a) |
| 15c | `.trow` → `#tt-handoff` | `:14051` | **→ SHIFT door** | §1 short list |
| 16 | `.sig-h` + `#cc-sig` — OPS SIGNAL | `:14054`, `:14055` | **closed — both signals re-home** | it renders exactly two rows (`:23426`–`:23427`): *handoff waiting* → SHIFT door; *Pod N%* → the picker line |
| 17 | `#cc-foot` | `:14057` | **deleted — no phone home** | desktop footer |

### ✅ RULED (a) — THE PICKER LINE CARRIES THE NBA VERB. ⚠ AND MEASURING IT FOUND A GAP.

Rows 3 and 6 delete `cmd_nba()`’s only two faces — the phone `.nba` (`:23418`) and `#cs-hero`’s CTA
(`:23695`); the markup at `:13854` calls them *"one brain, two faces."* **Owner ruled (a): the picker
line (#10) carries the NBA verb**, so the brain keeps a face and does not become dead code.

⛔ **THE GAP, FOUND BY READING ALL NINE BRANCHES RATHER THAN ASSUMING: NOT ONE OF THEM POINTS AT THE
RACK PICKER.** `cmd_nba()` (`:23734`–`:23747`) returns nine `{h, p, label, act}` shapes:

| Branch | Headline | Label | Destination |
|---|---|---|---|
| `:23738` | Set up your site profile. | `SET UP PROFILE` | `cmd_route('profile')` |
| `:23740` | Load your Master. | `LOAD MASTER` | `cmd_loadMaster()` |
| `:23741` | Start a deployment. | `SELECT RACKS` | `mscope_open()` |
| `:23742` | Capture your first rack. | `GO TO SCAN` | `cmd_route('work','scan')` |
| `:23743` | Resolve N open blockers. | `GO TO HANDOFF` | `cmd_route('work','handoff')` |
| `:23744` | Finish your shift handoff. | `GO TO HANDOFF` | `cmd_route('work','handoff')` |
| `:23745` | Continue *dep* — N% deployed. | `GO TO DEPLOY` | `cmd_continueWork()` → `showMode('work')` |
| `:23746` | Capture your first rack. | `GO TO SCAN` | `cmd_route('work','scan')` |
| `:23747` | Start a rack trace before deploy. | `GO TO SCAN` | `cmd_route('work','scan')` |

⚠ **The closest, `:23745`, lands on Build's WORKSPACE via `showMode('work')` — not on the deployment
detail where `.571` put the picker.** So "carries the NBA verb" and "points to the picker" are two
different destinations in every one of the nine states.

✅ **A FALSE POSITIVE I ALMOST FILED, RECORDED SO NOBODY RE-FILES IT:** `:23743` reads *"Resolve N open
blockers"* under a `GO TO HANDOFF` label, which scans as a wrong door. **It is correct.** Its own body
text is *"A blocker bites the next shift first. Capture the proof note and route it into a handoff,"*
so the label matches the action and the name says what the door opens. ⛔ **Do not "fix" it.**

### ⛔ THREE WAYS TO IMPLEMENT (a). OWNER PICKS — THEY ARE NOT EQUIVALENT.

- **(a-i) The line IS the NBA, relocated.** It renders `nba.label` and runs `nba.act`. Honest, names
  match doors, `cmd_nba()` keeps a real face. ⚠ **But the Master-loaded first screen then does not
  reliably point at the picker** — it points at whatever the next best action is.
- **(a-ii) The line always opens the picker; the NBA supplies only the sentence.** The rule holds and
  the destination is fixed. ⚠ **But `nba.label` and `nba.act` become unused**, so the brain is half-
  dead and its own labels are discarded — a quieter version of the problem (a) was meant to solve.
- ⭐ **(a-iii) ADD A TENTH BRANCH — RECOMMENDED.** `cmd_nba()` gains a steady-state branch (Master
  loaded, deployment active, no blockers, no handoff draft) returning *"Pick a rack"* → the Build
  picker. Then the line **always says what it opens**, and in the state Ship A actually cares about it
  **is** the picker line. The other eight branches keep pointing where they correctly point.
  ⚠ It is the only option that satisfies BOTH halves of the ruling without a lie or a dead field —
  and it is a change to `cmd_nba()`, so it needs saying out loud rather than slipping in under a
  markup strip.

### ⭐ AGREED — THE DOM CHECK RUNS BEFORE ANY DELETION

Owner ruling: **Generator takes a Playwright look at the real first screen — BOTH states — at
iPhone 15 / WebKit before any deletion, and diffs it against this source census. Discrepancies are
reported, not absorbed.**

⭐ **This is the direct answer to rev 1’s failure.** A source census read a comment instead of the
cascade and got two of five no-Master elements wrong. **The census is now a hypothesis the DOM
confirms — not a list to delete from.**

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
