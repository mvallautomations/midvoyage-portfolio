import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/* ============================================================
   mid·voyage — Services (/services)
   Documents every service delivered through handlit, with the
   live price anchors from handlit.app. This site documents;
   handlit sells — every CTA points at handlit.app.
   Prices must match handlit.app's locked offer stack. Do not
   invent numbers or client claims (pre-revenue: own-ops only).
   ============================================================ */

export const metadata: Metadata = {
  title: "Services",
  description:
    "Every service Mishael Vallar delivers through handlit — audits, automation builds, chat agents, and retainers — with live pricing on handlit.app.",
};

type Service = {
  name: string;
  price: string;
  cadence: string;
  what: string;
  href: string;
  linkLabel: string;
};

const AUDITS: Service[] = [
  {
    name: "Discovery Audit",
    price: "Free",
    cadence: "15 minutes, on the site",
    what: "A guided check-up — tap through questions that fit your kind of business, no typing, no microphone. You get a score for how much of your week could run itself, and the top 3 places your time is leaking. Report lands in your inbox within a business day.",
    href: "https://handlit.app/#audit",
    linkLabel: "Take it at handlit.app",
  },
  {
    name: "Chat Readiness Audit",
    price: "$297",
    cadence: "fixed, 48-hour turnaround",
    what: "A plain-language report on how customers reach a business today, where each path stalls, and which chat agent would close the gap — with projections labeled as projections. Useful even if you never hire me again.",
    href: "https://handlit.app/#agent-architect",
    linkLabel: "Details at handlit.app",
  },
];

const BUILDS: Service[] = [
  {
    name: "Pilot Automation",
    price: "$1,500",
    cadence: "fixed, one-time · two-week ship",
    what: "One workflow from your audit, built and handed over. Small on purpose — you see it working before committing to anything bigger. Runs on accounts you own; documentation included.",
    href: "https://handlit.app/#pricing",
    linkLabel: "Book at handlit.app",
  },
  {
    name: "Custom Agent Build",
    price: "$1,500–$2,500",
    cadence: "project",
    what: "A chat agent in your brand's voice, on your website and your busiest channel, answering from your real content — with a clean hand-off to a human when it matters. Two revision rounds and a before/after baseline.",
    href: "https://handlit.app/#agent-architect",
    linkLabel: "Details at handlit.app",
  },
  {
    name: "Lead-Gen Engine",
    price: "from $1,500",
    cadence: "pilot install, then optional retainer",
    what: "A prospecting pipeline you own: scrape, score each prospect 0–100 against your ideal customer, write a personalized first line, dispatch. The open-source core replaced roughly $350 a month of subscription tools; the public demo runs on simulated data and says so.",
    href: "https://handlit.app/systems/lead-engine.html",
    linkLabel: "See the system live",
  },
];

const RETAINERS: Service[] = [
  {
    name: "AI Partner Retainer",
    price: "from $2,000",
    cadence: "monthly",
    what: "An automation department on retainer: new builds from a shared roadmap, monitoring, fixes, and monthly tune-ups. Cancel anytime and keep everything.",
    href: "https://handlit.app/#pricing",
    linkLabel: "Details at handlit.app",
  },
  {
    name: "Agent Care Plan",
    price: "$250–$400",
    cadence: "monthly, after a build ships",
    what: "Your chat agent stays current: prices, hours, and policies updated as they change, plus a monthly review of the questions it couldn't answer — fixed, not filed away.",
    href: "https://handlit.app/#agent-architect",
    linkLabel: "Details at handlit.app",
  },
  {
    name: "AI Operating Partner",
    price: "from $5,000",
    cadence: "monthly, custom-scoped",
    what: "The retainer scaled to a department: I own the automation roadmap end to end — design, builds, monitoring, and the quarterly numbers — as a fractional operating partner.",
    href: "https://handlit.app/#pricing",
    linkLabel: "Book a scoping call",
  },
];

function ServiceRow({ s }: { s: Service }) {
  return (
    <article
      style={{
        border: "1px solid var(--border-subtle)",
        borderRadius: "8px",
        padding: "1.5rem 1.6rem",
        backgroundColor: "var(--bg-surface)",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-jakarta)",
            fontWeight: 800,
            fontSize: "1.15rem",
            letterSpacing: "-0.02em",
          }}
        >
          {s.name}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.85rem",
            color: "var(--ink-secondary)",
          }}
        >
          <strong style={{ color: "var(--ink-primary)" }}>{s.price}</strong>{" "}
          · {s.cadence}
        </p>
      </div>
      <p style={{ color: "var(--ink-secondary)", lineHeight: 1.65 }}>{s.what}</p>
      <a
        href={s.href}
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "0.8rem",
          textDecoration: "none",
          color: "var(--ink-primary)",
          borderBottom: "1px solid var(--border-medium)",
          alignSelf: "flex-start",
          paddingBottom: "0.1rem",
        }}
      >
        {s.linkLabel} →
      </a>
    </article>
  );
}

function Group({ label, items }: { label: string; items: Service[] }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <p className="eyebrow" style={{ marginBottom: "1.1rem", color: "var(--accent-terra)" }}>
        {label}
      </p>
      <div style={{ display: "grid", gap: "1rem" }}>
        {items.map((s) => (
          <ServiceRow key={s.name} s={s} />
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <section
          style={{
            paddingTop: "clamp(3.5rem, 8vw, 6rem)",
            paddingBottom: "clamp(2.5rem, 6vw, 5rem)",
          }}
        >
          <div className="mv-container" style={{ maxWidth: "76ch" }}>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>
              Services
            </p>
            <h1
              style={{
                fontFamily: "var(--font-jakarta)",
                fontWeight: 800,
                fontSize: "clamp(2.1rem, 6vw, 3.6rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                marginBottom: "1.25rem",
                maxWidth: "18ch",
              }}
            >
              What I build, and what it{" "}
              <span className="ghost-word" style={{ fontSize: "inherit" }}>
                costs.
              </span>
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.7,
                marginBottom: "0.75rem",
              }}
            >
              Delivery happens through{" "}
              <a href="https://handlit.app" style={{ color: "var(--ink-primary)" }}>
                handlit
              </a>
              , my systems company — this page is the documentation. Prices here
              are the same anchors published on handlit.app; if the two ever
              disagree, handlit.app wins.
            </p>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.7,
              }}
            >
              The proof behind each service is my own operations — every system
              is tested on my own business first, with logged runs on the{" "}
              <a href="/work" style={{ color: "var(--ink-primary)" }}>
                work page
              </a>
              . No client logos, because there are no clients yet. That is
              stated, not hidden.
            </p>
          </div>
        </section>

        <section style={{ paddingBottom: "clamp(3rem, 8vw, 6rem)" }}>
          <div className="mv-container" style={{ maxWidth: "76ch" }}>
            <Group label="Start here — audits" items={AUDITS} />
            <Group label="Builds" items={BUILDS} />
            <Group label="Retainers" items={RETAINERS} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
