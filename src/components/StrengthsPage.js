import React, { useCallback, useMemo, useState } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import FeedbackCommonHeader from "./FeedbackCommonHeader";
import ArcConnector from "./ArcConnector";
import strengthImage from "../assets/png/strengthImage.png";
import "../styles/strengthsPage.scss";

const StrengthsPage = ({
  startPage = 4,
  title = "Strengths",
  groupTitle = "Group Mean – Teachers and Office Staff",
  groupSubTitle = "(Ratings > 4.5 Only)",
  managerTitle = "Manager Rating",
  managerSubTitle = "(Ratings > 4 Only)",
  arcColor = "var(--color-green-mid)",
  improvementsTitle = "Areas of Improvement",
  improvementsGroupTitle = "Group Mean – Teachers and Office Staff",
  improvementsGroupSubTitle = "(Ratings < 4.5 Only)",
  improvementsManagerTitle = "Manager Rating",
  improvementsManagerSubTitle = "(Ratings < 4 Only)",
  groupItems = [
    {
      score: 4.91,
      text: "Builds rapport with people and treats them with respect and dignity",
    },
    {
      score: 4.91,
      text: "Leads without aggression or arrogance",
    },
    {
      score: 4.86,
      text: "Builds rapport with people and treats them with respect and dignity",
    },
  ],
  managerItems = [
    {
      score: 5.0,
      text: "Manages school finances and payment approvals appropriately and maintains clear and accurate accounts",
    },
  ],
  improvementsGroupItems = [
    {
      score: 4.35,
      text: "Usually makes the right decisions promptly and on time and without undue delay",
    },
    {
      score: 4.49,
      text: "Gives clear feedback about performance or when anything goes right or wrong",
    },
    {
      score: 4.49,
      text: "Has created a work culture that rewards merit",
    },
  ],
  improvementsManagerItems = [
    {
      score: 3.0,
      text: "Usually makes the right decisions promptly and on time and without undue delay",
    },
    {
      score: 3.0,
      text: "Develops future leaders within the School",
    },
    {
      score: 3.0,
      text: "Generates energy and enthusiasm in the team | Has created a high performing culture in the team/ school",
    },
  ],
}) => {
  const [strengthPoints, setStrengthPoints] = useState([]);
  const [improvementPoints, setImprovementPoints] = useState([]);

  const arePointsEqual = (a, b) => {
    if (a === b) return true;
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i]?.x !== b[i]?.x || a[i]?.y !== b[i]?.y) return false;
    }
    return true;
  };

  const handleStrengthPointsLine = useCallback((newPoints) => {
    setStrengthPoints((prev) => {
      if (arePointsEqual(prev, newPoints)) return prev;
      return newPoints;
    });
  }, []);

  const handleImprovementPointsLine = useCallback((newPoints) => {
    setImprovementPoints((prev) => {
      if (arePointsEqual(prev, newPoints)) return prev;
      return newPoints;
    });
  }, []);

  const blocks = useMemo(() => {
    const out = [];

    const rowSpacing = 96;
    const topOffset = 70;
    const arcHeight = 300;
    const paddingTop = topOffset;
    const paddingBottom = topOffset;
    const rowTopAdjust = 55;

    out.push(
      <div key="strengths" className="sp">
        <FeedbackCommonHeader title={title} />

        <div className="sp-grid" style={{ "--sp-arc-color": arcColor }}>
          <div className="sp-left">
            <ArcConnector
              items={groupItems}
              arcColor={"var(--strength-arc-color)"}
              arcHeight={arcHeight}
              paddingTop={paddingTop}
              paddingBottom={paddingBottom}
              setPointsLine={handleStrengthPointsLine}
              circleColor={"var(--strength-pill-bg)"}
              circleBorderColor={"var(--strength-arc-color)"}
              strokeWidth={5}
              circleRadius={7.5}
            />
            <div className="sp-left__icon" aria-hidden="true">
              <img src={strengthImage} alt="" className="sp-left__img" />
            </div>
          </div>

          <div className="sp-right">
            <div className="sp-cols">
              <div className="sp-col">
                <div className="sp-col__header">
                  <div className="sp-col__header-title">{groupTitle}</div>
                </div>
                <div className="sp-col__header-sub">{groupSubTitle}</div>

                <div className="sp-col__body" style={{ minHeight: arcHeight }}>
                  {strengthPoints.length === groupItems.length &&
                    groupItems.map((it, i) => (
                      <div
                        key={`g-${i}`}
                        className="sp-row"
                        style={{
                          top:
                            strengthPoints[i].y -
                            (i === 1 ? rowTopAdjust - 8 : rowTopAdjust),
                        }}
                      >
                        <div
                          className="sp-row__line"
                          style={{
                            width: 160 - strengthPoints[i].x,
                            left: -(165 - strengthPoints[i].x),
                          }}
                        />
                        <div className="sp-pill">
                          {Number(it.score).toFixed(2)}
                        </div>
                        <div className="sp-card">{it.text}</div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="sp-divider" aria-hidden="true" />

              <div className="sp-col">
                <div className="sp-col__header sp-col__header--manager">
                  <div className="sp-col__header-title">{managerTitle}</div>
                </div>
                <div className="sp-col__header-sub">{managerSubTitle}</div>

                <div className="sp-col__body sp-col__body--manager">
                  {managerItems.map((it, idx) => (
                    <div key={`m-${idx}`} className="sp-row sp-row--manager">
                      <div className="sp-pill">
                        {Number(it.score).toFixed(2)}
                      </div>
                      <div className="sp-card">{it.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
    );

    out.push(
      <div key="improvements" className="sp sp--improvement">
        <FeedbackCommonHeader title={improvementsTitle} />

        <div
          className="sp-grid"
          style={{
            "--sp-arc-color": "var(--feedback-initial-underline-color)",
          }}
        >
          <div className="sp-left" style={{}}>
            <ArcConnector
              items={improvementsGroupItems}
              arcColor={"var(--feedback-initial-name-color)"}
              arcHeight={arcHeight}
              paddingTop={paddingTop}
              paddingBottom={paddingBottom}
              setPointsLine={handleImprovementPointsLine}
              circleColor={"var(--improve-pill-bg"}
              circleBorderColor={"var(--feedback-initial-name-color)"}
              strokeWidth={5}
              circleRadius={7.5}
            />
            <div className="sp-left__icon" aria-hidden="true">
              <img src={strengthImage} alt="" className="sp-left__img" />
            </div>
          </div>

          <div className="sp-right">
            <div className="sp-cols">
              <div className="sp-col">
                <div className="sp-col__header">
                  <div className="sp-col__header-title">
                    {improvementsGroupTitle}
                  </div>
                </div>
                <div className="sp-col__header-sub">
                  {improvementsGroupSubTitle}
                </div>

                <div className="sp-col__body" style={{ minHeight: arcHeight }}>
                  {improvementPoints.length === improvementsGroupItems.length &&
                    improvementsGroupItems.map((it, i) => (
                      <div
                        key={`ig-${i}`}
                        className="sp-row"
                        style={{
                          top:
                            improvementPoints[i].y -
                            (i === 1 ? rowTopAdjust : rowTopAdjust),
                        }}
                      >
                        <div
                          className="sp-row__line"
                          style={{
                            width: 160 - improvementPoints[i].x,
                            left: -(165 - improvementPoints[i].x),
                          }}
                        />
                        <div className="sp-pill">
                          {Number(it.score).toFixed(2)}
                        </div>
                        <div className="sp-card">{it.text}</div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="sp-divider" aria-hidden="true" />

              <div className="sp-col">
                <div className="sp-col__header sp-col__header--manager">
                  <div className="sp-col__header-title">
                    {improvementsManagerTitle}
                  </div>
                </div>
                <div className="sp-col__header-sub">
                  {improvementsManagerSubTitle}
                </div>

                <div className="sp-col__body sp-col__body--manager">
                  {improvementsManagerItems.map((it, idx) => (
                    <div key={`im-${idx}`} className="sp-row sp-row--manager">
                      <div className="sp-pill">
                        {Number(it.score).toFixed(2)}
                      </div>
                      <div className="sp-card">{it.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
    );

    return out;
  }, [
    arcColor,
    groupItems,
    groupSubTitle,
    groupTitle,
    handleImprovementPointsLine,
    handleStrengthPointsLine,
    improvementPoints.length,
    improvementsGroupItems,
    improvementsGroupSubTitle,
    improvementsGroupTitle,
    improvementsManagerItems,
    improvementsManagerSubTitle,
    improvementsManagerTitle,
    improvementsTitle,
    managerItems,
    managerSubTitle,
    managerTitle,
    strengthPoints.length,
    title,
  ]);

  return (
    // <div className="section-page-container">
    <AutoPaginatedSections
      blocks={blocks}
      pageWidth={794}
      pageHeight={1123}
      pagePadding={0}
      contentClassName="strengths-page"
      componentId="strengths-page"
    />
    // </div>
  );
};

export default StrengthsPage;
