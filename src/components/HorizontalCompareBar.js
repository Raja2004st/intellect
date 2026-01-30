import React from "react";

const HorizontalCompareBar = ({
  selfLabel = "Self",
  othersLabel = "Others",
  self = 2.5,
  others = 4.0,
  max = 5,
  width = "100%",
  height = 70,
  colors = {
    self: "#b3792e",
    others: "#a9d0b8",
    track: "#ffffff",
    border: "#d9d9d9",
  },
  // New: rows mode [{label, value, color?}]
  rows,
  showTicks = true,
}) => {
  const isNumericWidth = typeof width === "number";
  const containerStyle = {
    width: isNumericWidth ? width : "100%",
    border: `1px solid ${colors.border}`,
    background: colors.track,
    padding: "10px 0 6px",
  };

  const barHeight = 16;
  const padX = 12;

  // Helper to compute width style by value
  const widthStyleFor = (value) => {
    if (isNumericWidth) {
      const innerWidth = width - 2; // border
      const trackWidth = innerWidth - padX * 2;
      const w = Math.max(0, Math.min(1, value / max)) * trackWidth;
      return { width: w };
    } else {
      const pct = Math.max(0, Math.min(1, value / max)) * 100;
      return { width: `${pct}%` };
    }
  };

  // If rows supplied, render multi-row variant
  if (Array.isArray(rows) && rows.length) {
    return (
      <div
        role="figure"
        aria-label={`Horizontal bars up to ${max}`}
        style={containerStyle}
      >
        <div style={{ padding: `0 ${padX}px` }}>
          {rows.map((r, idx) => (
            <div
              key={idx}
              style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
            >
              <span
                style={{
                  width: 100,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#35624b",
                }}
              >
                {r.label}
              </span>
              <div
                style={{
                  position: "relative",
                  height: barHeight,
                  flex: 1,
                  background: "#f9faf9",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: barHeight,
                    background: r.color || colors.self,
                    ...widthStyleFor(r.value ?? 0),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        {showTicks && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: `6px ${padX}px 0`,
              fontSize: 12,
              color: "#666",
            }}
          >
            {Array.from({ length: max + 1 }).map((_, i) => (
              <span key={i}>{i}</span>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Original two-bar comparison fallback
  let selfStyle, othersStyle;
  if (isNumericWidth) {
    const innerWidth = width - 2; // border
    const trackWidth = innerWidth - padX * 2;
    const selfW = Math.max(0, Math.min(1, self / max)) * trackWidth;
    const othersW = Math.max(0, Math.min(1, others / max)) * trackWidth;
    selfStyle = { width: selfW };
    othersStyle = { width: othersW };
  } else {
    const selfPct = Math.max(0, Math.min(1, self / max)) * 100;
    const othersPct = Math.max(0, Math.min(1, others / max)) * 100;
    selfStyle = { width: `${selfPct}%` };
    othersStyle = { width: `${othersPct}%` };
  }

  return (
    <div
      role="figure"
      aria-label={`${selfLabel} ${self} vs ${othersLabel} ${others} out of ${max}`}
      style={containerStyle}
    >
      {/* bars */}
      <div style={{ padding: `0 ${padX}px` }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <span
            style={{
              width: 52,
              fontSize: 12,
              fontWeight: 700,
              color: "#35624b",
            }}
          >
            {selfLabel}
          </span>
          <div
            style={{
              position: "relative",
              height: barHeight,
              flex: 1,
              background: "#f9faf9",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: barHeight,
                background: colors.self,
                ...selfStyle,
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              width: 52,
              fontSize: 12,
              fontWeight: 700,
              color: "#35624b",
            }}
          >
            {othersLabel}
          </span>
          <div
            style={{
              position: "relative",
              height: barHeight,
              flex: 1,
              background: "#f9faf9",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: barHeight,
                background: colors.others,
                ...othersStyle,
              }}
            />
          </div>
        </div>
      </div>
      {/* ticks */}
      {showTicks && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: `6px ${padX}px 0`,
            fontSize: 12,
            color: "#666",
          }}
        >
          {Array.from({ length: max + 1 }).map((_, i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default HorizontalCompareBar;
