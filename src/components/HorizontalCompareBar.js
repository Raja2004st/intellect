import React from "react";
import "../styles/horizontalCompareBar.scss";

const HorizontalCompareBar = ({
  selfLabel = "Self",
  othersLabel = "Others",
  self = 2.5,
  others = 4.0,
  max = 5,
  width = "100%",
  height = 70,
  colors = {
    self: "var(--color-green)", // dark green for Self
    others: "var(--color-gold)", // gold for managers/team
    track: "var(--color-bg)",
    border: "var(--color-muted)",
  },
  rows,
  showTicks = true,
}) => {
  const isNumericWidth = typeof width === "number";
  const containerStyle = {
    width: isNumericWidth ? width : "100%",
    "--hcb-border": colors.border,
    "--hcb-track": colors.track,
  };

  const barHeight = 18;
  const padX = 12;
  const colorPicker = (value) => {
    if (value < 3.5) {
      return "var(--color-gold)";
    } else if (value >= 3.5 && value < 4) {
      return "var(--color-mint)";
    } else if (value >= 4) {
      return "var(--color-green-mid)";
    }
    return "#ffffff";
  };

  const widthCSSVarFor = (value) => {
    if (isNumericWidth) {
      const innerWidth = width - 2; // border
      const trackWidth = innerWidth - padX * 2;
      const w = Math.max(0, Math.min(1, value / max)) * trackWidth;
      return `${w}px`;
    }
    const pct = Math.max(0, Math.min(1, value / max)) * 100;
    return `${pct}%`;
  };

  const labelColorFor = (hex) => {
    try {
      const h = (hex || "").replace("#", "");
      if (h.length !== 6) return "#ffffff";
      const r = parseInt(h.substring(0, 2), 16) / 255;
      const g = parseInt(h.substring(2, 4), 16) / 255;
      const b = parseInt(h.substring(4, 6), 16) / 255;
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      return luminance > 0.65 ? "#35624b" : "#ffffff";
    } catch {
      return "#ffffff";
    }
  };

  if (Array.isArray(rows) && rows.length) {
    return (
      <div
        role="figure"
        aria-label={`Horizontal bars up to ${max}`}
        className="hcb"
        style={{
          ...containerStyle,
          "--hcb-pad-x": `${padX}px`,
          "--hcb-bar-h": `${barHeight}px`,
        }}
      >
        <div className="hcb-rows">
          {rows.map((r, idx) => {
            const fill =
              r.value < 3.5
                ? "var(--color-gold)"
                : r.value >= 3.5 && r.value < 4
                ? "var(--color-mint)"
                : r.value >= 4
                ? "var(--color-green-mid)"
                : null;
            const textColor = r.textColor || labelColorFor(fill);
            return (
              <div
                key={idx}
                className={`hcb-row ${idx === 0 ? "hcb-row--first" : ""}`}
                style={{ "--hcb-row-h": `${barHeight + 15}px` }}
              >
                <div className="hcb-track">
                  <div
                    className="hcb-fill"
                    style={{
                      "--hcb-fill-w": widthCSSVarFor(r.value ?? 0),
                      "--hcb-fill-color": fill,
                    }}
                  />
                  <span
                    className="hcb-label"
                    style={{ "--hcb-label-color": textColor }}
                  >
                    {r.label}
                  </span>
                </div>
              </div>
            );
          })}
          <div className="hcb-bottom" />
        </div>

        {showTicks && (
          <div className="hcb-ticks" style={{ padding: `6px ${padX}px 6px` }}>
            {Array.from({ length: max + 1 }).map((_, i) => (
              <span key={i}>{i}</span>
            ))}
          </div>
        )}
      </div>
    );
  }

  let selfWidth, othersWidth;
  if (isNumericWidth) {
    const innerWidth = width - 2; // border
    const trackWidth = innerWidth - padX * 2;
    const selfW = Math.max(0, Math.min(1, self / max)) * trackWidth;
    const othersW = Math.max(0, Math.min(1, others / max)) * trackWidth;
    selfWidth = `${selfW}px`;
    othersWidth = `${othersW}px`;
  } else {
    const selfPct = Math.max(0, Math.min(1, self / max)) * 100;
    const othersPct = Math.max(0, Math.min(1, others / max)) * 100;
    selfWidth = `${selfPct}%`;
    othersWidth = `${othersPct}%`;
  }

  return (
    <div
      role="figure"
      aria-label={`${selfLabel} ${self} vs ${othersLabel} ${others} out of ${max}`}
      className="hcb"
      style={{
        ...containerStyle,
        padding: "0 0 6px",
        "--hcb-pad-x": `${padX}px`,
        "--hcb-bar-h": `${barHeight}px`,
      }}
    >
      <div className="hcb-rows">
        {/* Self row */}
        <div
          className="hcb-row hcb-row--self"
          // style={{ "--hcb-row-h": `${barHeight + 8}px` }}
        >
          <div className="hcb-track">
            <div
              className="hcb-fill"
              style={{
                "--hcb-fill-w": selfWidth,
                "--hcb-fill-color": colorPicker(self),
              }}
            />
            <span
              className="hcb-label"
              style={{ "--hcb-label-color": labelColorFor(colors.self) }}
            >
              {selfLabel}
            </span>
          </div>
        </div>

        {/* Others row */}
        <div
          className="hcb-row hcb-row--others"
          style={{ "--hcb-row-h": `${barHeight + 15}px` }}
        >
          <div className="hcb-track">
            <div
              className="hcb-fill"
              style={{
                "--hcb-fill-w": othersWidth,
                "--hcb-fill-color": colorPicker(others),
              }}
            />
            <span
              className="hcb-label"
              style={{ "--hcb-label-color": labelColorFor(colors.others) }}
            >
              {othersLabel}
            </span>
          </div>
        </div>
      </div>

      {showTicks && (
        <div className="hcb-ticks" style={{ padding: `6px ${padX}px 0` }}>
          {Array.from({ length: max + 1 }).map((_, i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default HorizontalCompareBar;
