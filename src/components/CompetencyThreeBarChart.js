import React, { useMemo } from "react";
import "../styles/competencyThreeBarChart.scss";

const DEFAULT_LEGEND = [
  {
    key: "groupMean",
    label: "Group Mean (Teachers & Office Staff)",
    color: "var(--chart-series-group-mean)",
  },
  {
    key: "managerRating",
    label: "Manager Rating",
    color: "var(--chart-series-manager-rating)",
  },
  {
    key: "selfRating",
    label: "Self Rating",
    color: "var(--chart-series-self-rating)",
  },
];

const clamp01 = (n) => Math.min(1, Math.max(0, n));

const parseNum = (v) => {
  const n = Number(v);
  if (Number.isFinite(n)) return n;
  const f = parseFloat(v);
  return Number.isFinite(f) ? f : 0;
};

const formatDefault = (n) => {
  if (!Number.isFinite(n)) return "0";
  const fixed = n.toFixed(2);
  return fixed.replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
};

const CompetencyThreeBarChart = ({
  items = [],
  max = 5,
  legendItems = DEFAULT_LEGEND,
  formatValue = formatDefault,
  className = "",
}) => {
  const ticks = useMemo(
    () => Array.from({ length: max + 1 }, (_, i) => i),
    [max],
  );

  const showCallouts = useMemo(
    () => items.some((it) => Boolean(it?.callout)),
    [items]
  );

  return (
    <div
      className={`ctbc ${showCallouts ? "ctbc--callouts" : ""} ${className}`.trim()}
    >
      <div className="ctbc__rows">
        {items.map((row, idx) => {
          const gm = parseNum(row.groupMean);
          const mgr = parseNum(row.managerRating);
          const self = parseNum(row.selfRating);

          const gmW = `${clamp01(gm / max) * 100}%`;
          const mgrW = `${clamp01(mgr / max) * 100}%`;
          const selfW = `${clamp01(self / max) * 100}%`;

          return (
            <div
              key={row.label || idx}
              className={`ctbc-row ${idx === 0 ? "ctbc-row--first" : ""} ${idx === items.length - 1 ? "ctbc-row--last" : ""}`}
            >
              <div className="ctbc-row__label">{row.label}</div>

              <div className="ctbc-row__bars">
                <div className="tbc-row-hr-line"></div>
                <div className="ctbc-bar">
                  <div className="ctbc-bar__track" aria-label="Group mean bar">
                    <div
                      className="ctbc-bar__fill"
                      style={{
                        width: gmW,
                        background: "var(--chart-series-group-mean)",
                      }}
                    />
                    {gm !== 0 && <div className="ctbc-bar__value">{formatValue(gm)}</div>}
                  </div>
                </div>

                <div className="ctbc-bar">
                  <div
                    className="ctbc-bar__track"
                    aria-label="Manager rating bar"
                  >
                    <div
                      className="ctbc-bar__fill"
                      style={{
                        width: mgrW,
                        background: "var(--chart-series-manager-rating)",
                      }}
                    />
                   {mgr !== 0 && <div className="ctbc-bar__value">{formatValue(mgr)}</div>}
                  </div>
                </div>

                <div className="ctbc-bar">
                  <div className="ctbc-bar__track" aria-label="Self rating bar">
                    <div
                      className="ctbc-bar__fill"
                      style={{
                        width: selfW,
                        background: "var(--chart-series-self-rating)",
                      }}
                    />
                    {self !== 0 && <div className="ctbc-bar__value">{formatValue(self)}</div>}
                  </div>
                </div>

                {row.callout ? (
                  <div
                    className={`ctbc-row__callout ctbc-row__callout--${row.callout.variant || "info"}`}
                  >
                    <div className="ctbc-row__callout-arrow" aria-hidden="true" />
                    <div className="ctbc-row__callout-text">{row.callout.text}</div>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className="ctbc__footer">
        <div className="ctbc__ticks" aria-label={`Scale 0 to ${max}`}>
          {ticks.map((t) => (
            <span key={t} className="ctbc__tick">
              {t}
            </span>
          ))}
        </div>
        <div className="ctbc__legend" aria-label="Chart legend">
          {legendItems.map((it) => (
            <div key={it.key} className="ctbc-legend-item">
              <span
                className="ctbc-legend-item__swatch"
                style={{ background: it.color }}
              />
              <span className="ctbc-legend-item__label">{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetencyThreeBarChart;
