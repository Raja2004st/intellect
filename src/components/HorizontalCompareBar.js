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
    self: "#0e4a2e", // dark green for Self
    others: "#b37b2f", // gold for managers/team
    track: "#ffffff",
    border: "#d9d9d9",
  },
  rows,
  showTicks = true,
}) => {
  const isNumericWidth = typeof width === "number";
  const containerStyle = {
    width: isNumericWidth ? width : "100%",
    border: `1px solid ${colors.border}`,
    background: colors.track,
  };

  const barHeight = 18;
  const padX = 12;

  // width helper used for both modes
  const widthStyleFor = (value) => {
    if (isNumericWidth) {
      const innerWidth = width - 2; // border
      const trackWidth = innerWidth - padX * 2;
      const w = Math.max(0, Math.min(1, value / max)) * trackWidth;
      return { width: w };
    }
    const pct = Math.max(0, Math.min(1, value / max)) * 100;
    return { width: `${pct}%` };
  };

  // Decide a readable label color based on fill
  const labelColorFor = (hex) => {
    try {
      const h = hex.replace("#", "");
      const r = parseInt(h.substring(0, 2), 16) / 255;
      const g = parseInt(h.substring(2, 4), 16) / 255;
      const b = parseInt(h.substring(4, 6), 16) / 255;
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      return luminance > 0.65 ? "#35624b" : "#ffffff";
    } catch {
      return "#ffffff";
    }
  };

  // Strict rows design (bars only, NO right value column)
  if (Array.isArray(rows) && rows.length) {
    return (
      <div
        role="figure"
        aria-label={`Horizontal bars up to ${max}`}
        style={containerStyle}
      >
        {/* Bars area with inner grid lines (no outer padding; per-row inner margin) */}
        <div>
          {rows.map((r, idx) => {
            const fill = r.color || colors.self;
            const textColor = r.textColor || labelColorFor(fill);
            return (
              <div
                key={idx}
                style={{
                  position: "relative",
                  height: barHeight + 15,
                  background: "#ffffff",
                  borderTop: idx === 0 ? "none" : `1px solid ${colors.border}`,
                }}
              >
                {/* inner track */}
                <div
                  style={{
                    position: "relative",
                    height: barHeight,
                    marginTop: 7,
                  }}
                >
                  {/* fill */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: barHeight,
                      background: fill,
                      ...widthStyleFor(r.value ?? 0),
                    }}
                  />
                  {/* label inside bar */}
                  <span
                    style={{
                      position: "absolute",
                      left: 6,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 12,
                      fontWeight: 700,
                      color: textColor,
                    }}
                  >
                    {r.label}
                  </span>
                </div>
              </div>
            );
          })}
          {/* bottom border to close the grid */}
          <div style={{ borderTop: `1px solid ${colors.border}` }} />
        </div>

        {/* X-axis ticks under the bars */}
        {showTicks && (
          <div
            style={{
              padding: `6px ${padX}px 6px`,
              display: "flex",
              justifyContent: "space-between",
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
      style={{ ...containerStyle, padding: "4px 0 6px" }}
    >
      {/* bars (rows-style, labels inside, no outer padding) */}
      <div>
        {/* Self row */}
        <div
          style={{
            position: "relative",
            height: barHeight + 8,
            background: "#ffffff",
          }}
        >
          <div
            style={{ position: "relative", height: barHeight, marginTop: 7 }}
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
            <span
              style={{
                position: "absolute",
                left: 6,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 12,
                fontWeight: 700,
                color: labelColorFor(colors.self),
              }}
            >
              {selfLabel}
            </span>
          </div>
        </div>

        {/* Others row */}
        <div
          style={{
            position: "relative",
            height: barHeight + 15,
            background: "#ffffff",
            borderTop: `1px solid ${colors.border}`,
          }}
        >
          <div
            style={{ position: "relative", height: barHeight, marginTop: 7 }}
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
            <span
              style={{
                position: "absolute",
                left: 6,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 12,
                fontWeight: 700,
                color: labelColorFor(colors.others),
              }}
            >
              {othersLabel}
            </span>
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
