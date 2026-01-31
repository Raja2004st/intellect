import React from "react";
import InitialPage from "../components/initialPage";
import "../styles/mainPage.scss";
import Header from "../components/header";
import ReportInfoTable from "../components/reportInfoTable";
import ContentPage from "../components/contentPage";
import TableContentPage from "../components/tableContentPage";
import { downloadPdfSplitByHeader } from "../utils/pdf";
import AboutAssessmentPages from "../components/aboutAssessmentPages";
import AboutSectionPages from "../components/aboutSectionPages";
import ScoringDefinition from "../components/ScoringDefinition";
import CompetencySummary from "../components/CompetencySummary";
import OverviewSummary from "../components/OverviewSummary";
import SpiderChartSummary from "../components/SpiderChartSummary";
import EvaluatorCategoryBreakdown from "../components/EvaluatorCategoryBreakdown";
import BehaviouralIndicators from "../components/BehaviouralIndicators";
import ParticipantCohortSummary from "../components/ParticipantCohortSummary";
import QualitativeFeedbackIntro from "../components/QualitativeFeedbackIntro";
import QualitativeFeedbackSection from "../components/QualitativeFeedbackSection";
import QualitativeFeedbackList from "../components/QualitativeFeedbackList";
import Highlights from "../components/Highlights";
import CoachingActionPlan from "../components/CoachingActionPlan";
import CoachingActionPlanPage2 from "../components/CoachingActionPlanPage2";
import IndividualDevelopmentPlan from "../components/IndividualDevelopmentPlan";

