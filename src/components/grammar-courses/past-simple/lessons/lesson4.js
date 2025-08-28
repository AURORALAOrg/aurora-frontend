export const lesson4Data = {
  title: "Time Expressions with Past Simple",
  description: "Learn to use time expressions to describe when past events happened",
  content: {
    theory: {
      title: "Time Expressions with Past Simple",
      rules: [
        {
          rule: "Specific time expressions",
          examples: ["yesterday", "last week/month/year", "two days ago", "in 2010", "on Monday"]
        },
        {
          rule: "Duration expressions",
          examples: ["for two hours", "for three days", "for a week", "for months"]
        },
        {
          rule: "Age and life period expressions",
          examples: ["when I was young", "when I was a child", "when I lived in Paris", "when I studied at university"]
        },
        {
          rule: "Sequence expressions",
          examples: ["first", "then", "after that", "finally", "before", "after"]
        }
      ],
      exceptions: [
        "Some time expressions can be used with other tenses (now, today, this week)",
        "Past time expressions are often used with past simple but can also be used with other past tenses",
        "The position of time expressions can vary in the sentence"
      ],
      importantNotes: [
        "Time expressions help clarify when an action happened in the past",
        "They are essential for storytelling and describing past experiences",
        "Some expressions are more specific than others"
      ]
    },
    examples: [
      {
        category: "Specific Time",
        sentences: [
          "I graduated from university in 2015.",
          "She visited Paris last summer.",
          "They moved to London two years ago.",
          "He started his new job yesterday."
        ]
      },
      {
        category: "Life Periods",
        sentences: [
          "When I was young, I played soccer every day.",
          "She studied French when she lived in Montreal.",
          "They traveled a lot when they were students.",
          "He worked as a teacher when he was in his twenties."
        ]
      }
    ]
  },
  exercises: [
    {
      type: "time_expression_selection",
      title: "Time Expression Selection",
      instructions: "Choose the appropriate time expression for each sentence.",
      questions: [
        {
          question: "I graduated from university three years _____.",
          options: ["ago", "before", "last", "past"],
          correctAnswer: "ago",
          explanation: "The correct answer is 'ago'. 'Ago' is used to indicate how much time has passed since an event."
        },
        {
          question: "She visited her grandmother _____ week.",
          options: ["last", "past", "before", "ago"],
          correctAnswer: "last",
          explanation: "The correct answer is 'last'. 'Last week' refers to the week before the current one."
        },
        {
          question: "They moved to New York _____ 2018.",
          options: ["in", "on", "at", "since"],
          correctAnswer: "in",
          explanation: "The correct answer is 'in'. Use 'in' with years to indicate when something happened."
        },
        {
          question: "He started learning English _____ he was 10 years old.",
          options: ["when", "while", "during", "since"],
          correctAnswer: "when",
          explanation: "The correct answer is 'when'. 'When' is used to indicate a specific time in the past."
        },
        {
          question: "We met _____ Monday.",
          options: ["on", "in", "at", "since"],
          correctAnswer: "on",
          explanation: "The correct answer is 'on'. Use 'on' with days of the week."
        }
      ]
    },
    {
      type: "sentence_completion",
      title: "Sentence Completion",
      instructions: "Complete the sentences with appropriate time expressions.",
      questions: [
        {
          question: "Complete: 'I _____ to the movies _____ night.'",
          options: ["went / last", "go / yesterday", "went / yesterday", "go / last"],
          correctAnswer: "went / last",
          explanation: "The correct answer is 'went / last'. Use past simple with 'last night'."
        },
        {
          question: "Complete: 'She _____ in London _____ 2010.'",
          options: ["lived / in", "lives / in", "lived / on", "lives / on"],
          correctAnswer: "lived / in",
          explanation: "The correct answer is 'lived / in'. Use past simple with 'in 2010'."
        },
        {
          question: "Complete: 'They _____ soccer _____ they were children.'",
          options: ["played / when", "play / when", "played / while", "play / while"],
          correctAnswer: "played / when",
          explanation: "The correct answer is 'played / when'. Use past simple with 'when' to indicate a past period."
        },
        {
          question: "Complete: 'He _____ his car _____ month.'",
          options: ["sold / last", "sells / last", "sold / past", "sells / past"],
          correctAnswer: "sold / last",
          explanation: "The correct answer is 'sold / last'. Use past simple with 'last month'."
        }
      ]
    },
    {
      type: "timeline_creation",
      title: "Timeline Creation",
      instructions: "Put the events in chronological order based on the time expressions.",
      questions: [
        {
          question: "Put in order: 'I graduated in 2015.' 'I started university in 2011.' 'I got my first job in 2016.'",
          options: ["2011, 2015, 2016", "2015, 2011, 2016", "2016, 2015, 2011", "2011, 2016, 2015"],
          correctAnswer: "2011, 2015, 2016",
          explanation: "The correct order is 2011, 2015, 2016. First I started university, then graduated, then got my first job."
        },
        {
          question: "Put in order: 'I woke up at 7 AM.' 'I had breakfast at 8 AM.' 'I left for work at 9 AM.'",
          options: ["7 AM, 8 AM, 9 AM", "8 AM, 7 AM, 9 AM", "9 AM, 8 AM, 7 AM", "7 AM, 9 AM, 8 AM"],
          correctAnswer: "7 AM, 8 AM, 9 AM",
          explanation: "The correct order is 7 AM, 8 AM, 9 AM. This follows the natural morning routine."
        },
        {
          question: "Put in order: 'I was born in 1990.' 'I graduated high school in 2008.' 'I got married in 2015.'",
          options: ["1990, 2008, 2015", "2008, 1990, 2015", "2015, 2008, 1990", "1990, 2015, 2008"],
          correctAnswer: "1990, 2008, 2015",
          explanation: "The correct order is 1990, 2008, 2015. This follows the natural life progression."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      mistake: "Using present time expressions with past simple",
      example: "❌ I went to the store today. I studied yesterday now.",
      correction: "✅ I went to the store yesterday. I studied yesterday.",
      explanation: "Use past time expressions with past simple tense."
    },
    {
      mistake: "Incorrect preposition usage",
      example: "❌ I graduated on 2015. I met her in Monday.",
      correction: "✅ I graduated in 2015. I met her on Monday.",
      explanation: "Use 'in' with years and 'on' with days of the week."
    },
    {
      mistake: "Confusing 'ago' and 'before'",
      example: "❌ I saw him before two days. I graduated ago 2010.",
      correction: "✅ I saw him two days ago. I graduated in 2010.",
      explanation: "Use 'ago' to indicate time passed since an event, 'before' to indicate sequence."
    }
  ]
};
