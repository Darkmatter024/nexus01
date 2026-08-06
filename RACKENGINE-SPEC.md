# RackEngine — Implementation Spec

**Status:** design complete, not implemented. Executes at **M2**.
**Governs:** blueprint §5. Owner rulings **R-05** (one engine, many hosts) and the standing **RACK SCENE LOCK**.
**Baseline:** `dct-ios.html` @ v1.14.395 (`68dd5a9`).

---

## §1 — What this is and is not

**Is:** one engine that renders a rack into any host, in any approved mode, interactive or not, from one data contract and one colour vocabulary, with one lifecycle owner.

**Is not:** a consolidation of surfaces. Per R-05, the rack may legitimately appear in Build, Open Aisle, Rack Map, deployment review, contextual detail, Command, and future approved views. **No presentation is removed.** What is removed is seven independent *implementations* of the same idea.

**Not touched.** Scene internals move byte-identically: materials, the §A JOHN-LOCKED light rig, fog, tone mapping, tray geometry and internals, type colours, bezel strips, floor, reflection, boot. RACK SCENE LOCK holds; only the `camera` term is open, and this spec changes *who owns* the camera, not what it looks like.

---

## §2 — The door

```js
const handle = RackEngine.attach({
  host,          // Element — required
  rackId,        // string — required; the engine resolves the rack itself
  mode,          // 'bay' | 'aisle' | 'detail' | 'map' | 'review' | 'hero'
  interactive,   // bool — default derived from mode (§4)
  view,          // optional initial view; omitted → restore this rack's last view
  context        // optional { deploymentId, phaseId } for annotation
});

handle.update(patch)     // data changed → mutate in place. NEVER re-creates.
handle.setView(view)     // { camera, exploded, cablesVisible }
handle.setMode(mode)
handle.promote()         // request the interactive slot
handle.demote()          // give up the interactive slot, keep rendering flat
handle.suspend()         // host not visible → stop the loop
handle.resume()
handle.detach()          // tear this attachment down
handle.state             // live, read-only

RackEngine.report()      // the census (§10)
RackEngine.interactive   // the handle currently holding the context, or null
```

`attach` is **idempotent per host**: attaching to a host that already has an attachment for the same `rackId` returns the existing handle and applies any changed params. It does not rebuild. This is what makes `bw_render()` safe to call repeatedly.

---

## §3 — INVARIANTS

| # | Invariant | Enforced by |
|---|---|---|
| **I1** | At most one attachment is `interactive` at any moment | the arbiter (§5), inside the engine — never by callers |
| **I2** | `create` and `update` are different operations. A data change never allocates | `attach` idempotency + `handle.update` |
| **I3** | The host element is stable across updates. Nothing wipes a live mount | callers stop rebuilding hosts (§8) |
| **I4** | An attachment whose host is not visible suspends itself | `IntersectionObserver` + `visibilitychange`, per attachment |
| **I5** | Nothing mints a canvas to ask a question | capability owned by the engine, probed once, released |
| **I6** | **No context is acquired in the same task as a release** | the reclaim barrier (§6) |
| **I7** | Non-interactive attachments hold no WebGL context, ever | flat renderer path has no `getContext` |
| **I8** | One data contract. Callers pass `rackId`, never a rack object | `_resolve` (§7) |
| **I9** | One colour vocabulary. Every mode reads `Vocabulary` | `_resolve` normalises `type` before any renderer sees it |
| **I10** | Degradation is visible and honest. No silent downgrade | §9 |

---

## §4 — Modes

`mode` chooses camera rig, composition and which controls render. `interactive` chooses WebGL versus flat DOM. They are separate axes, deliberately — a `bay` that cannot get a context is still a `bay`, rendered flat, not an error screen.

| Mode | Surface today | Default `interactive` | Notes |
|---|---|---|---|
| `bay` | Build workspace `#bw-mount` | **true** | the primary interactive rack |
| `aisle` | Open Aisle / Forge | **true** | wider rig, walk composition |
| `detail` | rack-detail panel `#reh3dMount` | **true** | interactive when focused |
| `map` | Rack Map | false | flat, drag/edit affordances |
| `review` | deployment review | false | flat, annotated with phase + blocker |
| `hero` | Command | **false — ruled** | Command's approved static presentation |

