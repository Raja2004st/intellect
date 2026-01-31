import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import Header from "./header";
import "../styles/mainPage.scss";
import "../styles/contentPage.scss";

const QualitativeFeedbackIntro = ({
  startPage = 30,
  pageWidth = 794,
  pageHeight = 402,
  pagePadding = 10,
  titleIndex = "3.",
  titleText = "Qualitative Feedback",
  paragraphs = [
    "This section captures open-ended feedback shared by respondents for each leadership element. It surfaces key perceptions about the participant’s strengths and areas of development. When reviewing these insights, look for recurring themes across raters and triangulate them with the numerical ratings from previous sections.",
    "The goal is to interpret this feedback constructively, identifying actionable takeaways and behavioral patterns aligned to each element of the LBSCORE framework.",
  ],
}) => {
  const blocks = useMemo(() => {
    const out = [];

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

    out.push(
      <div
        key="body"
        style={{
          marginTop: 8,
          color: "#333",
          maxWidth: 620,
          paddingLeft: "40px",
        }}
      >
        {paragraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              margin: i === 0 ? "0 0 16px 0" : "0 0 0 0",
            }}
          >
            {p}
          </p>
        ))}
      </div>,
    );

    return out;
  }, [titleIndex, titleText, paragraphs]);

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

export default QualitativeFeedbackIntro;
