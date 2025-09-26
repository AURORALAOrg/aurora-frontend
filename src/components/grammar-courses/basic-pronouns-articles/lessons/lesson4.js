export const lesson4Data = {
  title: "When NOT to Use Articles",
  description: "Learn when to skip articles with general statements, names, and languages",
  content: {
    theory: {
      title: "No Article Needed",
      rules: [
        {
          rule: "General plural statements",
          examples: ["Dogs are friendly", "Books are expensive", "Students need motivation"]
        },
        {
          rule: "Uncountable nouns in general",
          examples: ["Water is essential", "Music helps me relax", "Love is important"]
        },
        {
          rule: "Names of people and most places",
          examples: ["John lives in Paris", "France is beautiful", "Asia is large"]
        },
        {
          rule: "Languages, sports, subjects",
          examples: ["I study English", "She plays tennis", "He likes math"]
        }
      ],
      exceptions: [
        "Some countries: the USA, the UK",
        "When specific: the music I like",
        "Specific contexts: the math class"
      ]
    },
    examples: [
      {
        category: "General Plurals",
        sentences: [
          "Cats make good pets.",
          "Teachers work hard.",
          "Computers are useful.",
          "Children love games."
        ]
      },
      {
        category: "Uncountables",
        sentences: [
          "Coffee keeps me awake.",
          "Money doesn't buy happiness.",
          "Time passes quickly.",
          "Health is wealth."
        ]
      },
      {
        category: "Names & Languages",
        sentences: [
          "Tom lives in London.",
          "I'm learning Spanish.",
          "She plays basketball.",
          "Chemistry is hard."
        ]
      }
    ]
  },
  exercises: [
    {
      type: "multiple_choice",
      title: "No Article Needed",
      instructions: "Pick when to skip articles.",
      questions: [
        {
          question: "I like _____ music.",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "no article",
          explanation: "No article needed. 'Music' is an uncountable noun used in general sense, not referring to specific music."
        },
        {
          question: "_____ dogs are loyal animals.",
          options: ["A", "An", "The", "No article"],
          correctAnswer: "No article",
          explanation: "No article needed. This is a general statement about dogs as a category, not specific dogs."
        },
        {
          question: "She speaks _____ French fluently.",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "no article",
          explanation: "No article needed. Language names don't use articles when talking about speaking them."
        },
        {
          question: "He plays _____ soccer every weekend.",
          options: ["a", "an", "the", "no article"],
          correctAnswer: "no article",
          explanation: "No article needed. Sports don't use articles when talking about playing them."
        }
      ]
    },
    {
      type: "multiple_choice",
      title: "Correct Version",
      instructions: "Pick the right sentence.",
      questions: [
        {
          question: "Which is correct?",
          options: ["I like the music", "I like music", "I like a music", "I like an music"],
          correctAnswer: "I like music",
          explanation: "'Music' is uncountable and used generally, so no article is needed."
        },
        {
          question: "Which is correct?",
          options: ["The children love playing", "Children love playing", "A children love playing", "An children love playing"],
          correctAnswer: "Children love playing",
          explanation: "This is a general statement about children, so no article is needed."
        },
        {
          question: "Which is correct?",
          options: ["She studies the math", "She studies math", "She studies a math", "She studies an math"],
          correctAnswer: "She studies math",
          explanation: "Academic subjects like math don't use articles when used generally."
        },
        {
          question: "Which is correct?",
          options: ["The water is essential", "Water is essential", "A water is essential", "An water is essential"],
          correctAnswer: "Water is essential",
          explanation: "This is a general statement about water, and water is uncountable, so no article is needed."
        }
      ]
    },
    {
      type: "fill_blanks",
      title: "General vs Specific",
      instructions: "Complete the sentences.",
      questions: [
        {
          question: "_____ books are expensive these days. (general statement)",
          options: ["The", "A", "An", "No article"],
          correctAnswer: "No article",
          explanation: "No article needed for general statements about plural countable nouns."
        },
        {
          question: "_____ books on that shelf are mine. (specific books)",
          options: ["The", "A", "An", "No article"],
          correctAnswer: "The",
          explanation: "Use 'the' when referring to specific books that both speaker and listener can identify."
        },
        {
          question: "I love _____ coffee. (in general)",
          options: ["the", "a", "an", "no article"],
          correctAnswer: "no article",
          explanation: "No article needed when talking about coffee in general (uncountable noun)."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      mistake: "Adding articles to general plurals",
      example: "❌ The dogs are friendly",
      correction: "✅ Dogs are friendly",
      explanation: "No article for general statements."
    },
    {
      mistake: "Articles with uncountables",
      example: "❌ The music is relaxing",
      correction: "✅ Music is relaxing",
      explanation: "No articles with general uncountables."
    },
    {
      mistake: "Articles with languages/sports",
      example: "❌ I speak the English",
      correction: "✅ I speak English",
      explanation: "No articles with languages/sports."
    },
    {
      mistake: "Articles with names",
      example: "❌ The John lives in the Paris",
      correction: "✅ John lives in Paris",
      explanation: "No articles with most names."
    }
  ]
};