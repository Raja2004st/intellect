import React from "react";
import "../styles/evaluatorTable.scss";

const EvaluatorRatingsTable = ({
  rows = [
    {
      label: "Self",
      score: 1,
      gapFromSelf: 0,
      highlight: "Area of Improvement",
      color: "#b3792e",
    },
    {
      label: "Manager",
      score: 3,
      gapFromSelf: 2,
      highlight: "Area of Improvement",
      color: "#b8860b",
    },
    {
      label: "Peer",
      score: 4,
      gapFromSelf: 3,
      highlight: "Hidden Strength",
      color: "#a9d0b8",
    },
    {
      label: "Team Members",
      score: 5,
      gapFromSelf: 4,
      highlight: "Hidden Strength",
      color: "#0e4a2e",
    },
  ],
  max = 5,
  title,
  compact = false,
}) => {
  const pct = (score) => `${Math.max(0, Math.min(1, score / max)) * 100}%`;
  const colorPicker = (value) => {
    if (value < 3.5) {
      return "#AE7F2E";
    } else if (value >= 3.5 && value < 4) {
      return "#B5D3BB";
    } else if (value >= 4) {
      return "#21552F";
    }
    return "#ffffff";
  };
  return (
    <div style={{ width: "100%" }}>
      <table
        className={`evaluator-table${
          compact ? " evaluator-table--compact" : ""
        }`}
        style={{ width: "100%" }}
      >
        {/* {title ? <caption className="et-caption">{title}</caption> : null} */}
        <thead>
          <tr>
            <th className="et-col-label"></th>
            <th className="et-col-na">NA</th>
            {Array.from({ length: max }).map((_, i) => (
              <th key={i} className="et-col-scale">
                {i + 1}
              </th>
            ))}
            <th className="et-col-score">Score</th>
            <th className="et-col-gap">Gap from Self</th>
            <th className="et-col-highlight">Highlight</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx}>
              <td className="et-label">{r.label}</td>
              <td className="et-na"></td>
              <td className="et-scale" colSpan={max}>
                <div className="et-track">
                  <div
                    className="et-bar"
                    style={{
                      width: pct(r.score),
                      background: colorPicker(r.score),
                    }}
                  />
                </div>
              </td>
              <td className="et-score">{r.score}</td>
              <td className="et-gap">{r.gapFromSelf}</td>
              <td className="et-highlight">{r.highlight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EvaluatorRatingsTable;
