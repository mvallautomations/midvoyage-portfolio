"use client";

// Replays logged n8n executions — real decision paths, real outputs, real
// latency, straight from evidence/runs.json (copied to src/data/demo-runs).
// The animation runs at 1:1 with the logged wall-clock time: a 3.53s run
// takes 3.53s to replay. Honesty is the feature.

import { useEffect, useRef, useState } from "react";
import type { ReplayRun } from "@/lib/demo-adapters";

const mono: React.CSSProperties = {
  fontFamily: "var(--font-jetbrains)",
  fontWeight: 500,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
};

export default function RunReplay({ runs }: { runs: ReplayRun[] }) {
  const [selected, setSelected] = useState(0);
  const [playToken, setPlayToken] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const frameRef = useRef<number>(0);

  const run = runs[selected];

  // Event handlers reset the counters; the effect below only drives
  // requestAnimationFrame, so every setState happens inside an async
  // frame callback rather than synchronously in the effect body.
  const restart = () => {
    setVisibleSteps(0);
    setElapsed(0);
    setDone(false);
    setPlayToken((t) => t + 1);
  };

  const selectRun = (i: number) => {
    setSelected(i);
    setVisibleSteps(0);
    setElapsed(0);
    setDone(false);
    setPlayToken((t) => t + 1);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const durationMs = run.latencySeconds * 1000;
    let start: number | null = null;

    const tick = (now: number) => {
      if (reduceMotion) {
        setVisibleSteps(run.steps.length);
        setElapsed(run.latencySeconds);
        setDone(true);
        return;
      }
      if (start === null) start = now;
      const t = Math.min(now - start, durationMs);
      setElapsed(t / 1000);
      setVisibleSteps(Math.ceil((t / durationMs) * run.steps.length));
      if (t < durationMs) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [run, playToken]);

  return (
    <div
      style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border-light)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* Header: eyebrow + run tabs */}
      <div
        style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <p style={{ ...mono, fontSize: "0.7rem", color: "var(--accent-terra)", margin: 0 }}>
          Replay of logged execution #{run.id} — {run.latencySeconds.toFixed(2)}s actual
        </p>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {runs.map((r, i) => (
            <button
              key={r.id}
              onClick={() => selectRun(i)}
              style={{
                ...mono,
                fontSize: "0.7rem",
                padding: "0.3rem 0.6rem",
                borderRadius: "3px",
                border:
                  i === selected
                    ? "1px solid var(--border-medium)"
                    : "1px solid var(--border-subtle)",
                color: i === selected ? "var(--ink-primary)" : "var(--ink-muted)",
                backgroundColor:
                  i === selected ? "var(--bg-elevated)" : "transparent",
                cursor: "pointer",
              }}
            >
              #{r.id}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "1.5rem", display: "grid", gap: "1.25rem" }}>
        {/* Context facts */}
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {run.context.map((c) => (
            <div key={c.label} style={{ minWidth: 0 }}>
              <p
                style={{
                  ...mono,
                  fontSize: "0.65rem",
                  color: "var(--ink-muted)",
                  margin: "0 0 0.25rem",
                }}
              >
                {c.label}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "0.9rem",
                  color: "var(--ink-primary)",
                  margin: 0,
                  overflowWrap: "anywhere",
                }}
              >
                {c.value}
              </p>
            </div>
          ))}
        </div>

        {/* Execution log */}
        <div
          style={{
            backgroundColor: "var(--bg-invert)",
            borderRadius: "6px",
            padding: "1rem 1.25rem",
            minHeight: `${run.steps.length * 1.7 + 2.2}em`,
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
              n8n execution log
            </span>
            <span
              style={{
                ...mono,
                fontSize: "0.65rem",
                color: done
                  ? run.status === "success"
                    ? "var(--accent-sage)"
                    : "var(--accent-terra)"
                  : "var(--ink-muted)",
              }}
            >
              {elapsed.toFixed(2)}s{done ? ` · ${run.status}` : "…"}
            </span>
          </div>
          {run.steps.slice(0, visibleSteps).map((step, i) => (
            <p
              key={`${run.id}-${i}`}
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.78rem",
                lineHeight: 1.7,
                color: "var(--ink-invert)",
                margin: 0,
                overflowWrap: "anywhere",
              }}
            >
              <span style={{ color: "var(--ink-muted)" }}>{String(i + 1).padStart(2, "0")} </span>
              {step}
            </p>
          ))}
        </div>

        {/* Decision + outputs appear when the replay completes */}
        <div
          style={{
            opacity: done ? 1 : 0,
            transform: done ? "none" : "translateY(6px)",
            transition: "opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
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
              Decision · {run.decision.label}
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
              {run.decision.detail}
            </p>
          </div>

          {run.outputs.map((o) => (
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
                  maxHeight: "16rem",
                  overflowY: "auto",
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

          {run.note && (
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
              {run.note}
            </p>
          )}

          <div>
            <button
              onClick={restart}
              style={{
                ...mono,
                fontSize: "0.7rem",
                padding: "0.5rem 0.9rem",
                borderRadius: "3px",
                border: "1px solid var(--border-medium)",
                color: "var(--ink-primary)",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              Replay run
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
