import React, { useMemo, useState, useEffect } from "react";
import AutoPaginatedSections from "./AutoPaginatedSections";
import Header from "./header";
import EvaluatorRatingsTable from "./EvaluatorRatingsTable";
import "../styles/mainPage.scss";
import "../styles/contentPage.scss";

const defaultSections = [
  {
    titleIndex: "2.5.1.",
    title: "Leadership",
    indicators: [
      {
        label: "a.",
        text: "He/she applies first-principle thinking by breaking complex problems down to their core fundamentals before arriving at solutions.",
        rows: [
          {
            label: "Self",
            score: 3,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 1,
            gapFromSelf: 2,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 3,
            gapFromSelf: 4,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "b.",
        text: "He/she translates outcome lenses into clear quarterly, monthly, and weekly priorities.",
        rows: [
          {
            label: "Self",
            score: 1,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 2,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 4,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "c.",
        text: "He/she seeks and integrates feedback to strengthen thinking and outcomes.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "d.",
        text: "He/she makes well-reasoned, assertive decisions by seeking diverse perspectives and acknowledging mistakes.",
        rows: [
          {
            label: "Self",
            score: 1,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 2,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 4,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "e.",
        text: "He/she expands the organisational canvas by igniting passion and urgency in others.",
        rows: [
          {
            label: "Self",
            score: 1,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 2,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 4,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "f.",
        text: "He/she invests 10% of his/her time in developing talent and building team capability.",
        rows: [
          {
            label: "Self",
            score: 1,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 2,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 4,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
    ],
  },
  {
    titleIndex: "2.5.2.",
    title: "Bandwidth",
    indicators: [
      {
        label: "a.",
        text: "He/she manages priorities effectively in ambiguous or high-pressure situations.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "b.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
    ],
  },
  {
    titleIndex: "2.5.3.",
    title: "Sales and Customer Centricity",
    indicators: [
      {
        label: "a.",
        text: "He/she manages priorities effectively in ambiguous or high-pressure situations.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "b.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "c.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "d.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "e.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
    ],
  },
  {
    titleIndex: "2.5.4.",
    title: "Collaboration",
    indicators: [
      {
        label: "a.",
        text: "He/she manages priorities effectively in ambiguous or high-pressure situations.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "b.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "c.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "d.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
    ],
  },
  {
    titleIndex: "2.5.5.",
    title: "Operational Excellence",
    indicators: [
      {
        label: "a.",
        text: "He/she manages priorities effectively in ambiguous or high-pressure situations.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "b.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "c.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "d.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "e.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "f.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
    ],
  },
  {
    titleIndex: "2.5.6.",
    title: "Operational Excellence",
    indicators: [
      {
        label: "a.",
        text: "He/she manages priorities effectively in ambiguous or high-pressure situations.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "b.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "c.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "d.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "e.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "f.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
    ],
  },
  {
    titleIndex: "2.5.7.",
    title: "Expertise and Communication",
    indicators: [
      {
        label: "a.",
        text: "He/she manages priorities effectively in ambiguous or high-pressure situations.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "b.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "c.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "d.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "e.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
      {
        label: "f.",
        text: "He/she breaks down complex goals into clear, manageable work components.",
        rows: [
          {
            label: "Self",
            score: 2,
            gapFromSelf: 0,
            highlight: "Area of Improvement",
            color: "#b3792e",
          },
          {
            label: "Manager",
            score: 3,
            gapFromSelf: 1,
            highlight: "Area of Improvement",
            color: "#b8860b",
          },
          {
            label: "Peer",
            score: 4,
            gapFromSelf: 2,
            highlight: "Hidden Strength",
            color: "#a9d0b8",
          },
          {
            label: "Team Members",
            score: 5,
            gapFromSelf: 3,
            highlight: "Hidden Strength",
            color: "#0e4a2e",
          },
        ],
      },
    ],
  },
];

const BehaviouralIndicators = ({
  startPage = 17,
  pageWidth = 794,
  pageHeight = 1002,
  pagePadding = 10,
  note = "Note: For categories with more than one respondent, scores represent the mean of all individual ratings.",
  sections = defaultSections,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const componentId = useMemo(
    () => `behavioural-${startPage}-${Date.now()}`,
    [startPage]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, Math.random() * 150);

    return () => clearTimeout(timer);
  }, []);

  const blocks = useMemo(() => {
    if (!isMounted) return [];

    const out = [];

    // Title block
    out.push(
      <div
        key="title"
        style={{
          marginTop: 0,
          pageBreakInside: "avoid",
          breakInside: "avoid",
        }}
      >
        <h2
          className="content-page__title"
          style={{
            display: "inline-block",
            padding: "6px 10px",
            borderRadius: 2,
            margin: 0,
            color: "#0e4a2e",
            pageBreakAfter: "avoid",
            breakAfter: "avoid",
          }}
        >
          <span
            className="content-page__title-index"
            style={{ color: "#0e4a2e", marginRight: 6 }}
          >
            2.5.
          </span>
          <span className="content-page__title-text">
            LBSCORE Broken Down by Behavioural Indicators
          </span>
        </h2>
      </div>
    );

    // Note
    out.push(
      <div
        key="note"
        style={{
          marginTop: 10,
          color: "#333",
          pageBreakInside: "avoid",
          breakInside: "avoid",
        }}
      >
        <em style={{ fontSize: 13 }}>{note}</em>
      </div>
    );

    // Process sections with pagination-friendly structure
    sections.forEach((sec, secIdx) => {
      // Section header - keep with first indicator if possible
      out.push(
        <div
          key={`sec-header-${secIdx}`}
          style={{
            marginTop: 18,
            pageBreakInside: "avoid",
            breakInside: "avoid",
            pageBreakAfter: "avoid",
            breakAfter: "avoid",
          }}
        >
          <h3 style={{ color: "#0e4a2e", margin: 0 }}>
            <span style={{ marginRight: 6 }}>{sec.titleIndex}</span>
            <span>{sec.title}</span>
          </h3>
        </div>
      );

      sec.indicators.forEach((ind, indIdx) => {
        out.push(
          <div
            key={`ind-${secIdx}-${indIdx}`}
            style={{
              marginTop: 10,
              pageBreakInside: "avoid",
              breakInside: "avoid",
            }}
          >
            <div
              style={{
                color: "#0e4a2e",
                fontWeight: 600,
                display: "flex",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <span style={{ whiteSpace: "nowrap", fontSize: 14 }}>
                {ind.label}
              </span>
              <span style={{ color: "#333", fontWeight: 400, fontSize: 14 }}>
                {ind.text}
              </span>
            </div>
            <div
              style={{
                width: "100%",
                maxWidth: "100%",
                overflow: "hidden",
                marginTop: 8,
              }}
            >
              <EvaluatorRatingsTable
                title={`${sec.title} ${ind.label}`}
                rows={ind.rows}
                compact={true}
              />
            </div>
          </div>
        );
      });
    });

    return out;
  }, [sections, note, isMounted]);

  if (!isMounted) {
    return (
      <section
        className="section-page pdf-section"
        style={{ padding: pagePadding }}
      >
        <div className="content-page">
          <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
            Loading behavioural indicators...
          </div>
        </div>
      </section>
    );
  }

  return (
    <AutoPaginatedSections
      blocks={blocks}
      startPage={startPage}
      pageWidth={pageWidth}
      pageHeight={pageHeight}
      pagePadding={pagePadding}
      HeaderComponent={Header}
      contentClassName="content-page"
      componentId={componentId}
    />
  );
};

export default BehaviouralIndicators;
