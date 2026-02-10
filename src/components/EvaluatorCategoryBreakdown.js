import React, { useEffect, useMemo, useState } from "react";
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
  const initialRows = useMemo(() => items, [items]);
  const [rows, setRows] = useState(initialRows);
  const [editValue, setEditValue] = useState("");
  const [currentEdit, setCurrentEdit] = useState({
    rowIndex: null,
    field: null,
  });

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const handleValueClick = (rowIndex, field, value) => {
    setCurrentEdit({ rowIndex, field });
    setEditValue(String(value ?? ""));
  };

  const handleValueChange = (e) => {
    setEditValue(e.target.value);
  };

  const commitEdit = () => {
    if (currentEdit.rowIndex === null || !currentEdit.field) {
      setCurrentEdit({ rowIndex: null, field: null });
      return;
    }

    setRows((prev) => {
      const next = [...prev];
      const row = next[currentEdit.rowIndex];
      if (!row) return prev;
      next[currentEdit.rowIndex] = {
        ...row,
        values: {
          ...row.values,
          [currentEdit.field]: editValue,
        },
      };
      return next;
    });

    setCurrentEdit({ rowIndex: null, field: null });
  };

  const handleValueBlur = () => {
    commitEdit();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitEdit();
    }
  };

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

    rows.forEach((row, idx) => {
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
              <div
                className={`ecb-values__item ${
                  currentEdit.rowIndex === idx && currentEdit.field === "self"
                    ? "editing"
                    : ""
                }`}
                onClick={() => handleValueClick(idx, "self", row.values.self)}
              >
                {currentEdit.rowIndex === idx && currentEdit.field === "self" ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={handleValueChange}
                    onBlur={handleValueBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="ecb-input"
                  />
                ) : (
                  row.values.self
                )}
              </div>
              <div
                className={`ecb-values__item ${
                  currentEdit.rowIndex === idx &&
                  currentEdit.field === "manager"
                    ? "editing"
                    : ""
                }`}
                onClick={() =>
                  handleValueClick(idx, "manager", row.values.manager)
                }
              >
                {currentEdit.rowIndex === idx &&
                currentEdit.field === "manager" ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={handleValueChange}
                    onBlur={handleValueBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="ecb-input"
                  />
                ) : (
                  row.values.manager
                )}
              </div>
              <div
                className={`ecb-values__item ${
                  currentEdit.rowIndex === idx && currentEdit.field === "team"
                    ? "editing"
                    : ""
                }`}
                onClick={() => handleValueClick(idx, "team", row.values.team)}
              >
                {currentEdit.rowIndex === idx && currentEdit.field === "team" ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={handleValueChange}
                    onBlur={handleValueBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="ecb-input"
                  />
                ) : (
                  row.values.team
                )}
              </div>
              <div
                className={`ecb-values__item ${
                  currentEdit.rowIndex === idx && currentEdit.field === "peers"
                    ? "editing"
                    : ""
                }`}
                onClick={() =>
                  handleValueClick(idx, "peers", row.values.peers)
                }
              >
                {currentEdit.rowIndex === idx &&
                currentEdit.field === "peers" ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={handleValueChange}
                    onBlur={handleValueBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="ecb-input"
                  />
                ) : (
                  row.values.peers
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });

    return out;
  }, [rows,currentEdit,editValue]);

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
