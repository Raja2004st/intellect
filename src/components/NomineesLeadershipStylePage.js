import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import AutoPaginatedSections from "./AutoPaginatedSections";
import FeedbackCommonHeader from "./FeedbackCommonHeader";
import "../styles/nomineesLeadershipStylePage.scss";

ChartJS.register(ArcElement, Tooltip);

const Donut = ({ percent, color, badgePosition = "bottom" }) => {
  const pct = Number(percent);
  const safePct = Number.isFinite(pct) ? Math.max(0, Math.min(100, pct)) : 0;

  // const dottedRingPlugin = useMemo(() => {
  //   return {
  //     id: `dottedRing-${String(color)}`,
  //     afterDatasetDraw(chart) {
  //       const meta = chart.getDatasetMeta(0);
  //       const arcEl = meta?.data?.[0];
  //       const ctx = chart?.ctx;

  //       if (!ctx || !arcEl) return;

  //       const centerX = arcEl.x;
  //       const centerY = arcEl.y;
  //       const innerRadius = arcEl.innerRadius;
  //       const outerRadius = arcEl.outerRadius;

  //       if (
  //         !Number.isFinite(centerX) ||
  //         !Number.isFinite(centerY) ||
  //         !Number.isFinite(innerRadius) ||
  //         !Number.isFinite(outerRadius)
  //       ) {
  //         return;
  //       }

  //       const radius = (innerRadius + outerRadius) / 2;

  //       ctx.save();
  //       const ringWidth = Math.max(1, outerRadius - innerRadius);

  //       // Background ring (tinted)
  //       ctx.strokeStyle = color;
  //       ctx.globalAlpha = 0.12;
  //       ctx.lineWidth = ringWidth;
  //       ctx.setLineDash([]);

  //       ctx.beginPath();
  //       ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  //       ctx.stroke();

  //       // // Dotted ring (foreground)
  //       // ctx.strokeStyle = color;
  //       // ctx.globalAlpha = 0.45;
  //       // ctx.lineCap = "round";
  //       // ctx.setLineDash([1, 3]);

  //       // // Fill the full ring width with dotted lines (multiple concentric dotted circles)
  //       // const dottedLineWidth = Math.min(2, ringWidth);
  //       // const gapBetweenLines = Math.max(2, dottedLineWidth + 2);
  //       // ctx.lineWidth = dottedLineWidth;

  //       // const half = ringWidth / 2;
  //       // for (let offset = -half; offset <= half; offset += gapBetweenLines) {
  //       //   const r = radius + offset;
  //       //   if (!Number.isFinite(r) || r <= 0) continue;
  //       //   ctx.beginPath();
  //       //   ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
  //       //   ctx.stroke();
  //       // }
  //       // ctx.restore();
  //     },
  //   };
  // }, [color]);

  const dottedRingPlugin = useMemo(() => {
    return {
      id: `dottedRing-${String(color)}`,
      afterDatasetDraw(chart) {
        const meta = chart.getDatasetMeta(0);
        const arcEl = meta?.data?.[0];
        const ctx = chart?.ctx;

        if (!ctx || !arcEl) return;

        const centerX = arcEl.x;
        const centerY = arcEl.y;
        const innerRadius = arcEl.innerRadius;
        const outerRadius = arcEl.outerRadius;

        if (
          !Number.isFinite(centerX) ||
          !Number.isFinite(centerY) ||
          !Number.isFinite(innerRadius) ||
          !Number.isFinite(outerRadius)
        ) {
          return;
        }

        const radius = (innerRadius + outerRadius) / 2;
        const ringWidth = Math.max(1, outerRadius - innerRadius);

        ctx.save();

        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.12;
        ctx.lineWidth = ringWidth;
        ctx.setLineDash([1]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.imageSmoothingEnabled = false;
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = color;

        const dotSize = 1;
        const halfDot = dotSize / 2;

        const circumference = 2 * Math.PI * radius;

        const angularDots = Math.max(50, Math.floor(circumference / 7) + 100);
        const radialLayers = Math.max(3, Math.floor(ringWidth / 5) + 10);

        for (let layer = 0; layer < radialLayers; layer++) {
          const layerRadius =
            innerRadius + (ringWidth / (radialLayers - 1 || 1)) * layer;

          for (let i = 0; i < angularDots; i++) {
            const angle = (i * 2 * Math.PI) / angularDots;

            const x = centerX + layerRadius * Math.cos(angle);
            const y = centerY + layerRadius * Math.sin(angle);

            ctx.fillRect(x - halfDot, y - halfDot, dotSize, dotSize);
          }
        }

        ctx.restore();
      },
    };
  }, [color]);

  const data = {
    labels: ["Selected", "Remaining"],
    datasets: [
      {
        data: [safePct, 100 - safePct],
        backgroundColor: [color, "rgba(0,0,0,0.06)"],
        borderWidth: 0,
        hoverOffset: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "62%",
    rotation: 0,
    circumference: 360,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    animation: false,
  };

  return (
    <div className="nls-donut">
      <div className="nls-donut__canvas">
        <Doughnut data={data} options={options} plugins={[dottedRingPlugin]} />
      </div>
      <div
        className={`nls-donut__badge nls-donut__badge--${badgePosition}`}
        style={{ background: color }}
      >
        {Math.round(safePct)}%
      </div>
    </div>
  );
};

const NomineesLeadershipStylePage = ({
  title = "Nominee’s Leadership Style",
  items = [
    {
      percent: 91,
      color: "#ef4b3a",
      badgePosition: "bottom",
      pillText: "Good blend of task and relationship\n– 40 respondents",
      pillColor: "#ef4b3a",
    },
    {
      percent: 7,
      color: "#20c6a2",
      badgePosition: "top",
      pillText:
        "Too task focused and less relationship\noriented – 3 respondents",
      pillColor: "#20c6a2",
    },
    {
      percent: 2,
      color: "#3a9ad9",
      badgePosition: "top",
      pillText:
        "Too relationship oriented and less\ntask oriented – 1 Respondent",
      pillColor: "#3a9ad9",
    },
  ],
  adjectivesTitle = "Description of Workplace Culture - Frequently Mentioned Adjectives",
  adjectivesSubtitle = "(Adjectives that occur more than once)",
  adjectives = [
    { text: "Motivating", size: "lg" },
    { text: "Energetic", size: "lg" },
    { text: "Respectful", size: "lg" },
    { text: "Collaborative", size: "lg" },
    { text: "Supportive", size: "lg" },
    { text: "Enthusiastic", size: "md" },
    { text: "Flexible", size: "md" },
    { text: "Dynamic", size: "md" },
    { text: "Encouraging", size: "sm" },
    { text: "Organized", size: "sm" },
    { text: "Positive", size: "sm" },
    { text: "Empowering", size: "md" },
    { text: "Pleasant", size: "sm" },
    { text: "Good", size: "sm" },
    { text: "Inclusive", size: "sm" },
  ],
  footnote = "* This excludes self feedback ; The larger fonts indicate more number of responses",
}) => {
  const blocks = useMemo(() => {
    const out = [];

    out.push(
      <FeedbackCommonHeader
        key="nls-hdr"
        title={title}
        className="nls-header"
      />,
    );

    out.push(
      <div key="nls-main" className="nls-main">
        <div className="nls-charts">
          {items.map((it, idx) => (
            <div key={idx} className="nls-charts__col">
              <Donut
                percent={it.percent}
                color={it.color}
                badgePosition={it.badgePosition}
              />
            </div>
          ))}
        </div>

        <div className="nls-pills">
          {items.map((it, idx) => (
            <div
              key={idx}
              className="nls-pill"
              style={{ background: it.pillColor }}
            >
              {it.pillText}
            </div>
          ))}
        </div>
      </div>,
    );

    out.push(
      <div key="nls-adj" className="nls-adj">
        <div className="nls-adj__header">
          <div className="nls-adj__title">{adjectivesTitle}</div>
          <div className="nls-adj__subtitle">{adjectivesSubtitle}</div>
          <div className="nls-adj__underline" aria-hidden="true" />
        </div>

        <div className="nls-adj__grid">
          {adjectives.map((a, idx) => (
            <div
              key={`${a.text}-${idx}`}
              className={`nls-adj-card nls-adj-card--${a.size || "sm"}`.trim()}
            >
              {a.text}
            </div>
          ))}
        </div>

        <div className="nls-adj__footnote">{footnote}</div>
      </div>,
    );

    return out;
  }, [adjectives, adjectivesSubtitle, adjectivesTitle, footnote, items, title]);

  return (
    // <div className="section-page-container">
    <AutoPaginatedSections
      blocks={blocks}
      pageWidth={794}
      pageHeight={1123}
      pagePadding={0}
      contentClassName="nls-page"
      componentId="nominees-leadership-style"
    />
    // </div>
  );
};

export default NomineesLeadershipStylePage;
