// src/data/placementQuestions.js
export const placementQuestions = {
    conversation: [
      {
        id: 1,
        question: "How do you politely greet someone you meet for the first time in a business setting?",
        options: ["Hey there!", "Good morning, nice to meet you", "What's up?", "Hi buddy!"],
        answer: 1,
        audio: "/audio/conversation/howdoyoupolitely.mp3"
      },
      {
        id: 2,
        question: "You're in a restaurant and want to order pizza. What do you say?",
        options: ["Give me pizza", "Pizza, please", "I'd like pizza, please", "Want pizza"],
        answer: 2,
        audio: "/audio/conversation/youarein.mp3"
      },
      {
        id: 3,
        question: "Someone asks 'Where are you from?' How do you respond?",
        options: ["I have from Mexico", "I'm from Mexico", "I come Mexico", "Mexico person"],
        answer: 1,
        audio: "/audio/conversation/someoneasks.mp3"
      },
      {
        id: 4,
        question: "You're lost and need directions. What's the most polite way to ask?",
        options: ["Where is bank?", "Tell me bank location", "Excuse me, where is the bank?", "Bank where?"],
        answer: 2,
        audio: "/audio/conversation/youarelost.mp3"
      },
      {
        id: 5,
        question: "How do you end a casual conversation politely?",
        options: ["Go away now", "I'm leaving", "It was nice talking to you", "Stop talking"],
        answer: 2,
        audio: "/audio/conversation/howdoyouend.mp3"
      }
    ],
  
    grammar: [
      {
        id: 6,
        question: "Complete: 'She _____ to work every day.'",
        options: ["go", "goes", "going", "went"],
        answer: 1,
        audio: "/audio/grammar/compleshedash.mp3"
      },
      {
        id: 2,
        question: "Make this negative: 'They speak English.' → 'They _____ English.'",
        options: ["don't speak", "doesn't speak", "not speak", "no speak"],
        answer: 0,
        audio: "/audio/grammar/makenegative.mp3"
      },
      {
        id: 3,
        question: "Complete the question: '_____ you like coffee?'",
        options: ["Are", "Do", "Is", "Does"],
        answer: 1,
        audio: "/audio/grammar/completethequestion.mp3"
      },
      {
        id: 4,
        question: "Choose the correct past tense: 'Yesterday I _____ to the store.'",
        options: ["go", "goed", "went", "gone"],
        answer: 2,
        audio: "/audio/grammar/choosecorrectpast.mp3"
      },
      {
        id: 5,
        question: "Complete: 'I saw _____ interesting movie last night.'",
        options: ["a", "an", "the", "no article"],
        answer: 1,
        audio: "/audio/grammar/isaw.mp3"
      }
    ],
  
    cultural: [
      {
        id: 1,
        question: "In American English, the word for 'lift' is:",
        options: ["elevator", "escalator", "stairs", "platform"],
        answer: 0,
        audio: "/audio/cultural/americanenglish.mp3"
      },
      {
        id: 2,
        question: "In a business email, the most professional closing is:",
        options: ["See ya!", "Best regards", "Bye", "Later"],
        answer: 1,
        audio: "/audio/cultural/businessemail.mp3"
      },
      {
        id: 3,
        question: "Americans celebrate Independence Day on:",
        options: ["July 1st", "July 4th", "July 14th", "August 4th"],
        answer: 1,
        audio: "/audio/cultural/americans.mp3"
      },
      {
        id: 4,
        question: "In American business culture, arriving to a meeting on time means:",
        options: ["10 minutes early", "exactly on time", "5 minutes late", "whenever you want"],
        answer: 0,
        audio: "/audio/cultural/americanbusiness.mp3"
      },
      {
        id: 5,
        question: "LOL in text messages means:",
        options: ["Lots of Love", "Laugh Out Loud", "Look Out Loud", "Lost On Line"],
        answer: 1,
        audio: "/audio/cultural/lol.mp3"
      }
    ],
  
    listening: [
      {
        id: 1,
        question: "Listen and choose which word you hear:",
        options: ["think", "sink", "tink", "fink"],
        answer: 0,
        audio: "/audio/listening/think.mp3"
      },
      {
        id: 2,
        question: "Listen and choose which word you hear:",
        options: ["very", "berry", "fairy", "merry"],
        answer: 0,
        audio: "/audio/listening/very.mp3"
      },
      {
        id: 3,
        question: "Listen to this sentence: 'I want to go home.' How many words do you hear?",
        options: ["4 words", "5 words", "6 words", "7 words"],
        answer: 1,
        audio: "/audio/listening/gohome.mp3"
      },
      {
        id: 4,
        question: "Listen and choose the correct vowel sound:",
        options: ["ship /ʃɪp/", "sheep /ʃiːp/", "shop /ʃɑp/", "shape /ʃeɪp/"],
        answer: 1,
        audio: "/audio/listening/sheep.mp3"
      },
      {
        id: 5,
        question: "Listen to this conversation and answer: Where does the woman want to go?",
        options: ["bank", "library", "store", "hospital"],
        answer: 1,
        audio: "/audio/listening/excuseme.mp3"
      }
    ]
  };
  