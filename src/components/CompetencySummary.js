import React, { useMemo, useState } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import Header from "./header";
import ReportInfoTable from "./reportInfoTable";
import QuartilePositionCard from "./QuartilePositionCard";
import "../styles/mainPage.scss";
import "../styles/contentPage.scss";
import "../styles/competencySummary.scss";

const Gauge = ({ score = 383, max = 500, size = 240 }) => {
  const center = size / 2;
  const stroke = 16;
  const radius = center - stroke / 2 - 4; // small inset to avoid clipping
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(1, Math.max(0, score / max));
  const dash = circ * pct;
  const gap = circ - dash;

  return (
    <svg
      className="gauge"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label="overall score gauge"
    >
      <defs>
        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0e4a2e" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1a6b48" stopOpacity="1" />
        </linearGradient>
        <filter id="gaugeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="2"
            floodColor="rgba(0,0,0,0.25)"
          />
        </filter>
      </defs>

      {/* Track */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#e6efe9"
        strokeWidth={stroke}
        fill="none"
      />

      {/* Progress arc with gradient + shadow */}
      <circle
        className="gauge__progress"
        cx={center}
        cy={center}
        r={radius}
        stroke="url(#gaugeGradient)"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={`${dash} ${gap}`}
        transform={`rotate(-90 ${center} ${center})`}
        strokeLinecap="round"
      />

      {/* Center disc */}
      <circle cx={center} cy={center} r={radius - stroke - 6} fill="#0e4a2e" />

      {/* Score */}
      <text
        className="gauge__score"
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={Math.round(size * 0.185)}
        fontWeight="700"
        fill="#fff"
      >
        {score}
      </text>
    </svg>
  );
};

const CompetencySummary = ({
  startPage = 12,
  pageWidth = 794,
  pageHeight = 842,
  pagePadding = 10,
  cohortQuartiles,
  streamQuartiles,
}) => {
  const cohortRows = useMemo(
    () => [
      { label: "Score", value: "283.0", extra: "" },
      { label: "First quartile (25th percentile)", value: "365.5", extra: "" },
      { label: "Median value (50th percentile)", value: "393.5", extra: "" },
      { label: "Third quartile (75th percentile)", value: "425.5", extra: "" },
      { label: "Max Score", value: "483.0", extra: "" },
    ],
    []
  );

  const streamRows = cohortRows;

  const defaultCohortMap = useMemo(
    () => ({
      1: ["250.0", "340.0", "370.0", "400.0", "480.0"],
      2: ["283.0", "365.5", "393.5", "425.5", "483.0"],
      3: ["310.0", "380.0", "405.0", "440.0", "490.0"],
      4: ["335.0", "395.0", "415.0", "455.0", "500.0"],
    }),
    []
  );
  const defaultStreamMap = useMemo(
    () => ({
      1: ["245.0", "338.0", "368.0", "398.0", "478.0"],
      2: ["283.0", "365.5", "393.5", "425.5", "483.0"],
      3: ["305.0", "378.0", "402.0", "438.0", "488.0"],
      4: ["330.0", "392.0", "412.0", "452.0", "498.0"],
    }),
    []
  );

  const [cohortMap, setCohortMap] = useState(defaultCohortMap);
  const [streamMap, setStreamMap] = useState(defaultStreamMap);

  // console.log(cohortMap, streamMap);
  const handleCohortChange = (quartile, index, value) => {
    setCohortMap((prev) => ({
      ...prev,
      [quartile]: prev[quartile].map((v, i) => (i === index ? value : v)),
    }));
  };

  const handleStreamChange = (quartile, index, value) => {
    setStreamMap((prev) => ({
      ...prev,
      [quartile]: prev[quartile].map((v, i) => (i === index ? value : v)),
    }));
  };

  const blocks = useMemo(() => {
    const out = [];

    out.push(
      <h2 key="title" className="content-page__title cs-title">
        <span className="content-page__title-index">2.</span>
        <span className="content-page__title-text">Competency Summary</span>
      </h2>
    );

    out.push(
      <div key="overall" className="cs-overall">
        <h3 className="about-subtitle cs-overall__subtitle">
          2.1. Your Overall Score
        </h3>
        <div className="cs-overall__note">
          <em>
            Note: The overall score is calculated on a total score of 500 using
            weightages applicable for your respective streams.
          </em>
        </div>
        <div className="cs-gauge-wrap">
          <div className="cs-gauge">
            <div className="cs-gauge__label">Your Overall Score</div>
            <Gauge />
          </div>
        </div>
        <ul className="cs-overall__bullets">
          <li>
            The overall score is calculated on a total score of 500 using
            weightages applicable for <strong>DELIVERY</strong>
            &nbsp;Stream.
          </li>
          <li>
            <em>
              Self ratings have been excluded for the purpose of this
              calculation
            </em>
          </li>
        </ul>
      </div>
    );

    out.push(
      <div key="quartiles" className="cs-quartiles">
        <div className="cs-quartiles__grid">
          <QuartilePositionCard
            title="Your Quartile Position Cohort"
            valuesByQuartile={cohortMap}
            initialSelected={2}
            onValueChange={handleCohortChange}
          />
          <div className="cs-quartiles__divider" />
          <QuartilePositionCard
            title="Your Quartile Position Stream"
            valuesByQuartile={streamMap}
            initialSelected={2}
            onValueChange={handleStreamChange}
          />
        </div>
      </div>
    );

    return out;
  }, [cohortMap, streamMap]);

  return (
    <AutoPaginatedSections
      blocks={blocks}
      startPage={startPage}
      // pageWidth={pageWidth}
      // pageHeight={pageHeight}
      // pagePadding={pagePadding}
      HeaderComponent={Header}
      contentClassName="content-page"
    />
  );
};

export default CompetencySummary;
