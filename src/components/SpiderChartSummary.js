import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import Header from "./header";
import "../styles/mainPage.scss";
import "../styles/contentPage.scss";

const categoriesDefault = [
  "Leadership",
  "Bandwidth",
  "Sales and Customer Centricity",
  "Collaboration",
  "Operational Excellence",
  "Results Orientation",
  "Expertise and Communication",
];

function polarToCartesian(angle, radius) {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return [x, y];
}

function RadarGrid({ size = 420, levels = 5, spokes = 7 }) {
  const R = size / 2;
  const step = R / levels;
  const center = { x: 0, y: 0 };
  const angleStep = (2 * Math.PI) / spokes;

  return (
    <g transform={`translate(${R}, ${R})`}>
      {Array.from({ length: levels }, (_, i) => {
        const r = step * (i + 1);
        const points = Array.from({ length: spokes }, (_, s) => {
          const a = -Math.PI / 2 + s * angleStep; // start at top
          const [x, y] = polarToCartesian(a, r);
          return `${x},${y}`;
        }).join(" ");
        return (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="#d9d9d9"
            strokeWidth={1}
          />
        );
      })}
      {Array.from({ length: spokes }, (_, s) => {
        const a = -Math.PI / 2 + s * angleStep;
        const [x, y] = polarToCartesian(a, R);
        return (
          <line
            key={`spoke-${s}`}
            x1={center.x}
            y1={center.y}
            x2={x}
            y2={y}
            stroke="#e6e6e6"
            strokeWidth={1}
          />
        );
      })}
    </g>
  );
}

function RadarSeries({ size = 420, values = [], max = 5, color = "#0e4a2e" }) {
  const R = size / 2;
  const spokes = values.length;
  const angleStep = (2 * Math.PI) / spokes;

  const pathD =
    values
      .map((v, i) => {
        const pct = Math.max(0, Math.min(1, v / max));
        const r = pct * R;
        const a = -Math.PI / 2 + i * angleStep;
        const [x, y] = polarToCartesian(a, r);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ") + " Z";

  return (
    <g transform={`translate(${R}, ${R})`}>
      <path d={pathD} fill="none" stroke={color} strokeWidth={3} />
    </g>
  );
}

function RadarLabels({ size = 420, labels = [] }) {
  const R = size / 2;
  const angleStep = (2 * Math.PI) / labels.length;
  const labelRadius = R + 26;

  return (
    <g transform={`translate(${R}, ${R})`} fontSize={12} fill="#222">
      {labels.map((lab, i) => {
        const a = -Math.PI / 2 + i * angleStep;
        const [x, y] = polarToCartesian(a, labelRadius);
        const anchor =
          Math.abs(Math.cos(a)) < 0.3
            ? "middle"
            : Math.cos(a) > 0
            ? "start"
            : "end";
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor={anchor}
            alignmentBaseline="middle"
          >
            {lab}
          </text>
        );
      })}
    </g>
  );
}

const Legend = () => (
  <div
    style={{
      position: "absolute",
      top: 110,
      right: 58,
      background: "#f3f3f3",
      padding: "12px 16px",
      borderRadius: 2,
    }}
  >
    <div style={{ fontSize: 13, marginBottom: 6, fontWeight: 600 }}>Legend</div>
    {[
      { label: "Self", color: "#caa785" },
      { label: "Manager", color: "#0e4a2e" },
      { label: "Others", color: "#b8860b" },
    ].map((it) => (
      <div
        key={it.label}
        style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}
      >
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            background: it.color,
            borderRadius: 2,
          }}
        />
        <span style={{ fontSize: 13 }}>{it.label}</span>
      </div>
    ))}
  </div>
);

const SpiderChartSummary = ({
  startPage = 14,
  pageWidth = 794,
  pageHeight = 1123,
  pagePadding = 10,
  categories = categoriesDefault,
  self = [4.0, 3.0, 3.5, 2.0, 3.0, 3.5, 3.1],
  manager = [4.5, 3.8, 4.0, 3.0, 3.0, 4.0, 4.0],
  others = [4.2, 4.0, 4.1, 4.0, 3.0, 4.0, 3.8],
}) => {
  const size = 460;

  const blocks = useMemo(() => {
    const out = [];

    out.push(
      <h2
        key="title"
        className="content-page__title"
        style={{ color: "#0e4a2e" }}
      >
        <span className="content-page__title-index">2.3.</span>
        <span className="content-page__title-text">
          LBSCORE Element Summary – Spider Chart
        </span>
      </h2>
    );

    out.push(
      <div key="desc" style={{ marginTop: 10, color: "#222" }}>
        <p style={{ lineHeight: 1.55 }}>
          The spider chart below plots each of the seven LBSCORE elements —
          Leadership, Bandwidth, Sales & Customer Centricity, Collaboration,
          Operational Excellence, Results Orientation, and Expertise &
          Communication — along separate spokes. For every spoke you'll see a
          coloured line for each rater group - Self, Manager(s), and Others
          [Team Member(s) and Peer(s)].
        </p>
        <ol style={{ marginTop: 12, paddingLeft: 20, lineHeight: 1.6 }}>
          <li>
            <strong>Quick-gap spotting:</strong> Diverging shapes make it easy
            to see where your own view or one rater group's perception differs
            from the rest.
          </li>
          <li style={{ marginTop: 10 }}>
            <strong>Score direction:</strong> Points closer to the outer rim
            indicate more consistent demonstration of the behaviour; points
            nearer the hub show less frequent or less visible practice.
          </li>
          <li style={{ marginTop: 10 }}>
            <strong>Action cues:</strong> Look for spokes where the lines pull
            inward or spread widely apart — these highlight the priority gaps to
            address in your development plan.
          </li>
        </ol>
      </div>
    );

    out.push(
      <div key="chartwrap" style={{ position: "relative", marginTop: 12 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <svg
            width={size}
            height={size}
            role="img"
            aria-label="LBSCORE spider chart"
          >
            <RadarGrid size={size} levels={5} spokes={categories.length} />
            <RadarLabels size={size} labels={categories} />
            {/* Series order: Self (tan), Manager (dark green), Others (golden) */}
            <RadarSeries size={size} values={self} color="#caa785" />
            <RadarSeries size={size} values={manager} color="#0e4a2e" />
            <RadarSeries size={size} values={others} color="#b8860b" />
          </svg>
        </div>
        <Legend />
      </div>
    );

    return out;
  }, [categories, self, manager, others]);

  return (
    <AutoPaginatedSections
      blocks={blocks}
      startPage={startPage}
      pageWidth={pageWidth}
      pageHeight={pageHeight}
      pagePadding={pagePadding}
      HeaderComponent={Header}
      contentClassName="content-page"
    />
  );
};

export default SpiderChartSummary;
