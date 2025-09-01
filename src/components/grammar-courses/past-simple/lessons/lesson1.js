export const lesson1Data = {
  title: "Regular Past Tense Formation",
  description: "Learn how to form regular past tense verbs with proper spelling rules and pronunciation patterns",
  content: {
    theory: {
      title: "Regular Past Tense Formation Rules",
      rules: [
        {
          rule: "Base verb + -ed",
          examples: ["work → worked", "play → played", "visit → visited", "learn → learned"]
        },
        {
          rule: "Verbs ending in -e: add -d only",
          examples: ["like → liked", "live → lived", "hope → hoped", "use → used"]
        },
        {
          rule: "Verbs ending in consonant + y: change y to i + -ed",
          examples: ["study → studied", "try → tried", "cry → cried", "carry → carried"]
        },
        {
          rule: "Verbs ending in vowel + y: add -ed normally",
          examples: ["play → played", "stay → stayed", "enjoy → enjoyed", "pray → prayed"]
        },
        {
          rule: "One-syllable verbs ending in consonant-vowel-consonant: double final consonant + -ed",
          examples: ["stop → stopped", "plan → planned", "drop → dropped", "rob → robbed"]
        }
      ],
      exceptions: [
        "Verbs ending in -w, -x, -y: don't double (show → showed, fix → fixed, play → played)",
        "Two-syllable verbs with stress on first syllable: don't double (visit → visited, happen → happened)",
        "Two-syllable verbs with stress on second syllable: double (prefer → preferred, occur → occurred)"
      ],
      importantNotes: [
        "Pronunciation: -ed can be pronounced as /t/, /d/, or /ɪd/ depending on the final sound of the base verb",
        "Most regular verbs follow the simple -ed rule",
        "Spelling changes are necessary to maintain proper pronunciation"
      ]
    },
    examples: [
      {
        category: "Daily Activities",
        sentences: [
          "I worked late yesterday.",
          "She studied for three hours last night.",
          "They played soccer in the park.",
          "He visited his grandmother last weekend."
        ]
      },
      {
        category: "Spelling Rules Examples",
        sentences: [
          "I stopped at the red light. (double consonant)",
          "She carried the heavy bags. (y → i)",
          "We liked the movie very much. (e → d)",
          "They planned the party carefully. (double consonant)"
        ]
      }
    ]
  },
  exercises: [
    {
      type: "verb_transformation",
      title: "Verb Transformation Practice",
      instructions: "Transform the verbs into their past simple form.",
      questions: [
        {
          question: "Past tense of 'play':",
          options: ["played", "plaied", "playd", "playied"],
          correctAnswer: "played",
          explanation: "The correct answer is 'played'. For verbs ending in vowel + y, we simply add -ed."
        },
        {
          question: "Past tense of 'stop':",
          options: ["stoped", "stopped", "stopd", "stoppied"],
          correctAnswer: "stopped",
          explanation: "The correct answer is 'stopped'. For one-syllable verbs ending in consonant-vowel-consonant, we double the final consonant and add -ed."
        },
        {
          question: "Past tense of 'study':",
          options: ["studied", "studyed", "studyd", "studyied"],
          correctAnswer: "studied",
          explanation: "The correct answer is 'studied'. For verbs ending in consonant + y, we change y to i and add -ed."
        },
        {
          question: "Past tense of 'like':",
          options: ["liked", "likeed", "likd", "likied"],
          correctAnswer: "liked",
          explanation: "The correct answer is 'liked'. For verbs ending in -e, we only add -d."
        }
      ]
    },
    {
      type: "spelling_correction",
      title: "Spelling Correction",
      instructions: "Choose the correctly spelled past tense form.",
      questions: [
        {
          question: "Which is the correct spelling?",
          options: ["planed", "planned", "plannd", "plan"],
          correctAnswer: "planned",
          explanation: "The correct spelling is 'planned'. For one-syllable verbs ending in consonant-vowel-consonant, we double the final consonant."
        },
        {
          question: "Which is the correct spelling?",
          options: ["carryed", "carried", "carryd", "carryied"],
          correctAnswer: "carried",
          explanation: "The correct spelling is 'carried'. For verbs ending in consonant + y, we change y to i and add -ed."
        },
        {
          question: "Which is the correct spelling?",
          options: ["hopeed", "hoped", "hopd", "hopeied"],
          correctAnswer: "hoped",
          explanation: "The correct spelling is 'hoped'. For verbs ending in -e, we only add -d."
        },
        {
          question: "Which is the correct spelling?",
          options: ["droped", "dropped", "dropd", "droppied"],
          correctAnswer: "dropped",
          explanation: "The correct spelling is 'dropped'. For one-syllable verbs ending in consonant-vowel-consonant, we double the final consonant."
        }
      ]
    },
    {
      type: "pronunciation_grouping",
      title: "Pronunciation Grouping",
      instructions: "Group the verbs according to their -ed pronunciation: /t/, /d/, or /ɪd/.",
      questions: [
        {
          question: "Which group does 'worked' belong to?",
          options: ["/t/ sound", "/d/ sound", "/ɪd/ sound"],
          correctAnswer: "/t/ sound",
          explanation: "'Worked' is pronounced with /t/ sound because the base verb 'work' ends with a voiceless consonant /k/."
        },
        {
          question: "Which group does 'lived' belong to?",
          options: ["/t/ sound", "/d/ sound", "/ɪd/ sound"],
          correctAnswer: "/d/ sound",
          explanation: "'Lived' is pronounced with /d/ sound because the base verb 'live' ends with a voiced consonant /v/."
        },
        {
          question: "Which group does 'wanted' belong to?",
          options: ["/t/ sound", "/d/ sound", "/ɪd/ sound"],
          correctAnswer: "/ɪd/ sound",
          explanation: "'Wanted' is pronounced with /ɪd/ sound because the base verb 'want' ends with /t/ or /d/."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      mistake: "Forgetting to double consonants",
      example: "❌ stoped, planed, droped",
      correction: "✅ stopped, planned, dropped",
      explanation: "One-syllable verbs ending in consonant-vowel-consonant need double final consonant + -ed."
    },
    {
      mistake: "Not changing y to i",
      example: "❌ studyed, carryed, tryed",
      correction: "✅ studied, carried, tried",
      explanation: "Verbs ending in consonant + y change y to i before adding -ed."
    },
    {
      mistake: "Adding -ed to verbs already ending in -e",
      example: "❌ likeed, hopeed, useed",
      correction: "✅ liked, hoped, used",
      explanation: "Verbs ending in -e only need -d added, not -ed."
    }
  ]
};