const MainPage = () => {
  const qualitativeSections = [
    {
      titleIndex: "3.1.",
      titleText: "Leadership",
      questions: [
        {
          index: "1.",
          text: "What do you consider the key leadership strengths demonstrated by the Participant?",
          colorTheme: "green",
          comments: [
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
          ],
        },
        {
          index: "2.",
          text: "Where do you see opportunities for the Participant to strengthen their leadership effectiveness?",
          colorTheme: "gold",
          comments: [
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
          ],
        },
      ],
    },
    {
      titleIndex: "3.2.",
      titleText: "Bandwidth",
      questions: [
        {
          index: "1.",
          text: "In what ways does the Participant effectively manage bandwidth and handle responsibilities with clarity and focus?",
          colorTheme: "green",
          comments: [
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
          ],
        },
        {
          index: "2.",
          text: "Where do you feel Participant could improve in managing workload, prioritization, or capacity planning?",
          colorTheme: "gold",
          comments: [
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
          ],
        },
      ],
    },
    {
      titleIndex: "3.3.",
      titleText: "Sales & Customer Centricity",
      questions: [
        {
          index: "1.",
          text: "What strengths does the Participant demonstrate in driving customer value or supporting sales outcomes?",
          colorTheme: "green",
          comments: [
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
          ],
        },
        {
          index: "2.",
          text: "Where do you see opportunities for the Participant to strengthen their leadership effectiveness?",
          colorTheme: "gold",
          comments: [
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
          ],
        },
      ],
    },
    {
      titleIndex: "3.4.",
      titleText: "Collaboration",
      questions: [
        {
          index: "1.",
          text: "What behaviors of the Participant positively contribute to collaboration and cross-functional teamwork?",
          colorTheme: "green",
          comments: [
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
          ],
        },
        {
          index: "2.",
          text: "Where do you see opportunities for the Participant to strengthen their leadership effectiveness?",
          colorTheme: "gold",
          comments: [
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
          ],
        },
      ],
    },
    {
      titleIndex: "3.5.",
      titleText: "Operational Excellence",
      questions: [
        {
          index: "1.",
          text: "What strengths does the Participant display in ensuring operational discipline, process alignment, or quality of execution?",
          colorTheme: "green",
          comments: [
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
          ],
        },
        {
          index: "2.",
          text: "Where do you see opportunities for the Participant to strengthen their leadership effectiveness?",
          colorTheme: "gold",
          comments: [
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
          ],
        },
      ],
    },
    {
      titleIndex: "3.6.",
      titleText: "Results Orientation",
      questions: [
        {
          index: "1.",
          text: "In what ways does the Participant demonstrate strong ownership and drive for results?",
          colorTheme: "green",
          comments: [
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
          ],
        },
        {
          index: "2.",
          text: "Where do you see opportunities for the Participant to strengthen their leadership effectiveness?",
          colorTheme: "gold",
          comments: [
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
          ],
        },
      ],
    },
    {
      titleIndex: "3.7.",
      titleText: "Expertise & Communication",
      questions: [
        {
          index: "1.",
          text: "What strengths does the Participant demonstrate in their expertise and communication?",
          colorTheme: "green",
          comments: [
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
          ],
        },
        {
          index: "2.",
          text: "Where do you see opportunities for the Participant to strengthen their leadership effectiveness?",
          colorTheme: "gold",
          comments: [
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
          ],
        },
      ],
    },
  ];
  const highlightsSections = [
    {
      startPage: 45,
      titleIndex: "4.",
      titleText: "Highlights",
      subIndex: "4.1.",
      subText: "Strengths",
      note: "Below are the top 5 statements where you received the highest ratings and are considered your key strengths.",
      arcColor: "#0e4a2e",
      chipColor: "#0e4a2e",
      dotsColor: "#0e4a2e",
      leftIcon: null,
      items: [
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
      ],
    },
    {
      startPage: 46,
      titleIndex: "4.",
      titleText: "Highlights",
      subIndex: "4.2.",
      subText: "Areas of Improvement",
      note: "Below are the 5 statements where you received the lowest ratings and are considered your areas of improvements.",
      arcColor: "#b37b2f",
      chipColor: "#b37b2f",
      dotsColor: "#b37b2f",
      leftIcon: null,
      items: [
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
      ],
    },
    {
      startPage: 45,
      titleIndex: "4.",
      // titleText: "Highlights",
      subIndex: "4.3.",
      subText: "Strengths",
      note: "Below are the top 5 statements where you received the highest ratings and are considered your key strengths.",
      arcColor: "#0e4a2e",
      chipColor: "#0e4a2e",
      dotsColor: "#0e4a2e",
      leftIcon: null,
      items: [
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
      ],
    },
    {
      startPage: 46,
      titleIndex: "4.",
      // titleText: "Highlights",
      subIndex: "4.4.",
      subText: "Areas of Improvement",
      note: "Below are the 5 statements where you received the lowest ratings and are considered your areas of improvements.",
      arcColor: "#b37b2f",
      chipColor: "#b37b2f",
      dotsColor: "#b37b2f",
      leftIcon: null,
      items: [
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
        {
          score: 2.5,
          title: "Negotiation",
          desc: "Is flexible and works well in a fast paced and dynamic environment",
        },
      ],
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "12px 16px",
        }}
      >
        <button
          onClick={downloadPdfSplitByHeader}
          style={{
            padding: "8px 14px",
            background: "#0e4a2e",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Download PDF
        </button>
      </div>
      <div className="section-page-container">
        <section className="section-page pdf-section">
          <InitialPage />
        </section>
        <section className="section-page pdf-section">
          <ContentPage />
        </section>
        <section className="section-page pdf-section">
          <TableContentPage />
        </section>
        <AboutAssessmentPages />
        <AboutSectionPages />
        <ScoringDefinition />
        <AboutSectionPages
          startPage={10}
          titleIndex="1.4."
          titleText="LBSCORE Element Snapshot"
          sections={[
            {
              chip: "Leadership",
              items: [
                {
                  tail: "Crafts and communicates a clear, future-ready direction aligned with Intellect’s values",
                },
                {
                  tail: "Creates an environment where people feel safe to question assumptions, learn, and contribute openly",
                },
                {
                  tail: "Makes sound decisions by combining structured thinking, diverse perspectives, and professional judgement",
                },
                {
                  tail: "Invests time and intent in developing talent and building leadership capability in others",
                },
                {
                  tail: "Encourages teams to think beyond immediate tasks and consider broader, system-wide impact",
                },
              ],
            },
            {
              chip: "Bandwidth",
              items: [
                {
                  tail: "Remains calm and decisive in ambiguous or high-pressure situations",
                },
                {
                  tail: "Breaks down complex goals into clear priorities and manageable work components",
                },
                {
                  tail: "Thinks across strategic, operational, and delivery lenses without losing focus",
                },
                {
                  tail: "Mobilises people and resources through networks and influence, not just hierarchy",
                },
                {
                  tail: "Challenges existing ways of working to simplify execution and improve predictability",
                },
              ],
            },
            {
              chip: "Sales & Customer Centricity",
              items: [
                {
                  tail: "Seeks deep customer and market understanding through data, observation, and dialogue",
                },
                {
                  tail: "Anticipates underlying needs and emerging opportunities beyond stated requirements",
                },
                {
                  tail: "Designs solutions that deliver meaningful value and strengthen long-term partnerships",
                },
                {
                  tail: "Communicates a clear and consistent customer experience across functions and touchpoints",
                },
                {
                  tail: "Positions offerings with a focus on outcomes and shared success",
                },
              ],
            },
            {
              chip: "Sales & Customer Centricity",
              items: [
                {
                  tail: "Seeks deep customer and market understanding through data, observation, and dialogue",
                },
                {
                  tail: "Anticipates underlying needs and emerging opportunities beyond stated requirements",
                },
                {
                  tail: "Designs solutions that deliver meaningful value and strengthen long-term partnerships",
                },
                {
                  tail: "Communicates a clear and consistent customer experience across functions and touchpoints",
                },
                {
                  tail: "Positions offerings with a focus on outcomes and shared success",
                },
              ],
            },
            {
              chip: "Sales & Customer Centricity",
              items: [
                {
                  tail: "Seeks deep customer and market understanding through data, observation, and dialogue",
                },
                {
                  tail: "Anticipates underlying needs and emerging opportunities beyond stated requirements",
                },
                {
                  tail: "Designs solutions that deliver meaningful value and strengthen long-term partnerships",
                },
                {
                  tail: "Communicates a clear and consistent customer experience across functions and touchpoints",
                },
                {
                  tail: "Positions offerings with a focus on outcomes and shared success",
                },
              ],
            },
            {
              chip: "Sales & Customer Centricity",
              items: [
                {
                  tail: "Seeks deep customer and market understanding through data, observation, and dialogue",
                },
                {
                  tail: "Anticipates underlying needs and emerging opportunities beyond stated requirements",
                },
                {
                  tail: "Designs solutions that deliver meaningful value and strengthen long-term partnerships",
                },
                {
                  tail: "Communicates a clear and consistent customer experience across functions and touchpoints",
                },
                {
                  tail: "Positions offerings with a focus on outcomes and shared success",
                },
              ],
            },
            {
              chip: "Sales & Customer Centricity",
              items: [
                {
                  tail: "Seeks deep customer and market understanding through data, observation, and dialogue",
                },
                {
                  tail: "Anticipates underlying needs and emerging opportunities beyond stated requirements",
                },
                {
                  tail: "Designs solutions that deliver meaningful value and strengthen long-term partnerships",
                },
                {
                  tail: "Communicates a clear and consistent customer experience across functions and touchpoints",
                },
                {
                  tail: "Positions offerings with a focus on outcomes and shared success",
                },
              ],
            },
            {
              chip: "Sales & Customer Centricity",
              items: [
                {
                  tail: "Seeks deep customer and market understanding through data, observation, and dialogue",
                },
                {
                  tail: "Anticipates underlying needs and emerging opportunities beyond stated requirements",
                },
                {
                  tail: "Designs solutions that deliver meaningful value and strengthen long-term partnerships",
                },
                {
                  tail: "Communicates a clear and consistent customer experience across functions and touchpoints",
                },
                {
                  tail: "Positions offerings with a focus on outcomes and shared success",
                },
              ],
            },
          ]}
        />
        <CompetencySummary startPage={12} />
        <OverviewSummary
          startPage={13}
          items={[
            { label: "Leadership", self: 2.5, others: 4.0 },
            { label: "Bandwidth", self: 2.4, others: 4.1 },
            { label: "Sales and Customer Centricity", self: 2.6, others: 4.2 },
            { label: "Collaboration", self: 2.5, others: 4.0 },
            { label: "Operational Excellence", self: 2.7, others: 4.1 },
            { label: "Result Orientation", self: 2.5, others: 4.0 },
            { label: "Expertise and Communication", self: 2.6, others: 4.1 },
          ]}
        />
        <SpiderChartSummary />
        <EvaluatorCategoryBreakdown />
        <BehaviouralIndicators startPage={16} />
        <ParticipantCohortSummary startPage={26} />
        {/* <QualitativeFeedbackIntro startPage={30} />
        {qualitativeSections.map((sec, i) => (
          <QualitativeFeedbackList
            key={`qsec-${i}`}
            startPage={31 + i}
            titleIndex={sec.titleIndex}
            titleText={sec.titleText}
            questions={sec.questions}
          />
        ))}
    */}
      </div>
    </div>
  );
};

export default MainPage;
