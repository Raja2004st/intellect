import React, { useMemo } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import FeedbackCommonHeader from "./FeedbackCommonHeader";
import "../styles/stopDoingPage.scss";

const tokenize = (text) => {
  const src = String(text ?? "");
  const parts = src.split(/(\*\*[^*]+\*\*|\{red\}[^}]+\{\/red\})/g);
  return parts.filter(Boolean).map((p, idx) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={idx} className="sd-strong">
          {p.slice(2, -2)}
        </strong>
      );
    }
    if (p.startsWith("{red}") && p.endsWith("{/red}")) {
      return (
        <span key={idx} className="sd-red">
          {p.slice(5, -6)}
        </span>
      );
    }
    return <span key={idx}>{p}</span>;
  });
};

const StopDoingPage = ({
  title = "What the Nominee Should “Stop Doing”…",
  left = [
    "{red}Not to be too friendly with students{/red} (2)",
    "{red}Not to be too friendly or lenient with the students{/red}",
    "{red}Being friendly with the students{/red}",
    "{red}Requesting to stop more students friendly .{/red}",
    "{red}Be less approachable to the children{/red}",
    "{red}To be less approachable to the students.{/red}",
    "{red}Not to encourage students to approach Principal directly. It would be beneficial to reinforce respect for the teachers' authority.{/red}",
    "{red}He could have a more balanced approach when it comes to granting flexibility to students{/red}",
    "{red}Giving permission to students .{/red}",
    "Make an effort to spent more time with primary children.",
    "Sometimes {red}don't make fast decisions{/red}",
    "Before conclude the decision ,will check with principal",
  ],
  right = [
    "Help a school success by **helping identify** areas of weakness and **implementing solutions** to achieve the goals",
    "Principal handles any situation in a **very good** manner.",
    "He can take sometime out for himself.",
    "I feel my Principal's approach is **effective and well balanced**.",
    "As of now **no negative** issues with our Principal",
    "currently everything is **comfortable**.",
    "Everything is **good**.",
    "He is doing **perfect** things only",
    "There is nothing he needs to stop, he is doing well.",
    "None. Currently everything is **comfortable**.",
    "Nothing specifically, as of now everything going smoothly",
    "Nothing (7)/ Nil (4)/ None (3)/ - / NA/ No complaints/ Nothing Specific/ Nothing like that/ Nothing to mention",
  ],
  traitsTitle = "Most Predominant Leadership Trait",
  traitsSubtitle = "(Traits that occur more than once)",
  traits = [
    { text: "Humble", size: "lg" },
    { text: "Relationship\nBuilding", size: "lg" },
    { text: "Strong People Focus", size: "lg" },
    { text: "Builds Trust Quickly", size: "lg" },
    { text: "Fosters Collaboration", size: "md" },
    { text: "Positive Work Ethic", size: "md" },
    { text: "Motivates and\nEngages", size: "md" },
    { text: "Agile and Flexible", size: "md" },
    { text: "Strong Planning/\nOrganizational Skills,", size: "sm" },
    { text: "Fair and Objective", size: "sm" },
    { text: "Supports Well-Being", size: "sm" },
    { text: "Empowers Team Members", size: "sm" },
  ],
  footnote = "* This excludes self feedback",
}) => {
  const blocks = useMemo(() => {
    const out = [];

    out.push(
      <FeedbackCommonHeader key="sd-hdr" title={title} className="sd-header" />,
    );

    out.push(
      <div key="sd-grid" className="sd-grid" role="table" aria-label={title}>
        <div className="sd-col" role="rowgroup">
          {left.map((row, i) => (
            <div key={i} className="sd-row" role="row">
              <div className="sd-cell" role="cell">
                {tokenize(row)}
              </div>
            </div>
          ))}
        </div>
        <div className="sd-col" role="rowgroup">
          {right.map((row, i) => (
            <div key={i} className="sd-row" role="row">
              <div className="sd-cell" role="cell">
                {tokenize(row)}
              </div>
            </div>
          ))}
        </div>
      </div>,
    );

    out.push(
      <div key="sd-traits" className="sd-traits">
        <div className="sd-traits__header">
          <div className="sd-traits__title">{traitsTitle}</div>
          <div className="sd-traits__subtitle">{traitsSubtitle}</div>
          <div className="sd-traits__underline" aria-hidden="true" />
        </div>

        <div className="sd-traits__grid" role="list" aria-label="Most predominant traits">
          {traits.map((t, idx) => (
            <div
              key={`${t.text}-${idx}`}
              className={`sd-trait-card sd-trait-card--${t.size || "sm"}`.trim()}
              role="listitem"
            >
              {t.text}
            </div>
          ))}
        </div>
      </div>,
    );

    out.push(
      <div key="sd-foot" className="sd-footnote">
        {footnote}
      </div>,
    );

    return out;
  }, [
    footnote,
    left,
    right,
    title,
    traits,
    traitsSubtitle,
    traitsTitle,
  ]);

  return (
    // <div className="section-page-container">
      <AutoPaginatedSections
        blocks={blocks}
        pageWidth={794}
        pageHeight={1123}
        pagePadding={0}
        contentClassName="stop-doing-page"
        componentId="stop-doing"
      />
    // </div>
  );
};

export default StopDoingPage;
