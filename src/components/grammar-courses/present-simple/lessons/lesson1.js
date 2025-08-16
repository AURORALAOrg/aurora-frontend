export const lesson1Data = {
  title: "Positive Formation",
  description: "Learn how to form positive sentences in the present simple tense",
  content: {
    theory: {
      title: "Present Simple Formation Rules",
      rules: [
        {
          rule: "I/You/We/They + base verb",
          examples: ["I work", "You study", "We play", "They speak"]
        },
        {
          rule: "He/She/It + base verb + s",
          examples: ["He works", "She studies", "It plays", "The dog barks"]
        }
      ],
      exceptions: [
        "Verbs ending in -ch, -sh, -x, -o, -z: add -es (watch → watches, wash → washes)",
        "Verbs ending in consonant + y: change y to i + es (study → studies, try → tries)",
        "Verbs ending in vowel + y: just add -s (play → plays, stay → stays)"
      ]
    },
    examples: [
      {
        category: "Daily Activities",
        sentences: [
          "I wake up at 7 AM every morning.",
          "She drinks coffee before work.",
          "They go to the gym three times a week.",
          "He works in an office downtown."
        ]
      },
      {
        category: "Habits and Routines",
        sentences: [
          "I always brush my teeth before bed.",
          "She usually takes the bus to work.",
          "We often watch movies on weekends.",
          "He never eats fast food."
        ]
      }
    ]
  },
  exercises: [
    {
      type: "conjugation",
      title: "Verb Conjugation Practice",
      instructions: "Complete the sentences with the correct form of the verb in parentheses.",
      questions: [
        {
          question: "She _____ coffee every morning. (drink)",
          correctAnswer: "drinks",
          explanation: "Use 'drinks' because the subject is 'She' (third person singular), so we add -s to the base verb."
        },
        {
          question: "I _____ English lessons twice a week. (take)",
          correctAnswer: "take",
          explanation: "Use 'take' because the subject is 'I' (first person), so we use the base verb without -s."
        },
        {
          question: "He _____ in a big company. (work)",
          correctAnswer: "works",
          explanation: "Use 'works' because the subject is 'He' (third person singular), so we add -s to the base verb."
        },
        {
          question: "They _____ soccer every weekend. (play)",
          correctAnswer: "play",
          explanation: "Use 'play' because the subject is 'They' (third person plural), so we use the base verb without -s."
        },
        {
          question: "The cat _____ milk every day. (drink)",
          correctAnswer: "drinks",
          explanation: "Use 'drinks' because the subject is 'The cat' (third person singular), so we add -s to the base verb."
        }
      ]
    },
    {
      type: "sentence_completion",
      title: "Sentence Completion",
      instructions: "Complete the sentences with the correct form of the verb.",
      questions: [
        {
          question: "Complete: 'She _____ coffee every morning.'",
          options: ["drink", "drinks", "drinking", "drank"],
          correctAnswer: "drinks",
          explanation: "The correct answer is 'drinks' because 'She' is third person singular, requiring the -s ending."
        },
        {
          question: "Complete: 'I _____ to music while I work.'",
          options: ["listen", "listens", "listening", "listened"],
          correctAnswer: "listen",
          explanation: "The correct answer is 'listen' because 'I' is first person, so we use the base verb without -s."
        },
        {
          question: "Complete: 'He _____ his teeth twice a day.'",
          options: ["brush", "brushes", "brushing", "brushed"],
          correctAnswer: "brushes",
          explanation: "The correct answer is 'brushes' because 'He' is third person singular, requiring the -s ending."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      mistake: "Adding -s to all subjects",
      example: "❌ I works, You works, We works",
      correction: "✅ I work, You work, We work",
      explanation: "Only third person singular (he/she/it) takes -s in present simple."
    },
    {
      mistake: "Forgetting -s with third person singular",
      example: "❌ He work, She study, It play",
      correction: "✅ He works, She studies, It plays",
      explanation: "Third person singular subjects must have -s added to the verb."
    },
    {
      mistake: "Using -ing form instead of base verb",
      example: "❌ I am working every day, She is studying English",
      correction: "✅ I work every day, She studies English",
      explanation: "Present simple uses base verb form, not -ing form (which is present continuous)."
    }
  ]
}; 