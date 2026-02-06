import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import Header from "./header";
import HorizontalCompareBar from "./HorizontalCompareBar";
import "../styles/mainPage.scss";
import "../styles/contentPage.scss";
import "../styles/evaluatorCategoryBreakdown.scss";

const PALETTE = {
  self: "#0e4a2e",
  manager: "#b8860b",
  team: "#b3792e",
  peers: "#a9d0b8",
};

const defaultData = [
  {
    label: "Leadership",
    values: { self: 3.0, manager: 3.0, team: 2.5, peers: 4.5 },
  },
  {
    label: "Leadership",
    values: { self: 4.5, manager: 3.0, team: 2.5, peers: 4.0 },
  },
  {
    label: "Bandwidth",
    values: { self: 4.5, manager: 3.0, team: 2.5, peers: 4.0 },
  },
  {
    label: "Sales and Customer Centricity",
    values: { self: 4.5, manager: 3.0, team: 2.5, peers: 4.0 },
  },
  {
    label: "Collaboration",
    values: { self: 4.5, manager: 3.0, team: 2.5, peers: 4.0 },
  },
  {
    label: "Collaboration",
    values: { self: 4.5, manager: 3.0, team: 2.5, peers: 4.0 },
  },
];

const EvaluatorCategoryBreakdown = ({
  startPage = 15,
  pageWidth = 794,
  pageHeight = 852,
  pagePadding = 10,
  items = defaultData,
}) => {
  const blocks = useMemo(() => {
    const out = [];

    out.push(
      <h2 key="title" className="content-page__title ecb-title">
        <span className="content-page__title-index">2.4.</span>
        <span className="content-page__title-text">
          LBSCORE Broken Down by Evaluator Category
        </span>
      </h2>
    );

    out.push(
      <div key="note" className="ecb-note">
        <em className="ecb-note__em">
          <strong> Note:</strong> For categories with more than one respondent,
          scores represent the mean of all individual ratings.
        </em>
      </div>
    );

    items.forEach((row, idx) => {
      out.push(
        <div
          key={`sec-${idx}`}
          className={`ecb-sec ${idx === 0 ? "ecb-sec--first" : ""}`}
        >
          <h3 className="ecb-sec__heading">
            {idx === 0
              ? `Overall Rating: ${row.label}`
              : `Rating: ${row.label}`}
          </h3>
          <div className="ecb-grid">
            <HorizontalCompareBar
              rows={[
                { label: "Self", value: row.values.self, color: PALETTE.self },
                {
                  label: "Manager",
                  value: row.values.manager,
                  color: PALETTE.manager,
                },
                {
                  label: "Team Members",
                  value: row.values.team,
                  color: PALETTE.team,
                },
                {
                  label: "Peers",
                  value: row.values.peers,
                  color: PALETTE.peers,
                },
              ]}
              max={5}
              showTicks={true}
            />
            <div className="ecb-values">
              <div className="ecb-values__item">{row.values.self}</div>
              <div className="ecb-values__item">{row.values.manager}</div>
              <div className="ecb-values__item">{row.values.team}</div>
              <div className="ecb-values__item">{row.values.peers}</div>
            </div>
          </div>
        </div>
      );
    });

    return out;
  }, [items]);

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

export default EvaluatorCategoryBreakdown;
