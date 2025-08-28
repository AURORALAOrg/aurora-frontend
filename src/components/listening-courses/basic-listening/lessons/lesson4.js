export const lesson4Data = {
  title: "Listening with Background Noise",
  description: "Practice understanding conversations in real-world situations with background noise",
  estimatedTime: "45-60 minutes",
  content: {
    theory: {
      title: "Filtering Important Information",
      rules: [
        {
          rule: "Focus on key words and phrases",
          examples: [
            "Listen for important nouns and verbs",
            "Pay attention to numbers and times",
            "Identify names and places",
            "Recognize question words"
          ]
        },
        {
          rule: "Use context to fill gaps",
          examples: [
            "Guess meaning from situation",
            "Use familiar words as anchors",
            "Pay attention to speaker's tone",
            "Notice repeated information"
          ]
        },
        {
          rule: "Practice selective listening",
          examples: [
            "Ignore irrelevant background sounds",
            "Focus on the main speaker",
            "Listen for specific information",
            "Use visual cues when available"
          ]
        }
      ],
      importantNotes: [
        "Real conversations often have background noise",
        "Don't expect to understand every word",
        "Focus on getting the main message",
        "Practice in different noisy environments"
      ]
    },
    examples: [
      {
        category: "Café Conversations",
        sentences: [
          {
            text: "Hi, can I get a coffee and a sandwich? I'm in a hurry.",
            audioUrl: "/audio/lesson4/cafe1.mp3"
          },
          {
            text: "Excuse me, is this seat taken? I'm waiting for a friend.",
            audioUrl: "/audio/lesson4/cafe2.mp3"
          },
          {
            text: "The meeting is at 3 PM. Don't forget to bring the documents.",
            audioUrl: "/audio/lesson4/cafe3.mp3"
          }
        ]
      },
      {
        category: "Phone Conversations",
        sentences: [
          {
            text: "Hello? Can you hear me? The connection is bad.",
            audioUrl: "/audio/lesson4/phone1.mp3"
          },
          {
            text: "I'll meet you at the restaurant at 7:30. See you there!",
            audioUrl: "/audio/lesson4/phone2.mp3"
          },
          {
            text: "Sorry, I can't talk now. I'll call you back later.",
            audioUrl: "/audio/lesson4/phone3.mp3"
          }
        ]
      }
    ],
    commonMistakes: [
      {
        title: "Trying to understand every word",
        description: "Getting frustrated when background noise makes some words unclear",
        solution: "Focus on understanding the main message and key information, not every single word"
      },
      {
        title: "Ignoring context clues",
        description: "Not using the situation and speaker's tone to understand meaning",
        solution: "Use all available information including context, tone, and familiar words"
      },
      {
        title: "Giving up too quickly",
        description: "Stopping to listen when the conversation becomes challenging",
        solution: "Keep listening and try to pick up information as the conversation continues"
      }
    ]
  },
  exercises: [
    {
      type: "selective_listening",
      title: "Selective Listening",
      instructions: "Listen to the conversation with background noise and focus on the important information.",
      questions: [
        {
          question: "Listen to the phone conversation with background noise. What time is the meeting?",
          audioUrl: "/audio/lesson4/exercise1_1.mp3",
          options: ["2 PM", "3 PM", "4 PM", "5 PM"],
          correctAnswer: "3 PM",
          explanation: "The speaker says 'The meeting is at 3 PM' despite the background noise."
        },
        {
          question: "Listen to the café conversation. What does the customer order?",
          audioUrl: "/audio/lesson4/exercise1_2.mp3",
          options: ["Coffee and cake", "Coffee and sandwich", "Tea and cookies", "Juice and salad"],
          correctAnswer: "Coffee and sandwich",
          explanation: "The customer asks for 'a coffee and a sandwich' in the noisy café."
        },
        {
          question: "Listen to the phone call. Where are they meeting?",
          audioUrl: "/audio/lesson4/exercise1_3.mp3",
          options: ["At the office", "At the restaurant", "At the park", "At the mall"],
          correctAnswer: "At the restaurant",
          explanation: "The speaker says 'I'll meet you at the restaurant' in the conversation."
        },
        {
          question: "Listen to the conversation. What does the person need to bring?",
          audioUrl: "/audio/lesson4/exercise1_4.mp3",
          options: ["Money", "Documents", "Keys", "Phone"],
          correctAnswer: "Documents",
          explanation: "The speaker mentions 'Don't forget to bring the documents'."
        }
      ]
    },
    {
      type: "noise_filtering",
      title: "Noise Filtering",
      instructions: "Listen to conversations in noisy environments and extract key information.",
      questions: [
        {
          question: "Listen to the conversation in a busy street. What is the person's name?",
          audioUrl: "/audio/lesson4/exercise2_1.mp3",
          options: ["John", "Mike", "David", "Tom"],
          correctAnswer: "Mike",
          explanation: "The speaker introduces himself as 'Mike' despite the street noise."
        },
        {
          question: "Listen to the dialogue in a crowded restaurant. What does the waiter recommend?",
          audioUrl: "/audio/lesson4/exercise2_2.mp3",
          options: ["The pasta", "The steak", "The fish", "The chicken"],
          correctAnswer: "The fish",
          explanation: "The waiter says 'I recommend the fish' in the noisy restaurant."
        },
        {
          question: "Listen to the phone conversation with poor connection. What is the problem?",
          audioUrl: "/audio/lesson4/exercise2_3.mp3",
          options: ["Wrong number", "Bad connection", "No signal", "Phone broken"],
          correctAnswer: "Bad connection",
          explanation: "The speaker says 'The connection is bad' in the phone call."
        }
      ]
    },
    {
      type: "key_information_extraction",
      title: "Key Information Extraction",
      instructions: "Listen to real-world conversations and identify the most important details.",
      questions: [
        {
          question: "Listen to the conversation in a noisy airport. What time is the flight?",
          audioUrl: "/audio/lesson4/exercise3_1.mp3",
          options: ["10:30 AM", "11:30 AM", "12:30 PM", "1:30 PM"],
          correctAnswer: "11:30 AM",
          explanation: "The speaker mentions 'The flight is at 11:30' in the airport announcement."
        },
        {
          question: "Listen to the dialogue in a busy store. What is the customer looking for?",
          audioUrl: "/audio/lesson4/exercise3_2.mp3",
          options: ["Shoes", "Shirt", "Pants", "Hat"],
          correctAnswer: "Shoes",
          explanation: "The customer asks 'Where can I find the shoes?' in the busy store."
        },
        {
          question: "Listen to the phone conversation with traffic noise. What is the address?",
          audioUrl: "/audio/lesson4/exercise3_3.mp3",
          options: ["123 Main Street", "456 Oak Avenue", "789 Pine Road", "321 Elm Street"],
          correctAnswer: "456 Oak Avenue",
          explanation: "The speaker gives the address '456 Oak Avenue' despite traffic noise."
        },
        {
          question: "Listen to the conversation in a crowded café. What does the person want to do?",
          audioUrl: "/audio/lesson4/exercise3_4.mp3",
          options: ["Order food", "Ask for directions", "Make a reservation", "Complain about service"],
          correctAnswer: "Ask for directions",
          explanation: "The person asks 'Can you tell me how to get to the museum?' in the café."
        }
      ]
    }
  ]
};
