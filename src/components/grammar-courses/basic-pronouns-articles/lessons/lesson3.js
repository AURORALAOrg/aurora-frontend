export const lesson3Data = {
  title: "Article The",
  description: "Learn when to use 'the' for specific things and second mentions",
  content: {
    theory: {
      title: "When to Use 'The'",
      rules: [
        {
          rule: "For specific items both people know",
          examples: ["Close the door", "The book on the table", "I like the red dress"]
        },
        {
          rule: "For second mention",
          examples: ["I saw a dog. The dog was friendly", "She bought a car. The car is blue"]
        },
        {
          rule: "For unique things",
          examples: ["the sun", "the moon", "the president", "the internet"]
        },
        {
          rule: "With superlatives",
          examples: ["the best student", "the tallest building", "the first day"]
        }
      ],
      exceptions: [
        "Some countries: the USA, the UK",
        "Instruments: She plays the piano",
        "Same/only: the same school, the only person"
      ]
    },
    examples: [
      {
        category: "Specific Things",
        sentences: [
          "Turn off the TV.",
          "The teacher is absent.",
          "Feed the cat.",
          "Lock the car."
        ]
      },
      {
        category: "Second Mention",
        sentences: [
          "I saw a movie. The movie was great.",
          "She bought a dress. The dress was expensive.",
          "There was a man. The man was tall."
        ]
      },
      {
        category: "Unique & Superlatives",
        sentences: [
          "The sun rises in the east.",
          "She's the smartest student.",
          "This is the best pizza.",
          "He was the first to arrive."
        ]
      }
    ]
  },
  exercises: [
    {
      type: "multiple_choice",
      title: "Specific Things",
      instructions: "Choose when both people know what you mean.",
      questions: [
        {
          question: "Please close _____ window. It's cold in here.",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "the",
          explanation: "Both people know which window."
        },
        {
          question: "_____ keys are on the kitchen counter.",
          options: ["A", "An", "The", "No article"],
          correctAnswer: "The",
          explanation: "Specific keys both people know."
        },
        {
          question: "Can you answer _____ phone? I'm busy.",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "the",
          explanation: "The specific phone that's ringing."
        },
        {
          question: "I left my wallet in _____ car.",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "the",
          explanation: "Specific car (my car)."
        }
      ]
    },
    {
      type: "multiple_choice",
      title: "The vs A/An",
      instructions: "Choose the right article.",
      questions: [
        {
          question: "I saw a dog in the park. _____ dog was very friendly.",
          options: ["A", "An", "The", "No article"],
          correctAnswer: "The",
          explanation: "Second mention of the dog."
        },
        {
          question: "She wants to buy _____ new laptop.",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "a",
          explanation: "First mention, not specific yet."
        },
        {
          question: "This is _____ most difficult exam I've ever taken.",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "the",
          explanation: "Superlatives need 'the'."
        },
        {
          question: "He is _____ only student who passed the test.",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "the",
          explanation: "'Only' makes it specific."
        }
      ]
    },
    {
      type: "fill_blanks",
      title: "Complete the Sentences",
      instructions: "Fill in the blanks.",
      questions: [
        {
          question: "We went to _____ restaurant. _____ food was delicious.",
          options: ["a, The", "the, The", "a, A", "the, A"],
          correctAnswer: "a, The",
          explanation: "First mention uses 'a restaurant', second mention uses 'the food' (referring to food at that specific restaurant)."
        },
        {
          question: "_____ earth revolves around _____ sun.",
          options: ["The, the", "A, a", "The, a", "A, the"],
          correctAnswer: "The, the",
          explanation: "Use 'the' for both because there's only one earth and one sun (unique items)."
        },
        {
          question: "She plays _____ piano beautifully.",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "the",
          explanation: "Use 'the' with musical instruments when talking about playing them in general."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      mistake: "Using 'a' for second mention",
      example: "❌ I saw a movie. A movie was great.",
      correction: "✅ I saw a movie. The movie was great.",
      explanation: "Use 'the' for second mentions."
    },
    {
      mistake: "Missing 'the' with superlatives",
      example: "❌ She is best student.",
      correction: "✅ She is the best student.",
      explanation: "Superlatives always need 'the'."
    },
    {
      mistake: "Wrong article with unique items",
      example: "❌ A sun is shining.",
      correction: "✅ The sun is shining.",
      explanation: "Unique things need 'the'."
    },
    {
      mistake: "Missing 'the' for specific things",
      example: "❌ Close door.",
      correction: "✅ Close the door.",
      explanation: "Use 'the' for specific items."
    }
  ]
};