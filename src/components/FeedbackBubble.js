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
  borderColor = "#123b2b",
  avatarBg = "#0e4a2e",
  textColor = "#333",
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
      <div style={{ paddingTop: "10px" }}>
        <div
          className="fb-avatar"
          style={{ background: avatarBg, borderColor }}
        >
          {icon || <PersonIcon size={20} color="#fff" />}
        </div>
      </div>
      <div
        className="fb-bubble"
        style={{
          background: bubbleColor,
          color: textColor,
          "--fb-border": borderColor,
        }}
      >
        <textarea
          className="fb-textarea"
          style={{ color: textColor, fontSize: 14 }}
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
