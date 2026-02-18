import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import FeedbackCommonHeader from "./FeedbackCommonHeader";
import CompetencyThreeBarChart from "./CompetencyThreeBarChart";
import "../styles/summaryByCompetencyPage.scss";

const LEGEND_2 = [
  {
    key: "groupMean",
    label: "Group Mean (Teachers & Office Staff)",
    color: "var(--chart-series-group-mean)",
  },
  {
    key: "selfRating",
    label: "Self Rating",
    color: "var(--chart-series-self-rating)",
  },
];

const formatOverallScore2 = (v) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return v;
  return n
    .toFixed(2)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
};

const StaffPerformanceSummaryByCompetencyPage = ({
  title = "Summary by Competency – Leadership for Staff Performance & Development",
  overallScore = 4.64,
  items = [],
  title2,
  overallScore2,
  items2 = [],
  barHeight = 12,
}) => {
  const blocks = useMemo(() => {
    const out = [];

    const buildChartItems = (rawItems) => {
      const parsed = rawItems.map((it) => ({
        ...it,
        groupMean: Number(it.groupMean),
        selfRating: Number(it.selfRating),
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

      return parsed.map((it, idx) => {
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
    };

    const pushSection = ({
      keyPrefix,
      sectionTitle,
      sectionOverallScore,
      sectionItems,
    }) => {
      const chartItems = buildChartItems(sectionItems);

      out.push(
        <FeedbackCommonHeader
          key={`${keyPrefix}-hdr`}
          title={sectionTitle}
          right={
            sectionOverallScore !== null ? (
              <div className="sbc-header__pill">
                Overall Score – {formatOverallScore2(sectionOverallScore)}/5
              </div>
            ) : null
          }
          className="sbc-header"
        />,
      );

      out.push(
        <div key={`${keyPrefix}-chart`} className="sbc-chart">
          <CompetencyThreeBarChart
            items={chartItems}
            legendItems={LEGEND_2}
            className="sbc-chart__inner"
            barHeight={12}
            barGap={6}
            firstRowBorder={true}
          />
        </div>,
      );
    };

    pushSection({
      keyPrefix: "spsbc-1",
      sectionTitle: title,
      sectionOverallScore: overallScore,
      sectionItems: items,
    });

    if (title2 || (items2 && items2.length)) {
      pushSection({
        keyPrefix: "spsbc-2",
        sectionTitle: title2 || "Summary by Competency",
        sectionOverallScore: overallScore2,
        sectionItems: items2 || [],
      });
    }

    return out;
  }, [items, items2, overallScore, overallScore2, title, title2, barHeight]);

  return (
    // <div className="section-page-container">
    <AutoPaginatedSections
      blocks={blocks}
      pageWidth={794}
      pageHeight={1123}
      pagePadding={0}
      contentClassName="summary-by-competency-page"
      componentId="staff-performance-summary-by-competency"
    />
    // </div>
  );
};

export default StaffPerformanceSummaryByCompetencyPage;
