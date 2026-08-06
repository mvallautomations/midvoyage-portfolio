"use client";

// Interactive simulation: the visitor picks a fictional sample input and
// watches it routed by the SAME rules the live agent enforces in code.
// Labeled "Simulation" throughout — the receipts (RunReplay, below it on
// the page) carry the real logged executions. Never blur that line.

import { useEffect, useRef, useState } from "react";
import type { SimConfig } from "@/lib/simulator-configs";

const SIM_DURATION_MS = 1800;

const mono: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains)",
  fontWeight: 500,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

export default function AgentSimulator({ config }: { config: SimConfig }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [playToken, setPlayToken] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [done, setDone] = useState(false);
  const frameRef = useRef<number>(0);

  const sample = selected === null ? null : config.samples[selected];

  const runSample = (i: number) => {
    setSelected(i);
    setVisibleSteps(0);
    setDone(false);
    setPlayToken((t) => t + 1);
  };

  useEffect(() => {
    if (selected === null) return;
    const steps = config.samples[selected].steps.length;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let start: number | null = null;

    const tick = (now: number) => {
      if (reduceMotion) {
        setVisibleSteps(steps);
        setDone(true);
        return;
      }
      if (start === null) start = now;
      const t = Math.min(now - start, SIM_DURATION_MS);
      setVisibleSteps(Math.ceil((t / SIM_DURATION_MS) * steps));
      if (t < SIM_DURATION_MS) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [selected, playToken, config.samples]);

  return (
    <div
      style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border-light)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <p
          style={{
            ...mono,
            fontSize: "0.7rem",
            color: "var(--accent-terra)",
            margin: "0 0 0.4rem",
          }}
        >
          Simulation — same rules, sample inputs
        </p>
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.875rem",
            lineHeight: 1.6,
            color: "var(--ink-secondary)",
            margin: 0,
          }}
        >
          Pick a sample. The inputs are fictional; the routing rules are the
          ones the live agent enforces in code, and the live agent averages{" "}
          {config.avgSeconds.toFixed(2)}s per run.
        </p>
      </div>

      <div style={{ padding: "1.5rem", display: "grid", gap: "1.25rem" }}>
        {/* Sample chips */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {config.samples.map((s, i) => (
            <button
              key={s.label}
              onClick={() => runSample(i)}
              style={{
                ...mono,
                fontSize: "0.7rem",
                padding: "0.45rem 0.75rem",
                borderRadius: "3px",
                border:
                  i === selected
                    ? "1px solid var(--border-medium)"
                    : "1px solid var(--border-subtle)",
                color: i === selected ? "var(--ink-primary)" : "var(--ink-secondary)",
                backgroundColor:
                  i === selected ? "var(--bg-elevated)" : "transparent",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {sample === null ? (
          /* The coded rules, shown until a sample is picked */
          <div>
            <p
              style={{
                ...mono,
                fontSize: "0.65rem",
                color: "var(--ink-muted)",
                margin: "0 0 0.5rem",
              }}
            >
              {config.rulesTitle}
            </p>
            <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
              {config.rules.map((rule) => (
                <li
                  key={rule}
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.875rem",
                    lineHeight: 1.7,
                    color: "var(--ink-secondary)",
                  }}
                >
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            {/* Submitted input */}
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {sample.input.map((f) => (
                <div key={f.label}>
                  <p
                    style={{
                      ...mono,
                      fontSize: "0.65rem",
                      color: "var(--ink-muted)",
                      margin: "0 0 0.25rem",
                    }}
                  >
                    {f.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      color: "var(--ink-primary)",
                      margin: 0,
                    }}
                  >
                    {f.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Simulated routing log */}
            <div
              style={{
                backgroundColor: "var(--bg-invert)",
                borderRadius: "6px",
                padding: "1rem 1.25rem",
                minHeight: `${sample.steps.length * 1.7 + 2.2}em`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.6rem",
                }}
              >
                <span style={{ ...mono, fontSize: "0.65rem", color: "var(--ink-muted)" }}>
                  Simulated routing
                </span>
                <span
                  style={{
                    ...mono,
                    fontSize: "0.65rem",
                    color: done ? "var(--accent-sage)" : "var(--ink-muted)",
                  }}
                >
                  {done ? "routed" : "…"}
                </span>
              </div>
              {sample.steps.slice(0, visibleSteps).map((step, i) => (
                <p
                  key={`${selected}-${i}`}
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "0.78rem",
                    lineHeight: 1.7,
                    color: "var(--ink-invert)",
                    margin: 0,
                    overflowWrap: "anywhere",
                  }}
                >
                  <span style={{ color: "var(--ink-muted)" }}>
                    {String(i + 1).padStart(2, "0")}{" "}
                  </span>
                  {step}
                </p>
              ))}
            </div>

            {/* Verdict */}
            <div
              style={{
                opacity: done ? 1 : 0,
                transform: done ? "none" : "translateY(6px)",
                transition:
                  "opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
                display: "grid",
                gap: "1.25rem",
              }}
            >
              <div>
                <p
                  style={{
                    ...mono,
                    fontSize: "0.65rem",
                    color: "var(--accent-terra)",
                    margin: "0 0 0.35rem",
                  }}
                >
                  Decision · {sample.decision.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    color: "var(--ink-secondary)",
                    margin: 0,
                  }}
                >
                  {sample.decision.detail}
                </p>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  color: "var(--ink-secondary)",
                  borderLeft: "2px solid var(--border-medium)",
                  paddingLeft: "0.85rem",
                  margin: 0,
                }}
              >
                Rule: {sample.ruleFired}
              </p>

              {sample.outputs.map((o) => (
                <div key={o.label}>
                  <p
                    style={{
                      ...mono,
                      fontSize: "0.65rem",
                      color: "var(--ink-muted)",
                      margin: "0 0 0.35rem",
                    }}
                  >
                    {o.label}
                  </p>
                  <div
                    style={{
                      backgroundColor: "var(--bg-elevated)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "6px",
                      padding: "0.85rem 1rem",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "0.875rem",
                        lineHeight: 1.65,
                        color: "var(--ink-primary)",
                        whiteSpace: "pre-wrap",
                        margin: 0,
                      }}
                    >
                      {o.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
