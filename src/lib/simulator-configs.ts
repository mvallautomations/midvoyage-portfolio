// Per-agent configs for AgentSimulator. The sample inputs are fictional and
// labeled as such in the UI; the routing rules are the real ones each agent
// enforces in code (mirrored from the agent repos' READMEs). Outputs are
// canned illustrations written in the same register as the logged drafts —
// the receipts section (RunReplay) below each simulator carries the real,
// verbatim outputs. Never present a simulated run as a logged one.

export interface SimSample {
  /** Chip label the visitor picks */
  label: string;
  /** The fictional input, shown as submitted fields */
  input: { label: string; value: string }[];
  /** Processing lines, revealed during the simulated run */
  steps: string[];
  /** The rule that fired (verbatim-adjacent from the agent's coded rules) */
  ruleFired: string;
  decision: { label: string; detail: string };
  outputs: { label: string; value: string }[];
}

export interface SimConfig {
  /** Verified average latency of the live agent (from evidence/runs.json) */
  avgSeconds: number;
  /** The real coded rules, shown beside the simulator */
  rules: string[];
  rulesTitle: string;
  samples: SimSample[];
}

export const simulatorConfigs: Record<string, SimConfig> = {
  "review-reply-agent": {
    avgSeconds: 3.48,
    rulesTitle: "Escalation triggers — enforced in code, every review",
    rules: [
      "Rating of 3 or below",
      "Alleges illness, injury, a safety or hygiene problem, discrimination, or staff misconduct",
      "Threatens legal action, a chargeback, or contacting press or a regulator",
      "Names a member of staff negatively",
      "Reads as fake, a competitor, or a scam",
      "The model is unsure, or its output is unparseable — it fails closed",
    ],
    samples: [
      {
        label: "5★ — praise",
        input: [
          { label: "Rating", value: "5/5" },
          {
            label: "Review",
            value:
              "Best kare-kare in the neighborhood. Ate here with my mom on her birthday and the staff sang for her without us asking. We'll be back.",
          },
        ],
        steps: [
          "Sentiment: positive",
          "Topics: food quality, occasion, staff hospitality",
          "Escalation triggers: none",
          "Routed → Queue for Approval",
        ],
        ruleFired: "No trigger fired — rating above 3, nothing alarming.",
        decision: {
          label: "Queue for Approval",
          detail:
            "Straightforward praise. A reply is drafted and queued for one-tap approval — nothing posts on its own.",
        },
        outputs: [
          {
            label: "Draft reply (simulated)",
            value:
              "Thank you — happy birthday to your mom! The kare-kare compliment means a lot, and the team will be glad the little song landed. See you both again soon.",
          },
        ],
      },
      {
        label: "3★ — mixed",
        input: [
          { label: "Rating", value: "3/5" },
          {
            label: "Review",
            value:
              "Food was honestly good but we waited 40 minutes on a quiet Tuesday. Not sure I'd rush back.",
          },
        ],
        steps: [
          "Sentiment: mixed",
          "Topics: food quality, long wait",
          "Trigger: rating of 3 or below",
          "Routed → Escalate to Owner",
        ],
        ruleFired:
          "Rating of 3 or below — the rating rule is enforced in code as well as in the prompt.",
        decision: {
          label: "Escalate to Owner",
          detail:
            "A 3-star with a service complaint is a conversation the owner should choose to have, not one an agent should have for them.",
        },
        outputs: [],
      },
      {
        label: "4★ — but names staff",
        input: [
          { label: "Rating", value: "4/5" },
          {
            label: "Review",
            value:
              "Great food, but the cashier Bien was rude when we asked to split the bill. Everything else was fine.",
          },
        ],
        steps: [
          "Sentiment: positive",
          "Topics: food quality, staff conduct",
          "Trigger: names a member of staff negatively",
          "Routed → Escalate to Owner",
        ],
        ruleFired:
          "Names a member of staff negatively — a high rating doesn't override a personnel complaint.",
        decision: {
          label: "Escalate to Owner",
          detail:
            "A named-staff complaint is an HR conversation before it is a public reply. The owner sees it first.",
        },
        outputs: [],
      },
      {
        label: "1★ — safety + legal threat",
        input: [
          { label: "Rating", value: "1/5" },
          {
            label: "Review",
            value:
              "My daughter got sick after eating here and the manager brushed us off. I am reporting this to the city health office.",
          },
        ],
        steps: [
          "Sentiment: negative",
          "Topics: alleged illness, staff conduct, regulatory threat",
          "Triggers: rating ≤ 3 · alleges illness · threatens a regulator",
          "Routed → Escalate to Owner",
        ],
        ruleFired:
          "Three triggers at once: rating, alleged illness, regulator threat. No draft is written.",
        decision: {
          label: "Escalate to Owner",
          detail:
            "Serious enough that a suggested reply would do more harm than good. The live agent says so plainly in the alert instead of leaving a blank.",
        },
        outputs: [
          {
            label: "Draft reply (simulated)",
            value:
              "(No draft written. This one is serious enough that a suggested reply would do more harm than good - write it yourself.)",
          },
        ],
      },
    ],
  },

  "inbox-triage-agent": {
    avgSeconds: 3.19,
    rulesTitle: "Always escalates — enforced in code, not just asked for",
    rules: [
      "The body mentions refund, chargeback, lawyer, legal, overdue invoice, unpaid, dispute, small claims",
      "Urgency is high",
      "The draft contains a [PRICE] gap — a reply with a hole in it never goes out unseen",
      "The model returned anything unparseable — it fails closed",
      "Spam is logged silently. You are not buzzed for backlink offers.",
    ],
    samples: [
      {
        label: "Simple enquiry",
        input: [
          { label: "From", value: "liza@example-events.ph" },
          { label: "Subject", value: "Weekend catering?" },
          {
            label: "Body",
            value:
              "Hi — do you cater on weekends? We have a small team offsite on the 22nd, around 15 people.",
          },
        ],
        steps: [
          "Category: new_enquiry",
          "Urgency: normal",
          "Extracted: service: catering · quantity: 15 people · deadline: the 22nd · budget: —",
          "Routed → Queue for Approval",
        ],
        ruleFired: "No escalation trigger — a clear question with a safe, complete draft.",
        decision: {
          label: "Queue for Approval",
          detail:
            "Everything needed for a reply is in the email. The draft waits for one tap; it never sends itself.",
        },
        outputs: [
          {
            label: "Draft reply (simulated)",
            value:
              "Hi Liza — yes, weekends work. For 15 people on the 22nd we'd suggest the set menu; I'll send the options and prices in a follow-up. Anything the group can't eat?",
          },
          {
            label: "Extracted (no invented numbers)",
            value: "service: catering · quantity: 15 people · deadline: the 22nd · budget: —",
          },
        ],
      },
      {
        label: "Quote request, no budget",
        input: [
          { label: "From", value: "ops@example-foods.ph" },
          { label: "Subject", value: "Automating our order intake" },
          {
            label: "Body",
            value:
              "We take about 60 orders a day over Viber and email and it's chaos. Can you build something before the Christmas rush? Need it by November.",
          },
        ],
        steps: [
          "Category: quote_request",
          "Urgency: normal",
          "Extracted: service: order intake automation · quantity: 60 orders/day · deadline: November · budget: —",
          "Routed → Escalate to Owner",
        ],
        ruleFired:
          "A custom build with a firm deadline and no stated budget needs a human before anyone quotes anything.",
        decision: {
          label: "Escalate to Owner",
          detail:
            "The agent pulls the quantity and deadline out of prose, leaves the budget blank because none was given, and refuses to guess at a price.",
        },
        outputs: [
          {
            label: "Extracted (no invented numbers)",
            value:
              "service: order intake automation · quantity: 60 orders per day · deadline: November (before Christmas rush) · budget: —",
          },
        ],
      },
      {
        label: "Overdue invoice + lawyer",
        input: [
          { label: "From", value: "accounts@example-supply.com" },
          { label: "Subject", value: "Invoice 1088 — 45 days overdue" },
          {
            label: "Body",
            value:
              "This is our final notice. If invoice 1088 is not settled this week we will pass it to our lawyer.",
          },
        ],
        steps: [
          "Category: invoice_chase",
          "Urgency: high",
          "Triggers: mentions lawyer · mentions overdue invoice · urgency high",
          "Routed → Escalate to Owner",
        ],
        ruleFired:
          "Money and legal talk always reaches a human. Three triggers fired; no draft is attempted.",
        decision: {
          label: "Escalate to Owner",
          detail:
            "A payment dispute is a decision, not a reply. The owner gets the full email and the extraction, immediately.",
        },
        outputs: [],
      },
      {
        label: "SEO spam",
        input: [
          { label: "From", value: "growth@example-seo.biz" },
          { label: "Subject", value: "First page of Google in 30 days" },
          {
            label: "Body",
            value:
              "We guarantee page-one rankings in 30 days. Can I send you our packages? Also do you accept guest posts?",
          },
        ],
        steps: [
          "Category: spam",
          "Urgency: low",
          "Spam gate: logged, no notification",
          "Routed → filed silently",
        ],
        ruleFired:
          "Spam is logged and never alerts. The small annoyances are what get a tool switched off.",
        decision: {
          label: "Filed silently",
          detail:
            "Written to the inbox table like everything else — always logged before any alert decision — but nobody's phone buzzes.",
        },
        outputs: [],
      },
    ],
  },

  "content-repurposer-agent": {
    avgSeconds: 7.08,
    rulesTitle: "The voice gate — a banned-word list in a prompt is a request; in code it's a gate",
    rules: [
      "Banned vocabulary: grind, crush it, 10x, hustle, guru, unlock, game-changer, supercharge, elevate, seamless, robust, cutting-edge, revolutionise, empower, delve, dive in, \"reach out\", \"circle back\", \"touch base\", \"in today's fast-paced\", \"passionate about\", \"ever wondered\"",
      "A LinkedIn post must not end on a question",
      "A LinkedIn post must land between 90 and 230 words",
      "The carousel must have exactly five slides",
      "Anything flagged routes to Flag for Rewrite — the draft is still saved either way",
    ],
    samples: [
      {
        label: "A real build note",
        input: [
          {
            label: "Source",
            value:
              "A working note about shipping an inbox triage agent: what it classifies, what it refuses to do, and the four logged runs behind the numbers.",
          },
        ],
        steps: [
          "Angle: quiet flex",
          "Drafting: LinkedIn post · 5-slide carousel · 30s video script",
          "Voice gate: banned words 0 · length in range · ends on a statement · 5 slides",
          "Routed → Send Drafts",
        ],
        ruleFired: "All checks passed — the drafts ship.",
        decision: {
          label: "Send Drafts",
          detail:
            "Three formats from one source, and the gate found nothing to flag. The drafts land in Telegram for a human to post.",
        },
        outputs: [
          {
            label: "LinkedIn post (simulated excerpt)",
            value:
              "Built an email triage agent that files spam silently and escalates anything about money or lawyers.\n\nIt extracts what a quote needs — quantity, deadline, budget — and leaves a dash where nothing was stated. It will not infer a number nobody gave it.\n\nThe escalation rules live in code, not in the prompt.",
          },
        ],
      },
      {
        label: "Hustle-language source",
        input: [
          {
            label: "Source",
            value:
              "\"Why every founder must unlock 10x growth — crush it with this seamless, cutting-edge playbook. Ready to hustle harder?\"",
          },
        ],
        steps: [
          "Angle: constraint as brief",
          "Drafting: LinkedIn post · 5-slide carousel · 30s video script",
          "Voice gate: banned words found — 10x, unlock · length 57 words (below 90)",
          "Routed → Flag for Rewrite",
        ],
        ruleFired:
          "Two banned words survived the model's own resistance, and the post ran short. The gate caught both.",
        decision: {
          label: "Flag for Rewrite",
          detail:
            "The model resisted most of the hustle language on its own; what slipped through was caught by the parser rather than by a human noticing later. The draft is saved, not destroyed — you may disagree with the gate.",
        },
        outputs: [
          {
            label: "Voice gate report (simulated)",
            value: "banned: 10x, unlock · linkedin length: 57 words (min 90) · slides: 5 ✓ · ends on question: no ✓",
          },
        ],
      },
    ],
  },
};
