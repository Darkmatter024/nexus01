# BATCH-VERIFY — consolidated device checklist (CALL 0, DIRECTIVE 2026-07-06)
**Protocol:** ships stack; owner runs THIS list once per batch (cap: every 6 stacked ships or before
any HIGH-risk ship). Every ship keeps its own rollback line. Claude Code appends; owner checks off.
**Batches .192-.197, .198-.201, .202-.212, .213-.214, and .215: RELEASED by owner (.202-.212 verified 2026-07-08; .213 boot plate + .214 deploy-tap FIX verified 2026-07-09; .215 crash-log hardening verified "all good" 2026-07-09). Batch .340-.345: RELEASED 2026-07-23 ("340-345 good") — cleared the 6-ship count cap and the MASTER FULL-INGEST HIGH-risk prereq. Batches .346-.350 (CLEARED 2026-07-24) and .351-.354 (CLEARED 2026-07-25) followed. **Batch .355-.363: RELEASED by owner 2026-07-30 ("everything is good to go all ships clear") — nine ships, three past the cap, incl. HIGH-risk .359 (BUILD banner rows). Cap RESET. Batch .364-.370: RELEASED by owner 2026-08-03 ("all good") — seven ships, one past the cap, incl. the .366 two-device pass and the .370 offline pass. Cap RESET. Batch .371-.375: RELEASED by owner 2026-08-04 ("all good") — five ships, cap RESET (detail at the `.375` block).** · Clear SW cache before the pass.

**⛔ HEADER RECONCILED 2026-08-06 — read this line, the two above it went stale.** This line had still
read "CURRENT BATCH: OPEN, .371-.372 (2 of 6)" long after that batch was released. **Superseded again
2026-08-08 — the true count was 39, not 25, and one of the two batches has since been released:**

- ✅ **`.377`–`.384` (8 of 6) — RELEASED BY OWNER RULING 2026-08-08, superseded by the arc.** The
  pass was run and it failed on the Build surface; `.385` records the finding: *"the device-verify
  failure was NOT a mis-mounted renderer, a wrong host, a bad gate or a cache. The Phase 2 Build
  workspace had never been built."* The `.385`→`.396` arc answered it, and the owner ruled the arc
  supersedes these eight blocks. **Cap reset for this batch. The unticked boxes stay unticked
  deliberately — the release is the ruling, not the checklist.**
- **`.385`–`.404` (20 of 6, contains the M2 renderer work — HIGH-risk) — OPEN.** Reconstructed
  block at the end of this file. **Cap blown by 14. Nothing should ship after `.404` until it clears.**
  (`.402` is an owner-directed correction made during verify, not new scope — it stays in this batch.
  `.403`/`.404` likewise: an owner-directed instrument and the regression fix it pointed at.)

✅ **THE PAGES BLOCK IS CLEARED — historical, left for the record.** This paragraph read *"the batch
cannot be run right now"* because `.403`/`.404` died in a GitHub Actions+Pages `major_outage` and the
live URL was stuck on `.402`. Both shipped; **live is now `v1.14.415` (`aad8181`), verified in the
served bytes 2026-08-08.** Nothing blocks the pass.

⛔ **RUN THE CONSOLIDATED PASS AT THE TOP OF THIS FILE, NOT THESE BLOCKS.** The debt was **39 ships**
(`.376`–`.415`, minus `.412` which was never stamped) — the "25"/"29" counts below are stale and
undercounted. ✅ **`.376`–`.384` RELEASED by owner ruling 2026-08-08** (`.377`–`.384` superseded by
the `.385`→`.396` arc; `.376` released in the same ruling), leaving **30 open: `.385`–`.415`,
grouped into 11 checks.** The
automated baseline has already taken the `.401`/`.402` attachment behaviour, tier composition,
overflow and the 44px floors off that list.

**✅ RESOLVED 2026-08-06 — the item that was blocking both batches is answered.** `.396` claimed the eight-ship
blank-rack arc closes; the owner confirmed **"rack draws"** against `v1.14.401`. **The `.389`→`.396` arc is
CLOSED** and the four ships that had stacked behind that silence are unblocked.

**What that pass does NOT cover, stated so nobody reads it as a batch release:** it establishes that the rack
RENDERS. Everything else in both batches is still unverified — in particular the `.401`/`.402` attachment
behaviour (single-entry transfer on Open Aisle, pause/resume on leaving Build, ×10 Build entries), which a
drawing rack does not establish, and the `?legacy=1` half of `.402`.

---

# ⭐ CONSOLIDATED PASS — `.385`→`.415` · RUN THIS, NOT THE BLOCKS BELOW
**Written 2026-08-08 against live `v1.14.415` (`aad8181`). This section supersedes the individual
blocks for every ship in the range.** Grouped by SURFACE, not by ship: **30 open ships collapse to
11 checks**, because thirty ships touching five surfaces is five surfaces, not thirty passes.
Each item lists the ships it releases. Tick the item, release the ships.

## ✅ `.376`–`.384` — RELEASED BY OWNER RULING, 2026-08-08

**"`.377`-`.384` is superseded by the arc, mark it released."** Eight ships closed. The pass that
was RUN and FAILED on the Build surface is answered by the `.385`→`.396` arc, which found the real
cause — *the Phase 2 Build workspace had never been built* — and rebuilt it. **CALL 0 cap reset for
that batch.** Ships released: `.377` `.378` `.379` `.380` `.381` `.382` `.383` `.384`.

**`.376` released in the same ruling** — *"`.376` too, mark it released."* It is the ship that had
**neither a block nor a release line anywhere in this file**, stranded between the released
`.371`–`.375` and the batch above. It is now closed by ruling rather than by checklist, which is the
only way it could have been closed: no checklist for it was ever written. **Nine ships released
total: `.376`–`.384`.**

📌 **What this release asserts, recorded so it is not read wider than it is.** The ruling supersedes
the *Build-surface failure* that stopped the pass. Four of those eight are art/Tools ships
(`.377` OPS wall at 768, `.378` TOOLS card faces, `.379` glowtune removal, `.381` desktop TOOLS art)
and three are the Command Shell (`.382`–`.384`) — surfaces the arc did not touch. **It is not a blind
release:** the automated baseline independently covers the Tools grid and its doors, the OPS wall's
nine tools one tap from Build, tier composition at every breakpoint, zero horizontal overflow and
the 44px floor. What is *not* independently covered is the ART itself — whether the right image is
on the right tile. If a wrong tile face turns up later, this is the release that let it through.

## RECONCILIATION — the recorded debt was wrong in three ways

**The debt was 39 ships, not 29** (`.376`–`.415` inclusive, minus `.412`, which was never stamped;
every other stamp in that range shipped — the "29" on record counted only to `.405`). **With
`.376`–`.384` released, 30 remain: `.385`–`.415`, minus the never-stamped `.412`.**

| # | Record defect | Consequence |
|---|---|---|
| **D1** | **`.376` appears NOWHERE in this file** — no block, no release line | one shipped version was invisible to the process entirely |
| **D2** | **`.412` was never stamped.** Its work shipped inside the `.413` commit (`87674df`); `.413`'s `prevVersion` is `.411` | **a whole desktop-shell ship is live, filed under a block titled "a rack with no devices"** — nobody reading this file would know the desktop composition changed. Its block below is VALID work; only its version number is fiction. Do not look for a `.412` badge |
| **D3** | **`.376`–`.381` had no blocks** (art/tokens/Tools ships) | six ships never had a checklist to fail against — **all moot as of the release above**, recorded because it is how six ships went un-listed for a month |

📌 **All three record defects are now closed by ruling, not by repair.** D1 and D3 were *missing
checklists*; the release means no checklist will ever be written for them. **D2 is different and
survives: `.412` is not a missing block, it is a missing STAMP** — its desktop-shell work is live
inside `.413` and still needs verifying. That is item **10** below.

## WHAT AUTOMATION NOW PROVES — subtracted from your list, not assumed away

`test/e2e`, 9 specs. **phone-webkit: 119 passed / 9 skipped / 0 failed** against `.415`.
These were device checks in the blocks below and are now machine-checked every run:

- **The whole M2 attachment story the header lists as still-open for `.401`/`.402`** — ten Build
  entries leave exactly one `#bw-mount` · RackEngine never holds more than one interactive
  attachment · opening the aisle TRANSFERS the single attachment and Build does not steal it back ·
  aisle→Build round trip leaves `#bw-mount` intact · no uncaught exception across it.
- **`.412`'s tier behaviour** — 1024px flips phone→desktop chrome · **the composition follows the
  VIEWPORT, not a flag read once at boot** · the rip-cord pins phone composition at desktop width.
- **Zero horizontal overflow** on Command/Build/Tools at every declared breakpoint (Rule 1).
- **44px floor** on every visible interactive control, and on the bottom nav in both axes.
- **`.407`/`.408`/`.409` Forge dock** — 20 layout tests incl. toast-above-row and pill baselines.
- **`.413`/`.414`/`.415` Master truth** — 5-rack window · `0/0` only when genuinely empty · reading
  the aisle never mutates the stored Master · storage guards and quarantine.
- **`.374` boot entry** · **`.399` offline PDF import** · OPS wall nine tools one tap from Build.

⚠ **Automation does NOT replace this pass.** Nine tests SKIP because the service worker will not
install in this webkit, and `env(safe-area-inset-top)` resolves to **0** in the harness. Those are
precisely the two things only your phone can answer — they are items 1 and 2 below.

---

## THE PASS — 20 checks. Clear the SW cache first. ⛔ START AT ITEM 0.
*(Was 16, then 11 after the `.376`–`.384` release dropped five whole. Now 14: `.416`–`.422` added
three, and only three, because **six of those seven ships have no visible surface at all.**
`.425` adds one — item 15 — and it is the opposite case: a ship that is nothing BUT visible surface.)*

