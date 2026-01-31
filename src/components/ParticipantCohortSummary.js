import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import Header from "./header";
import ParticipantCohortTable from "./ParticipantCohortTable";
import "../styles/mainPage.scss";
import "../styles/contentPage.scss";

const ParticipantCohortSummary = ({
  startPage = 26,
  pageWidth = 794,
  pageHeight = 802,
  pagePadding = 10,
  titleIndex = "2.6.",
  titleText = "Participant and Cohort Summary",
  note = (
    <>
      <strong>Cohort Summary</strong> : Cohort will include all the participants
      in that particular Sprint and not Stream wise.
    </>
  ),
  competencies,
  selfRatings,
  cohortRatings,
}) => {
  const blocks = useMemo(() => {
    const out = [];

    // Title
    out.push(
      <h2
        key="title"
        className="content-page__title"
        style={{ color: "#0e4a2e" }}
      >
        <span className="content-page__title-index">{titleIndex}</span>
        <span className="content-page__title-text">{titleText}</span>
      </h2>,
    );

    // Note
    out.push(
      <div
        key="note"
        style={{ marginTop: -6, marginBottom: 12, color: "#333" }}
      >
        <em style={{ fontSize: 13 }}>{note}</em>
      </div>,
    );

    // Table
    out.push(
      <div key="table" style={{ marginTop: 10 }}>
        <ParticipantCohortTable
          competencies={competencies}
          selfRatings={selfRatings}
          cohortRatings={cohortRatings}
        />
      </div>,
    );

    return out;
  }, [titleIndex, titleText, note, competencies, selfRatings, cohortRatings]);

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

export default ParticipantCohortSummary;
