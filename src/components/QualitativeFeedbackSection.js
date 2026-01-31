import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import Header from "./header";
import FeedbackBubble from "./FeedbackBubble";
import "../styles/mainPage.scss";
import "../styles/contentPage.scss";

const QualitativeFeedbackSection = ({
  startPage = 31,
  pageWidth = 794,
  pageHeight = 802,
  pagePadding = 10,
  // Title
  titleIndex = "3.1.",
  titleText = "Leadership",
  // Question prompt
  questionIndex = "1.",
  questionText = "What do you consider the key leadership strengths demonstrated by the Participant?",
  // Comments list
  comments = [
    "Sample",
    "Sample",
    "Sample",
    "Sample",
    "Sample",
    "Sample",
    "Sample",
  ],
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
      </h2>
    );

    // Question prompt
    out.push(
      <div
        key="q"
        style={{
          marginTop: 4,
          marginBottom: 6,
          color: "#0e4a2e",
          fontWeight: 700,
          paddingLeft: 4,
        }}
      >
        <span style={{ marginRight: 8 }}>{questionIndex}</span>
        <span style={{ color: "#0e4a2e" }}>{questionText}</span>
      </div>
    );

    // Feedback list container
    out.push(
      <div
        key="list"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          paddingLeft: 8,
          paddingRight: 8,
        }}
      >
        {comments.map((c, i) => (
          <FeedbackBubble key={i} text={c} compact={true} />
        ))}
      </div>
    );

    return out;
  }, [titleIndex, titleText, questionIndex, questionText, comments]);

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

export default QualitativeFeedbackSection;
