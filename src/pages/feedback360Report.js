import React from "react";
import FeedbackInitialPage from "../components/feedbackInitialPage";
import SurveyFeedback from "../components/surveyFeedback";
import "../styles/feedback360Report.scss";

const Feedback360Report = () => {
  return (
    <div className="feedbackreport-main-container">
      <div className="section-page">
        <FeedbackInitialPage />
      </div>
      <div className="section-page">
        <SurveyFeedback />
      </div>
    </div>
  );
};

export default Feedback360Report;
