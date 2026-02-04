import React from "react";
import "../styles/feedbackBubble.scss";

const PersonIcon = ({ size = 18, color = "#fff" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="8" r="4" fill={color} />
    <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" fill={color} />
  </svg>
);

const FeedbackBubble = ({
  text = "Sample",
  icon,
  bubbleColor = "#fff",
  borderColor = "var(--color-green)",
  avatarBg = "var(--color-green)",
  textColor = "var(--color-text)",
  compact = false,
  style,
  className = "",
  value,
  onChange,
  placeholder,
  rows = 2,
  readOnly = false,
}) => {
  return (
    <div
      className={`fb-row ${
        compact ? "fb-row--compact" : ""
      } ${className}`.trim()}
      style={style}
    >
      <div className="fb-avatar-wrap">
        <div
          className="fb-avatar"
          style={{ "--fb-avatar-bg": avatarBg, "--fb-border": borderColor }}
        >
          {icon || <PersonIcon size={20} color="#fff" />}
        </div>
      </div>
      <div
        className="fb-bubble"
        style={{
          "--fb-bubble-bg": bubbleColor,
          "--fb-text-color": textColor,
          "--fb-border": borderColor,
        }}
      >
        <textarea
          className="fb-textarea"
          value={typeof value === "string" ? value : undefined}
          onChange={onChange}
          defaultValue={typeof value === "string" ? undefined : text}
          placeholder={placeholder}
          rows={rows}
          readOnly={readOnly || !onChange}
        />
      </div>
    </div>
  );
};

export default FeedbackBubble;
