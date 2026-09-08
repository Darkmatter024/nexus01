# OWNER-RULINGS.md

Dated register of owner rulings. **`CLAUDE.md` carries the standing law; this file is the record of
the rulings that changed it.** Where the two disagree, the newest ruling here wins and `CLAUDE.md`
is stale until edited. Newest first.

---

## 2026-09-08 · PREVIEW-DIAG — RACK-PREVIEW-CONTEXT Option 5, INSTRUMENTATION ONLY, APPROVED

**Ruling, verbatim (in session, 2026-09-08):**

> Option 5 = ruling PREVIEW-DIAG, instrumentation only, approved.

**The premise it rests on, also verbatim, same thread:**

> Untangle .581/.582: .581 stays VERIFIED, leave the guard's refusal — do NOT stamp .581 FAILED, the
> preview bug is pre-existing state-3, not .581's.

### What it approves

- **Option 5 of `docs/RACK-PREVIEW-CONTEXT-PHASE0-EVIDENCE.md` §5: make the silent states speak,
  change nothing else.** Every silent path in `bw_mount3D` already composed a full diagnostic line
  and handed it to the console, and there is no console in a cold aisle. The lines now go to the
  `phantom_crash_log` ring, readable at SYS → DIAGNOSTICS, as TRACE entries excluded from
  `phantom_crashErrors`. Plus one read-only health snapshot per mount, 1200 ms after mount.
- **As its own version.** The ship is `v1.14.582` (`9c03aa3` + review fix `e643517`), already on
  `main`. This entry confirms it; nothing new is built under it.
- **Instrumentation only means:** no re-arm, no re-render, no context allocation, `getError()` not
  called (it clears GL state). Zero pixels change. The one on-screen difference is that the ERRORS
  sheet lists `PREVIEW/…` entries; the SYS row count and dot exclude traces and stay NONE / grey on a
  healthy device.

### What it does NOT approve

- Options 1–4 of the same document. **Option 1** (liveness probe + re-arm) re-opens the `.394` ruling
  that re-arming a starved device worsens context pressure; it needs its own ruling, and only becomes
  a candidate if a device reading names candidate A (`MOUNT_NOT_DRAWING`). **Options 2+3**
  (`webglcontextrestored` listener, drop `{ once: true }`) are cheap and additive but cannot see
  candidate A — own ship, own ruling. **Option 4** touches the `.401` pause/resume contract.

### Why 5 beats the others

It is the only option with zero risk to a starved device, and it turns every future blank preview
from a guess into a reading. The reading then decides whether Option 1 is justified, instead of
taking Option 1 on a hypothesis.

### Verify

Promote → device: BUILD with a Master loaded → SYS → DIAGNOSTICS. **PASS** = a `PREVIEW/` entry is
listed and no JS-ERROR banner appeared. **FAIL** = no entry after a Build visit, or a banner on a
device that was healthy at `.581`. **A blank preview does not fail this ship** — the line it leaves
is the finding. Stamp on the instrument, not on the preview. Checklist: `docs/BATCH1-582-EVIDENCE.md`.

### Record notes

- The `.582` commit message records Option 5 as *"owner-ruled 2026-09-08"*. The owner confirmed it
  and gave it the label **PREVIEW-DIAG** in session on 2026-09-08; this entry is the register record.
- **Same day, recorded elsewhere, not yet given its own entry here:** the promote-order ruling
  (`30f3822`; `tools/promote.ps1` Guard 4 header — promote → device-verify on the Pages URL → stamp,
  and the guard adjudicates the version the phone HAS). That commit calls it *"owner ruling C"*.
  Owner to confirm whether it gets a register entry under that label.

---

## 2026-09-05 · BATCH-OODA — C-1 … C-5 RULED

Spec: `SHIP-HANDOFF-BATCH-OODA.md`. The owner ruled all five conflicts in one message, each
matching Claude Code's recommendation.

| # | Conflict | Ruling |
|---|---|---|
| **C-1** | SHIP GATE 2026-08-23, *"max ONE unverified ship"*, vs batches of 3–5 | **AMEND** |
| **C-2** | Ship discipline 0 (CALL 0) already batches, cap 6 | **SUPERSEDE** |
| **C-3** | LEGACY-RETIRE forbids stacking | **CARVE OUT** |
| **C-4** | Private-tab pass fails mid-batch | **Option 2** |
| **C-5** | Does batch approval authorise scope? | **CONFIRM** |

### What each ruling means concretely

- **C-1 AMEND.** The 2026-08-23 SHIP GATE is amended **by name, not revoked** — the `.483/.484/.485`
  incident stays on the record as the reason the rule existed. The amendment is **conditional on a
  genuinely green suite** (spec §4). Until that lands, max ONE unverified ship still governs.
- **C-2 SUPERSEDE.** BATCH-OODA replaces CALL 0. **CALL 0 and `BATCH-VERIFY.md` are struck in the
  same edit** — two live batching rules is the failure mode this repo already knows.
