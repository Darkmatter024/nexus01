# SHIP-HANDOFF-INTEL-DOCK.md
**The ghost takes the dock. Exit moves under SYS. Intelligence gets one door that tells you if it's open.**

- **Status:** APPROVED — owner ruling 2026-09-03. Slots into IA-SHIFTNAV v2 Phase 1 as a hard requirement; can ship as its own slice once Ship A completes.
- **Baseline:** current stamped release. `/graphify . --update` first. All anchors from verified source; DOM census before any edit (the census has caught six misreads this campaign — it runs again).
- **Owner statement (verbatim intent):** "Move the exit up to the system tab. Somebody presses SYS, drops down to the very bottom, presses exit, it keeps the app on hold. Put the ghost in that spot. The intelligence is an important piece of the application, but it's only important when we hit internet — this is an offline-first application. And I want that AI to become smarter and smarter."

---

## §0 · WHAT THIS IS AND ISN'T

**Two things that look alike and are not:**

| | What it is | Works offline? | Where it lives after this ship |
|---|---|---|---|
| **NBA line** ("next: continue mechanical") | Local logic reading the rack's phase from the Master | Yes, always | Under the hero. Untouched by this ship. |
| **DCT Assistant** (the ghost) | The network AI — answers questions, parses BOM/CLI/EDP, reads tickets | No — needs the Worker | The dock. This ship. |

The NBA line is the app knowing where you are. The ghost is the app thinking. Don't merge them, don't confuse them, don't move the NBA line.

---

## §1 · THE DOCK AFTER THIS SHIP

Today: `COMMAND · BUILD · TOOLS · EXIT(hold)` — four slots, one of which is a power gesture, not a place.

After: `COMMAND · BUILD · TOOLS · GHOST` — four slots, all places.

The ghost slot has **two honest states, and nothing in between:**

- **Online** (Worker reachable): ghost lit, full color, tap → assistant sheet opens from anywhere in the app.
- **Offline** (no network, or Worker unreachable): ghost dimmed, ~35% opacity, tap → a one-line sheet: *"Assistant needs signal. Offline right now."* — and a way back. No spinner, no retry loop, no "could not reach assistant: API 400." The door tells you if it's open before you push on it.

State is determined by a real reachability check, not `navigator.onLine` alone (that lies on captive portals and half-dead Wi-Fi). Cheapest honest signal: the last Worker call's outcome plus a lightweight HEAD/OPTIONS ping on tab focus. Phase 0 quotes what the app already does for connectivity and reuses it.

**Cold Aisle Filter:** the lit/dim difference must read at arm's length under aisle lighting — not 80% vs 100% opacity (the reviewer's exact complaint about the active-tab state). Dim means *dim*. Add a small offline glyph if opacity alone doesn't carry it.

**Door ledger for the dock:** Exit-hold −1 · Ghost +1 · net 0. The assistant, which today is reachable only from inside a rack screen, becomes reachable from every screen. That's the door count staying flat while the reach goes up.

---

## §2 · SYS MENU — FINAL SHAPE

SYS (top-right, exists) drops a short list. After this ship and B-1, it reads, top to bottom:

```
SYS
 ├ MASTER          ← B-1: name · date · source · rack count · REPLACE (PIN) · DELETE (PIN)
 ├ PROFILE         ← identity (name, shift, site); the one place "set up profile" lives
 ├ DIAGNOSTICS     ← version, cache state, crash log, connectivity
 └ EXIT (hold)     ← very bottom. Same hold gesture as today. Puts the app on hold; does not clear state.
```

Rules:
- **EXIT is the last item.** Owner ruling: "drop down to the very bottom and press exit." It stays a hold gesture so a glove brush can't trigger it. It keeps the app on hold — state persists, same as today.
- **Nothing else moves into SYS in this ship.** MASTER arrives with B-1. PROFILE arrives with Ship A's re-homes. This ship adds EXIT and removes it from the dock. One visible change.
- Order is fixed. SYS is a short list of rare actions; it does not grow a tool row.

---

## §3 · "SMARTER AND SMARTER" — THE PLUG POINT (design, not this ship)

