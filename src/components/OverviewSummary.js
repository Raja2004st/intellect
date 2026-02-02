import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import Header from "./header";
import HorizontalCompareBar from "./HorizontalCompareBar";
import "../styles/mainPage.scss";
import "../styles/contentPage.scss";

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
      <div
        key="title"
        className="content-page__title"
        style={{ color: "#0e4a2e", paddingLeft: 40 }}
      >
        <span
          className="content-page__title-text"
          style={{ fontWeight: 800, fontSize: 22 }}
        >
          Overview/Summary of Scores Across 7 Elements
        </span>
      </div>
    );

    out.push(
      <div
        key="note"
        style={{
          paddingLeft: 40,
          marginTop: -8,
          marginBottom: 10,
          color: "#333",
        }}
      >
        <em style={{ fontSize: 13 }}>
          Note: For categories with more than one respondent, scores represent
          the mean of all individual ratings.
        </em>
      </div>
    );

    data.forEach((row, idx) => {
      out.push(
        <div
          key={`row-${idx}`}
          style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr 70px",
            alignItems: "center",
            gap: "30px",
            padding: "12px 11px",
            paddingLeft: 40,
          }}
        >
          <div
            style={{
              textAlign: "right",
              paddingRight: 12,
              color: "#222",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {row.label}
          </div>
          <HorizontalCompareBar self={row.self} others={row.others} />
          <div
            style={{
              textAlign: "center",
              color: "#222",
              fontWeight: 800,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>
              Mean
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 16 }}>{row.self}</span>
              <span style={{ fontSize: 16 }}>{row.others}</span>
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
