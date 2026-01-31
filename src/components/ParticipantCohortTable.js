import React from "react";
import "../styles/participantCohortTable.scss";

const ParticipantCohortTable = ({
  competencies = [
    "Leadership",
    "Bandwidth",
    "Sales and Customer Centricity",
    "Collaboration",
    "Results Orientation",
    "Expertise and Communication",
  ],
  selfRatings = {},
  cohortRatings = {},
}) => {
  return (
    <table className="pc-table">
      <thead>
        <tr>
          <th className="pc-col-label" colSpan={2}></th>
          <th className="pc-col-self">Self</th>
          <th className="pc-col-mgr">Manager (Avg.)</th>
          <th className="pc-col-team">Team Members (Avg.)</th>
          <th className="pc-col-peers">Peers (Avg.)</th>
        </tr>
      </thead>
      <tbody>
        {competencies.map((label, idx) => (
          <React.Fragment key={idx}>
            <tr>
              <td className="pc-label" rowSpan={2}>
                {label}
              </td>
              <td className="pc-cell pc-your">Your Rating</td>
              <td className="pc-cell" />
              <td className="pc-cell" />
              <td className="pc-cell" />
              <td className="pc-cell" />
            </tr>
            <tr>
              <td className="pc-cell pc-cohort">Cohort Rating (Avg.)</td>
              <td className="pc-cell" />
              <td className="pc-cell" />
              <td className="pc-cell" />
              <td className="pc-cell" />
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ParticipantCohortTable;