The dock slot is where intelligence plugs in. It gets smarter without model changes in two ways, both later specs:

1. **Better context, for free.** Every assistant call already stuffs live rack context into the prompt. As MASTER-TRUTH single-sources the counts and IA-SHIFTNAV consolidates rack state, that context gets more accurate and the answers improve with no assistant change.
2. **Shift memory.** Log each question with rack / phase / site / outcome — offline, in local storage, synced with the Master when online. That log is what teaches the assistant what a tech at *this* site in *this* phase actually asks. It becomes the seed for site-specific quick-asks ("torque spec for this rail," "which port for this device") surfaced before the tech types. Spec name reserved: **INTEL-MEMORY**. Not this ship.

The ghost in the dock is the door. These are what's behind it later.

---

## §4 · PHASE 0 — EVIDENCE (read-only, report before any edit)

- **E-1.** Quote the dock: markup, the four slot definitions, the Exit-hold gesture handler, and what "hold" does to app state. File:line.
- **E-2.** Quote the SYS menu: markup, current items, how items are added, and its bottom edge (so EXIT lands last).
- **E-3.** Quote every entry point to the DCT Assistant today (the sheet, `vaAsk`, any button that opens it). Which screens can reach it? Confirm it's rack-scoped today.
- **E-4.** Quote what the app does for connectivity detection now (any `navigator.onLine`, any Worker-ping, any "offline" banner). Reuse, don't duplicate.
- **E-5.** Playwright: capture the dock at iPhone 15 / WebKit; confirm slot geometry (≥44px targets) so the ghost inherits a glove-safe slot.
- **E-6.** Every e2e spec that asserts on the dock or on Exit — Healer's worklist.

**Stop. Report. Owner confirms.**

---

## §5 · SHIP (one visible change: the dock's fourth slot changes identity)

- **S-1.** EXIT (hold) moves from the dock to the last item of the SYS menu. Same gesture, same hold semantics, same "app on hold, state kept." Dock markup for Exit removed — not hidden.
- **S-2.** Fourth dock slot becomes the ghost. Tap opens the assistant sheet from any screen (E-3's entry point, re-homed, not duplicated).
- **S-3.** Two-state rendering per §1: lit online / dimmed offline, with the offline tap showing the one-line honest sheet.
- **S-4.** Reachability per §1, reusing E-4.
- **S-5.** Cold Aisle Filter on the dim state (visibly dim, glyph if needed).
- Grep gates: Exit-hold markup in dock = 0 · SYS menu last child is EXIT · assistant sheet has exactly one opener (the dock) plus any rack-contextual shortcut the owner keeps.
- Three-stamp lockstep. Door ledger in the ship note.

**Tests before edit (Generator):** dock has four slots; fourth is the ghost; tap-online opens the assistant; tap-offline shows the offline sheet and nothing else; EXIT is absent from dock and present last in SYS; hold-to-exit still holds state. Written first, red against current, green after.

---

## §6 · DEVICE-VERIFY (owner, iPhone)

1. Dock reads COMMAND · BUILD · TOOLS · [ghost]. No EXIT in the dock.
2. Online: ghost lit. Tap from Command, from a rack, from the picker — assistant opens each time.
3. Airplane mode: ghost visibly dim at arm's length. Tap → "Assistant needs signal. Offline right now." No spinner, no error code.
4. Back online: ghost lights up without relaunch.
5. SYS → bottom item is EXIT (hold). Hold → app goes on hold, state kept. Relaunch → same rack, same phase.
6. NBA line under the hero unchanged.

---

## §7 · DOOR LEDGER

| Door | Before | After |
|---|---|---|
| Exit (dock) | 1 | 0 (moved to SYS) |
| Exit (SYS) | 0 | 1 |
| Assistant | reachable from rack screens only | reachable from every screen, one slot |
Net dock: 0. Net app: 0. Reach: up.

*Standing rules apply: evidence before patches · DOM census before edit · tests before destructive/gesture paths · one visible change · surgical edits · lockstep · owner promotes · iPhone verify · a gauge that lies is worse than no gauge — a dim ghost is the honest gauge for "no signal."*