- **C-3 CARVE OUT.** ⛔ **BATCH-OODA does not apply inside LEGACY-RETIRE.** That campaign keeps one
  visible change per ship and a phone verify between stages, per its own ruling.
- **C-4 OPTION 2.** Per-ship adjudication at the batch boundary: the evidence table carries a
  PASS/FAIL column and `VERIFIED` records the batch with any failing version named. **Fallback to
  Option 1 (whole batch FAILED) when the defect is structural rather than localised.**
- **C-5 CONFIRM.** Batch approval is **not** scope approval. Each batch's contents still need an
  explicit GO. BATCH-OODA changes adjudication cadence only.

### ⛔ NOT YET IN FORCE

These rulings settle the *conflicts*. They do **not** start batch mode. BATCH-OODA becomes standing
doctrine only when spec §8 is satisfied — the §4 suite triage landed and signed off, the sweep
runtime regression resolved, `CLAUDE.md` rewritten, `stamp.ps1` given batch syntax, and one batch
run end to end. **Until then the existing ship discipline governs unchanged.**

---

## 2026-09-05 · PROMOTE IS OWNER-ONLY. The 2026-08-30 amendment is REVOKED.

**Ruling, verbatim:**

> The 2026-08-30 amendment is revoked. Promote is owner-only from now on: never move release, in any
> mode, unless I explicitly order that specific promote in that session. Log the revocation in
> OWNER-RULINGS.md. The promote.ps1 from the scripts ship becomes the only promote path, and it runs
> from my terminal.

### What this revokes

`CLAUDE.md` § *Branch topology — SHIP-GATE-LOCKDOWN*, the block headed
**"⭐ AMENDED 2026-08-30 — CLAUDE CODE MAY PROMOTE."** That amendment permitted Claude Code to run
`git checkout release; git merge --ff-only main; git push origin release; git checkout main` on its
own judgement. **It no longer holds.**

### What triggered it

`release` moved twice inside 24 hours without the owner running a promote:

| Ref move | Time | By |
|---|---|---|
| `e78f0b2 → 2000e02` | 2026-09-05 07:46:02 -0500 | Claude Code |
| `2000e02 → 9cac936` | 2026-09-05 08:26:58 -0500 | Claude Code |

Both were fast-forwards performed by Claude Code on an explicit in-session instruction, and both
were reported at the time. An audit confirmed **no automation moved the branch**: no
`.github/workflows/`, no active `.git/hooks/`, `tools/githooks/pre-commit` contains no
push/merge/checkout, and the only repo-wide matches for `--ff-only` / `push origin release` are
documentation in `CLAUDE.md:146` and comments in `tools/hooks/phantom-guard.js`.

⚠ Not audited from this box: **GitHub-side** branch protection or auto-merge on `release`. `gh` is
not installed here; that check has to come from the owner's terminal.

The ruling is not a finding of unauthorised action. It removes the discretion itself, so the
question cannot arise again.

### The standing rule

1. ⛔ **Claude Code never moves `release`. In any mode. No exceptions, including a session order.**
   No `merge --ff-only`, no push to `release`, no branch reset, no "it is only a fast-forward".
   An in-session instruction to promote is answered by **handing the owner the command**, never by
   running it.
2. **The only promote path is `tools/promote.ps1`, run by the owner from his own terminal.**
3. The 2026-08-27 lockdown's original gates are untouched and still absolute: **`VERIFIED` is
   owner-only**, and **the device verify is the owner's**.
4. A push to `main` changes nothing on the iPhone. Claude Code ships to `main`, reports, and
   **parks**. Reaching the phone is the owner's step.

### ✅ RESOLVED same day — the escape-hatch clause is STRUCK

The ruling as first given contained both an in-session escape hatch (*"unless I explicitly order
that specific promote in that session"*) and a mechanism only the owner can operate (*"promote.ps1 …
runs from my terminal"*). Claude Code reported the tension rather than resolving it.

**Owner ruling, 2026-09-05, same day:** *"Strike the escape-hatch clause: you never move release,
full stop, no session-order exception. The only promote path is promote.ps1 from my terminal."*

⛔ The escape hatch **does not exist**. The quoted ruling above is preserved as the historical
record; this strike governs.

### `promote.ps1` — GO given 2026-09-05

At the time of the ruling the repo contained **no `.ps1` files at all**. The owner then gave an
explicit GO for the scripts ship: **`tools/stamp.ps1` and `tools/promote.ps1`, script-only.**
Until that ship lands there is no promote path and no ship can reach the phone.

### Stale instruction hazard — CLOSED 2026-09-05

`CLAUDE.md` carried the revoked *"CLAUDE CODE MAY PROMOTE"* amendment, and `CLAUDE.md` is what a
fresh session reads at startup. On the owner's instruction both passages were edited to point here:
the § *Branch topology* amendment block, and ship-loop step 4 (*"PROMOTE, then STOP"* → *"PUSH TO
`main`, then STOP"*). No permission language remains.
