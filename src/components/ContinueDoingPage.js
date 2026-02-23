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
  columns = [],
  footnote = "* This excludes self feedback",
  immediateActionSummary,
}) => {
  const blocks = useMemo(() => {
    const out = [];

    const hasColumns =
      Array.isArray(columns) &&
      columns.some((c) => Array.isArray(c) && c.length);

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
        description = "Repeated themes, if any are captured as a snapshot to facilitate understanding and further action",
        note = "Note: If comments have been very diverse with no commonality, it will not be captured here but can be referenced in the individual slides",
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
              <div
                className="cd-ia-col__head cd-ia-col__head--continue"
                role="row"
              >
                CONTINUE
              </div>
              <div
                className="cd-ia-col__body cd-ia-col__body--continue"
                role="row"
              >
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
              <div
                className="cd-ia-col__head cd-ia-col__head--start"
                role="row"
              >
                START
              </div>
              <div
                className="cd-ia-col__body cd-ia-col__body--start"
                role="row"
              >
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
    // <div className="section-page-container">
    <AutoPaginatedSections
      blocks={blocks}
      pageWidth={794}
      pageHeight={1123}
      pagePadding={0}
      contentClassName="continue-doing-page"
      componentId="continue-doing"
    />
    // </div>
  );
};

export default ContinueDoingPage;
