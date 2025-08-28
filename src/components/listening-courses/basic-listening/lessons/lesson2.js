export const lesson2Data = {
  title: "Normal Conversational Speed",
  description: "Practice understanding everyday conversations at natural speaking pace",
  estimatedTime: "35-50 minutes",
  content: {
    theory: {
      title: "Understanding Natural Speech Patterns",
      rules: [
        {
          rule: "Recognize connected speech",
          examples: [
            "Words flow together naturally",
            "Some sounds are reduced or dropped",
            "Pay attention to stress patterns"
          ]
        },
        {
          rule: "Listen for key information",
          examples: [
            "Focus on important words",
            "Identify the main topic",
            "Recognize question words"
          ]
        },
        {
          rule: "Understand context clues",
          examples: [
            "Use situation to guess meaning",
            "Pay attention to speaker's tone",
            "Notice repeated words or phrases"
          ]
        }
      ],
      importantNotes: [
        "Don't panic if you miss some words",
        "Focus on understanding the main message",
        "Practice with the same conversation multiple times",
        "Pay attention to intonation and stress"
      ]
    },
    examples: [
      {
        category: "Restaurant Conversations",
        sentences: [
          {
            text: "Hi, can I get a table for two? We'd like to sit by the window.",
            audioUrl: "/audio/lesson2/restaurant1.mp3"
          },
          {
            text: "What do you recommend today? I'm not sure what to order.",
            audioUrl: "/audio/lesson2/restaurant2.mp3"
          },
          {
            text: "The bill, please. And could you bring us some water?",
            audioUrl: "/audio/lesson2/restaurant3.mp3"
          }
        ]
      },
      {
        category: "Shopping Dialogues",
        sentences: [
          {
            text: "Excuse me, where can I find the electronics section?",
            audioUrl: "/audio/lesson2/shopping1.mp3"
          },
          {
            text: "Do you have this in a larger size? This one's too small.",
            audioUrl: "/audio/lesson2/shopping2.mp3"
          },
          {
            text: "How much does this cost? Is there a discount?",
            audioUrl: "/audio/lesson2/shopping3.mp3"
          }
        ]
      }
    ],
    commonMistakes: [
      {
        title: "Trying to translate word by word",
        description: "Attempting to understand each word individually instead of the overall meaning",
        solution: "Focus on the complete message and use context to understand unfamiliar words"
      },
      {
        title: "Getting stuck on unknown words",
        description: "Stopping to think about every unknown word and missing the rest of the conversation",
        solution: "Continue listening and use context clues to guess the meaning of unknown words"
      },
      {
        title: "Ignoring intonation and stress",
        description: "Not paying attention to how words are emphasized and spoken",
        solution: "Listen to the speaker's tone and emphasis to understand meaning and emotion"
      }
    ]
  },
  exercises: [
    {
      type: "conversation_comprehension",
      title: "Conversation Comprehension",
      instructions: "Listen to the restaurant conversation and answer the questions.",
      questions: [
        {
          question: "Listen to the restaurant conversation. What does the customer order?",
          audioUrl: "/audio/lesson2/exercise1_1.mp3",
          options: ["Coffee", "Tea", "Juice", "Water"],
          correctAnswer: "Coffee",
          explanation: "The customer asks for 'a coffee, please' in the conversation."
        },
        {
          question: "Listen to the conversation. How many people are at the table?",
          audioUrl: "/audio/lesson2/exercise1_2.mp3",
          options: ["One", "Two", "Three", "Four"],
          correctAnswer: "Two",
          explanation: "The speaker asks for 'a table for two' at the beginning."
        },
        {
          question: "Listen to the dialogue. What does the customer want to know?",
          audioUrl: "/audio/lesson2/exercise1_3.mp3",
          options: ["The price", "The location", "The time", "The menu"],
          correctAnswer: "The menu",
          explanation: "The customer asks 'Can I see the menu?' in the conversation."
        },
        {
          question: "Listen to the exchange. What does the waiter recommend?",
          audioUrl: "/audio/lesson2/exercise1_4.mp3",
          options: ["The steak", "The pasta", "The salad", "The soup"],
          correctAnswer: "The pasta",
          explanation: "The waiter says 'I recommend the pasta' in the conversation."
        }
      ]
    },
    {
      type: "detail_questions",
      title: "Detail Questions",
      instructions: "Listen carefully and answer specific questions about the conversation.",
      questions: [
        {
          question: "Listen to the shopping conversation. What is the customer looking for?",
          audioUrl: "/audio/lesson2/exercise2_1.mp3",
          options: ["Shoes", "Shirt", "Pants", "Hat"],
          correctAnswer: "Shirt",
          explanation: "The customer asks 'Do you have this shirt in blue?'"
        },
        {
          question: "Listen to the dialogue. What size does the customer need?",
          audioUrl: "/audio/lesson2/exercise2_2.mp3",
          options: ["Small", "Medium", "Large", "Extra Large"],
          correctAnswer: "Large",
          explanation: "The customer says 'I need a large size' in the conversation."
        },
        {
          question: "Listen to the exchange. How much does the item cost?",
          audioUrl: "/audio/lesson2/exercise2_3.mp3",
          options: ["$15", "$25", "$35", "$45"],
          correctAnswer: "$25",
          explanation: "The salesperson says 'It's twenty-five dollars' in the conversation."
        },
        {
          question: "Listen to the conversation. What does the customer want to know about?",
          audioUrl: "/audio/lesson2/exercise2_4.mp3",
          options: ["The color", "The price", "The size", "The material"],
          correctAnswer: "The price",
          explanation: "The customer asks 'How much does this cost?' in the dialogue."
        }
      ]
    },
    {
      type: "main_idea",
      title: "Main Idea Identification",
      instructions: "Listen to the conversation and identify the main topic or purpose.",
      questions: [
        {
          question: "Listen to the conversation. What is the main topic?",
          audioUrl: "/audio/lesson2/exercise3_1.mp3",
          options: ["Making a reservation", "Ordering food", "Asking for directions", "Complaining about service"],
          correctAnswer: "Ordering food",
          explanation: "The conversation is about ordering food at a restaurant."
        },
        {
          question: "Listen to the dialogue. What is the customer's main concern?",
          audioUrl: "/audio/lesson2/exercise3_2.mp3",
          options: ["The price is too high", "The item is too small", "The color is wrong", "The quality is poor"],
          correctAnswer: "The item is too small",
          explanation: "The customer says 'This is too small' and asks for a larger size."
        },
        {
          question: "Listen to the exchange. What is the main purpose of this conversation?",
          audioUrl: "/audio/lesson2/exercise3_3.mp3",
          options: ["To return an item", "To ask for help", "To make a complaint", "To get information"],
          correctAnswer: "To ask for help",
          explanation: "The customer is asking for help finding something in the store."
        }
      ]
    }
  ]
};
