import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import Header from "./header";
import "../styles/mainPage.scss";
import "../styles/contentPage.scss";
import "../styles/blindSpots.scss";

const ScoreChip = ({ score = 2.5, scoreShip = false }) => (
  <div className="bs-chip">{scoreShip && <span>{score}</span>}</div>
);

const LeftIcon = ({ leftIcon }) => {
  if (!leftIcon) return null;
  if (typeof leftIcon === "string")
    return <img src={leftIcon} alt="left" className="bs-left-img" />;
  return leftIcon;
};

const RatingBars = ({ self = 4, others = 2 }) => {
  const max = 5;
  const selfPct = Math.max(0, Math.min(100, (self / max) * 100));
  const othersPct = Math.max(0, Math.min(100, (others / max) * 100));
  const colorPicker = ["#0e4a2e", "#b37b2f", "#b8860b", "#a9d0b8", "#b3792e"];
  return (
    <div className="bs-bars-row">
      {/* Left: Others green bar with centered value */}
      <div className="bs-left-others">
        <div className="bs-bar others">
          <div
            className="bs-fill others"
            style={{ width: `${selfPct}%`, background: colorPicker[self - 1] }}
          />
          <span className="bs-value others">{self}</span>
        </div>
      </div>
      {/* Center label */}
      <span className="bs-center-label">Others</span>
      {/* Right: Your Rating gold chip + grey bar */}
      <div className="bs-bar others">
        <div
          className="bs-fill others"
          style={{
            width: `${othersPct}%`,
            background: colorPicker[others - 1],
          }}
        />
        <span className="bs-value others">{others}</span>-{" "}
      </div>
    </div>
  );
};

const BlindSpots = ({
  startPage = 48,
  titleIndex = "4.4.",
  titleText = "Blind Spots",
  description = "Blind Spots are behaviours/ competencies where you have rated yourself higher than others with a difference of ≥ 0.5 between your self-rating and the rating given by others. These are highlighted only when self-rating is ≥3.5, indicating areas where you may be overestimating your effectiveness compared to how others experience you. Only the top 5 statements with the largest rating gaps are indicated.",
  arcColor = "#b37b2f",
  chipColor = "#b37b2f",
  leftIcon = null,
  scoreShip = false,
  items = [
    { score: 2.5, text: "Text", self: 4, others: 2 },
    { score: 2.5, text: "Text", self: 4, others: 2 },
    { score: 2.5, text: "Text", self: 4, others: 2 },
    { score: 2.5, text: "Text", self: 4, others: 2 },
    { score: 2.5, text: "Text", self: 4, others: 2 },
  ],
}) => {
  const blocks = useMemo(() => {
    const out = [];

    const rowSpacing = 100;
    const topOffset = 70;
    const arcHeight = topOffset * 2 + (items.length - 1) * rowSpacing + 160;

    out.push(
      <h2 key="title" className="content-page__title bs-title">
        <span className="content-page__title-index">{titleIndex}</span>
        <span className="content-page__title-text">{titleText}</span>
      </h2>
    );

    out.push(
      <div key="desc" className="bs-desc">
        <p>
          <strong>Blind Spots</strong> {description}
        </p>
      </div>
    );

    out.push(
      <div
        key="grid"
        className="bs-grid"
        style={{ "--bs-arc": arcColor, "--bs-chip": chipColor }}
      >
        <div className="bs-left" style={{ minHeight: arcHeight }}>
          <svg
            className="bs-arc"
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
            {items.map((it, i) => (
              <circle
                key={i}
                cx={
                  i == 0 ? 65 : i == 1 ? 110 : i == 2 ? 124 : i == 3 ? 110 : 65
                }
                cy={topOffset + i * rowSpacing + i * 40}
                r={8}
                fill={arcColor}
              />
            ))}
          </svg>
          {leftIcon && (
            <div className="bs-left-icon">
              <div className="bs-left-icon-card">
                <LeftIcon leftIcon={leftIcon} />
              </div>
            </div>
          )}
        </div>
        <div className="bs-right">
          {items.map((it, i) => (
            <div key={`row-${i}`} className="bs-row">
              <div
                className="bs-connector"
                style={{
                  width:
                    i === 0 || i === 4 ? 126 : i === 1 || i === 3 ? 82 : 65,
                  left:
                    i === 0 || i === 4 ? -133 : i === 1 || i === 3 ? -88 : -71,
                }}
              />
              <ScoreChip score={it.score} scoreShip={scoreShip} />
              <div className="bs-row-main">
                <div className="bs-row-top">
                  <div className="bs-row-title">Your Rating</div>
                  <RatingBars self={it.self} others={it.others} />
                </div>
                <div className="bs-row-text">{it.text}</div>
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
    description,
    items,
    arcColor,
    chipColor,
    leftIcon,
  ]);

  return (
    <AutoPaginatedSections
      startPage={startPage}
      blocks={blocks}
      pageHeight={1000}
      HeaderComponent={Header}
      contentClassName="content-page"
    />
  );
};

export default BlindSpots;
