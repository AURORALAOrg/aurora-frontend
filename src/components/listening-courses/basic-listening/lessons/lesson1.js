export const lesson1Data = {
  title: "Slow, Clear Speech Recognition",
  description: "Learn to recognize and understand simple sentences spoken slowly and clearly",
  estimatedTime: "30-45 minutes",
  content: {
    theory: {
      title: "Understanding Slow, Clear Speech",
      rules: [
        {
          rule: "Listen for individual words",
          examples: [
            "Each word is pronounced separately",
            "Pauses between words help comprehension",
            "Focus on one word at a time"
          ]
        },
        {
          rule: "Pay attention to basic vocabulary",
          examples: [
            "Common everyday words",
            "Simple action verbs",
            "Basic nouns and adjectives"
          ]
        },
        {
          rule: "Recognize simple sentence patterns",
          examples: [
            "Subject + Verb + Object",
            "I am / You are / He is",
            "Simple present tense forms"
          ]
        }
      ],
      importantNotes: [
        "Don't worry about understanding every word",
        "Focus on the main message",
        "Use context clues to understand meaning",
        "Practice listening multiple times to the same audio"
      ]
    },
    examples: [
      {
        category: "Basic Introductions",
        sentences: [
          {
            text: "My name is Sarah. I am from Canada.",
            audioUrl: "/audio/lesson1/intro1.mp3"
          },
          {
            text: "Hello, I am Maria. I am a student.",
            audioUrl: "/audio/lesson1/intro2.mp3"
          },
          {
            text: "Nice to meet you. My name is John.",
            audioUrl: "/audio/lesson1/intro3.mp3"
          }
        ]
      },
      {
        category: "Simple Descriptions",
        sentences: [
          {
            text: "This is a red car. It is very fast.",
            audioUrl: "/audio/lesson1/desc1.mp3"
          },
          {
            text: "The weather is sunny today.",
            audioUrl: "/audio/lesson1/desc2.mp3"
          },
          {
            text: "I like coffee. It is hot and strong.",
            audioUrl: "/audio/lesson1/desc3.mp3"
          }
        ]
      }
    ],
    commonMistakes: [
      {
        title: "Trying to understand every word",
        description: "Focusing too much on individual words instead of the overall message",
        solution: "Listen for the main idea and key words, don't worry about understanding every single word"
      },
      {
        title: "Getting frustrated with speed",
        description: "Becoming discouraged when speech seems too fast",
        solution: "Remember that this lesson uses slow, clear speech. Practice with the same audio multiple times"
      },
      {
        title: "Ignoring context clues",
        description: "Not using surrounding information to understand meaning",
        solution: "Pay attention to the situation, speaker's tone, and familiar words to guess meaning"
      }
    ]
  },
  exercises: [
    {
      type: "sentence_completion",
      title: "Sentence Completion",
      instructions: "Listen to the audio and complete the sentence with the missing word.",
      questions: [
        {
          question: "Listen: 'My name is Sarah. I am from _____.'",
          audioUrl: "/audio/lesson1/exercise1_1.mp3",
          options: ["America", "Canada", "Australia", "England"],
          correctAnswer: "Canada",
          explanation: "The speaker clearly says 'Canada' in the audio."
        },
        {
          question: "Listen: 'Hello, I am Maria. I am a _____.'",
          audioUrl: "/audio/lesson1/exercise1_2.mp3",
          options: ["teacher", "student", "doctor", "engineer"],
          correctAnswer: "student",
          explanation: "Maria says she is a 'student' in the introduction."
        },
        {
          question: "Listen: 'This is a red _____. It is very fast.'",
          audioUrl: "/audio/lesson1/exercise1_3.mp3",
          options: ["house", "car", "book", "phone"],
          correctAnswer: "car",
          explanation: "The speaker describes a 'red car' that is fast."
        },
        {
          question: "Listen: 'The weather is _____ today.'",
          audioUrl: "/audio/lesson1/exercise1_4.mp3",
          options: ["cold", "sunny", "rainy", "windy"],
          correctAnswer: "sunny",
          explanation: "The speaker mentions that the weather is 'sunny' today."
        }
      ]
    },
    {
      type: "word_recognition",
      title: "Word Recognition",
      instructions: "Listen carefully and identify the word you hear.",
      questions: [
        {
          question: "Listen and choose the word you hear:",
          audioUrl: "/audio/lesson1/exercise2_1.mp3",
          options: ["house", "horse", "how", "hot"],
          correctAnswer: "house",
          explanation: "The speaker clearly pronounces 'house'."
        },
        {
          question: "Listen and choose the word you hear:",
          audioUrl: "/audio/lesson1/exercise2_2.mp3",
          options: ["cat", "car", "can", "cap"],
          correctAnswer: "cat",
          explanation: "The speaker says 'cat' with clear pronunciation."
        },
        {
          question: "Listen and choose the word you hear:",
          audioUrl: "/audio/lesson1/exercise2_3.mp3",
          options: ["big", "bag", "bed", "book"],
          correctAnswer: "big",
          explanation: "The word 'big' is pronounced clearly in the audio."
        },
        {
          question: "Listen and choose the word you hear:",
          audioUrl: "/audio/lesson1/exercise2_4.mp3",
          options: ["run", "ran", "ring", "rain"],
          correctAnswer: "run",
          explanation: "The speaker says 'run' with slow, clear pronunciation."
        },
        {
          question: "Listen and choose the word you hear:",
          audioUrl: "/audio/lesson1/exercise2_5.mp3",
          options: ["food", "foot", "fool", "fork"],
          correctAnswer: "food",
          explanation: "The word 'food' is clearly pronounced in the audio."
        }
      ]
    },
    {
      type: "comprehension",
      title: "Basic Comprehension",
      instructions: "Listen to the short conversation and answer the comprehension questions.",
      questions: [
        {
          question: "Listen to the conversation: 'Hi, my name is Tom. I am from England. I am a teacher. I like coffee and reading books.' What does Tom do for work?",
          audioUrl: "/audio/lesson1/exercise3_1.mp3",
          options: ["He is a student", "He is a teacher", "He is a doctor", "He is an engineer"],
          correctAnswer: "He is a teacher",
          explanation: "Tom clearly states 'I am a teacher' in his introduction."
        },
        {
          question: "Listen to the conversation: 'Hello, I am Lisa. I am from Spain. I am a student. I study English. I like music and dancing.' Where is Lisa from?",
          audioUrl: "/audio/lesson1/exercise3_2.mp3",
          options: ["England", "Spain", "France", "Italy"],
          correctAnswer: "Spain",
          explanation: "Lisa says 'I am from Spain' in her introduction."
        },
        {
          question: "Listen to the conversation: 'This is my friend Mike. He is from Canada. He is a doctor. He works in a hospital. He likes sports and cooking.' What does Mike like?",
          audioUrl: "/audio/lesson1/exercise3_3.mp3",
          options: ["Reading and music", "Sports and cooking", "Traveling and movies", "Cooking and reading"],
          correctAnswer: "Sports and cooking",
          explanation: "The speaker mentions that Mike 'likes sports and cooking'."
        }
      ]
    }
  ]
};
