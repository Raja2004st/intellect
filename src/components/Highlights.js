import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import Header from "./header";
import "../styles/mainPage.scss";
import "../styles/contentPage.scss";
import "../styles/highlights.scss";

const ChessIcon = ({ size = 120, color = "#0e4a2e" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill={color}>
      <path d="M46 16h36v8H46zM40 32h48v10H40zM36 50h56v14H36z" opacity="0.9" />
      <path d="M32 72h64v28H32z" opacity="0.9" />
      <path d="M24 102h80v14H24z" />
    </g>
  </svg>
);

const ScoreChip = ({ score = 2.5, color = "#c0943a", scoreShip = false }) => (
  <div className="hl-chip">{<span>{score}</span>}</div>
);

const LeftIcon = ({ leftIcon, arcColor }) => {
  if (!leftIcon) return null;
  if (typeof leftIcon === "string") {
    return <img src={leftIcon} alt="left" className="hl-left-img" />;
  }
  return leftIcon;
};

const Highlights = ({
  startPage = 45,
  pageWidth = 794,
  pageHeight = 802,
  pagePadding = 10,
  titleIndex = "",
  titleText = "",
  subIndex = "4.1.",
  subText = "Strengths",
  note = "Below are the top 5 statements where you received the highest ratings and are considered your key strengths.",
  arcColor = "var(--color-gold)",
  chipColor = "var(--color-gold)",
  dotsColor = "var(--color-gold)",
  leftIcon = null,
  scoreShip = false,
  items = [
    {
      score: 2.5,
      title: "Negotiation",
      desc: "Is flexible and works well in a fast paced and dynamic environment",
      circleX: 65,
    },
    {
      score: 2.5,
      title: "Negotiation",
      desc: "Is flexible and works well in a fast paced and dynamic environment",
      circleX: 95,
    },
    {
      score: 2.5,
      title: "Negotiation",
      desc: "Is flexible and works well in a fast paced and dynamic environment",
      circleX: 135,
    },
    {
      score: 2.5,
      title: "Negotiation",
      desc: "Is flexible and works well in a fast paced and dynamic environment",
      circleX: 95,
    },
    {
      score: 2.5,
      title: "Negotiation",
      desc: "Is flexible and works well in a fast paced and dynamic environment",
      circleX: 65,
    },
    
  ],
}) => {
  const blocks = useMemo(() => {
    const out = [];
    const rowSpacing = 90; // px between rows to align with arc dots
    const topOffset = 50; // starting Y for first dot
    const arcHeight = topOffset * 2 + (items.length - 1) * rowSpacing + 160;

    // Title
    if (titleIndex && titleText) {
      out.push(
        <h2 key="title" className="content-page__title hl-title">
          <span className="content-page__title-index">{titleIndex}</span>
          <span className="content-page__title-text">{titleText}</span>
        </h2>
      );
    }

    out.push(
      <h3 key="subtitle" className="content-page__subtitle hl-subtitle">
        <span className="hl-subtitle__index">{subIndex}</span>
        <span>{subText}</span>
      </h3>
    );

    out.push(
      <div key="note" className="hl-note">
        <em className="hl-note__em">{note}</em>
      </div>
    );

    out.push(
      <div
        key="grid"
        className="hl-grid"
        style={{
          "--arc-color": arcColor,
          "--chip-color": chipColor,
        }}
      >
        <div className="hl-left" style={{ minHeight: arcHeight }}>
          <svg
            className="hl-arc"
            viewBox={`0 0 200 ${arcHeight}`}
            preserveAspectRatio="none"
          >
            <path
              d={`M20 0 C 160 ${Math.round(arcHeight * 0.23)}, 160 ${Math.round(
                arcHeight * 0.77
              )}, 20 ${arcHeight}`}
              stroke={arcColor}
              strokeWidth="3.0"
              fill="none"
              strokeLinecap="round"
            />
            {items.map((_, i) => (
              <circle
                key={i}
                cx={
                  i == 0 ? 59 : i == 1 ? 110 : i == 2 ? 124 : i == 3 ? 110 : 59
                }
                cy={topOffset + i * rowSpacing + i * 40}
                r={8}
                fill={arcColor}
              />
            ))}
          </svg>
          {leftIcon && (
            <div className="hl-chess">
              <LeftIcon leftIcon={leftIcon} arcColor={arcColor} />
            </div>
          )}
        </div>
        <div className="hl-right">
          {items.map((it, i) => (
            <div key={`it-${i}`} className="hl-row">
              <div
                className="hl-row-line"
                style={{
                  width:
                    i === 0 || i === 4 ? 126 : i === 1 || i === 3 ? 82 : 65,
                  left:
                    i === 0 || i === 4 ? -133 : i === 1 || i === 3 ? -88 : -71,
                }}
              />
              <ScoreChip
                score={it.score}
                color={chipColor}
                scoreShip={scoreShip}
              />
              <div className="hl-row-text">
                <div className="hl-row-title">{it.title}</div>
                <div className="hl-row-desc">{it.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    return out;
  }, [
    titleIndex,
    titleText,
    subIndex,
    subText,
    note,
    items,
    arcColor,
    chipColor,
    dotsColor,
    leftIcon,
  ]);

  return (
    <AutoPaginatedSections
      blocks={blocks}
      startPage={startPage}
      HeaderComponent={Header}
      contentClassName="content-page"
    />
  );
};

export default Highlights;
