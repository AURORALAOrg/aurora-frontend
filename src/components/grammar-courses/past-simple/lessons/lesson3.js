export const lesson3Data = {
  title: "Past Simple Questions & Negatives",
  description: "Learn how to form questions and negative sentences in the past simple tense",
  content: {
    theory: {
      title: "Past Simple Questions and Negatives",
      rules: [
        {
          rule: "Questions: Did + subject + base verb?",
          examples: ["Did you go to school?", "Did she study hard?", "Did they play soccer?", "Did he work late?"]
        },
        {
          rule: "Negatives: Subject + didn't + base verb",
          examples: ["I didn't go to school.", "She didn't study hard.", "They didn't play soccer.", "He didn't work late."]
        },
        {
          rule: "Short answers: Yes/No + subject + did/didn't",
          examples: ["Yes, I did.", "No, she didn't.", "Yes, they did.", "No, he didn't."]
        },
        {
          rule: "Wh-questions: Wh-word + did + subject + base verb?",
          examples: ["Where did you go?", "What did she study?", "When did they play?", "Why did he work?"]
        }
      ],
      exceptions: [
        "The verb 'be' doesn't use 'did' for questions: Was/Were + subject + complement?",
        "The verb 'be' doesn't use 'didn't' for negatives: Subject + wasn't/weren't + complement",
        "Short answers with 'be': Yes/No + subject + was/were or wasn't/weren't"
      ],
      importantNotes: [
        "Always use the base verb (infinitive) after 'did' and 'didn't', never the past form",
        "Questions and negatives are the same for all subjects (I, you, he, she, it, we, they)",
        "Short answers are very common in conversation"
      ]
    },
    examples: [
      {
        category: "Questions",
        sentences: [
          "Did you finish your homework?",
          "Where did you go last weekend?",
          "What did she say about the movie?",
          "When did they arrive at the party?"
        ]
      },
      {
        category: "Negatives",
        sentences: [
          "I didn't see the movie.",
          "She didn't like the food.",
          "They didn't come to the meeting.",
          "He didn't understand the lesson."
        ]
      }
    ]
  },
  exercises: [
    {
      type: "question_formation",
      title: "Question Formation",
      instructions: "Form questions from the given statements.",
      questions: [
        {
          question: "Make question: 'She visited her grandmother.'",
          options: ["Did she visit her grandmother?", "Did she visited her grandmother?", "She visited her grandmother?", "Visited she her grandmother?"],
          correctAnswer: "Did she visit her grandmother?",
          explanation: "The correct answer is 'Did she visit her grandmother?' Use 'Did + subject + base verb' for past simple questions."
        },
        {
          question: "Make question: 'They played soccer yesterday.'",
          options: ["Did they play soccer yesterday?", "Did they played soccer yesterday?", "They played soccer yesterday?", "Played they soccer yesterday?"],
          correctAnswer: "Did they play soccer yesterday?",
          explanation: "The correct answer is 'Did they play soccer yesterday?' Remember to use the base verb 'play', not 'played'."
        },
        {
          question: "Make question: 'He worked late last night.'",
          options: ["Did he work late last night?", "Did he worked late last night?", "He worked late last night?", "Worked he late last night?"],
          correctAnswer: "Did he work late last night?",
          explanation: "The correct answer is 'Did he work late last night?' Use the base verb 'work' after 'did'."
        },
        {
          question: "Make question: 'We studied for the exam.'",
          options: ["Did we study for the exam?", "Did we studied for the exam?", "We studied for the exam?", "Studied we for the exam?"],
          correctAnswer: "Did we study for the exam?",
          explanation: "The correct answer is 'Did we study for the exam?' Use the base verb 'study' after 'did'."
        }
      ]
    },
    {
      type: "negative_sentences",
      title: "Negative Sentences",
      instructions: "Form negative sentences from the given statements.",
      questions: [
        {
          question: "Make negative: 'I went to the store.'",
          options: ["I didn't go to the store.", "I didn't went to the store.", "I not went to the store.", "I no went to the store."],
          correctAnswer: "I didn't go to the store.",
          explanation: "The correct answer is 'I didn't go to the store.' Use 'didn't + base verb' for past simple negatives."
        },
        {
          question: "Make negative: 'She liked the movie.'",
          options: ["She didn't like the movie.", "She didn't liked the movie.", "She not liked the movie.", "She no liked the movie."],
          correctAnswer: "She didn't like the movie.",
          explanation: "The correct answer is 'She didn't like the movie.' Use the base verb 'like' after 'didn't'."
        },
        {
          question: "Make negative: 'They came to the party.'",
          options: ["They didn't come to the party.", "They didn't came to the party.", "They not came to the party.", "They no came to the party."],
          correctAnswer: "They didn't come to the party.",
          explanation: "The correct answer is 'They didn't come to the party.' Use the base verb 'come' after 'didn't'."
        },
        {
          question: "Make negative: 'He saw the accident.'",
          options: ["He didn't see the accident.", "He didn't saw the accident.", "He not saw the accident.", "He no saw the accident."],
          correctAnswer: "He didn't see the accident.",
          explanation: "The correct answer is 'He didn't see the accident.' Use the base verb 'see' after 'didn't'."
        }
      ]
    },
    {
      type: "short_answer_practice",
      title: "Short Answer Practice",
      instructions: "Choose the correct short answer for each question.",
      questions: [
        {
          question: "Did you finish your homework? (Yes)",
          options: ["Yes, I did.", "Yes, I finished.", "Yes, I do.", "Yes, I have."],
          correctAnswer: "Yes, I did.",
          explanation: "The correct answer is 'Yes, I did.' Use 'did' for positive short answers in past simple."
        },
        {
          question: "Did she go to the party? (No)",
          options: ["No, she didn't.", "No, she not.", "No, she went not.", "No, she no."],
          correctAnswer: "No, she didn't.",
          explanation: "The correct answer is 'No, she didn't.' Use 'didn't' for negative short answers in past simple."
        },
        {
          question: "Did they study for the test? (Yes)",
          options: ["Yes, they did.", "Yes, they studied.", "Yes, they do.", "Yes, they have."],
          correctAnswer: "Yes, they did.",
          explanation: "The correct answer is 'Yes, they did.' Use 'did' for positive short answers in past simple."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      mistake: "Using past form after 'did'",
      example: "❌ Did you went? Did she studied?",
      correction: "✅ Did you go? Did she study?",
      explanation: "After 'did', always use the base verb (infinitive), never the past form."
    },
    {
      mistake: "Using past form after 'didn't'",
      example: "❌ I didn't went. She didn't studied.",
      correction: "✅ I didn't go. She didn't study.",
      explanation: "After 'didn't', always use the base verb (infinitive), never the past form."
    },
    {
      mistake: "Incorrect short answers",
      example: "❌ Yes, I went. No, she not.",
      correction: "✅ Yes, I did. No, she didn't.",
      explanation: "Use 'did' for positive short answers and 'didn't' for negative short answers."
    }
  ]
};
