export const lesson2Data = {
  title: "Articles A & An",
  description: "Learn when to use 'a' and 'an' based on sound rules",
  content: {
    theory: {
      title: "A & An Rules",
      rules: [
        {
          rule: "Use 'a' before consonant sounds",
          examples: ["a cat", "a dog", "a university", "a European"]
        },
        {
          rule: "Use 'an' before vowel sounds", 
          examples: ["an apple", "an hour", "an honest person", "an umbrella"]
        },
        {
          rule: "Only with singular countable nouns",
          examples: ["a book", "an idea", "NOT: a water"]
        },
        {
          rule: "For first mentions",
          examples: ["I saw a movie", "She bought an expensive dress"]
        }
      ],
      exceptions: [
        "Silent h: an hour, an honest person",
        "University sounds like 'yu' so use 'a'",
        "FBI sounds like 'ef' so use 'an'"
      ]
    },
    examples: [
      {
        category: "With 'a'",
        sentences: [
          "She works in a bank.",
          "I need a pen.",
          "A university student called.",
          "She's wearing a uniform."
        ]
      },
      {
        category: "With 'an'", 
        sentences: [
          "An apple a day...",
          "I'll be back in an hour.",
          "She's an honest person.",
          "He's an engineer."
        ]
      }
    ]
  },
  exercises: [
    {
      type: "multiple_choice",
      title: "Choose A or An",
      instructions: "Pick 'a' or 'an'.",
      questions: [
        {
          question: "_____ university",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "a",
          explanation: "University sounds like 'yu', so use 'a'."
        },
        {
          question: "_____ hour",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "an",
          explanation: "Hour starts with vowel sound (h is silent)."
        },
        {
          question: "_____ honest person",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "an",
          explanation: "Honest starts with vowel sound (h is silent)."
        },
        {
          question: "_____ European country",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "a",
          explanation: "European sounds like 'yu', so use 'a'."
        }
      ]
    },
    {
      type: "sound_practice",
      title: "Sound Practice",
      instructions: "Think about the sound, not the spelling.",
      questions: [
        {
          question: "_____ umbrella",
          options: ["a", "an"],
          correctAnswer: "an",
          explanation: "Umbrella starts with vowel sound."
        },
        {
          question: "_____ uniform", 
          options: ["a", "an"],
          correctAnswer: "a",
          explanation: "Uniform sounds like 'yu'."
        },
        {
          question: "_____ FBI agent",
          options: ["a", "an"],
          correctAnswer: "an",
          explanation: "FBI sounds like 'ef'."
        },
        {
          question: "_____ one-way street",
          options: ["a", "an"],
          correctAnswer: "a",
          explanation: "One sounds like 'w'."
        }
      ]
    },
    {
      type: "fill_blanks",
      title: "Complete the Sentences",
      instructions: "Fill in with a or an.",
      questions: [
        {
          question: "I bought _____ new car.",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "a",
          explanation: "Car starts with consonant sound."
        },
        {
          question: "There's _____ elephant at the zoo.",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "an",
          explanation: "Elephant starts with vowel sound."
        },
        {
          question: "She found _____ interesting book.",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "an",
          explanation: "Interesting starts with vowel sound."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      mistake: "Going by spelling not sound",
      example: "❌ an university",
      correction: "✅ a university",
      explanation: "University sounds like 'yu' so use 'a'."
    },
    {
      mistake: "Forgetting silent h",
      example: "❌ a hour",
      correction: "✅ an hour", 
      explanation: "H is silent so use 'an'."
    },
    {
      mistake: "Using with uncountable nouns",
      example: "❌ a water",
      correction: "✅ water",
      explanation: "Don't use a/an with uncountables."
    },
    {
      mistake: "Wrong with acronyms",
      example: "❌ a FBI agent",
      correction: "✅ an FBI agent",
      explanation: "FBI sounds like 'ef' so use 'an'."
    }
  ]
};