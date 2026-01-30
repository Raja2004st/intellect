import React, { useMemo, useState } from "react";
import ReportInfoTable from "./reportInfoTable";

const headers5 = [
  "Score",
  "First quartile (25th percentile)",
  "Median value (50th percentile)",
  "Third quartile (75th percentile)",
  "Max Score",
];

const QUARTILE_LABELS = {
  1: "First Quartile",
  2: "Second Quartile",
  3: "Third Quartile",
  4: "Fourth Quartile",
};

const QuartilePositionCard = ({
  title,
  valuesByQuartile,
  initialSelected = 2,
  headers = headers5,
  onChange,
}) => {
  const [selected, setSelected] = useState(initialSelected);

  const values = useMemo(() => {
    return valuesByQuartile?.[selected] || [];
  }, [valuesByQuartile, selected]);

  const handleSelect = (q) => {
    setSelected(q);
    onChange?.(q);
  };

  return (
    <div>
      <div style={{ textAlign: "center", fontWeight: 800, marginBottom: 8 }}>
        {title}
      </div>

      {/* Tabs 1-4 */}
      <div
        role="tablist"
        aria-label="Quartile tabs"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          marginBottom: 8,
        }}
      >
        {[1, 2, 3, 4].map((q) => (
          <button
            key={q}
            role="tab"
            aria-selected={selected === q}
            onClick={() => handleSelect(q)}
            style={{
              minWidth: 36,
              height: 28,
              border: "1px solid #e6d4c3",
              background: selected === q ? "#0e4a2e" : "#f7e8db",
              color: selected === q ? "#fff" : "#0e4a2e",
              borderRadius: 3,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Quartile band chip */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <span
          style={{
            background: "#0e4a2e",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 18,
            display: "inline-block",
            minWidth: 180,
          }}
        >
          {QUARTILE_LABELS[selected]}
        </span>
      </div>

      {/* Values table */}
      <ReportInfoTable
        headers={headers}
        rows={[{ cells: values }]}
        leftWidth="20%"
        rightWidth="20%"
        midWidth="20%"
        rowHeight={42}
      />
    </div>
  );
};

export default QuartilePositionCard;