⭐ **`.416`–`.422` — WHAT LANDED 2026-08-08/09 AND WHAT IT COSTS YOU TO CHECK.**
Seven ships: `.416` tap window · `.417` site-profile root · `.418` one operator identity ·
`.419` Event Log folded in · `.420` Blocker records · `.421` step model · `.422` Master staging.
**`.417` and `.419`–`.421` render nothing** — they are data contracts with test coverage and no
screen. Verifying them by eye is not possible and not required; what they need is that the app
still opens and your data is still there, which items 12–14 cover. Only `.416` (a real tap
behaviour) and `.422` (a new confirmation step in import) changed anything you can see.

### ⛔ 0 · THE P0 — DO THIS FIRST, IT BLOCKS EVERYTHING (`.424` + `.426`)

⛔ **THIS ITEM FAILED ON HARDWARE against `.425` and was REWRITTEN.** The phone showed
`NO HOST DATA IN MASTER · 68 CABLES` and `RESTORED FROM CACHE`. The build was proven innocent —
all three stamps read `.425` and the served bytes carried the normalization. **The stored DATA was
built by the old normalizer**, and `.424` only ever derived components at IMPORT, so a restored
Master kept the old inventory forever. `.426` migrates it at boot. ⚠ **The old wording for item 0
told you to re-import. Do NOT. The entire point of `.426` is that no re-import is required** — and
re-importing would mask exactly the thing this item now tests.

- [x] **0 · `s4:099` REBUILDS ITSELF, WITH NO RE-IMPORT.** Just open PHANTOM and go to **`s4:099`**
      in Forge. Touch nothing else — no import, no storage clear. It must show **19 components**,
      not `0 COMPONENTS`: **nine GPU-B300-01 at RU 35·32·29·26·23·20·17·14·11**, an
      **SN2201 at RU46**, **eight PS-1RU-06** (42·41·40·39 and 9·8·7·6), a **CDU-4RU-03 at RU2** —
      and it must **still hold its 68 cables**.
- [x] **0a · NOTHING REGRESSED ON THE SITE-HOSTS RACKS.** Open an **s1**, **s2** and **s3**
      cabinet. They must look exactly as they always have — same devices, **no extra rows**. The
      migration applies the same rule as import: where SITE-HOSTS already owns a U, the endpoint is
      dropped. Extra rows here means suppression did not fire.
- [x] **0b · IT PERSISTS, AND IT DOES NOT RE-APPLY.** Fully reload. `s4:099` must show the **same
      19** — not 19 again from scratch, and **not 38**. The rebuild is written to storage once and
      stamped; a second boot must find it already current.
- [x] **0c · YOUR MASTER KEPT ITS IDENTITY.** After the rebuild, the app must still know which file
      this is — same site, same source filename, same cable counts. ⚠ This is the leg that catches
      the round-trip bug: re-saving a restored Master used to write `null` over the source hash and
      the cable count. *(`0c` used to be the import-summary check. That still matters and moves to
      item 12 — it only happens at import, and you are not importing here.)*
✅ **0 CONFIRMED ON HARDWARE 2026-08-09** — owner: *"s4:099 shows 19 components now."* The boot
migration rebuilt a stored Master in the field, off the device's own data, with **no re-import**.
That closes the `.424` P0 in code AND the `.426` rule that fixed its delivery.
⚠ **0b IS STILL THE ONE THAT MATTERS** and is NOT covered by that word: a rebuild that re-applies
on every boot also shows 19 the first time. Only a reload separates "migrated once and stamped"
from "migrating forever" — and the failure signature is **38**, not an error.

✅ **ITEM 0 IS CLOSED — `.424` AND `.426` RELEASED, 2026-08-09.** Owner on hardware: *"s4:099 shows
19 components now"* · *"19 after reload"* · *"0a and 0c pass"*. All four behavioural legs green. The
P0 that blocked this whole list is done: a cabinet that rendered zero components for the entire life
of the product resolves its 19 real ones, **rebuilt from the device's own stored data with no
re-import**. `0d` is the console read-out and is **NOT required** — it exists to distinguish failure
modes, and there was no failure to distinguish.

- [ ] **0d · ONE CONSOLE LINE, IF YOU HAVE ONE** *(optional — only if a later device disagrees).*
      `window.__phantomNormMigration` should read
      `status:"migrated"`, `from:1`, `to:2`, and a nonzero `added`. If it reads
      `"no-cables-retained"` then your stored Master genuinely has no endpoints to rebuild from and
      a re-import IS required — that is the one case where the answer is different, and the app
      says so rather than pretending.

*Why this is item 0: a cabinet present in CUTSHEET but absent from SITE-HOSTS rendered zero
components for the entire life of the product — since v1.6.26, proven by git. 42% of this site's
racks are in that class. Everything below is meaningless if this is wrong.*

### A · The two the harness structurally cannot do
- [ ] **1 · SAFE AREA, on the phone.** Header `API OFFLINE` pill sits **below the notch** and is
      comfortably tappable; the bottom strip clears the **home indicator**. ⚠ `env(safe-area-inset-top)`
      is **0** in the harness — it was once 8px INTO the notch and no screenshot could show it.
      *Releases `.412`-work, `.407`, `.408`.*
- [ ] **2 · OFFLINE, on the phone.** Airplane mode → relaunch from the home-screen icon → app boots
      to a usable shell and says it is offline. Save something, return to network, confirm it
      survived. ⚠ Nine harness tests skip here — the SW never installs in that browser.
      *Releases `.399`, `.400`, and the offline half of the batch.*

### B · The renderer, on real iOS WebKit (HIGH-risk — this is why the cap exists)
- [x] **3 · The rack draws and HOLDS in Build** — open Build, confirm the rack draws, then
      **leave to Tools and come back, ×10**. *Releases `.390`–`.396`, `.401`.*
      ⚠ **What the 2026-08-06 "rack draws" pass did NOT establish.** It proved the rack RENDERS
      once, under `.401`. It never established the attachment LIFECYCLE: that leaving Build
      releases the context and returning re-acquires it, ten times, without leaking one. That is
      what this item is actually for, and it has never been run.
      **Three distinct failure signatures — they mean different things, so report WHICH:**
      · **Blank on a later entry** (draws for the first few, then nothing) = contexts are leaking
        until iOS refuses a new one. **Report the entry number it first goes blank on** — that
        number IS the budget, and it is the single most useful thing you can bring back.
      · **Progressive slowdown** with the rack still drawing = old attachments are alive and still
        rendering; the release side is not firing.
      · **Blank immediately on the FIRST return from Tools** = not a leak at all, it is the
        re-acquire path, a different defect with a different fix.
      **What the harness already proves at `.426`, so you are not re-checking it:** `02-build-forge`
      green in isolation — the Build mount holds exactly ONE live WebGL canvas, and opening the
      aisle TRANSFERS that single attachment without Build stealing it back. The invariant holds
      ONCE, in a desktop browser with a large GPU budget. **iOS Safari's budget is far smaller and
      the harness cannot model it** — ten real entries on the phone is the only thing that can show
      a leak, which is exactly how this same class surfaced on the test machine at scale.
✅ **3 CONFIRMED ON HARDWARE 2026-08-09** — owner: *"rack holds all 10, no slowdown."* No leak, no
progressive degradation. **Releases `.390`–`.396` (the eight-ship blank-rack arc) and `.401` (the
RackEngine lifecycle).** This is the check the 2026-08-06 pass could not make: that pass proved the
rack renders ONCE; this proves the attachment is released and re-acquired ten times without leaking.

- [ ] **4 · Open Aisle draws and holds; close returns to Build with the rack still there.** Repeat
      ×10. *Releases `.403`, `.404`, `.405` — confirmed once on `.405`, re-confirm under `.415`.*
      ⚠ **This is the TRANSFER path, and item 3 does not cover it.** Item 3 proved Build can release
      and re-acquire its own context. This proves the context can **move to another surface and come
      back**, which is a different mechanism: on Open Aisle the single attachment transfers to the
      aisle, and on close it must return to Build.
      **Signatures, again distinct — report WHICH:**
      · **Aisle draws, but closing leaves BUILD blank** = the transfer is one-way; the attachment
        went to the aisle and never came home. Build is the operational centre, so this is the worst
        of the three.
      · **Aisle blank on a LATER open** (early ones fine) = the transfer leaks a context per round
        trip. **Report the round-trip number**, same as item 3.
      · **Aisle blank on the FIRST open** while Build still draws = the aisle never receives the
        attachment at all — that is `.405`'s defect returning, and it was confirmed fixed once on
        `.405` but has never been re-confirmed under `.415`'s SINGLE-MASTER changes.

⛔ **ITEM 4 FAILS — CONFIRMED ON HARDWARE 2026-08-09.** Owner: *"rack is gone from build after
close."* This is the FIRST signature above, the worst of the three: the transfer is **one-way**.
**Item 4 stays OPEN and `.403`/`.404`/`.405` stay unreleased.**

**Found by harness first, then confirmed on device.** Automating the ×10 round trip measured, at
2.5s and again at 11s after close — well past Build's ~5s re-arm — `#bw-mount` visible at a real
326×320, **zero canvases, zero attachments**. Pinned as `test.fail()` in `02-build-forge.spec.js`
("PINNED: closing the aisle should return the rack to Build, and does not"). When a fix lands it
flips to *"Expected to fail, but passed"* — that is the signal to remove the pin.

**Cause, read from the code:** `forge3d_open` releases Build's attachment by design; `forge3d_close`
(:19639) then disposes the aisle and calls `reh3d_activate3D()` — the **rack-detail** surface —
which its own comment says no-ops when there is no `#reh3dCanvasHost`, exactly the case when the
aisle was opened FROM BUILD. `bw_mount3D` has one caller, `bw_render` (:21199), so only a Build
re-render rebuilds it, and nothing on the close path re-renders Build. The IntersectionObserver
cannot cover it: it pauses and resumes an EXISTING attachment and cannot recreate a released one.

✅ **What the ×10 DID clear, and it is the expensive half: THERE IS NO LEAK.** Ten round trips,
exactly one live context whenever the aisle was open, and round 10 byte-identical to round 1 —
`openCanvases 5 · openLive 1 · closedCanvases 4 · closedLive 0`, flat throughout. The transfer
mechanism is sound. What is missing is only the hand-back.

