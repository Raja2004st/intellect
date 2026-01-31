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

const MainPage = () => {
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
        <QualitativeFeedbackIntro startPage={30} />
        <QualitativeFeedbackSection
          startPage={31}
          titleIndex="3.1."
          titleText="Leadership"
          questionIndex="1."
          questionText="What do you consider the key leadership strengths demonstrated by the Participant?"
          comments={[
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
            "Sample",
          ]}
        />
      </div>
    </div>
  );
};

export default MainPage;
