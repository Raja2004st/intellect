import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import Header from "./header";
import ReportInfoTable from "./reportInfoTable";
import QuartilePositionCard from "./QuartilePositionCard";
import "../styles/mainPage.scss";
import "../styles/contentPage.scss";

const Gauge = ({ score = 383, max = 500, size = 240 }) => {
  const radius = (size - 24) / 2;
  const center = size / 2;
  const stroke = 16;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(1, Math.max(0, score / max));
  const dash = circ * pct;
  const gap = circ - dash;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label="overall score gauge"
    >
      <defs>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      {/* track */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#e6efe9"
        strokeWidth={stroke}
        fill="none"
      />
      {/* progress */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#0e4a2e"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={`${dash} ${gap}`}
        transform={`rotate(-90 ${center} ${center})`}
        strokeLinecap="round"
        filter="url(#soft)"
      />
      {/* inner circle */}
      <circle cx={center} cy={center} r={radius - 26} fill="#0e4a2e" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="44"
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

  const streamRows = cohortRows; // same demo values

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
  const cohortMap =
    (cohortQuartiles && cohortQuartiles.map) || defaultCohortMap;
  const streamMap =
    (streamQuartiles && streamQuartiles.map) || defaultStreamMap;

  const blocks = useMemo(() => {
    const out = [];

    out.push(
      <h2
        key="title"
        className="content-page__title"
        style={{ color: "#0e4a2e" }}
      >
        <span className="content-page__title-index">2.</span>
        <span className="content-page__title-text">Competency Summary</span>
      </h2>
    );

    out.push(
      <div key="overall" style={{ paddingLeft: 40 }}>
        <h3 className="about-subtitle" style={{ margin: 0, paddingLeft: 0 }}>
          2.1. Your Overall Score
        </h3>
        <div style={{ fontSize: 13, marginTop: 6 }}>
          <em>
            Note: The overall score is calculated on a total score of 500 using
            weightages applicable for your respective streams.
          </em>
        </div>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 24,
            marginBottom: 12,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: 6, fontWeight: 700 }}>
              Your Overall Score
            </div>
            <Gauge />
          </div>
        </div> */}
        <ul style={{ marginTop: 10, lineHeight: 1.55 }}>
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
      <div key="quartiles" style={{ paddingLeft: 24, marginTop: 18 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 12px 1fr",
            alignItems: "start",
            gap: 12,
          }}
        >
          <QuartilePositionCard
            title="Your Quartile Position Cohort"
            valuesByQuartile={cohortMap}
            initialSelected={2}
          />
          <div
            style={{
              width: 1,
              height: "100%",
              background: "#c9d5cf",
              justifySelf: "center",
            }}
          />
          <QuartilePositionCard
            title="Your Quartile Position Stream"
            valuesByQuartile={streamMap}
            initialSelected={2}
          />
        </div>
      </div>
    );

    return out;
  }, [cohortQuartiles, streamQuartiles]);

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

export default CompetencySummary;