⚠ **Why it was never caught:** the pre-existing round-trip test asserts `attachments.length <= 1`
after close, and **0 satisfies that**. The spec header claimed *"the aisle round trip leaves Build
intact"* and no assertion ever checked it. A tolerant bound reads as coverage.
- [ ] **5 · `?legacy=1` — the rack still renders and the app does not crash.** The `.402`
      observer is redesign-only but the single-context guard applies in BOTH houses; the legacy
      half has never been checked. *Releases the `.402` legacy half.*

### C · The Master, with YOUR file (fixtures cannot prove this)
- [ ] **6 · Load your real Master → cab count is what it has always been.** *Releases `.414`, `.415`.*
- [ ] **7 · Load the SAME Master a second time — nothing changes, nothing is lost.** That is the
      `.415` replace path end to end. *Releases `.415`.*
- [ ] **8 · Forge: a populated rack resolves its devices; an unprovisioned S4 cab reads
      `NO HOST DATA IN MASTER` in CYAN, not red.** *Releases `.413`.*

### D · Surfaces that need eyes, not assertions
- [ ] **9 · Design-system screens** — the five phone screens that took the `.410` lock still read
      as one system; the `.411` loadout picker opens and picks. *Releases `.409`, `.410`, `.411`.*
- [x] **15 · THE COMMAND DECK ON THE PHONE (`.425`, owner override).** Open **Command**. One column,
      top to bottom: **hero card with rack art** (NO ACTIVE DEPLOYMENT / your deployment, the
      RACKS · BLOCKERS · COMPLETE row, START A DEPLOYMENT) → **PHANTOM INTELLIGENCE** →
      **LOCAL SYSTEM STATE** → **BUILD PROGRESS** → **FIELD OPERATIONS** → **FIELD TOOLS** →
      **SHIFT READINESS**.
- [x] **15a · ⚠ THE CHROME IS STILL THERE — CHECK THIS ONE FIRST.** The **PHANTOM header with the
      version badge** is at the top and the **bottom nav is on screen and still routes**. This is
      the regression the port caused and it was caught in the harness, not by eye: the desktop
      block hands navigation to the side rail, and carrying that to a phone left no nav and no
      version/SW/network pills. If either is missing, **stop and tell me** — do not keep going.
- [x] **15b · NO SIDEWAYS SCROLL, anywhere in that stack** — including across the FIELD TOOLS tile
      grid and the FIELD OPERATIONS art. Measured `docW=390` at 390px, but the harness cannot see
      a real iOS rubber-band.
- [x] **15c · THE CARDS LINE UP.** All seven share one left edge. There must be **no step inward**
      where FIELD OPERATIONS begins — that was a 17px inset from a container inheriting card
      padding, fixed in this ship, and it is the thing most likely to look "almost right".
      ⚠ **Rip cord if it is wrong in the aisle: `?cshell=0`** returns the old phone Command page
      without clearing storage or losing anything.
      *iPad: single column at 834 is an OWNER RULING this ship, not a defect — see item 10 for the
      landscape/desktop leg, which is unchanged.*

✅ **ITEM 15 CLEARED BY OWNER 2026-08-09 — *"command deck looks right on the phone."*** `.425` is
verified on hardware and **RELEASED**. The chrome leg (15a) is confirmed by the same word: it was
written as a stop-and-report check, and the pass was reported without one. ⚠ **15b (no sideways
scroll) was not called out separately** — it is the only leg of the four that is a gesture rather
than a look, so if a rubber-band shows up later it is unproven, not disproven.

### E · iPad (the ship nobody knows shipped — see D2)
- [ ] **10 · iPad LANDSCAPE gets the desktop shell automatically** (left rail + right column), and
      rotating to portrait stays phone until reload — **expected, not a bug.** *Releases `.412`-work.*
      ⚠ The laptop leg of this went with the `.382`–`.384` release; the iPad leg did not, because
      `.412`-work shipped under `.413` and is outside the released batch.

### G · The 2026-08-08/09 batch (`.416`–`.422`) — four checks for eight ships (items 11, 12, 13, 13a)
- [ ] **11 · THE TAP WINDOW (`.416`).** Open the Forge aisle, tap a rack to open the detail panel,
      and **while it is sliding up** try to tap the grid or search button under the header.
      Nothing should happen until the panel is closed — and both buttons must work normally the
      moment it is. *This is the only one of the seven with a behaviour you can feel.*
- [ ] **12 · IMPORT NOW ASKS (`.422`).** Import a Master. You should see a summary — site, RACKS,
      HOSTS, CABLES — and an **ACTIVATE SITE** button, instead of the file silently becoming your
      site. **Tap Cancel once** and confirm your existing Master is exactly what it was. Then
      import again, activate, and confirm the counts you saw are the counts you got.
      ⚠ If your Master is the host-less one, this is where it will say so **at import** — that is
      the guard working, and the number it shows is the answer to the open column-D question.
- [ ] **13a · RESTORE RELOADS ITSELF (`.423`).** ⚠ **Do this LAST, and on a device you can afford
      to disturb — it reloads the app.** Export a full backup, then restore it. PHANTOM should
      **reload on its own** and come back with your data. **You must NOT be told to reload.**
      Afterwards confirm the version still reads `v1.14.423` and that your site, Master and
      blockers are the ones from the backup.
      *Why it matters: before this, a restore left memory holding the OLD Master while storage
      held the restored one, and the app asked you to fix that by hand. If the old sentence
      "Reload the app to see restored data" appears, the defect is back.*
- [ ] **13 · NOTHING ELSE MOVED (`.417`, `.418`, `.419`, `.420`, `.421`).** Open the app and
      confirm: same site, same Master, same deployments, and **any blockers you already had are
      still listed with the notes you wrote.** Nothing should ask you to set anything up.
      In the console, three lines confirm the invisible half:
      `PHANTOM_SITE.describe()` — your real site, `siteLead` and `currentOperator` both your name,
      master binding `match` · `deploy_verifyAuditChain()` — `ok:true`, `brokenAt:null` ·
      `PHANTOM_BLOCKERS.open()` — your blockers, each with its description.
      ⚠ If you ever typed a name into "Enter Your Name" that differs from your setup name, boot
      logs a **divergence warning** naming both. That is the guard, not a fault.

### F · The honest one
- [ ] **14 · Nothing says "JS ERROR" during normal use.** Open the aisle, walk it, leave, come back.
      A healthy session must raise no crash banner. *Releases `.406`.* (Also covers the `?legacy=1`
      leg of item 5 — pull the rip-cord and confirm the same silence in the other house.)

**ROLLBACK:** every open ship is `git revert <commit>`; the range is `c261d28^..aad8181` (`.385`
onward — `.376`–`.384` are released and out of scope). The riskiest single revert target is `.401`
(`a94bb5f`, RackEngine) — `.405` is the fix that makes it safe, so revert `.405` and `.401`
together or neither.

