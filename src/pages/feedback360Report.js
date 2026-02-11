import React from "react";
import FeedbackInitialPage from "../components/feedbackInitialPage";
import SurveyFeedback from "../components/surveyFeedback";
import "../styles/feedback360Report.scss";
import SuggestedGuidelines from "../components/suggestedGuidelines";
import StrengthsPage from "../components/StrengthsPage";
import SummaryByCompetencyPage from "../components/SummaryByCompetencyPage";

const Feedback360Report = () => {
  const competencyBiggerPictureItems = [
    {
      label: "Leadership Personality & Style",
      groupMean: 4.72,
      managerRating: 3.86,
      selfRating: 5,
    },
    {
      label: "Educational Quality & Student Outcomes",
      groupMean: 4.64,
      managerRating: 4.0,
      selfRating: 4.6,
    },
    {
      label: "Leadership for Staff Performance & Development",
      groupMean: 4.64,
      managerRating: 4.0,
      selfRating: 5,
    },
    {
      label: "Creating the Right Culture",
      groupMean: 4.57,
      managerRating: 3.33,
      selfRating: 4.33,
    },
  ];
  const competencyBiggerPictureOverallScore = 4.65;

  const summaryByCompetencyItems = [
    {
      label: "Generates energy and enthusiasm in\nthe team",
      groupMean: 4.67,
      managerRating: 3,
      selfRating: 5,
    },
    {
      label: "Has created a high performing culture\nin the team/school",
      groupMean: 4.53,
      managerRating: 3,
      selfRating: 4,
    },
    {
      label: "Has created a work culture that\nrewards merit",
      groupMean: 4.49,
      managerRating: 4,
      selfRating: 4,
    },
  ];
  const summaryByCompetencyOverallScore = 4.53;

  const globalData =
    typeof window !== "undefined" ? window.__FEEDBACK360_DATA__ : undefined;

  const biggerPictureItems =
    Array.isArray(competencyBiggerPictureItems) &&
    competencyBiggerPictureItems.length
      ? competencyBiggerPictureItems
      : globalData?.competencyBiggerPictureItems || [];

  const biggerPictureOverallScore =
    competencyBiggerPictureOverallScore !== undefined &&
    competencyBiggerPictureOverallScore !== null
      ? competencyBiggerPictureOverallScore
      : globalData?.competencyBiggerPictureOverallScore;

  const strengthsGroupItems = globalData?.strengthsGroupItems || [
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
  ];

  const strengthsManagerItems = globalData?.strengthsManagerItems || [
    {
      score: 5.0,
      text: "Manages school finances and payment approvals appropriately and maintains clear and accurate accounts",
    },
  ];

  return (
    <div className="feedbackreport-main-container">
      <div className="section-page">
        <FeedbackInitialPage />
      </div>
      <div className="section-page">
        <SurveyFeedback />
      </div>
      <div className="section-page">
        <SuggestedGuidelines
          items={biggerPictureItems}
          overallScore={biggerPictureOverallScore}
        />
      </div>
      <div className="section-page">
        <StrengthsPage
          startPage={6}
          groupItems={strengthsGroupItems}
          managerItems={strengthsManagerItems}
        />
      </div>
        <div className="section-page">
        <SummaryByCompetencyPage
          title="Summary by Competency – Creating the Right Culture"
          overallScore={summaryByCompetencyOverallScore}
          items={summaryByCompetencyItems}
        />
      </div>
    </div>
  );
};

export default Feedback360Report;