`hero` is non-interactive by owner ruling, not by capability. It is expressed as `interactive: false` on the one engine rather than as a separate code path — which is what deletes `cmd_rackHero3D`.

---

## §5 — Interactive arbitration

The single slot. `RackEngine._interactive` holds one handle or `null`.

```
promote(next):
  if (_interactive === next) return                    // already ours
  if (_interactive) {
    _interactive._demoteToFlat()                       // keeps data + view, renders flat
    _releaseContext()                                  // dispose + forceContextLoss + arm barrier
  }
  _interactive = next
  _acquireContext(next)                                // goes through the barrier (§6)
```

**Demotion is not disposal.** The demoted attachment keeps its resolved data and its view state and re-renders flat into the same host. Nothing is destroyed, so promoting it back restores the same camera, explode and cable state.

That is the mechanism behind Build → Open Aisle → Build: Build demotes to flat, Aisle takes the context, and on return Build is promoted and restores its view. From the technician's side the rack never disappeared and never lost its angle.

**A second interactive request never fails silently.** It either transfers the slot or, if transfer is refused, the requester degrades visibly per §9.

---

## §6 — The reclaim barrier (I6)

The fix for the iPhone refusal. **Not a retry and not a timeout** — an ordering guarantee.

```js
let _barrier = false, _pending = null;

function _releaseContext() {
  try { renderer.dispose(); } catch (_) {}
  try { renderer.forceContextLoss(); } catch (_) {}
  _barrier = true;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    _barrier = false;
    const p = _pending; _pending = null;
    if (p) p();
  }));
}

function _acquireContext(handle) {
  if (_barrier) { _pending = () => _create(handle); return; }
  _create(handle);
}
```

**Why double `rAF`.** On iOS WebKit the GPU-side reclaim from `forceContextLoss()` is asynchronous. A single `rAF` can still land in the same compositor frame. Two frames is ~33ms — imperceptible to a human, and it is a *guarantee* rather than a hope.

**Only one pending acquisition is held.** Rapid navigation collapses to the last request; it does not queue N allocations.

**If the context is still refused after the barrier, we do not loop.** We degrade per §9 and record it in `report()`. Retrying a refusal is what made the pressure worse, and that finding stands.

---

## §7 — Data contract (I8, I9)

Callers pass `rackId`. The engine resolves.

```js
_resolve(rackId) → {
  id, label, units,                       // units = rack height in U
  devices: [ { u, height, type, label, hostname, status } ],
  source: 'master' | 'deployment' | 'standalone'
}
```

**`type` is normalised through `Vocabulary.typeOf()` inside `_resolve`, before any renderer sees it.** This is the root fix for the monochrome flat elevation: today `master_rackToElevation` `:32613` emits RAW codes, `rackElevation_buildHtml` `:36255` writes them into `data-type`, and the CSS at `:10439` is keyed on the EDP vocabulary — intersection `{gpu}`, so nine of ten device classes render grey. With normalisation in the resolver, **no mode can render a RAW code**, and the bug becomes unrepresentable rather than fixed-and-refixable.

It also removes the reshape divergence: `master_renderHit` `:32754` reshapes the rack where the other path passes the whole record. Neither does now — both ask for a `rackId`.

`source` is carried for honesty, not behaviour: a rack that exists only as a cable endpoint resolves with an empty `devices[]`, and the engine says so rather than rendering a convincing empty rack.

---

## §8 — Migration map

All seven paths from `audit/07` Q1, with what each becomes.

