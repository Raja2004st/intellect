import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import FeedbackCommonHeader from "./FeedbackCommonHeader";
import CompetencyThreeBarChart from "./CompetencyThreeBarChart";
import "../styles/summaryByCompetencyPage.scss";

const SummaryByCompetencyPage = ({
  title = "Summary by Competency – Creating the Right Culture",
  overallScore = 4.53,
  items = [],
  leadershipOverallScore = 4.53,
  leadershipItems = [],
  barHeight,
  onItemsChange,
  onLeadershipItemsChange,
}) => {

  const handleItemsChange = (rows) => {
    console.log(rows);
    onItemsChange(rows);
  };
  
    const blocks = useMemo(() => {
    const out = [];

    const parsed = items.map((it) => ({
      ...it,
      groupMean: Number(it.groupMean),
    }));

    let maxIdx = -1;
    let minIdx = -1;

    parsed.forEach((it, idx) => {
      const v = Number.isFinite(it.groupMean) ? it.groupMean : -Infinity;
      if (
        maxIdx === -1 ||
        v >
          (Number.isFinite(parsed[maxIdx]?.groupMean)
            ? parsed[maxIdx].groupMean
            : -Infinity)
      ) {
        maxIdx = idx;
      }
      if (
        minIdx === -1 ||
        v <
          (Number.isFinite(parsed[minIdx]?.groupMean)
            ? parsed[minIdx].groupMean
            : Infinity)
      ) {
        minIdx = idx;
      }
    });

    const chartItems = parsed.map((it, idx) => {
      if (idx === maxIdx) {
        return {
          ...it,
          // callout: {
          //   variant: "highest",
          //   text: "Highest average score\ngiven by the group",
          // },
        };
      }
      if (idx === minIdx) {
        return {
          ...it,
          // callout: {
          //   variant: "lowest",
          //   text: "Lowest average score\ngiven by the group",
          // },
        };
      }
      return it;
    });

    out.push(
      <FeedbackCommonHeader
        key="sbc-hdr-1"
        title={title}
        right={
          overallScore !== undefined && overallScore !== null ? (
            <div className="sbc-header__pill">
              Overall Score – {overallScore}/5
            </div>
          ) : null
        }
        className="sbc-header"
      />,
    );

    out.push(
      <div key="sbc-chart-1" className="sbc-chart">
        <CompetencyThreeBarChart
          items={chartItems}
          className="sbc-chart__inner"
          barHeight={12}
          barGap={6}
          firstRowBorder={true}
          onRowsChange={handleItemsChange}
        />
      </div>,
    );

    out.push(
      <FeedbackCommonHeader
        key="sbc-hdr-2"
        title={"Summary by Competency – Leadership Personality & Style"}
        right={
          leadershipOverallScore !== undefined && leadershipOverallScore !== null ? (
            <div className="sbc-header__pill">
              Overall Score – {leadershipOverallScore}/5
            </div>
          ) : null
        }
        className="sbc-header"
      />,
    );

    out.push(
      <div key="sbc-chart-2" className="sbc-chart">
        <CompetencyThreeBarChart
          items={leadershipItems}
          className="sbc-chart__inner"
          barHeight={9}
          barGap={4}
          firstRowBorder={true}
          onRowsChange={onLeadershipItemsChange}
        />
      </div>,
    );

    return out;
  }, [items, overallScore, title, barHeight, leadershipItems, leadershipOverallScore]);

  return (
    // <div className="section-page-container">
      <AutoPaginatedSections
        blocks={blocks}
        pageWidth={794}
        pageHeight={1123}
        pagePadding={0}
        contentClassName="summary-by-competency-page"
        componentId="summary-by-competency"
      />
    // </div>
  );
};

export default SummaryByCompetencyPage;
