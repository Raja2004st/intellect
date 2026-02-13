import React from "react";
import FeedbackInitialPage from "../components/feedbackInitialPage";
import SurveyFeedback from "../components/surveyFeedback";
import "../styles/feedback360Report.scss";
import SuggestedGuidelines from "../components/suggestedGuidelines";
import StrengthsPage from "../components/StrengthsPage";
import SummaryByCompetencyPage from "../components/SummaryByCompetencyPage";
import StaffPerformanceSummaryByCompetencyPage from "../components/StaffPerformanceSummaryByCompetencyPage";
import EngagementWithManagementSummaryByCompetencyPage from "../components/EngagementWithManagementSummaryByCompetencyPage";
import NomineesLeadershipStylePage from "../components/NomineesLeadershipStylePage";
import QualitativeFeedbackCoverPage from "../components/QualitativeFeedbackCoverPage";
import ContinueDoingPage from "../components/ContinueDoingPage";
import StopDoingPage from "../components/StopDoingPage";
import { downloadPdfSplitByHeader } from "../utils/pdf";

const Feedback360Report = () => {
  const competencyBiggerPictureItems = [
    {
      label: "Leadership Personality & Style",
      groupMean: 4.72,
      managerRating: 3.86,
      selfRating: 5,
    },
    {
      label: "Educational Quality & Student Outcomes",
      groupMean: 4.64,
      managerRating: 4.0,
      selfRating: 4.6,
    },
    {
      label: "Leadership for Staff Performance & Development",
      groupMean: 4.64,
      managerRating: 4.0,
      selfRating: 5,
    },
    {
      label: "Creating the Right Culture",
      groupMean: 4.57,
      managerRating: 3.33,
      selfRating: 4.33,
    },
  ];

  const engagementWithManagementItems = [
    {
      label:
        "Manages school finances and payment approvals\nappropriately and maintains clear & accurate accounts",
      managerRating: 5,
      selfRating: 5,
    },
    {
      label:
        "Raises relevant issues at the right time and in the right\nway to the Management on topics of importance to the\nschool",
      managerRating: 4,
      selfRating: 5,
    },
    {
      label: "Develops future leaders within the school",
      managerRating: 3,
      selfRating: 5,
    },
  ];

  const educationalQualityCompetencyItems = [
    {
      label:
        "Works with teachers to set high academic standards\nthat rise above minimum expectations",
      groupMean: 4.7,
      selfRating: 5,
    },
    {
      label:
        "Visits classrooms to observe and monitor the quality of\ncurriculum, assessments and instruction that engage\nstudents in successful learning",
      groupMean: 4.68,
      selfRating: 4,
    },
    {
      label:
        "Ensures that teachers have appropriate resources to\nmeet the needs of each student",
      groupMean: 4.63,
      selfRating: 5,
    },
    {
      label:
        "Facilitates opportunities for teachers to transfer and\nmentor other teachers on best practices",
      groupMean: 4.63,
      selfRating: 4,
    },
    {
      label:
        "Builds a passion and sense of urgency amongst staff\nmembers for them to make continuous improvements\nto the quality of learning for every student",
      groupMean: 4.55,
      selfRating: 5,
    },
  ];

  const staffPerformanceCompetencyItems = [
    {
      label:
        "Provides opportunities for career/professional development\nand growth",
      groupMean: 4.74,
      selfRating: 5,
    },
    {
      label:
        "Provides enough support, direction and guidance whenever\nrequired, for effective performance of team members",
      groupMean: 4.72,
      selfRating: 5,
    },
    {
      label: "Helps in resolving issues/remove roadblocks in the job",
      groupMean: 4.7,
      selfRating: 5,
    },
    {
      label: "Makes the team members feel empowered to take decisions",
      groupMean: 4.63,
      selfRating: 5,
    },
    {
      label: "Delegates effectively",
      groupMean: 4.53,
      selfRating: 5,
    },
    {
      label:
        "Gives clear feedback about performance or when anything\ngoes right or wrong",
      groupMean: 4.49,
      selfRating: 5,
    },
  ];
  const competencyBiggerPictureOverallScore = 4.65;

  const summaryByCompetencyItems = [
    {
      label: "Generates energy and enthusiasm in\nthe team",
      groupMean: 4.67,
      managerRating: 3,
      selfRating: 5,
    },
    {
      label: "Has created a high performing culture\nin the team/school",
      groupMean: 4.53,
      managerRating: 3,
      selfRating: 4,
    },
    {
      label: "Has created a work culture that\nrewards merit",
      groupMean: 4.49,
      managerRating: 4,
      selfRating: 4,
    },
  ];
  const summaryByCompetencyLeadershipItems = [
    {
      label:
        "Builds rapport with people and treats team members\nwith respect and dignity",
      groupMean: 4.91,
      managerRating: 4,
      selfRating: 5,
    },
    {
      label: "Leads without aggression or arrogance",
      groupMean: 4.91,
      managerRating: 4,
      selfRating: 5,
    },
    {
      label:
        "Does not misuse his/her power or authority in any direct\nor indirect ways",
      groupMean: 4.86,
      managerRating: 4,
      selfRating: 5,
    },
    {
      label: "Makes one feel valued as an individual",
      groupMean: 4.77,
      managerRating: 4,
      selfRating: 5,
    },
    {
      label: "Handles ambiguous situations well",
      groupMean: 4.65,
      managerRating: 4,
      selfRating: 5,
    },
    {
      label:
        "Values diverse perspectives, even if they are different\nfrom his/her own",
      groupMean: 4.58,
      managerRating: 4,
      selfRating: 5,
    },
    {
      label:
        "Usually makes the right decisions promptly and on time\nwithout undue delay",
      groupMean: 4.35,
      managerRating: 3,
      selfRating: 5,
    },
  ];

  const summaryByCompetencyOverallScore = 4.53;
  const summaryByCompetencyLeadershipOverallScore = 4.7;
  const staffPerformanceCompetencyOverallScore = 4.64;
  const educationalQualityCompetencyOverallScore = 4.63;
  const engagementWithManagementOverallScore = 4.5;

  const globalData =
    typeof window !== "undefined" ? window.__FEEDBACK360_DATA__ : undefined;

  const biggerPictureItems =
    Array.isArray(competencyBiggerPictureItems) &&
    competencyBiggerPictureItems.length
      ? competencyBiggerPictureItems
      : globalData?.competencyBiggerPictureItems || [];

  const biggerPictureOverallScore =
    competencyBiggerPictureOverallScore !== undefined &&
    competencyBiggerPictureOverallScore !== null
      ? competencyBiggerPictureOverallScore
      : globalData?.competencyBiggerPictureOverallScore;

  const strengthsGroupItems = globalData?.strengthsGroupItems || [
    {
      score: 4.91,
      text: "Builds rapport with people and treats them with respect and dignity",
    },
    {
      score: 4.91,
      text: "Leads without aggression or arrogance",
    },
    {
      score: 4.86,
      text: "Builds rapport with people and treats them with respect and dignity",
    },
  ];

  const strengthsManagerItems = globalData?.strengthsManagerItems || [
    {
      score: 5.0,
      text: "Manages school finances and payment approvals appropriately and maintains clear and accurate accounts",
    },
  ];

  const mostPredominantLeadershipTraitColumns = [
    [
      "Humble.",
      "**Very humble, Good Team spirit, Motivation**",
      "Always kind to all , appreciation, motivation to build good citizens.",
      "**Kindness and respect** to all",
      "As a newcomer, I feel he consistently shows **respect** for the staff, listens **attentively** to our concerns , and takes **thoughtful steps** to address any issues.",
      "Being **respectful** to co-workers, his commitment towards the school and enthusiasm.",
      "Giving respect to all and easily approachable.",
      "He respects every individual in the organization **without any bias**",
      "His commitment and dedication towards the school and the respect given to everyone in the school with **dignity**.",
      "His way of making work environment a **happy and peaceful place** with a lot of **respect and dignity**.",
      "**Respectful, accountable, reliable, committed, team spirit.**",
      "Valuing the Teachers and **Equality**",
      "**Giving direction** and guiding to do activities like education",
      "By **encouraging** and guiding us with lot of positive words",
    ],
    [
      "**Encouraging and guiding** us in the right path",
      "**Advising and guiding** us the right part",
      "He is highly approachable & provide necessary guidance whenever needed. So, I can say he is mostly having participative style of leadership which I like very well.",
      "Provides **opportunities for growth (2)** and trustworthy",
      "Providing more **professional development**",
      "**Vision**, and passionate about education and is approachable, communicative skills strong and able to lead by example",
      "**Great motivator** and inspires staff and students all the time.",
      "Keeps encouraging and motivating the staff to do activities in the school/class apart from teaching.",
      "His willingness to **listen** makes him a good leader.",
      "**Observation, Listening, analyzing each person and problem from all angles**, simply approaching everything 360 degrees.",
      "Principal sir is very calm and good listener . And very passionate",
      "**Emotionally stable**, Balancing with teachers ,Parents and students as well.",
      "**Self-discipline**",
      "**Delegates the work well**",
    ],
    [
      'A Principal should possess the ability to analyze situations thoroughly and foresee potential challenges. He/she must prepare to address issues before they escalate, and ensure he/she is well-informed about matters within the school. He/she should say "NO" firmly when required.',
      "**Impartial**",
      "**Non partial (2)**",
      "**Unbiased**",
      "**patience (2)**",
      "Keeps his schedule flexible",
      "Integrity must be at the core of leadership",
      "His belief in students and staff.",
      "Should be able to coach, delegate, communicate and be proactive, Leader should influence and guide the people.",
      "Tensionless work culture, developing confidence in staff, keeping full confidence in teachers. handling diplomatically the situations",
      "The one thing that can make a principal stand out as a leader is their ability to **inspire and empower** others.",
      "Effective leaders develop the art and skill of being truly coachable.",
      "Leaders should seek to take the road in situation.",
    ],
  ];

  const immediateActionAreasSummary = {
    title: "Immediate Action Areas - Summary",
    description:
      "Repeated themes, if any are captured as a snapshot to facilitate understanding and further action",
    note: "Note: If comments have been very diverse with no commonality, it will not be captured here but can be referenced in the individual slides",
    columns: {
      continue: [
        "Demonstrating a humble, calm and kind leadership where all individuals feel valued and heard",
        "Fostering a happy, harmonious and peaceful work environment",
        "Providing guidance with positivity and encouragement, helping teachers and students move in the right direction",
      ],
      start: [
        "Striking a balance between being approachable and maintaining firm boundaries with students to reinforce discipline",
        "Strengthening accountability by setting clear expectations and targets for teachers, ensuring timely completion of responsibilities",
        "Implementing compulsory enhancement classes for students who need additional academic support",
      ],
      stop: [
        "Being overly lenient in situations where firmness is required; Ensuring that students adhere to discipline effectively",
      ],
    },
  };

  return (
    <div className="feedbackreport-main-container">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "12px 16px",
          gap: 8,
        }}
      >
        <button
          onClick={downloadPdfSplitByHeader}
          style={{
            padding: "8px 14px",
            background: "var(--color-green)",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            // display: "none",
          }}
        >
          Download PDF
        </button>
      </div>
      <div className="section-page pdf-section">
        <FeedbackInitialPage />
      </div>
      <div className="section-page">
        <SurveyFeedback />
      </div>
      <div className="section-page">
        <SuggestedGuidelines
          items={biggerPictureItems}
          overallScore={biggerPictureOverallScore}
        />
      </div>
      <div className="section-page">
        <StrengthsPage
          startPage={6}
          groupItems={strengthsGroupItems}
          managerItems={strengthsManagerItems}
        />
      </div>
      <div className="section-page">
        <SummaryByCompetencyPage
          title="Summary by Competency – Creating the Right Culture"
          overallScore={summaryByCompetencyOverallScore}
          items={summaryByCompetencyItems}
          leadershipOverallScore={summaryByCompetencyLeadershipOverallScore}
          leadershipItems={summaryByCompetencyLeadershipItems}
          barHeight={12}
        />
      </div>
      <div className="section-page">
        <StaffPerformanceSummaryByCompetencyPage
          overallScore={staffPerformanceCompetencyOverallScore}
          items={staffPerformanceCompetencyItems}
          title2="Summary by Competency – Educational Quality & Student Outcomes"
          overallScore2={educationalQualityCompetencyOverallScore}
          items2={educationalQualityCompetencyItems}
          barHeight={6}
        />
      </div>
      <div className="section-page">
        <EngagementWithManagementSummaryByCompetencyPage
          overallScore={engagementWithManagementOverallScore}
          items={engagementWithManagementItems}
        />
      </div>
      <div className="section-page">
        <QualitativeFeedbackCoverPage />
      </div>
      <div className="section-page">
        <NomineesLeadershipStylePage />
      </div>
      <div className="section-page">
        <ContinueDoingPage />
      </div>
      <div className="section-page">
        <StopDoingPage />
      </div>
      <div className="section-page">
        <ContinueDoingPage
          title="Most Predominant Leadership Trait"
          columns={mostPredominantLeadershipTraitColumns}
        />
      </div>
      <div className="section-page">
        <ContinueDoingPage
          title={"Immediate Action Areas - Summary"}
          columns={[[], [], []]}
          footnote={""}
          immediateActionSummary={immediateActionAreasSummary}
        />
      </div>
    </div>
  );
};

export default Feedback360Report;
