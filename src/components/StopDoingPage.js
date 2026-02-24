import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import FeedbackCommonHeader from "./FeedbackCommonHeader";
import "../styles/stopDoingPage.scss";

const tokenize = (text) => {
  const src = String(text ?? "");
  const parts = src.split(/(\*\*[^*]+\*\*|\{red\}[^}]+\{\/red\})/g);
  return parts.filter(Boolean).map((p, idx) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={idx} className="sd-strong">
          {p.slice(2, -2)}
        </strong>
      );
    }
    if (p.startsWith("{red}") && p.endsWith("{/red}")) {
      return (
        <span key={idx} className="sd-red">
          {p.slice(5, -6)}
        </span>
      );
    }
    return <span key={idx}>{p}</span>;
  });
};

const capitalize = (value) => {
  if (typeof value !== "string") return value;
  if (!value.length) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const formatTraitText = (value, maxLength = 140) => {
  const full = capitalize(value || "");
  if (full.length <= maxLength) return full;
  return `${full.slice(0, maxLength - 1).trimEnd()}…`;
};

const StopDoingPage = ({
  title = "What the Nominee Should “Stop Doing”…",
  columns,
  left = [],
  right = [],
  traitsTitle = "Most Predominant Leadership Trait",
  traitsSubtitle = "(Traits that occur more than once)",
  traits = [],
  footnote = "* This excludes self feedback",
}) => {
  const blocks = useMemo(() => {
    const out = [];
    const hasColumns =
      Array.isArray(columns) &&
      columns.some((c) => Array.isArray(c) && c.length);

    out.push(
      <FeedbackCommonHeader key="sd-hdr" title={title} className="sd-header" />,
    );

    out.push(
      <div key="sd-grid" className="sd-grid" role="table" aria-label={title}>
        {hasColumns
          ? columns.map((col, colIdx) => (
              <div key={colIdx} className="sd-col" role="rowgroup">
                {col.map((row, i) => (
                  <div key={i} className="sd-row" role="row">
                    <div className="sd-cell" role="cell">
                      {tokenize(row)}
                    </div>
                  </div>
                ))}
              </div>
            ))
          : [left, right].map((col, colIdx) => (
              <div key={colIdx} className="sd-col" role="rowgroup">
                {col.map((row, i) => (
                  <div key={i} className="sd-row" role="row">
                    <div className="sd-cell" role="cell">
                      {tokenize(row)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
      </div>,
    );

    out.push(
      <div key="sd-traits" className="sd-traits">
        <div className="sd-traits__header">
          <div className="sd-traits__title">{traitsTitle}</div>
          <div className="sd-traits__subtitle">{traitsSubtitle}</div>
          <div className="sd-traits__underline" aria-hidden="true" />
        </div>

        <div
          className="sd-traits__grid"
          role="list"
          aria-label="Most predominant traits"
        >
          {traits.map((t, idx) => (
            <div
              key={`${t.text}-${idx}`}
              className={`sd-trait-card sd-trait-card--${idx < 4 ? "lg" : idx < 8 ? "md" : "sm"}`.trim()}
              role="listitem"
            >
              <p className="sd-trait-card-text" title={capitalize(t)}>
                {formatTraitText(t)}
              </p>
            </div>
          ))}
        </div>
      </div>,
    );

    out.push(
      <div key="sd-foot" className="sd-footnote">
        {footnote}
      </div>,
    );

    return out;
  }, [
    columns,
    footnote,
    left,
    right,
    title,
    traits,
    traitsSubtitle,
    traitsTitle,
  ]);

  return (
    // <div className="section-page-container">
    <AutoPaginatedSections
      blocks={blocks}
      pageWidth={794}
      pageHeight={1023}
      pagePadding={0}
      contentClassName="stop-doing-page"
      componentId="stop-doing"
    />
    // </div>
  );
};

export default StopDoingPage;
