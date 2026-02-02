import React, { useMemo, useState } from "react";

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

      {/* Values table - 5 columns to match headers */}
      <div style={{ border: "1px solid #c9d5cf" }}>
        <table
          role="table"
          style={{
            // width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th
                  key={`h-${i}`}
                  scope="col"
                  style={{
                    borderBottom: "1px solid #c9d5cf",
                    borderRight:
                      i < headers.length - 1 ? "1px solid #c9d5cf" : "none",
                    padding: "6px 8px",
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: 12,
                    color: "#333",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {headers.map((_, i) => (
                <td
                  key={`v-${i}`}
                  style={{
                    borderRight:
                      i < headers.length - 1 ? "1px solid #c9d5cf" : "none",
                    padding: "8px 10px",
                    textAlign: i === 0 ? "left" : "center",
                    fontSize: 12,
                  }}
                >
                  {values?.[i] ?? ""}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuartilePositionCard;
