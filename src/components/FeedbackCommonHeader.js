import React from "react";
import "../styles/feedbackCommonHeader.scss";

const FeedbackCommonHeader = ({
  title = "360° Survey Feedback – Key Highlights",
}) => {
  return (
    <div className="feedback-common-header">
      <div className="feedback-common-header__title">{title}</div>
      <div className="feedback-common-header__underline" />
    </div>
  );
};

export default FeedbackCommonHeader;
