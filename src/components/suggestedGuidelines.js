import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import FeedbackCommonHeader from "./FeedbackCommonHeader";
import CompetencyThreeBarChart from "./CompetencyThreeBarChart";
import "../styles/suggestedGuidelines.scss";
import "../styles/competencyBiggerPicture.scss";

const SuggestedGuidelines = ({
  title = "Your Competency Summary: The Bigger Picture",
  overallScore,
  note =
    "Snapshot of average / mean score for each Competency based on inputs from respondent's vis-a vis your self-rating",
  items = [],
}) => {
  const blocks = useMemo(() => {
    const out = [];

    out.push(
      <FeedbackCommonHeader
        key="sg-h1"
        title="Suggested Guidelines When Viewing Your Report"
      />
    );

    out.push(
      <div key="sg-content" className="suggested-guidelines-content">
        <ul className="suggested-guidelines-list">
          <li>
            View the report with an open mind and without filters or preconceived
            notions driven by self-perception or past feedback
          </li>
          <li>
            Each Respondent views you in a particular light and this perception
            is reality for them. So, do not be surprised if you hear things you
            don’t like or disagree with
          </li>
          <li>
            Each Respondent has invested their time to offer their honest
            thoughts and perceptions. Please try not to discount any of the
            feedback
          </li>
          <li>
            The feedback is focused on specific behaviors at the workplace and
            is not a reflection of you as a “whole”
          </li>
          <li>
            See this as an opportunity to learn about yourself and a platform
            for professional development
          </li>
          <li>
            Provide equal focus on the areas of improvement as well as
            positives/ areas of strength. You are the best person to decide the
            areas you want to develop
          </li>
          <li>
            Give yourself time to reflect on the information before taking
            action
          </li>
          <li>
            To gain more clarity on the report or get more ideas to grow, feel
            free to speak to a mentor or even a professional you may consider a
            role model in specific leadership competencies
          </li>
        </ul>
      </div>
    );


    out.push(
      <FeedbackCommonHeader
        key="hdr"
        title={title}
        right={
          overallScore !== undefined && overallScore !== null ? (
            <div className="cbp-header__pill">Overall Score – {overallScore}/5</div>
          ) : null
        }
      />
    );

    out.push(
      <div key="note" className="cbp-note">
        <div className="cbp-note__bullet" aria-hidden="true" />
        <div className="cbp-note__text">{note}</div>
      </div>
    );

    out.push(
      <div key="chart" className="cbp-chart">
        <CompetencyThreeBarChart items={items} />
      </div>
    );


    // out.push(
    //   <div
    //     key="corner"
    //     className="suggested-guidelines-corner"
    //     aria-hidden="true"
    //   />
    // );

    return out;
  }, [items, note, overallScore, title]);

  return (
    // <div className="section-page-container">
      <AutoPaginatedSections
        blocks={blocks}
        pageWidth={794}
        pageHeight={1123}
        pagePadding={0}
        contentClassName="suggested-guidelines-page"
        componentId="suggested-guidelines"
      />
    // </div>
  );
};

export default SuggestedGuidelines;
