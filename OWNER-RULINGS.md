# OWNER-RULINGS.md

Dated register of owner rulings. **`CLAUDE.md` carries the standing law; this file is the record of
the rulings that changed it.** Where the two disagree, the newest ruling here wins and `CLAUDE.md`
is stale until edited. Newest first.

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
