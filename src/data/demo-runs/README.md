# demo-runs — logged n8n execution data

Verbatim copies of each agent repo's `evidence/runs.json`, taken 2026-08-07.
The static export cannot read sibling repos at build time, so the data is
copied here to keep the build hermetic.

Source of truth (do not edit these copies — re-copy from source):

| File | Canonical source |
|---|---|
| `review-reply-agent.json` | `~/m-2nd-brain/code/review-reply-agent/evidence/runs.json` |
| `inbox-triage-agent.json` | `~/m-2nd-brain/code/inbox-triage-agent/evidence/runs.json` |
| `content-repurposer-agent.json` | `~/m-2nd-brain/code/content-repurposer-agent/evidence/runs.json` |

Every number shown on `/work/<slug>` replay UIs comes from these files.
Never hand-edit a latency, rating, or output — if a re-run produces new
evidence, update the source repo first, then re-copy.
