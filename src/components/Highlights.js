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

const ScoreChip = ({ score = 2.5, color = "#0e4a2e" }) => (
  <div className="hl-chip" style={{ background: color }}>
    {/* <span>{score}</span> */}
  </div>
);

const LeftIcon = ({ leftIcon, arcColor }) => {
  if (!leftIcon) return null;
  if (typeof leftIcon === "string") {
    return (
      <img
        src={leftIcon}
        alt="left"
        style={{
          width: 120,
          height: 120,
          objectFit: "contain",
          filter: arcColor ? undefined : undefined,
        }}
      />
    );
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
  arcColor = "#0e4a2e",
  chipColor = "#0e4a2e",
  dotsColor = "#0e4a2e",
  leftIcon = null,
  items = [
    {
      score: 2.5,
      title: "Negotiation",
      desc: "Is flexible and works well in a fast paced and dynamic environment",
    },
    {
      score: 2.5,
      title: "Negotiation",
      desc: "Is flexible and works well in a fast paced and dynamic environment",
    },
    {
      score: 2.5,
      title: "Negotiation",
      desc: "Is flexible and works well in a fast paced and dynamic environment",
    },
    {
      score: 2.5,
      title: "Negotiation",
      desc: "Is flexible and works well in a fast paced and dynamic environment",
    },
    {
      score: 2.5,
      title: "Negotiation",
      desc: "Is flexible and works well in a fast paced and dynamic environment",
    },
  ],
}) => {
  const blocks = useMemo(() => {
    const out = [];

    // Title
    if (titleIndex && titleText) {
      out.push(
        <h2
          key="title"
          className="content-page__title"
          style={{ color: "#0e4a2e" }}
        >
          <span className="content-page__title-index">{titleIndex}</span>
          <span className="content-page__title-text">{titleText}</span>
        </h2>
      );
    }

    out.push(
      <h3
        key="subtitle"
        className="content-page__subtitle"
        style={{ color: "#0e4a2e", marginTop: 8 }}
      >
        <span style={{ marginRight: 8 }}>{subIndex}</span>
        <span>{subText}</span>
      </h3>
    );

    out.push(
      <div
        key="note"
        style={{ marginTop: 10, color: "#333", marginBottom: 36 }}
      >
        <em style={{ fontSize: 13 }}>{note}</em>
      </div>
    );

    // Layout grid
    out.push(
      <div key="grid" className="hl-grid">
        <div className="hl-left">
          <svg
            className="hl-arc"
            viewBox="0 0 200 520"
            preserveAspectRatio="none"
          >
            <path
              d={`M180 0 C 40 120, 40 400, 180 520`}
              stroke={arcColor}
              strokeWidth="6"
              fill="none"
            />
            {items.map((_, i) => (
              <circle
                key={i}
                cx={140}
                cy={50 + i * 90}
                r={8}
                fill={dotsColor}
              />
            ))}
          </svg>
          <div className="hl-chess">
            <LeftIcon leftIcon={leftIcon} arcColor={arcColor} />
          </div>
        </div>
        <div className="hl-right">
          {items.map((it, i) => (
            <div key={`it-${i}`} className="hl-row">
              <div className="hl-row-line" style={{ background: arcColor }} />
              <ScoreChip score={it.score} color={chipColor} />
              <div className="hl-row-text">
                <div className="hl-row-title" style={{ color: arcColor }}>
                  {it.title}
                </div>
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
      pageWidth={pageWidth}
      pageHeight={pageHeight}
      pagePadding={pagePadding}
      HeaderComponent={Header}
      contentClassName="content-page"
    />
  );
};

export default Highlights;