**On release, write ONE line here** (e.g. *"pass run 2026-08-XX, `.385`–`.415` RELEASED, cap
RESET"*) rather than ticking 30 blocks. Then reset the CALL 0 cap to 1 of 6.

---

## Per-ship blocks — .192 to .384 are ARCHIVED

All released. Moved to `archive/2026-08-08/BATCH-VERIFY-blocks-192-384.md` on 2026-08-08.
The blocks below are the still-open range only.

---

## v1.14.385 — Phase 2 Active Build Workspace, phone (`c261d28`) · rollback: revert commit
Honest finding that preceded it: the Phase 2 Build workspace **had never been built** — `#pg-work`
held static markup, no renderer, and `.373`–`.384` never touched it. So this was never a regression.
New `#bw-shell` in `#pg-work` via `bw_render()`, gated on `body.rd`; legacy `#work-grid` **hidden, not
deleted** (`#pg-work.bw-on`).
- [ ] Phone bare URL: BUILD opens the Active Rack workspace — header, site context, LOCAL ACTIVE state, rack hero, phase + progress, CONTINUE, Next Action, 3D preview, OPEN AISLE, four metrics, SCAN / PORT MAP / LOG BLOCKER, bottom nav
- [ ] `?legacy=1` keeps the untouched launcher and the old `#work-grid` — rip-cord intact

## v1.14.386 — three purpose-built shells, laptop corrected (`a1c6e7a`) · rollback: revert commit
Owner device review found the three-column Mission Control grid forced into a laptop viewport.
Measured, not guessed: at 1280 a 246px sidebar + 56px padding leaves 978px; three columns need 1200.
**The overflow was CLIPPED, not scrolled.**
- [ ] Laptop 1280 **and** 1440: two columns, dominant hero, readable rail, aligned topbar, no bottom nav
- [ ] 1500+: three columns · phone unchanged · `?legacy=1` unchanged

## v1.14.387 — Build Progress step labels shortened (`f44aea4`) · rollback: revert commit
Owner-directed. Five full phase labels truncated to `MECHAN…` / `VALIDAT…` in the 320px laptop rail.
Now MECH / PWR / NET / CPU / VAL, verified unclipped at 1280 by `scrollWidth` vs `clientWidth`.
- [ ] Laptop 1280: rail reads MECH PWR NET CPU VAL with exact counts and the full current-phase name below
- [ ] Phone and `?legacy=1` unchanged

## v1.14.388 — Phase 2 desktop Build workspace (`050e956`) · rollback: revert commit
Build opens INSIDE the Phase 1 persistent Command Shell — sidebar and topbar stay, only the centre changes.
- [ ] At `?shell=1` tap BUILD: sidebar + topbar stay, BUILD is the active nav item, no bottom nav
- [ ] 1440: hero left, context rail right, rack queue below · 1600+: three columns, queue left
- [ ] CONTINUE, OPEN AISLE, SCAN, PORT MAP, LOG BLOCKER all still route
- [ ] Phone at 390 unchanged from `.385` · `?legacy=1` unchanged

## v1.14.389 — Phase 2 feature-complete, eight items (`f065ad0`) · rollback: revert commit
All writes go through the existing hardened path (`checklist_toggle`, `checklist_setNote`,
`deploy_advancePhase`) — no new writer, no raw `localStorage` write, no new key.
- [x] **Owner reviewed on device and it FAILED with two defects** — `.390` opens "TWO DEVICE DEFECTS, FIXED SEPARATELY". Re-verify below via `.390`+.
- [ ] Camera rail, CABLES, OPEN AISLE · all four tool tabs open, Back returns to Build
- [ ] Worklist toggles persist across reload · evidence notes save · phase completion advances
- [ ] Airplane mode · laptop persistent nav, no third column, no clipping · desktop 1440/1600/1728
- [ ] `?legacy=1` launcher intact, RETURN TO NEW UI works

## v1.14.390 — rack mount lifecycle (D1) + Build spacing system (D2) (`1b4c2fb`) · rollback: revert commit
D1: canvas mounted every time in a desktop harness and failed on device ⇒ **lifecycle defect**, not a
missing call or CSS collapse — `bw_render()` runs the instant `showPage('work')` fires, so `#bw-mount`
can measure ZERO mid-transition. D2: ONE spacing system on `#bw-shell` (outer 15, gap 15, card 17,
control 9, radius 20, secondary 46, primary 56); all one-off local margins deleted.
- [x] **Its on-device diagnostic worked** — `.394`: "The device diagnostic shipped in `.390` did its job and named the real cause".
- [ ] Build reads as one surface, not stacked legacy blocks — hierarchy in the required order
- [ ] Rack draws on first open (superseded by `.391`/`.392`/`.394`/`.396` — verify at the end of the arc)

## v1.14.391 — rack first-mount lifecycle (iOS) + three visual defects (`e998a35`) · rollback: revert commit
Root cause with in-repo precedent: `showMode()` disposes the Command hero context then calls
`bw_render()` **synchronously in the same call stack**. Visual D3: PORT MAP appeared twice — action
removed, contextual tab kept (**one door per feature**).
- [ ] Cold load → Command (live hero) → first Build open: canvas present, no diagnostic; away and back: present; real phase-completion re-render: present
- [ ] Canvas count stable at 5 across all three (no context leak) · phone header clean at 393 · desktop overlap gone at 1280 · zero horizontal overflow
- [ ] ⚠ **Disclosed as still open at `.391`, needs your ruling:** bottom nav 4th item is **EXIT** where the approved reference shows **SHIFT** · rack-preview control rail wraps 4-then-1 and carries REAR + EXPLODE, which the reference does not show · metrics render honest em-dashes (harness rack has no Master-linked platform) so the **metrics layout has never been seen against a populated rack**

## v1.14.392 — deterministic rack stage + event-driven recovery (`540e14a`) · rollback: revert commit
The captured device log was **from a different surface than the one under repair** — "hero mount not
laid out after 600f" is emitted by `cmd_rackHero3D` (Command `#cc-rackhero-mount`), not the Build mount.
- [x] ✅ **DEVICE-CONFIRMED BY OWNER** — `.393` records it verbatim: "The rack now loads in the Build workspace on device, confirmed by the owner on v1.14.392."
- [ ] Leave to Command and return; complete a phase; draws every time

## v1.14.393 — Command hero gets the same event-driven recovery (`301ba2d`) · rollback: revert commit
Closes the other half of the identical defect, on `#cc-rackhero-mount`.
- [x] **Was on device** — the "no webgl context granted (after 12 re-arms)" capture that drove `.394` came from this build.
- [ ] Cold load to Command with a Master loaded: RACK HERO draws untouched → open Build, that rack draws → return to Command

## v1.14.394 — one live rack, and it belongs to Build (`71d4279`) · rollback: revert commit
iOS Safari was never failing to lay the box out (`.392` fixed that) — it was **REFUSING A SECOND LIVE
CONTEXT**. Command surrenders the live rack to Build.
- [ ] Cold load, open Build, rack draws on the FIRST open
- [ ] Command now shows the DOM elevation rather than a live 3D rack — **that is intended, judge it**
- [ ] If Build still reports a refused context, a THIRD context owner is alive and the card says so

## v1.14.395 — M0: build the instrument before changing what it measures (`68dd5a9`) · rollback: revert commit
First ship of the approved ARCHITECTURE BLUEPRINT program. **Zero visual change, zero behaviour change
except honesty.** Renderer counts must be comparable before and after.
- [x] **Instrument ran on device** — `.396` root cause was "found with the M0 instrument on the first run and proven in-browser".
- [ ] Rack behaviour identical to `.394`: if it drew before it draws now, if it refused before it still refuses — only the measurement changed

## v1.14.396 — the rack was never refused a context; the check asked the wrong question (`956f262`) · rollback: revert commit
three.js r128 creates a **WebGL2RenderingContext**. Per spec a canvas already holding `webgl2` returns
**NULL** for `getContext('webgl')` — a mismatched type is refused, not created. The capability check
was asking the wrong question and reporting a refusal that never happened.
- [x] ✅ **CONFIRMED BY OWNER 2026-08-06 — "rack draws".** Verified against the build Pages was serving at the time, **`v1.14.401`**, which carries this fix. **THE EIGHT-SHIP ARC `.389`→`.396` IS CLOSED.** The root cause holds: three.js r128 creates a WebGL2 context, a canvas holding `webgl2` returns NULL for `getContext('webgl')`, and the capability check had been reporting a refusal that never happened.
  ⚠ **Scope of this pass:** it establishes that the rack RENDERS. It does **not** establish the `.401`/`.402` attachment behaviour — single-entry transfer on Open Aisle, pause/resume on leaving Build, or ×10 Build entries without climbing. Those are separate checks and still open.

## v1.14.397 — M1-a: backup coverage is derived, not remembered (`35b9f37`) · rollback: revert commit
`exportAllData` hand-listed FIFTEEN sections; the app has ~63 keys, sixteen uncaptured ones being real field work.
- [x] ⚠ **DEVICE-VERIFIED AND IT FAILED** — `.398`: "The `.397` registry was verified on a live device immediately after shipping and it was INCOMPLETE." Three real keys were missing. Superseded by `.398`; verify there.

## v1.14.398 — M1-b: coverage measured against live storage (`9b01d25`) · rollback: revert commit
Adds `deploy_forge_loadout_v1`, `deploy_forge_view_v1`, `phantom_audits_v1` (completed audits).
- [ ] Real deployment loaded → EXPORT FULL BACKUP → **no** unrecognised-key toast
- [ ] Downloaded JSON has a `keys` object and `unclassifiedKeys` is an **empty array**

## v1.14.399 — M1-c: every write path guarded, PDF import works offline (`2eae342`) · rollback: revert commit
ST1, the highest data-loss exposure in the app: the private wrapper behind `phantom_node_status_v1`
(per-node racked/verified state).
- [ ] Mark a node racked in the aisle view, reload, confirm it persisted
- [ ] With storage throttled or a nearly-full device, mark a node → **"Storage full" toast, not silence**
- [ ] Fully offline, import a PDF → works with no connection prompt

## v1.14.400 — M1-d: the read side · M1 COMPLETE (`f762a68`) · rollback: revert commit
`safeGet`/`safeRemove` land; 84 call sites migrated by script with paren-delta verification, 0 leftover.
**ABSENT stays silent; PRESENT-BUT-UNPARSEABLE is a data-loss event — loud, and the bytes are kept.**
- [ ] Normal use: nothing looks different anywhere
- [ ] Safari console: `localStorage.setItem('phantom_audits_v1','{{{broken')` then reload → toast **naming the key**, app still working, `phantom_quarantine_v1` holds the original broken bytes
- [ ] Export a backup and confirm `phantom_quarantine_v1` travels in it

## v1.14.401 — M2-a: the graphics lifecycle has an owner (`a94bb5f`) · rollback: revert commit
Opens M2, **structural half only** — `RackEngine.attach`, the reclaim barrier (I6), modes and the
Vocabulary normalisation are M2-b. Registration now happens at the boundary that CREATES the renderer,
so the single-context guard is an invariant instead of a convention. Both `WebGLRenderer` sites register.
Per-attachment `IntersectionObserver` closes the invisible-canvas drain (`document.hidden` is NOT set by
a `display:none` ancestor).
- [ ] Build open, rack renders → console `PhantomGL.diag()` → `attachments` shows **exactly one** entry for the Build mount
- [ ] Build → Open Aisle → Build: **one** entry at every step (transferred, not added); rack still there on return
- [ ] Leave Build for Tools → that attachment reports `paused: true`; return → `paused: false` and animating
- [ ] Enter Build **×10**: `attachments` never exceeds one, canvas count does not climb
- [ ] Everything else identical to `.400`
- [x] ⚠ **Shared-house flag — ✅ RULED AND CLOSED by owner 2026-08-06: "gate the observer on body.rd".** Shipped as `.402`. Verify there, not here.

## v1.14.402 — owner ruling: the visibility observer is redesign-house only (`1f47b87`) · rollback: revert commit
Answers the `.401` flag above; **adds nothing.** `_observe` returns early unless `document.body` carries
`rd`, so under `?legacy=1` no observer exists, `att.paused` stays false for the life of the attachment, and
both renderers behave exactly as they did on `.400`. Functional diff is **one line plus the stamp** — the rest
is comment. ⛔ **The single-live-context guard (`releaseOthers`, I1) is deliberately NOT gated** — two live GL
contexts on iOS is the crash class this milestone exists to close, and legacy is entitled to that fix. Only the
observer is house-scoped; the invariant is not.
- [ ] Bare URL: open Build, leave for Tools, return — `PhantomGL.diag()` still shows the attachment `paused: true` while away and `false` on return, exactly as `.401` did
- [ ] `?legacy=1`: reach a rack surface, confirm the rack renders and **keeps** rendering as it did before `.401`; `RackEngine.report()` lists the attachment with `paused: false` throughout
- [ ] ⚠ **Clear `phantom_legacy` between the two** — a `?legacy=1` visit pins it for the whole origin and the next tab boots legacy by design (the `.384` false alarm; see that block)

## v1.14.403 — aisle lifecycle trace (`4d02cf3`) · rollback: revert commit
**INSTRUMENT ONLY, zero behaviour change.** Owner-directed after a physical reproduction, and written so the
owner never has to read a console: it writes through the existing `phantom_logErr` into the existing
`phantom_crash_log` ring, readable **on the phone at SYS → ERRORS**. No new storage key — a new key would have
needed M1 registry classification, so the one existing door is reused. Records, in order: `OPEN_AISLE_CLICK`,
`AISLE_OPEN_REQUESTED`, `AISLE_HOST_CREATED` (measured mount w/h), `ENGINE_ATTACH_STARTED`, `ENGINE_ATTACHED`,
`FIRST_FRAME` (one-shot), `AISLE_PAUSED`, `AISLE_RESUMED`, `AISLE_TEARDOWN` (+stack), `AISLE_CLOSE_REQUESTED`
(+stack), `AISLE_CLOSED_OBSERVED`, `UNDERLYING_ROUTE_REVEALED`, `AISLE_HOST_REMOVED` — each with a state
snapshot (open flag, in-DOM flag, `body.rd`, mount child count, rack `is-3d`, redesign mode, `document.hidden`,
full `RackEngine.report()`).

⛔ **THIS SHIP HAS NEVER BEEN SERVED — it was stamped, pushed, and its Pages deploy died. See the `.404` block.**

⚠ **Its stated premise was WRONG and `.404` supersedes it.** `.403` was written against *"the sheet closes
itself"*; the owner's screenshots then established the aisle **stays open** and only the **viewport** is blank.
The close-handler theories are abandoned. **The instrument is deliberately RETAINED** — it costs nothing and it
is what will confirm `.404` on the device. Verify it as part of the `.404` pass below, not separately.
- [ ] Ring is readable at **SYS → ERRORS** on the phone after one Open Aisle, no console needed
- [ ] Entries appear **in order** and each carries its state snapshot
- [ ] `FIRST_FRAME` is present exactly **once** per aisle open
- [ ] Nothing else in the app behaves differently (it is an instrument, not a fix)
- [ ] 📌 **Honest limit, written into the code:** a `MutationObserver` callback runs in its own microtask, so the
      stack captured there is the observer's, not the mutator's — which is why `forge3d_close` is instrumented
      separately; the presence/absence of **its** entry is the discriminating fact

## v1.14.404 — blank Forge aisle fixed, a `.401` regression (`cc0b6c0`) · rollback: revert commit
**Two functional lines plus the stamp; everything else in the diff is comment.** The reproduction: tap OPEN
AISLE, PHANTOM navigates correctly, the page **stays open**, header/metadata/close/rack-strip/focus-card/bottom
controls all render — and the 3D viewport is **completely blank**. The Forge HUD is **static markup** inside the
sheet (`:13104`), so it renders the instant `.open` is added, entirely independent of whether the 3D ever
initialises: **a perfect shell with a blank viewport is exactly what a stopped render loop looks like, and is
NOT evidence the mount succeeded.** `forge3d_render` calls `frame()` once synchronously while the scene is still
**empty**; the cabinets arrive **asynchronously** on hero decode (`:19859` → `setLoadout`), and `assignSlot`
mutates the THREE scene, which is only visible on a **later frame**. `.401` then installed a per-attachment
`IntersectionObserver` whose `pause()` cancels the animation frame — landing between first frame and hero decode
kills the loop before the cabinets are ever drawn. Easy to hit, because `forge3d_open` adds `.open` and renders
in the **same synchronous task**, so the observer is installed before the browser has laid out the newly-shown
sheet. Also why the aisle passed at `.353` and fails now: before `.401` the loop never stopped.
**FIX 1 — never observe the aisle**, by exclusion, not tuning: it is a full-screen modal **disposed on close**,
so it never sits hidden-but-alive and I4 protects nothing there. **The rack keeps its observer** — it lives in a
page that goes `display:none` while staying mounted, which is the real drain I4 was written for.
**FIX 2 — repaint after population:** `setLoadout` restarts the loop through `frame()` if it is not running and
the scene is not disposed (`frame()` places the camera, renders, and reschedules; a bare `renderer.render` would
draw with an unplaced camera). This makes a populated-but-invisible scene **structurally impossible**, so the
defect class cannot return through a different door.
**NOT DONE, deliberately:** no route changed (owner barred it), no fallback, no retry, no special case, no
fabricated data, RACK SCENE LOCK untouched, no scene internals modified.
**GATES:** 3 inline blocks compile ×3, `node --check sw.js`, valid JSON, CSS braces 4557/4557 (Δ0), line endings
unchanged all-LF, PRECACHE untouched, three-stamp lockstep, functional diff exactly two lines.

⛔ **NEITHER `.403` NOR `.404` HAS EVER REACHED A DEVICE — `main` is at `.404`, but Pages is still serving
`v1.14.402`.** Six Pages runs on 2026-08-06 (`4d02cf3`→`8ed007d`): `build` succeeded **every time**, `deploy`
cancelled/failed **every time**, during a GitHub platform incident with **Actions and Pages both
`major_outage`**. Three empty re-trigger commits were spent, and two of the six runs died as *cancellations*
caused by re-pushing on top of a run in flight. **This is not a code fault and nothing in the diff caused it.**
See [[reference_pages_deploy_lock]]. **Do not start this pass until `version.json` on the live URL reads
`phantom-v1.14.404`.**
- [ ] **Clear the service-worker cache first** (unregister SW + delete caches — a URL cache-buster does not bypass a registered SW)
- [ ] Confirm the app reports **`v1.14.404`** before trusting anything below
- [ ] Build → **OPEN AISLE**: the aisle **DRAWS ITS CABINETS**, not just its HUD ⭐ *this is the whole ship*
- [ ] Walk the flanks — geometry is there and animates
- [ ] Focus a rack — focus card matches the drawn cabinet
- [ ] **Close and reopen ×5** — it draws **every time**, not just the first
- [ ] Leave Build for Tools and return — rack still there, still animating
- [ ] SYS → ERRORS: the `.403` ring shows `FIRST_FRAME` present, and **no** `AISLE_PAUSED` immediately after `ENGINE_ATTACHED`
- [ ] `PhantomGL.diag()` — still **exactly one** attachment for the Build mount; the aisle is no longer observed
- [ ] `?legacy=1` — unchanged from `.402` (clear `phantom_legacy` afterwards)

## v1.14.405 — blank Forge aisle, PROVEN root cause (`6d862e5`) · rollback: revert commit
✅ **DEVICE-CONFIRMED BY OWNER 2026-08-06: "aisle draws and holds."** The `.390`→`.404` blank-aisle
arc is **CLOSED**. Found by a focused regression pass against the last device-verified good aisle
(`v1.14.353`, `4f84c65`, batch `.351`–`.354` CLEARED 2026-07-25) — **not** by another device-log cycle.

**Cause: an interaction of three ships, none of which is wrong alone.** `.391` gave `bw_mount3D` a
bounded re-arm — 12 × 400ms ≈ **five seconds** of `setTimeout` retries — guarded only by
`document.body.contains(mount)`. `.401` made release **symmetric** (any registration disposes all
others via `releaseOthers`, I1). **Opening the aisle never removes `#bw-mount` from the DOM** — the
aisle is a separate full-screen sheet, a direct child of `#app` — so Build's re-arm kept firing for
five seconds *after* the aisle opened and each retry re-registered `bw-mount` and **disposed the live
aisle.** The Forge HUD is static markup, so it stayed perfect while only the scene died.
`.404` removed only the **observer** half of `.401` and left `releaseOthers`, which is why it missed.

**Fix: correct the guard, add no machinery.** `draw()` aborts while the aisle sheet is open. No
timeout, no retry, no fallback, no instrumentation, no special-case path — it *removes* work on a path
that must not run. **I1 was not weakened**; `releaseOthers` is unchanged.
- [x] Build → OPEN AISLE draws its cabinets **and holds past the five-second window** — owner confirmed
- [ ] Close and reopen ×10 — draws every time
- [ ] Build's rack returns after closing the aisle
- [ ] `?legacy=1` unchanged

⚠ **This pass confirms the aisle DRAWS AND HOLDS and nothing more.** It does **not** release either
batch. `.377`–`.384` remains unreleased; `.385`–`.405` remains OPEN at 21 of 6.

## v1.14.406 — no silent failures: two P0 storage defects + the false crash banner (`997716e`) · rollback: revert commit

**First ship found by automation rather than by the owner in the aisle.** All three defects came out of
the new `test/e2e` baseline, and all three are one family: *the app knew something and did not say it.*

**P0-1 — the Master save was invisible on failure.** `PHANTOM_MASTER_STORE.save` wrote through a raw
`setItem` whose quota branch `console.warn`ed and returned `false` with no toast and no haptic, and its
single caller **discarded the boolean**. On a full device: operator loads a Master, parse succeeds, UI
reports success, **nothing persists** — gone at the next cold start. Largest payload in the app; a
4000-host site compresses to ~6.5MB against a ~5MB Safari origin quota. Both branches now toast +
haptic + raise `__phantomStorageFull`; the caller records a false return. Message is
capability-specific on purpose — `safeStore`'s generic *"Storage full"* does not tell a tech the Master
still works **this session** and must be re-imported after a restart.

**P0-2 — shift end swallowed everything.** `shift_end_write` was a raw `setItem` in a bare
`catch(_){}`: on quota it stored nothing, threw nothing, warned nothing, toasted nothing, while the hero
kept rendering a countdown that would not survive the next launch. `phantom_shift_end` is
registry-classified **user data**. Now through `safeStore` — the fix **removes** the hand-written
swallow rather than adding a second handler.

**P1 — the instrument reported a crash on every success.** `.403`'s `aisle_trace` routes 14 NORMAL
lifecycle events through `phantom_logErr`, which force-shows the shared `#crash-banner` reading
*"JS ERROR"*. A healthy Open Aisle raised it every time. **This blocked this very batch pass** — every
tester would have reported a crash that never happened. `phantom_logErr` gains an optional third arg
(`opts.trace` → `type:'trace'`, never raises the banner); optional and defaulting to prior behaviour, so
**all 64 existing call sites are byte-identical**. One new predicate `phantom_crashErrors` is the single
definition of *"is this ring entry an error"*, used by the banner, the boot banner and the SYS header
count. The ERRORS sheet is **deliberately unfiltered** — listing the traces is the point of `.403`.

⚠ **`?legacy=1` IS NOT BYTE-IDENTICAL AND THAT IS DELIBERATE**, on the `.402` precedent (*only the
presentation is house-scoped, the invariant never is*). The two quota toasts now fire in **both** houses
where legacy was silent — gating honesty to redesign would preserve a data-loss bug for the sake of the
rule. Filtering traces from the boot banner (which is **not** rd-gated) **restores** legacy's pre-`.403`
behaviour. The banner mutation inside `phantom_logErr` stays `redesign_isOn()`-gated; the SYS count is
only ever invoked under `rd`. No legacy markup, render path, `showPage`/`showOpsTab` or `#ops-tab-strip`
is touched.

**GATES:** 3 inline blocks compile · `node --check sw.js` · valid JSON · CSS braces 4557/4557 (Δ0) ·
**CRLF intact, 0 lone LF** (baselined at 54,749 pairs before the first edit) · PRECACHE untouched ·
three-stamp lockstep. `dct-ios.html` diff: 64 added / 11 removed — **34 comment, 30 functional.**

**PROOF BEFORE PUSH:** the three regression tests that pinned these at `.405` all flipped to *"expected
to fail but passed"*; annotations removed so a regression now fails loudly. Full suite re-run green
(**96 passed, 8 skipped**). Trace/error separation verified directly in WebKit: 3 traces → banner
hidden, SYS count `NONE`, ERRORS sheet still lists them labelled `TRACE`; then 1 real error → banner
raises reading `(1 entries)`, SYS count `1` — **not 4**.

**Live confirmed 2026-08-06:** all three stamps serving `phantom-v1.14.406` ~40s after push. No Pages lock.

- [ ] **Clear the service-worker cache first**, then confirm the app reports **`v1.14.406`**
- [ ] Build → **OPEN AISLE**: **NO** "JS ERROR" banner appears on a healthy open ⭐ *this is the whole P1*
- [ ] SYS → ERRORS still **lists** the `AISLE/...` entries, now labelled **TRACE** — the `.403` instrument is intact
- [ ] Header SYS error count reads **NONE** while only traces are present
- [ ] `?legacy=1` — open the aisle, reload: **no** "JS ERROR" banner (clear `phantom_legacy` afterwards)
- [ ] Master + shift-end quota toasts are device-only and fold into the M1 storage checks below

## v1.14.408 — the Forge toast moves above the row (`73acdb1`) · rollback: revert commit

**Owner ruling**, closing the one item `.407` escalated rather than absorbed.

⭐ **THE 96px IS DELETED, NOT RETUNED.** Last magic clearance in the stack, twin of the 92px removed
at `.407`. `.407` made it *total*: the row grew to 58px, so the toast stopped merely clipping the row
and began lying **entirely inside it**, hit-testable for its full 4s over the pill strip. `#toast` is
now a **child of `.hud-bottom` at `bottom:100%`** — clears the row and the focus card at any height.

**Why it couldn't be done at `.407`, and what unblocked it.** Two requirements were in direct tension:
the toast must clear the row, **and** it must still paint above the **open detail panel** — the
status-toggle handler fires with that panel up, so a toast sealed underneath takes **UNDO** with it and
the tech silently loses the ability to revert a RACKED/PENDING change. Both were impossible while
`.hud` carried `position:fixed`, because **a fixed element ALWAYS establishes a stacking context**
whatever its z-index, capping every child below the strip's own `z-index:10` and so below the panel's 40.
**The lever is one declaration:** `.hud` → `position:absolute` + `z-index:auto` establishes **no**
stacking context, so the toast's `z-index:60` resolves in `#forge3d-hud`'s context and beats the panel
(40), search overlay (50) and picker (55) — while `.toprow`/`.herotag` stay at auto and remain correctly
covered by all three. Costs nothing today (the sheet's rect was **measured identical** to the viewport
rect on both tiers) and is more correct tomorrow: it now anchors to the **sheet**, which is what it
always described. Inherited from a full-window mock; `.233` fixed only the JS half.

**Two smaller things fell out.** `left:50%` + `translateX(-50%)` retires for `margin-inline:auto` +
`width:fit-content`, so the element carries **no transform at rest** (a transform makes it a containing
block for any future fixed descendant — the `.212` trap). And `--forge-gap` is **named**, because 10px
stopped being one element's margin and became a **shared term** the moment the toast joined the caption
in that slot. The two now share one slot and may not stack: the caption yields via
`.toast.show ~ .hint` and returns over its own 800ms fade (hence `#toast` is emitted **before** `#hint`).

**MEASURED:** the gap above the row is **exactly 10.0px in all six** combinations — short card, wrapping
zero-state card, forced 3-line card × 390 and 834. With the panel **open**, `elementFromPoint` at the
toast's own centre returns the toast and **UNDO is hit-testable**.

⚠ **Three false failures were found in the PROBE, not the CSS**, and the method note is now in the spec:
`.toast` animates `translateY(20px)→0` over 250ms, so measuring in the same turn samples it **mid-flight
up to 20px low**; and `.hint` carries its **own 800ms** fade, so a 300ms wait catches it at 0.6 opacity
returning. Also relearned: **`showToast` is IIFE-scoped** and unreachable at page scope (the trap that
bit M2-b), so the probe drives the DOM state it produces.

**GATES:** 3 inline blocks compile · `node --check sw.js` · valid JSON · braces **4559/4559** (+1
caption-yields rule) · CRLF intact, 0 lone LF · three-stamp lockstep · RACK SCENE LOCK respected ·
`?legacy=1` unaffected. **GUARD:** `08-forge-layout.spec.js` → **11 tests**; two of the three new ones
assert the **lever directly** (the strip must not be `fixed`, must not carry a z-index), so restoring
either fails here rather than in the aisle at 2AM. Full suite **115 tests — 106 passed + 9 skipped**.
**Live confirmed 2026-08-07:** all three stamps serving `phantom-v1.14.408` ~40s after push.

- [ ] Clear the SW cache, confirm **`v1.14.408`**
- [ ] Change a rack's loadout so the toast fires — it appears **ABOVE the pill row**, never across it ⭐
- [ ] Open a rack's detail panel, toggle a row RACKED/PENDING — the toast is visible **over the panel**
      and **UNDO actually reverts it** ⭐ *this is the half that was in tension*
- [ ] The caption disappears while the toast is up and returns after
- [ ] Bottom strip still clears the home indicator — ⚠ `env(safe-area-inset-bottom)` is **0** in the
      harness, so this is verified by **nothing** off-device

## v1.14.407 — Forge bottom control stack, one clean pass (`a8360df`) · rollback: revert commit

Owner-directed after Forge began rendering: *"the bottom rack-strip controls are clipping/overlapping…
this is a layout/composition defect, not a rendering defect."* Measured by three read-only agents,
fixed by one, then reviewed by three more — **the review found a blocker the first six had not seen,
because they were reading CSS and it opened the aisle and looked.**

**ROOT CAUSE, ONE SENTENCE: the control row had no declared height, so every control in it was sized
by a sibling.** `.hudbtn` declared `width:46px` and no height, taking whatever `align-items:stretch`
handed it from the chips. Measured **46×24.5** on a fresh device and **46×35** populated against the
app's own 44px `--tap-s`. The pills were 76×33 and they carry click handlers, so they were sub-floor
too. Provenance: `git log -L` returns **exactly one commit per rule** (`25a1e29`, `.233`) and the CSS
was still byte-identical to `MOCKUP-FORGE-HYBRID-AISLE-v2.html` — a mock authored as a **full-window
demo and never validated at 390px inside a sheet.**

| | before | after |
|---|---|---|
| utility buttons, fresh device | 46 × **24.5** | 46 × **44**, matched pair |
| utility buttons, populated | 46 × **35** | 46 × **44** |
| rack pills (click handlers) | 76 × **33** | 76 × **44** |
| row height | 24.5 / 35 — emergent | **58px constant**, empty or full |
| active pill's glow room | **0.00px** above a declared 14px blur | **7px / 7px**, derived |
| `.chips` overflow | `auto / auto` — y-axis clipped silently | `auto / hidden`, both declared |
| caption vs pill row | drawn **on top of the pills** | **10px clear**, structurally |
| caption width @390 | **472.70px**, cut 41px off each end | 390px, wraps, readable |
| pill-strip centre tap | returned `span#toastUndo` — swallowed | returns the pill |

⭐ **THE 92px IS DELETED, NOT RETUNED.** The caption is now a **child** of the strip it must clear, at
`bottom:100%`. The guard proves it is derived: **the gap holds at 10px across a stack forced from 142
to 300px.** This is the repo's own fixed-strip-clearance rule (`.341`, `.351`) satisfied by *removing*
the constant. Its `white-space:nowrap` went too — it forced 59 characters to 472.70px inside a 390px
viewport, unreadable at both ends.

⭐ **BLOCKER THE REQUEST DID NOT NAME:** the zero state opened with a **RED ERROR BAR across both
utility buttons.** `deploy_forge_zeroState` called `phantomToast` with **no type**, and `phantomToast`
defaults `colors[type] || colors.error`, so an expected, honest condition — no Master on a fresh
device — was painted `rgba(255,59,59,.9)`. It was also the **fourth copy of the same sentence** on one
screen. Deleted rather than re-coloured; `console.warn` keeps the diagnostic. **A zero state is not an
error** — the never-label-absent-telemetry rule, applied to a colour.

**THREE OF THE OWNER'S OWN SUSPICIONS REFUTED BY MEASUREMENT, and no change was manufactured to satisfy
them:** the focus card never overlapped the row (**−12.00px**, a clean constant gap — the `.hint` was
the intruder, so requirement 4 was already met) · **no ancestor clips these controls** (`#forge3d-mount`
is the HUD's *sibling*; the only clipping box was `.chips`, on its own children, clipping a **shadow**)
· **zero negative lengths** exist anywhere in the block. Also refuted: the patch-stacking premise —
nothing here had ever been patched, so the ban was forward-looking and the discipline was to not
*author* the first hack.

**STYLE UNCHANGED** — glass, blur, borders, radii, colours, fonts and sizes verified byte-identical in
computed values. Structure, spacing and stacking only.

**GATES:** 3 inline blocks compile · `node --check sw.js` · valid JSON · CSS braces **4558/4558** (+1
deliberate token rule) · CRLF intact, 0 lone LF · PRECACHE untouched · three-stamp lockstep.
**RACK SCENE LOCK respected** — nothing under `#forge3d-mount`, `forge3d_render`, `drawGuts` or the
camera rig. **`?legacy=1` unreachable** — the sheet is `body.rd`+`.open` gated and a sweep of all 12
style blocks confirms zero uses of these classes outside a `#forge3d-sheet`-scoped selector.
**GUARD:** new `test/e2e/08-forge-layout.spec.js`. Suite now **112 tests — 103 passed + 9 skipped**,
reconciling exactly to the 104-test baseline plus this spec.
**Live confirmed 2026-08-07:** all three stamps serving `phantom-v1.14.407` ~40s after push.

- [ ] Clear the SW cache, confirm the app reports **`v1.14.407`**
- [ ] Open the aisle with **NO Master**: **no red bar**, and no caption lying across the pills ⭐
- [ ] Both utility buttons and the rack pills are comfortably tappable **with a glove**
- [ ] Load a Master: pill row and focus card cleanly separated, active pill's glow not cut
- [ ] Bottom strip still clears the home indicator — ⚠ `env(safe-area-inset-bottom)` resolves to **0**
      in the harness, so the real notch clearance is verified by **nothing** off-device
- [ ] `?legacy=1` unchanged (clear `phantom_legacy` afterwards)

⛔ **OPEN — OWNER RULINGS, ESCALATED NOT ABSORBED.** (1) The **Forge toast** still carries a magic
`96px` and still overlaps the control row while shown, and this ship made that overlap *worse* (the
stack grew 23px, so it now sits entirely inside the row band instead of clipping 66% of it). It cannot
be fixed without a ruling: moving it under `.hud-bottom` — the same structural fix that worked for the
caption — puts it **behind the open detail panel** at one of its two call sites and destroys the UNDO
affordance. (2) At the real **5-rack loadout cap, 2 of 5 pills are off-screen at 390px** with no
affordance; both available fixes are restyles the brief forbade. (3) `--forge-tap` is bound to
`--tap-s` 44px while the app's own token comment argues the gloved-realistic minimum is **~50px** and
`--tap-m` (48px) already exists — now a **one-token edit**. (4) `.rd-sheet-close`, the aisle's only
exit, is **40×40**; `.detail-close` is **32×32**.

---

# ⚖ OWNER RULINGS 2026-08-06 — batch `.377`–`.384` DISPOSED, three `.391` items CLOSED

Issued during the regression-baseline session, alongside the first automated test suite
(`test/e2e/`, 7 specs). These rulings change what must be verified on device and what must not.

## RULING 1 — `.377`–`.384` disposed, ship by ship

> *"Mark `.377`–`.384` superseded where the current architecture and approved UI have replaced them.
> Preserve any unique data-safety work that is still valid."*

The batch ran a device pass on 2026-08-03 and **FAILED** on the Build surface; that failure is what
`.385` diagnosed. No release was ever recorded. Re-verifying eight ships against a Build workspace
that has since been rebuilt would spend device time on a surface that no longer exists.

Classified individually rather than written off wholesale — three of these carry work that is still
load-bearing today.

| Ship | Disposition | Basis |
|---|---|---|
| `.377` OPS wall re-cut at 768 | **SUPERSEDED IN PLACE** | The nine-cell OPS wall it re-cut is currently **unreachable**: `bw_render()` adds `bw-on` on every branch (`:20458`/`:20471`/`:20489`) and `:54055` then hides `#work-grid`, which contains the wall. Verifying its art is moot until the wall has a door again. **The assets are on disk and precached — nothing is lost.** The reachability regression is tracked as an open P1, not as this ship's debt. |
| `.378` TOOLS art-first card face, phone | **PRESERVED — now automated** | The `#pg-ref` cards render and are exercised by `03-tools.spec.js` (all 7 static cards `:13546`–`:13552`) and `06-composition.spec.js` on all five tiers. |
| `.379` remove the glowtune dev tool | **CLOSED** | A deletion. Absence confirmed; nothing to verify on device. |
| `.380` the rip-cord gets a way back | **PRESERVED — load-bearing, now automated** | RETURN TO NEW UI is the only exit from the legacy house. `01-nav.spec.js` verifies `?legacy=1` boots with no `body.rd`, `#rd-botnav` hidden, legacy `.tab-nav` visible, `#pg-triage` active, `phantom_legacy='1'` persisted, and a subsequent bare-URL reload **stays** legacy. This is Rule 7's safety net and it is proven. |
| `.381` wire desktop TOOLS to the 768 art | **PRESERVED — now automated** | Covered by `06-composition.spec.js` on `laptop-chromium` and `desktop-chromium`. |
| `.382` COMMAND SHELL PHASE 1 (`?cshell=1`) | **SUPERSEDED** | `ARCHITECTURE-BLUEPRINT.md` D-06 / §10.3 rules `#cmd-shell` is a **complete second Command implementation** that is capability-ported and then **deleted**; `#pg-cmd` becomes the single Command at every tier, wrapped in the `.cshell` chrome. The preview shell is a dead end by ruling. `06-composition.spec.js` asserts the current correct behaviour: `.cshell` is opt-in and never persisted, so a bare URL at 1440px is still the phone composition. |
| `.383` COMMAND SHELL DESKTOP | **SUPERSEDED** | Same ruling. Rebuilt at Stage 7 / M5. |
| `.384` HONEST NAMING + transparent readiness | **PRESERVED — invariant, do not regress** | *Site Health* → **LOCAL SYSTEM STATE**, captioned *"Read from this device. PHANTOM receives no facility telemetry"*; readiness as **"N of 4 ready"**, a count of real gates, never a hardcoded score. This is the never-label-absent-telemetry rule, and it is the same principle the blueprint later encodes as **D-15** (Shift readiness is a gate list with a met/total count, never a percentage). **Any future change that reintroduces a fabricated score or a facility-telemetry label is a P0 revert.** |

**Net: 3 superseded · 1 closed · 4 preserved (all four now covered by automation).**
Batch `.377`–`.384` is **DISPOSED**. It is not on the device pass. Batch `.385`–`.405` remains OPEN.

## RULING 2 — SHIFT is the fifth pillar; EXIT is an APPROVED MISMATCH until M4

> *"SHIFT is the intended fifth product pillar. EXIT must not remain the permanent fourth navigation
> destination. Do not redesign navigation yet — record this as an approved mismatch for the relevant
> milestone."*

**Measured today** (`01-nav.spec.js`, and independently by `06-composition.spec.js`): primary nav is
**three `.botitem` destinations + `#rd-exit`** — `bn-command` Home · `bn-work` Build · `bn-ref` Tools ·
`rd-exit` Exit. **No Scan. No Shift.** Target per R-02 is five slots: Command · Build · Scan · Tools · Shift.
Delta is **+Scan, +Shift, −Exit**.

**This is a KNOWN, ACCEPTED mismatch. It is not a defect to be fixed opportunistically.**
Nav is not to be touched until **M4 / blueprint Stage 6**, where Shift ships as a pillar and
`EXIT` leaves slot 4 in the same ship. Any earlier nav change is out of scope and must be refused.
Closes `.391` open item 1.

## RULING 3 — the Build rack control rail matches the approved composition, later

> *"The Build rack control rail must ultimately match the approved Build composition. Do not polish
> it during baseline work."*

The rail wraps 4-then-1 and carries REAR + EXPLODE, which the approved reference does not show.
`.reh-3d-seg` measures **22px** on phone (`06-composition.spec.js`, CSS-rule probe at `:10657`) against
the app's own `--tap-s` 44px gloved floor. **Both facts are recorded, neither is to be changed during
baseline work.** Owned by the Build composition milestone (W2 / M2-b). Closes `.391` open item 2.

## RULING 4 — a populated Master/rack fixture is required

> *"Add a representative populated Master/rack fixture so Build metrics, phases, devices, platform,
> blockers, and Forge can be tested against real populated state."*

Every one of the six baseline specs reported the same limitation: the harness had **no Master loaded**,
so only the zero state was ever exercised. `bw_render()` routes away before creating `#bw-mount` with no
deployment (`:20457`) or no active rack (`:20470`); the `.reh-3d-seg` pills are built by JS
(`:36049`/`:36097`/`:36107`) only once a rack elevation exists; the four `bw-tab` tool doors (`:20632`)
exist only in the populated branch; the aisle states NO MASTER LOADED.

Fixture lands as `test/e2e/fixtures-populated.js` + `test/e2e/07-populated.spec.js`. Per **R-06** it
**must include at least one host-less, cable-endpoint-only cabinet** — ~42% of cabs on a real site
resolve with empty `hosts[]`, and a fixture where every cabinet is populated would hide the most
expensive data class in the app. Closes `.391` open item 3 — the Build metrics layout gets seen against
a populated rack.

---

## v1.14.409 — Forge bottom dock: one dock, two rows

Owner-approved on the 390px mockups **before** stamping. Row 1 = selection + action (chips left,
⊞ / search right, one 44px baseline). Row 2 = context, three read-out pills replacing the single
wide card. **No new state is computed** — `deploy_forge_tagSub` already concatenated these exact
three clauses; each pill now owns one of them.

- [ ] Cold-load with **no Master**: the dock says its sentence **once**, and there is no bare `● —` pill.
- [ ] Load a Master, focus a rack: id / count / walk read on **one row**, nothing clipped at 390.
- [ ] Focus a **flagged** rack: the count pill goes **GOLD**. If it is red, stop and report.
- [ ] `0/0 RACKED` on a cable-endpoint-only cab is **not** styled as an error.
- [ ] Change a loadout: the toast still fires **above** the row (the `.408` invariant).
- [ ] Bottom strip still clears the home indicator — `env(safe-area-inset-bottom)` is 0 in the
      harness, so this is verified by **nothing** off-device.

Flagged to the owner, **not** introduced by this ship: the caption still wraps to two lines at 390
(pre-existing copy length) · zero-state row 1 is right-weighted (no chips without a Master) · chips 4
and 5 sit off-screen at a full five-rack loadout with nothing signalling the strip scrolls (carried
`.407` ruling).

---

## v1.14.410 — design system locked + four phone screens take it

Step 1 of the UI finishing sprint. `PHANTOM_DESIGN_SYSTEM.md` is the authority; all six rulings in
its §0 were carried by the owner on 2026-08-07. Per **R-E the 1116 existing literal spacing
declarations are deliberately NOT refactored** — each screen takes the scale as it is finished.

**The four device-only checks. A harness proves none of these.**

- [ ] **PhantomBrand actually RENDERS on the iPhone** — not a silent fallback to the system stack.
      Check `INGEST MASTER` on Command and `NO MASTER LOADED` on Build: the glyphs must be the
      wide Audiowide forms, not Helvetica. This is the one change that alters how the app *reads*.
- [ ] **Forge utility cluster** clears the notch and the header at device scale, and both buttons
      are reachable one-handed. It is anchored at `top:100%` of the header, so if the header wraps
      on a narrower device the cluster must move DOWN with it, never over the scene edge.
- [ ] **Bottom strip still clears the home indicator** — `env(safe-area-inset-bottom)` resolves to
      **0** in the harness, so this is verified by **nothing** off-device.
- [ ] **The quiet offline pill is still readable in cold-aisle lighting.** It was deliberately
      dimmed from gold to a low-alpha cyan. If it cannot be read at arm's length under the aisle
      strobes, say so — the fix is contrast, not going back to amber.

**Also confirm, quickly:**

- [ ] Command with no Master: dropzone is centred, ~280px, and says its sentence once.
- [ ] Build: the primary action is cyan — **no purple gradient anywhere**.
- [ ] Forge: rack IDs legible at arm's length; focused rack centres itself; grid button is **not**
      amber; row 1 holds the carousel and nothing else.
- [ ] Tools: tile subtitles readable; filter field is comfortably tappable with a glove.
- [ ] SHIFT sheet: `SET SHIFT END` reads on ONE line, and the ✕ is a **44px square in the corner** —
      **not** a 260px-wide invisible strip next to the title. Tap beside the title: nothing should
      close. Same close button also serves `#log-sheet`.
- [ ] `?legacy=1` still byte-identical — every Tools rule was scoped to `#ref-grid` and every SHIFT
      rule to `body.rd` for this reason. The `.va-*` sheets exist in BOTH houses.

**Known and NOT fixed here** (each owns a ruling in `PHANTOM_DESIGN_SYSTEM.md` §11): two stacked
search fields on Tools · six tile border colours vs the channel law · `OPTICS` subtitle truncation ·
`EXIT` red in the nav (navigation frozen) · four cyan→violet gradients and two sub-44px buttons in
`body.rd.cshell` (Step 3) · `--fs-body` colliding with `--fs-subhead` at ≥1024px (Step 3).

---

## v1.14.411 — loadout picker, and a `.410` regression that reached production

**The regression was mine.** `.410` moved grid/search into a cluster hanging from the sheet header;
there they painted **over** the open loadout picker and `elementFromPoint` returned the cluster, so a
tap in that corner while choosing racks fired the loadout button instead of ticking a rack.

- [ ] **THE ONE THAT MATTERS.** Open the aisle → tap ⊞ to open the loadout picker → **tap the
      top-right corner where those buttons used to be.** The picker must take it. The loadout
      button must NOT fire. If it does, stop and report.
- [ ] Rack IDs in the picker are legible at arm's length, gloved.
- [ ] Every picker row is comfortable with a gloved finger (they were 43px, one under the floor).
- [ ] The `n/5` count reads as **information, not a warning** — it was gold.

Cause was a stacking context, not a typo: `#forge3d-hud` is `absolute; z-index:5` and establishes
one, so the picker's 55, the search overlay's 50 and the detail panel's 40 all flatten to 5 at sheet
level, while the cluster sat outside that context and competed at 6. Now 4. **Rect measurement said
the layout was perfect — nothing moved, only paint order changed.** A screenshot caught it; the new
guard asserts hit-testing rather than geometry.

`.410` context: its phone suite finished **112 passed / 9 skipped / 0 failed** after that ship went
out, so `.410` is verified as shipped and this is a follow-on, not a rollback.

---

## v1.14.412 — Step 3: the desktop stops being a stretched phone

The desktop composition already existed; it was gated behind a URL flag nobody types, so every
laptop rendered 720px of content centred in 1440. **The gate is now automatic at ≥1024** (owner
ruling), with `?cshell=0` as the rip-cord.

- [ ] **iPad in LANDSCAPE**: the desktop shell appears **automatically** — left rail, right column.
      Then rotate to **portrait** and confirm it stays on the phone layout **until reload**. That
      is expected, not a bug: toggling the class live would reparent `#bw-mount` and RackEngine
      owns a single live WebGL attachment.
- [ ] **iPhone, header pill**: `API OFFLINE` sits **below the notch** and is comfortably tappable.
      ⚠ This is the one that cannot be checked anywhere else — it was 8px INTO the notch, and
      `env(safe-area-inset-top)` resolves to **0** in the harness, so no screenshot could show it.
- [ ] Bottom-nav labels and the version chip are legible at arm's length (both were 9px).
- [ ] On the shell: **no purple gradient anywhere** — every action is cyan.
- [ ] `?legacy=1` still byte-identical — every shared-chrome rule is `body.rd`-scoped because
      `.app-header` renders in BOTH houses.

Verified across seven tiers (390 · 834 · 1024 · 1194 · 1366 · 1440 · 1920 + rip-cord): zero
tappable targets under 44px, zero text under 10px, zero horizontal overflow, type ladder strictly
increasing at every one.

**Known and deliberate:** 834–1023 has no desktop composition and stays on the phone layout — the
shell renders a broken half-state at that width (two stacked wordmarks, no rail, no right column).

---

## v1.14.413 — a rack with no devices says what that means

Ships because the same honest data was reported as a regression **twice** — `.401` (rollback
ordered) and `.411` (sprint stopped). Both times the data was right and the **sentence** was
missing. **Also carries the parked Step 3 work** (`.412` was stamped but never pushed when the
field report arrived).

- [ ] **Row S4, focus any cab**: the status pill reads **`NO HOST DATA IN MASTER`** — with
      `· N CABLES` where the Master carries cables. **CYAN. If it is red or gold, stop and report** —
      an unprovisioned cab is not a fault and not an action item.
- [ ] Open that rack's detail: a cyan callout explains it, and **nothing tells you to tap rows
      that are not there** (the hint used to say TAP A ROW over an empty grid).
- [ ] The detail meta line reads the sentence, not `0/0 RACKED` — row and position still shown.
- [ ] **Focus a FLAGGED rack on a populated row**: the `⚠ N FLAGGED` clause is **fully readable,
      not clipped**. It used to run to x=445 in a 372px row and clip the warning.
- [ ] A populated, unflagged rack still shows `n/m RACKED` **and** `TAP FLANKS TO WALK`.

Step 3 items riding along — **all unverified on glass**:

- [ ] **iPad LANDSCAPE**: desktop shell appears automatically (rail + right column). Rotate to
      portrait: stays on the phone layout **until reload** — expected, not a bug.
- [ ] **iPhone**: the header status pill sits **below the notch**. It was 8px INTO it, and
      `env(safe-area-inset-top)` is 0 in the harness so nothing off-device could show that.
- [ ] On the desktop shell: **no purple gradient anywhere**; open the Forge aisle and confirm its
      **✕ actually closes it** (the top bar used to paint over the sheet and swallow the tap).
- [ ] `?legacy=1` byte-identical · `?cshell=0` drops a laptop back to the phone layout.

Measured at 390 across six status-row states incl. a fully-flagged 48U rack: worst right edge
**360px** against a 372px row, one baseline, zero overflow.

---

## v1.14.414 — ingest guards

Found during the `.411` investigation. **None of them caused it** — that was honest data — but they
are why honest data could not be told apart from lost data quickly. No UI surface changed.

- [ ] **Re-import your CURRENT Master.** It must load and report its real cab count as before.
- [ ] If a Master ever imports with a sheet that contributed **no rows**, a toast now names that
      sheet. **That is the guard working, not a new fault.**
- [ ] Nothing else should look different — this ship has no visual surface.

**What changed:** `sheetsParsed` now means *contributed rows* (new `sheetsEmpty` bucket carries
present-but-empty) · a host-less Master is **refused** if it would overwrite a populated one — it
stays live for the session, the stored one is untouched, escape is `phantom_clearMaster()` ·
`totalHosts`/`totalCables` are persisted so a restored Master can state its own emptiness.

Verified against the app's own parser and store: good Master saves (144 hosts) · host-less Master
refused, stored Master **still 144 hosts, still `GOOD.xlsx`** · host-less on a clean slate still
**accepted** (a cabled, unprovisioned row is legitimate) · counts survive the round trip.

---


## v1.14.415 — SINGLE-MASTER LAW (`aad8181` + `08430a0`) · rollback: revert both, in that order

Owner ruling: PHANTOM may have exactly ONE authoritative Master. Six reachable ways the code could
disagree with itself, all closed. **No UI surface changed** — this is an invariant ship.

- [ ] Covered by consolidated items **6, 7, 8** — do not verify separately.

**The one that matters:** load your real Master, then load the SAME file again. Nothing should
change and nothing should be lost. That is the whole replace path.

**What changed:** `PHANTOM_MASTER` is now the only writer of both the live global and the stored
snapshot, and it **persists FIRST, goes live SECOND** — a candidate that cannot be persisted never
becomes active. Parsing no longer persists (a parse used to write storage before anything judged the
candidate). Reconcile stopped reading a second Master. Two caches got identity stamps.

**Correcting my own `.414`:** that ship's overwrite guard refused the write and let the caller go
live anyway — memory holding one Master, storage another. Described then as "costs nothing
in-session". It cost the invariant. This ship is the correction.

**Escape unchanged:** `phantom_clearMaster()` in the console.

---

<!-- append new ships above this line — checkpoint at 6 deep or before any HIGH-risk ship -->