| # | Today | Becomes | Disposition |
|---|---|---|---|
| 1 | `rackElevation_render3D` `:34923` | the engine's **interactive renderer internals** | absorbed; scene byte-identical |
| 2 | `forge3d_render` `:19066` | `attach({ mode:'aisle', interactive:true })` | **deleted** as a separate renderer — this is what kills F2 |
| 3 | `rackElevation_buildHtml` `:36204` | the engine's **flat renderer** | absorbed; now `Vocabulary`-fed |
| 4 | `renderElevation` `:44865` | `attach({ mode:'map', interactive:false })` | absorbed; drops its private `TYPE_COLORS` `:44339` |
| 5 | `master_buildElevationRail` `:32893` | `attach({ mode:'review' })`, **own layout retained** | chassis-face rail is a legitimate distinct presentation (R-05). Same data + vocabulary, its own visual |
| 6 | `scrubbar_buildHtml` `:36361` | minimap presentation of the engine | absorbed |
| 7 | `cmd_rackHeroFlat` `:21778` / `cmd_rackHero3D` `:21790` | `attach({ mode:'hero', interactive:false })` | flat absorbed; **`cmd_rackHero3D` deleted** |

**The `bw_render` change is the one that ends the refusal.** Today `:20212` wipes the host and `:20357` builds a brand-new `#bw-mount`, destroying all mount-local lifecycle state, and then a new context is requested microseconds after the previous one was force-lost. After M2: `#bw-mount` is built once; the panels around it re-render freely; the rack receives `handle.update()`. Checklist toggle `:20446`, evidence save `:20465` and phase complete `:20489` all become `update` calls that allocate nothing.

**Deleted at M2** (definition of done includes the deletion, not just the replacement):
`forge3d_render` · `cmd_rackHero3D` · `reh3d_webglOK` · `phantom_webglCapable` · standalone `PhantomGL` · `diag()`'s census line · `TYPE_COLORS` `:44339` · the `_reh3dActive` / `_forge3dActive` twin trackers.

---

## §9 — Failure semantics (I10)

No silent failures, per the standing hard rule.

| Condition | Behaviour |
|---|---|
| Context refused after the barrier | attachment degrades to `interactive:false` **flat**, with a visible line naming why. No retry loop. Recorded in `report()`. |
| Second interactive request refused | requester degrades to flat with the same honest line |
| `rackId` unresolvable | honest empty state **naming the rackId** — never a blank host |
| Rack resolves with no devices | says so, and says `source` — this is the documented host-less-cab case, not a render failure |
| Host not measurable | the existing `ResizeObserver` path is retained; it is sound and the `.191` per-mount re-arm stays |
| `webglcontextlost` at runtime | `preventDefault`, demote to flat, attempt re-promotion through the barrier **once**, then stay flat and say so |

A flat rack is a **legitimate presentation**, not a broken one. That is why degradation reads as "showing flat elevation" and not as an error.

---

## §10 — `report()` — and its own retirement

Absorbs the whole of M0's `PhantomGL`, plus what only the engine can know:

```
version · deviceWebgl · threeLoaded
attachments: [ { host, rackId, mode, interactive, suspended, ctx } ]
interactiveOwner · canvases {total,visible,hidden,live,lost,refused}
barrier { armed, deferrals } · lastRefusalReason
```

Per the blueprint's instrumentation rule, this replaces the standalone instruments and they are deleted in the same ship. `report()` itself is permanent — it is the engine describing itself, not a diagnostic bolted onto it.

---

## §11 — Verification (M2 gate)

The owner's 14-step sequence, with the numbers that must hold. `RackEngine.report()` at every step.

| Step | Must hold |
|---|---|
| Command | `interactiveOwner: null`, `live: 0` |
| Build | `interactiveOwner: bw-mount`, `live: 1` |
| Open Aisle | `interactiveOwner: forge mount`, **`live: 1`** — transferred, not added |
| Return to Build | `interactiveOwner: bw-mount`, `live: 1`, **view restored** |
| ×10 Build entries | `live: 1` throughout, `refused: 0`, `total` does not climb |
| Checklist / evidence / phase | **zero** new contexts; `barrier.deferrals` may increment, refusals may not |
| Any surface | non-interactive racks still render |
| Data | unchanged |

Plus the mechanical gates: `node --check` ×3, CSS brace balance, line endings, three-stamp lockstep, and a diff confined to the rack subsystem.

---

## §12 — What M2 does not do

Not routing. Not storage. Not composition. Not Shift. Not the intelligence boundary. Not legacy deletion — **that is a separate ship inside M2, per R-04, and does not stack with this one.**

One ship, one subject.
