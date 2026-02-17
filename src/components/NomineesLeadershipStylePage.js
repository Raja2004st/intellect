import React, { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import AutoPaginatedSections from "./AutoPaginatedSections";
import FeedbackCommonHeader from "./FeedbackCommonHeader";
import "../styles/nomineesLeadershipStylePage.scss";

ChartJS.register(ArcElement, Tooltip);

const Donut = ({ percent, color }) => {
  const pct = Number(percent);
  const safePct = Number.isFinite(pct) ? Math.max(0, Math.min(100, pct)) : 0;



//   const dottedRingPlugin = {
//   id: "dottedPattern",

//   beforeDraw(chart) {
//     const { ctx } = chart;

//     const meta = chart.getDatasetMeta(0);
//     const arc = meta?.data?.[0];

//     if (!arc) return;

//     const centerX = arc.x;
//     const centerY = arc.y;

//     const innerRadius = arc.innerRadius;
//     const outerRadius = arc.outerRadius;

//     const patternCanvas = document.createElement("canvas");
//     patternCanvas.width = 4;
//     patternCanvas.height = 4;

//     const pctx = patternCanvas.getContext("2d");

//     pctx.fillStyle = color;

//     pctx.beginPath();
//     pctx.arc(3, 3, 1, 0, Math.PI * 2);
//     pctx.fill();

//     const pattern = ctx.createPattern(patternCanvas, "repeat");

//     ctx.save();
//     ctx.fillStyle = pattern;

//     ctx.beginPath();
//     ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
//     ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2, true);
//     ctx.closePath();

//     ctx.fill();
//     ctx.restore();
//   },
// };

const dottedRingPlugin = {
  id: "dottedPattern",

  beforeDraw(chart) {
    const { ctx } = chart;
    const meta = chart.getDatasetMeta(0);
    const arc = meta?.data?.[0];

    if (!arc) return;

    const centerX = arc.x;
    const centerY = arc.y;

    const innerRadius = arc.innerRadius;
    const outerRadius = arc.outerRadius;

    const dotRadius = 1;   
    const dotGap = 4;       
    const dotColor = color;

    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = dotGap;
    patternCanvas.height = dotGap;

    const pctx = patternCanvas.getContext("2d");

    pctx.fillStyle = dotColor;
    pctx.beginPath();
    pctx.arc(dotGap / 2, dotGap / 2, dotRadius, 0, Math.PI * 2);
    pctx.fill();

    const pattern = ctx.createPattern(patternCanvas, "repeat");

    ctx.save();
    ctx.fillStyle = pattern;

    ctx.beginPath();

    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);

    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2, true);

    ctx.closePath();
    ctx.fill();

    ctx.restore();
  },
};



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
    cutout: "52%",
    rotation: 0,
    circumference: 360,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    animation: false,
  };

  const startAngleDeg = -90;
  const filledAngleDeg = (safePct / 100) * 360;
  const middleAngleDeg = startAngleDeg + filledAngleDeg / 2;
  const angleRad = (middleAngleDeg * Math.PI) / 180 ;


  const badgeRadiusPx = 60;

  const badgeStyle = {
    background: color,
    left: `calc(50% + ${badgeRadiusPx * Math.cos(angleRad)}px)`,
    top: `calc(50% + ${badgeRadiusPx * Math.sin(angleRad) - 5}px)`,
  };

  return (
    <div className="nls-donut">
      <div className="nls-donut__canvas">
        <Doughnut data={data} options={options} plugins={[dottedRingPlugin]} />
      </div>
      <div className="nls-donut__badge" style={badgeStyle}>
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
      percent: 77,
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
