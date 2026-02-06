import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import Header from "./header";
import HorizontalCompareBar from "./HorizontalCompareBar";
import "../styles/mainPage.scss";
import "../styles/contentPage.scss";
import "../styles/overviewSummary.scss";

const OverviewSummary = ({
  startPage = 13,
  pageWidth = 794,
  pageHeight = 842,
  pagePadding = 10,
  items,
}) => {
  const data = useMemo(
    () =>
      items && items.length
        ? items
        : [
            { label: "Leadership", self: 2.5, others: 4.0 },
            { label: "Bandwidth", self: 2.5, others: 4.0 },
            { label: "Sales and Customer Centricity", self: 2.5, others: 4.0 },
            { label: "Collaboration", self: 2.5, others: 4.0 },
            { label: "Operational Excellence", self: 2.5, others: 4.0 },
            { label: "Result Orientation", self: 2.5, others: 4.0 },
            { label: "Expertise and Communication", self: 2.5, others: 4.0 },
          ],
    [items]
  );

  const blocks = useMemo(() => {
    const out = [];

    out.push(
      <div key="title" className="content-page__title os-title">
        <span className="content-page__title-text os-title__text">
          Overview/Summary of Scores Across 7 Elements
        </span>
      </div>
    );

    out.push(
      <div key="note" className="os-note">
        <em className="os-note__em">
          <strong> Note:</strong> For categories with more than one respondent,
          scores represent the mean of all individual ratings.
        </em>
      </div>
    );

    data.forEach((row, idx) => {
      out.push(
        <div key={`row-${idx}`} className="os-row">
          <div className="os-row__label">{row.label}</div>
          <HorizontalCompareBar self={row.self} others={row.others} />
          <div className="os-row__stats">
            {/* <div className="os-row__stats-caption">Mean</div> */}
            <div className="os-row__stats-values">
              <span>{row.self}</span>
              <span>{row.others}</span>
            </div>
          </div>
        </div>
      );
    });

    return out;
  }, [data]);

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

export default OverviewSummary;
