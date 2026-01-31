import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import Header from "./header";
import FeedbackBubble from "./FeedbackBubble";
import "../styles/mainPage.scss";
import "../styles/contentPage.scss";

const THEME = {
  green: {
    borderColor: "#123b2b",
    avatarBg: "#0e4a2e",
    bubbleColor: "#ffffff",
    textColor: "#333",
  },
  gold: {
    borderColor: "#cc8b2c",
    avatarBg: "#cc8b2c",
    bubbleColor: "#ffffff",
    textColor: "#333",
  },
};

const QualitativeFeedbackList = ({
  startPage = 31,
  pageWidth = 794,
  pageHeight = 900,
  pagePadding = 10,
  titleIndex = "3.1.",
  titleText = "Leadership",
  questions = [],
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

    questions.forEach((q, qi) => {
      const theme = THEME[q.colorTheme] || THEME.green;
      out.push(
        <div key={`q-${qi}`} style={{ marginTop: qi === 0 ? 6 : 16 }}>
          <div
            style={{
              color: "#0e4a2e",
              fontWeight: 700,
              paddingLeft: 4,
              marginBottom: 30,
            }}
          >
            <span style={{ marginRight: 8 }}>{q.index || `${qi + 1}.`}</span>
            <span>{q.text}</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            {(q.comments || []).map((c, i) => (
              <FeedbackBubble
                key={i}
                text={typeof c === "string" ? c : c?.text || ""}
                compact={true}
                bubbleColor={theme.bubbleColor}
                borderColor={theme.borderColor}
                avatarBg={theme.avatarBg}
                textColor={theme.textColor}
              />
            ))}
          </div>
        </div>,
      );
    });

    return out;
  }, [titleIndex, titleText, questions]);

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

export default QualitativeFeedbackList;
