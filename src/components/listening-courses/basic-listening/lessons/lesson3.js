export const lesson3Data = {
  title: "Different Accents (American vs British)",
  description: "Learn to recognize and understand American and British accent differences",
  estimatedTime: "40-55 minutes",
  content: {
    theory: {
      title: "Understanding Accent Differences",
      rules: [
        {
          rule: "Recognize pronunciation differences",
          examples: [
            "American: 'schedule' /ˈskedʒuːl/",
            "British: 'schedule' /ˈʃedjuːl/",
            "American: 'tomato' /təˈmeɪtoʊ/",
            "British: 'tomato' /təˈmɑːtəʊ/"
          ]
        },
        {
          rule: "Identify vocabulary variations",
          examples: [
            "American: 'elevator' vs British: 'lift'",
            "American: 'apartment' vs British: 'flat'",
            "American: 'truck' vs British: 'lorry'",
            "American: 'sidewalk' vs British: 'pavement'"
          ]
        },
        {
          rule: "Notice intonation patterns",
          examples: [
            "British speakers often use rising intonation",
            "American speakers tend to use falling intonation",
            "Pay attention to stress patterns",
            "Listen for rhythm differences"
          ]
        }
      ],
      importantNotes: [
        "Both accents are equally correct",
        "Focus on understanding the meaning, not perfect pronunciation",
        "Practice with both accent types",
        "Don't worry about speaking with a specific accent"
      ]
    },
    examples: [
      {
        category: "American Accent Examples",
        sentences: [
          {
            text: "I need to check my schedule for tomorrow.",
            audioUrl: "/audio/lesson3/american1.mp3"
          },
          {
            text: "Let's take the elevator to the third floor.",
            audioUrl: "/audio/lesson3/american2.mp3"
          },
          {
            text: "I live in an apartment downtown.",
            audioUrl: "/audio/lesson3/american3.mp3"
          }
        ]
      },
      {
        category: "British Accent Examples",
        sentences: [
          {
            text: "I need to check my schedule for tomorrow.",
            audioUrl: "/audio/lesson3/british1.mp3"
          },
          {
            text: "Let's take the lift to the third floor.",
            audioUrl: "/audio/lesson3/british2.mp3"
          },
          {
            text: "I live in a flat in the city centre.",
            audioUrl: "/audio/lesson3/british3.mp3"
          }
        ]
      }
    ],
    commonMistakes: [
      {
        title: "Thinking one accent is better than the other",
        description: "Believing that American or British pronunciation is more correct",
        solution: "Both accents are equally valid. Focus on understanding, not judging pronunciation"
      },
      {
        title: "Getting confused by vocabulary differences",
        description: "Not recognizing that different words can mean the same thing",
        solution: "Learn common vocabulary differences and use context to understand meaning"
      },
      {
        title: "Ignoring intonation patterns",
        description: "Not paying attention to how the accent affects the overall sound",
        solution: "Listen to the rhythm and intonation patterns of each accent"
      }
    ]
  },
  exercises: [
    {
      type: "accent_identification",
      title: "Accent Identification",
      instructions: "Listen to the audio and identify whether it's an American or British accent.",
      questions: [
        {
          question: "Listen to the word 'schedule'. Which accent do you hear?",
          audioUrl: "/audio/lesson3/exercise1_1.mp3",
          options: ["American accent", "British accent"],
          correctAnswer: "American accent",
          explanation: "The speaker uses the American pronunciation /ˈskedʒuːl/."
        },
        {
          question: "Listen to the word 'tomato'. Which accent do you hear?",
          audioUrl: "/audio/lesson3/exercise1_2.mp3",
          options: ["American accent", "British accent"],
          correctAnswer: "British accent",
          explanation: "The speaker uses the British pronunciation /təˈmɑːtəʊ/."
        },
        {
          question: "Listen to the word 'water'. Which accent do you hear?",
          audioUrl: "/audio/lesson3/exercise1_3.mp3",
          options: ["American accent", "British accent"],
          correctAnswer: "American accent",
          explanation: "The speaker uses the American pronunciation with a 't' sound."
        },
        {
          question: "Listen to the word 'dance'. Which accent do you hear?",
          audioUrl: "/audio/lesson3/exercise1_4.mp3",
          options: ["American accent", "British accent"],
          correctAnswer: "British accent",
          explanation: "The speaker uses the British pronunciation with a longer 'a' sound."
        }
      ]
    },
    {
      type: "vocabulary_recognition",
      title: "Vocabulary Recognition",
      instructions: "Listen to the sentence and identify the vocabulary word used.",
      questions: [
        {
          question: "Listen to the sentence. What word does the speaker use for 'elevator'?",
          audioUrl: "/audio/lesson3/exercise2_1.mp3",
          options: ["Elevator", "Lift", "Escalator", "Stairs"],
          correctAnswer: "Lift",
          explanation: "The British speaker uses 'lift' instead of 'elevator'."
        },
        {
          question: "Listen to the sentence. What word does the speaker use for 'apartment'?",
          audioUrl: "/audio/lesson3/exercise2_2.mp3",
          options: ["Apartment", "Flat", "House", "Room"],
          correctAnswer: "Flat",
          explanation: "The British speaker uses 'flat' instead of 'apartment'."
        },
        {
          question: "Listen to the sentence. What word does the speaker use for 'truck'?",
          audioUrl: "/audio/lesson3/exercise2_3.mp3",
          options: ["Truck", "Lorry", "Van", "Car"],
          correctAnswer: "Lorry",
          explanation: "The British speaker uses 'lorry' instead of 'truck'."
        },
        {
          question: "Listen to the sentence. What word does the speaker use for 'sidewalk'?",
          audioUrl: "/audio/lesson3/exercise2_4.mp3",
          options: ["Sidewalk", "Pavement", "Path", "Road"],
          correctAnswer: "Pavement",
          explanation: "The British speaker uses 'pavement' instead of 'sidewalk'."
        }
      ]
    },
    {
      type: "comprehension_across_accents",
      title: "Comprehension Across Accents",
      instructions: "Listen to conversations in different accents and answer comprehension questions.",
      questions: [
        {
          question: "Listen to the American speaker. What does he want to do?",
          audioUrl: "/audio/lesson3/exercise3_1.mp3",
          options: ["Take the elevator", "Take the stairs", "Take the escalator", "Take the lift"],
          correctAnswer: "Take the elevator",
          explanation: "The American speaker says 'Let's take the elevator'."
        },
        {
          question: "Listen to the British speaker. What does she want to do?",
          audioUrl: "/audio/lesson3/exercise3_2.mp3",
          options: ["Take the elevator", "Take the stairs", "Take the escalator", "Take the lift"],
          correctAnswer: "Take the lift",
          explanation: "The British speaker says 'Let's take the lift'."
        },
        {
          question: "Listen to both speakers. What are they both talking about?",
          audioUrl: "/audio/lesson3/exercise3_3.mp3",
          options: ["Transportation", "Housing", "Food", "Weather"],
          correctAnswer: "Housing",
          explanation: "Both speakers are talking about where they live, using different vocabulary."
        }
      ]
    }
  ]
};
