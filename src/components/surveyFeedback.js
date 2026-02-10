import React from "react";
import FeedbackCommonHeader from "./FeedbackCommonHeader";
import "../styles/surveyFeedback.scss";
import PageFooter from "./PageFooter";

const SurveyFeedback = () => {
  return (
    <div className="survey-feedback-page">
      <FeedbackCommonHeader title="360° Survey Feedback – Key Highlights" />

      <div className="survey-feedback-content">
        <ul className="survey-feedback-bullets">
          <li>
            A powerful multi-dimensional leadership development tool that
            provides constructive feedback and actionable insights
          </li>
          <li>
            Provides a clear picture of how people within your own circle of
            influence experience you
          </li>
          <li>Provides clear insights on what you should</li>
        </ul>

        <div className="survey-feedback-icon-row" aria-label="Legend">
          <div className="survey-feedback-icon-item">
            <span className="survey-feedback-icon survey-feedback-icon--start">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span>Start doing</span>
          </div>

          <div className="survey-feedback-icon-item">
            <span className="survey-feedback-icon survey-feedback-icon--continue">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M6 6h4v12H6zM14 6h4v12h-4z" />
              </svg>
            </span>
            <span>Continue doing</span>
          </div>

          <div className="survey-feedback-icon-item">
            <span className="survey-feedback-icon survey-feedback-icon--stop">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 10c0 .79-.15 1.55-.42 2.25L9.75 7.42C10.45 7.15 11.21 7 12 7c2.76 0 5 2.24 5 5zM7 12c0-.79.15-1.55.42-2.25l6.83 6.83C13.55 16.85 12.79 17 12 17c-2.76 0-5-2.24-5-5z"
                />
              </svg>
            </span>
            <span>Stop doing</span>
          </div>
        </div>

        <ul className="survey-feedback-bullets">
          <li>
            Feedback provided by each Respondent is a combination of scores and
            comments -
          </li>
        </ul>
        <ul className="survey-feedback-subpoints">
          <li>
            Ratings on a scale of 1 to 5 (1- Strongly Disagree, 2-Disagree,
            3- No View, 4-Agree, 5-Strongly Agree)
          </li>
          <li>Qualitative Comments</li>
        </ul>

        <ul className="survey-feedback-bullets">
          <li>
            Feedback has been solicited and received from your Team Members (43)
            and Manager/s
          </li>
        </ul>
      </div>

   
    </div>
  );
};

export default SurveyFeedback;
