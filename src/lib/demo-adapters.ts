// Adapters from each agent's raw evidence/runs.json schema to the
// normalized shape RunReplay renders. Data is verbatim-copied from the
// agent repos (see src/data/demo-runs/README.md) — these mappers may
// relabel fields but must never invent values that aren't in the log.

import reviewReplyRuns from "@/data/demo-runs/review-reply-agent.json";
import inboxTriageRuns from "@/data/demo-runs/inbox-triage-agent.json";
import contentRepurposerRuns from "@/data/demo-runs/content-repurposer-agent.json";

export interface ReplayRun {
  /** n8n execution number, straight from the log */
  id: string;
  /** Wall-clock seconds of the logged execution */
  latencySeconds: number;
  status: "success" | "error";
  /** Facts about the input/context, all from the log */
  context: { label: string; value: string }[];
  /** Execution stages, rendered as an animated log. Data-derived only. */
  steps: string[];
  /** Where the run ended up and why */
  decision: { label: string; detail: string };
  /** What the agent produced (verbatim) */
  outputs: { label: string; value: string }[];
  /** Honest framing note, shown under the run when present */
  note?: string;
}

interface ReviewReplyRaw {
  execution: string;
  status: string;
  seconds: number;
  path: string[];
  rating: number;
  sentiment: string;
  needs_human: boolean;
  topics: string;
  reason: string;
  draft_reply: string;
}

interface InboxTriageRaw {
  execution: string;
  status: string;
  seconds: number;
  routed_to: string;
  received_at: string;
  business: string;
  from_addr: string;
  subject: string;
  category: string;
  urgency: string;
  needs_human: boolean;
  reason: string;
  draft_reply: string;
  extracted: string;
}

interface ContentRepurposerRaw {
  execution: string;
  status: string;
  seconds: number;
  routed_to: string;
  created_at: string;
  source_title: string;
  angle: string;
  why: string;
  linkedin_post: string;
  carousel: string;
  video_script: string;
  voice_flags: string;
  needs_rewrite: boolean;
}

function asStatus(raw: string): "success" | "error" {
  return raw === "success" ? "success" : "error";
}

// The review-reply log records the classification, not the raw review text,
// so the replay shows path → decision → draft. Never fabricate an input review.
export function getReviewReplyRuns(): ReplayRun[] {
  return (reviewReplyRuns as ReviewReplyRaw[]).map((run) => {
    const outputs: { label: string; value: string }[] = [];
    if (run.draft_reply) {
      outputs.push({ label: "Draft reply", value: run.draft_reply });
    }
    return {
      id: run.execution,
      latencySeconds: run.seconds,
      status: asStatus(run.status),
      context: [
        { label: "Rating", value: `${run.rating}/5` },
        { label: "Sentiment", value: run.sentiment },
        { label: "Topics", value: run.topics },
      ],
      steps: run.path,
      decision: {
        label: run.needs_human ? "Escalate to Owner" : "Queue for Approval",
        detail: run.reason,
      },
      outputs,
      note: run.needs_human
        ? "No auto-post. Anything serious goes to a human before a word is published."
        : undefined,
    };
  });
}

export function getInboxTriageRuns(): ReplayRun[] {
  return (inboxTriageRuns as InboxTriageRaw[]).map((run) => {
    const outputs: { label: string; value: string }[] = [
      { label: "Extracted (no invented numbers)", value: run.extracted },
    ];
    if (run.draft_reply) {
      outputs.push({ label: "Draft reply", value: run.draft_reply });
    }
    return {
      id: run.execution,
      latencySeconds: run.seconds,
      status: asStatus(run.status),
      context: [
        { label: "From", value: run.from_addr },
        { label: "Subject", value: run.subject },
      ],
      steps: [
        "Email intake",
        `Category: ${run.category}`,
        `Urgency: ${run.urgency}`,
        `Routed → ${run.routed_to}`,
      ],
      decision: {
        label: run.routed_to,
        detail: run.reason,
      },
      outputs,
      note:
        asStatus(run.status) === "error"
          ? "Logged as an error run — a downstream node failed. The classification still routed to a human, so nothing was lost. That failure mode is the design."
          : undefined,
    };
  });
}

export function getContentRepurposerRuns(): ReplayRun[] {
  return (contentRepurposerRuns as ContentRepurposerRaw[]).map((run) => ({
    id: run.execution,
    latencySeconds: run.seconds,
    status: asStatus(run.status),
    context: [
      { label: "Source", value: run.source_title },
      { label: "Angle", value: run.angle },
    ],
    steps: [
      "Source intake",
      `Angle: ${run.angle}`,
      run.voice_flags
        ? `Voice gate: flagged (${run.voice_flags})`
        : "Voice gate: pass",
      `Routed → ${run.routed_to}`,
    ],
    decision: {
      label: run.needs_rewrite ? "Flag for Rewrite" : "Send Drafts",
      detail: run.needs_rewrite
        ? `Brand-voice linter caught: ${run.voice_flags}. The draft does not ship until it passes.`
        : run.why,
    },
    outputs: [
      { label: "LinkedIn post", value: run.linkedin_post },
      { label: "Carousel outline", value: run.carousel },
      { label: "Video script", value: run.video_script },
    ],
    note: run.needs_rewrite
      ? "The voice rules live in code, not in a prompt. A draft that breaks them is flagged, not published."
      : undefined,
  }));
}

export const demoRunsBySlug: Record<string, ReplayRun[]> = {
  "review-reply-agent": getReviewReplyRuns(),
  "inbox-triage-agent": getInboxTriageRuns(),
  "content-repurposer-agent": getContentRepurposerRuns(),
};
