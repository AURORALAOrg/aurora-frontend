export const lesson2Data = {
  title: "Negative & Questions",
  description: "Learn how to form negative sentences and questions in the present simple tense",
  content: {
    theory: {
      title: "Negative and Question Formation",
      rules: [
        {
          rule: "Negative: Subject + don't/doesn't + base verb",
          examples: ["I don't work", "She doesn't study", "They don't play", "He doesn't speak"]
        },
        {
          rule: "Questions: Do/Does + subject + base verb?",
          examples: ["Do you work?", "Does she study?", "Do they play?", "Does he speak?"]
        },
        {
          rule: "Short Answers: Yes/No + subject + do/does or don't/doesn't",
          examples: ["Yes, I do", "No, she doesn't", "Yes, they do", "No, he doesn't"]
        }
      ],
      importantNotes: [
        "Use 'don't' with I, you, we, they",
        "Use 'doesn't' with he, she, it",
        "In questions, always use the base verb (without -s)",
        "Short answers don't repeat the main verb"
      ]
    },
    examples: [
      {
        category: "Negative Sentences",
        sentences: [
          "I don't like coffee.",
          "She doesn't work on weekends.",
          "They don't speak French.",
          "He doesn't eat meat."
        ]
      },
      {
        category: "Questions",
        sentences: [
          "Do you speak English?",
          "Does she work here?",
          "Do they live in the city?",
          "Does he play tennis?"
        ]
      },
      {
        category: "Short Answers",
        sentences: [
          "Do you like pizza? - Yes, I do. / No, I don't.",
          "Does she work here? - Yes, she does. / No, she doesn't.",
          "Do they speak Spanish? - Yes, they do. / No, they don't."
        ]
      }
    ]
  },
  exercises: [
    {
      type: "negative_formation",
      title: "Negative Formation",
      instructions: "Make the following sentences negative using don't or doesn't.",
      questions: [
        {
          question: "Make negative: 'He speaks English.'",
          options: [
            "He don't speak English",
            "He doesn't speak English",
            "He not speak English",
            "He no speaks English"
          ],
          correctAnswer: "He doesn't speak English",
          explanation: "Use 'doesn't' because the subject is 'He' (third person singular)."
        },
        {
          question: "Make negative: 'I work on weekends.'",
          options: [
            "I don't work on weekends",
            "I doesn't work on weekends",
            "I not work on weekends",
            "I no work on weekends"
          ],
          correctAnswer: "I don't work on weekends",
          explanation: "Use 'don't' because the subject is 'I' (first person)."
        },
        {
          question: "Make negative: 'She studies French.'",
          options: [
            "She don't study French",
            "She doesn't study French",
            "She not study French",
            "She no study French"
          ],
          correctAnswer: "She doesn't study French",
          explanation: "Use 'doesn't' because the subject is 'She' (third person singular)."
        },
        {
          question: "Make negative: 'They live in London.'",
          options: [
            "They don't live in London",
            "They doesn't live in London",
            "They not live in London",
            "They no live in London"
          ],
          correctAnswer: "They don't live in London",
          explanation: "Use 'don't' because the subject is 'They' (third person plural)."
        }
      ]
    },
    {
      type: "question_formation",
      title: "Question Formation",
      instructions: "Form questions from the given statements.",
      questions: [
        {
          question: "Form question: 'She works here.'",
          options: [
            "Do she work here?",
            "Does she work here?",
            "Is she work here?",
            "She work here?"
          ],
          correctAnswer: "Does she work here?",
          explanation: "Use 'Does' because the subject is 'She' (third person singular)."
        },
        {
          question: "Form question: 'You speak Spanish.'",
          options: [
            "Do you speak Spanish?",
            "Does you speak Spanish?",
            "Are you speak Spanish?",
            "You speak Spanish?"
          ],
          correctAnswer: "Do you speak Spanish?",
          explanation: "Use 'Do' because the subject is 'You' (second person)."
        },
        {
          question: "Form question: 'They live in Paris.'",
          options: [
            "Do they live in Paris?",
            "Does they live in Paris?",
            "Are they live in Paris?",
            "They live in Paris?"
          ],
          correctAnswer: "Do they live in Paris?",
          explanation: "Use 'Do' because the subject is 'They' (third person plural)."
        },
        {
          question: "Form question: 'He plays tennis.'",
          options: [
            "Do he play tennis?",
            "Does he play tennis?",
            "Is he play tennis?",
            "He play tennis?"
          ],
          correctAnswer: "Does he play tennis?",
          explanation: "Use 'Does' because the subject is 'He' (third person singular)."
        }
      ]
    },
    {
      type: "short_answers",
      title: "Short Answers",
      instructions: "Choose the correct short answer for each question.",
      questions: [
        {
          question: "Do you like coffee?",
          options: [
            "Yes, I like",
            "Yes, I do",
            "Yes, I am",
            "Yes, I have"
          ],
          correctAnswer: "Yes, I do",
          explanation: "Short answers use 'do/does' or 'don't/doesn't', not the main verb."
        },
        {
          question: "Does she work here?",
          options: [
            "No, she work not",
            "No, she doesn't",
            "No, she not",
            "No, she don't"
          ],
          correctAnswer: "No, she doesn't",
          explanation: "Use 'doesn't' because the subject is 'She' (third person singular)."
        },
        {
          question: "Do they speak English?",
          options: [
            "Yes, they speak",
            "Yes, they do",
            "Yes, they are",
            "Yes, they have"
          ],
          correctAnswer: "Yes, they do",
          explanation: "Short answers use 'do/does' or 'don't/doesn't', not the main verb."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      mistake: "Using 'doesn't' with I, you, we, they",
      example: "❌ I doesn't work, You doesn't study",
      correction: "✅ I don't work, You don't study",
      explanation: "Use 'don't' with I, you, we, they; use 'doesn't' only with he, she, it."
    },
    {
      mistake: "Using 'don't' with he, she, it",
      example: "❌ He don't work, She don't study",
      correction: "✅ He doesn't work, She doesn't study",
      explanation: "Use 'doesn't' with he, she, it; use 'don't' with I, you, we, they."
    },
    {
      mistake: "Adding -s to verbs in questions",
      example: "❌ Does she works here?, Do you speaks English?",
      correction: "✅ Does she work here?, Do you speak English?",
      explanation: "In questions, always use the base verb without -s, even with third person singular."
    },
    {
      mistake: "Repeating the main verb in short answers",
      example: "❌ Do you like coffee? - Yes, I like",
      correction: "✅ Do you like coffee? - Yes, I do",
      explanation: "Short answers use 'do/does' or 'don't/doesn't', not the main verb."
    }
  ]
}; 