import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import FeedbackCommonHeader from "./FeedbackCommonHeader";
import "../styles/continueDoingPage.scss";

const tokenize = (text) => {
  const src = String(text ?? "");
  const parts = src.split(/(\*\*[^*]+\*\*|\{red\}[^}]+\{\/red\})/g);
  return parts.filter(Boolean).map((p, idx) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={idx} className="cd-strong">
          {p.slice(2, -2)}
        </strong>
      );
    }
    if (p.startsWith("{red}") && p.endsWith("{/red}")) {
      return (
        <span key={idx} className="cd-red">
          {p.slice(5, -6)}
        </span>
      );
    }
    return <span key={idx}>{p}</span>;
  });
};

const ContinueDoingPage = ({
  title = "What the Nominee Should “Continue Doing”…",
  columns = [
    [
      "**Target setting** for every staff member",
      "**Encouraging professional development** for teachers.",
      "Implementing collaborative learning opportunities.",
      "Conduct more subject committee meetings which will hone the skills of the new team of teachers",
      "Continuing to **conduct regular staff meetings** to communicate with staff, discuss challenges and share updates.",
      "**Department wise Meetings**",
      "To conduct subject / dept. wise meetings whenever possible.",
      "Encourage **open communication** and feedback from teachers",
      "To have **one-on-one discussions** regarding particular matters of interest.",
      "**Foster inclusivity**",
      "To foster a more inclusive environment",
      "Need more Staff Trips where to develop collaborative, exposure to new ideas.",
      "Frequent classroom observation.",
      "Recognizing and celebrating achievements.",
      "**Appreciation and encouragement**",
      "Polite nature",
    ],
    [
      "Approachable, Promote well-being, lead by example",
      "Approachable and understand the situation/problems",
      "The principal effectively handles tense situations calmly, resolving conflicts without harm. He should continue managing conflicts fairly, as he does now.",
      "Some times resolving issues",
      "Building confidence in me and trusting me.",
      "He is highly charged and doing his best for the betterment of Student and Teaching community. I think, we can do some advertisements or propagation of our teaching services to attract more students in our fold in coming years.",
      "Being {red}more strict{/red} with the students (3)",
      "To be {red}stricter{/red} with the students.",
      "Becoming {red}more strict{/red} with children to have a fear in them that principal is not an easily approachable person",
      "Even {red}more strict{/red} with the {red}discipline{/red} of the students for their betterment.",
      "To create platforms for students to share their ideas and solution and also offer guidance to teachers and staff to build confidence and skills.",
      "Interact more often with the slow learners.",
      "Keep encouraging the slow learners",
    ],
    [
      "Boosting the confidence of the children to perform better",
      "Different strategies to build children to face the challenging world with academics skills..",
      "Allowing students to attend matches and tournaments conducted by Education Department and Krida Kendram. A single team has to attend atleast 6 to 7 matches to understand the team and incorporate their talents. Because every year the team gets changed as they move out from classes 5,8,10,12 etc .",
      "My Principal encourages staff to share their ideas and concerns directly, and motivates the students to achieve higher academic performance.",
      "**Encouraging and Motivating**",
      "Motivating given to do better each and every work",
      "Motivating each and every employee and using only positive words",
      "Motivating and positive thinking",
      "He is thinking always positive",
      "Streamline the process",
      "The current working scenario is peaceful.",
      "The same working methodology is comfortable.",
      "Nil",
    ],
  ],
  footnote = "* This excludes self feedback",
  immediateActionSummary,
}) => {
  const blocks = useMemo(() => {
    const out = [];

    const hasColumns = Array.isArray(columns) && columns.some((c) => Array.isArray(c) && c.length);

    out.push(
      <FeedbackCommonHeader key="cd-hdr" title={title} className="cd-header" />,
    );

    if (hasColumns) {
      out.push(
        <div key="cd-grid" className="cd-grid" role="table" aria-label={title}>
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="cd-col" role="rowgroup">
              {col.map((row, rowIdx) => (
                <div key={rowIdx} className="cd-row" role="row">
                  <div className="cd-cell" role="cell">
                    {tokenize(row)}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>,
      );
    }

    if (footnote) {
      out.push(
        <div key="cd-foot" className="cd-footnote">
          {footnote}
        </div>,
      );
    }

    if (immediateActionSummary) {
      const {
        title: iaTitle = "Immediate Action Areas - Summary",
        description =
          "Repeated themes, if any are captured as a snapshot to facilitate understanding and further action",
        note =
          "Note: If comments have been very diverse with no commonality, it will not be captured here but can be referenced in the individual slides",
        columns: iaCols = {
          continue: [],
          start: [],
          stop: [],
        },
      } = immediateActionSummary;

      out.push(
        <div key="cd-ia" className="cd-ia">
          {/* <div className="cd-ia__title">{iaTitle}</div>
          <div className="cd-ia__underline" aria-hidden="true" /> */}

          <div className="cd-ia__desc">{description}</div>
          <div className="cd-ia__note">{note}</div>

          <div className="cd-ia__panel" role="table" aria-label={iaTitle}>
            <div className="cd-ia-col" role="rowgroup">
              <div className="cd-ia-col__head cd-ia-col__head--continue" role="row">
                CONTINUE
              </div>
              <div className="cd-ia-col__body cd-ia-col__body--continue" role="row">
                {iaCols.continue.map((t, i) => (
                  <div key={i} className="cd-ia-bullet" role="row">
                    <span className="cd-ia-bullet__dot" aria-hidden="true">
                      •
                    </span>
                    <span className="cd-ia-bullet__text">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cd-ia-col" role="rowgroup">
              <div className="cd-ia-col__head cd-ia-col__head--start" role="row">
                START
              </div>
              <div className="cd-ia-col__body cd-ia-col__body--start" role="row">
                {iaCols.start.map((t, i) => (
                  <div key={i} className="cd-ia-bullet" role="row">
                    <span className="cd-ia-bullet__dot" aria-hidden="true">
                      •
                    </span>
                    <span className="cd-ia-bullet__text">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cd-ia-col" role="rowgroup">
              <div className="cd-ia-col__head cd-ia-col__head--stop" role="row">
                STOP
              </div>
              <div className="cd-ia-col__body cd-ia-col__body--stop" role="row">
                {iaCols.stop.map((t, i) => (
                  <div key={i} className="cd-ia-bullet" role="row">
                    <span className="cd-ia-bullet__dot" aria-hidden="true">
                      •
                    </span>
                    <span className="cd-ia-bullet__text">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>,
      );
    }

    return out;
  }, [columns, footnote, immediateActionSummary, title]);

  return (
    <div className="section-page-container">
      <AutoPaginatedSections
        blocks={blocks}
        pageWidth={794}
        pageHeight={1123}
        pagePadding={0}
        contentClassName="continue-doing-page"
        componentId="continue-doing"
      />
    </div>
  );
};

export default ContinueDoingPage;
