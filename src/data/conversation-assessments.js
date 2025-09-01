/**
 * Basic Conversation Area Assessment Data
 * This file contains assessment data for the four basic conversation courses:
 * 1. Greetings & Introductions
 * 2. Ordering Food & Drinks
 * 3. Asking for Directions
 * 4. Small Talk Basics
 */

export const conversationAssessments = [
  {
    id: "greetings-introductions",
    title: "Greetings & Introductions Assessment",
    description: "Test your knowledge of basic greetings and introductions",
    questions: [
      {
        id: "greetings-introductions-1",
        question:
          "You meet your colleague's friend at a party. What's the most appropriate response?",
        context: 'Colleague: "Maria, this is my friend John."',
        options: [
          "Hi John!",
          "Nice to meet you, John.",
          "What's up John?",
          "Hey buddy!",
        ],
        correctAnswer: "Nice to meet you, John.",
        explanation:
          "When being introduced to someone new in a social setting, 'Nice to meet you' is the most polite and appropriate response.",
      },
      {
        id: "greetings-introductions-2",
        question:
          "Complete this self-introduction: 'Hi, I'm Carlos. I'm 28 years old and _____ Mexico.'",
        options: ["I come from", "I'm from", "I have from", "My country is"],
        correctAnswer: "I'm from",
        explanation:
          "The phrase 'I'm from' is the most common and natural way to state your country of origin in an introduction.",
      },
      {
        id: "greetings-introductions-3",
        question: "Someone says 'Thank you for your help.' You respond:",
        options: [
          "No problem",
          "You're welcome",
          "It's okay",
          "All of the above",
        ],
        correctAnswer: "All of the above",
        explanation:
          "All of these responses are appropriate ways to acknowledge someone's thanks in English.",
      },
      {
        id: "greetings-introductions-4",
        question:
          "What information is typically shared in a basic introduction?",
        options: [
          "Name and age only",
          "Name, where you're from, what you do",
          "Personal problems",
          "Family details",
        ],
        correctAnswer: "Name, where you're from, what you do",
        explanation:
          "A standard introduction typically includes your name, where you're from, and your occupation or what you do.",
      },
      {
        id: "greetings-introductions-5",
        question: "How do you politely ask someone's name?",
        options: [
          "What's your name?",
          "Tell me your name",
          "Your name please",
          "Name?",
        ],
        correctAnswer: "What's your name?",
        explanation:
          "The question 'What's your name?' is the most polite and common way to ask someone's name.",
      },
    ],
  },
  {
    id: "ordering-food-drinks",
    title: "Ordering Food & Drinks Assessment",
    description: "Test your knowledge of ordering food and drinks in English",
    questions: [
      {
        id: "ordering-food-drinks-1",
        question: "You want to see what food is available. You ask the waiter:",
        options: [
          "What food do you have?",
          "Could I see the menu, please?",
          "Give me food list",
          "Show me food",
        ],
        correctAnswer: "Could I see the menu, please?",
        explanation:
          "Asking 'Could I see the menu, please?' is polite and is the standard way to request the menu at a restaurant.",
      },
      {
        id: "ordering-food-drinks-2",
        question:
          "The waiter asks 'What would you like to drink?' You respond:",
        options: [
          "Give me Coke",
          "Coke please",
          "I'd like a Coke, please",
          "Want Coke",
        ],
        correctAnswer: "I'd like a Coke, please",
        explanation:
          "The phrase 'I'd like a [drink], please' is the most polite way to order a drink in English.",
      },
      {
        id: "ordering-food-drinks-3",
        question: "You want to know if a dish is spicy. You ask:",
        options: [
          "Spicy food?",
          "Is this dish spicy?",
          "Hot food?",
          "Spicy or no?",
        ],
        correctAnswer: "Is this dish spicy?",
        explanation:
          "Asking 'Is this dish spicy?' is the clearest and most polite way to inquire about the spiciness of a dish.",
      },
      {
        id: "ordering-food-drinks-4",
        question: "You're ready to pay. What do you say to the waiter?",
        options: [
          "Money time",
          "I want to pay",
          "Could I have the check, please?",
          "Bill me",
        ],
        correctAnswer: "Could I have the check, please?",
        explanation:
          "Asking 'Could I have the check, please?' is the standard polite way to request the bill in a restaurant in English.",
      },
      {
        id: "ordering-food-drinks-5",
        question: "In the US, what's considered a normal tip for good service?",
        options: ["5%", "10%", "15-20%", "No tip needed"],
        correctAnswer: "15-20%",
        explanation:
          "In the US, a tip of 15-20% is customary for good service in restaurants.",
      },
    ],
  },
  {
    id: "asking-directions",
    title: "Asking for Directions Assessment",
    description:
      "Test your knowledge of asking for and understanding directions",
    questions: [
      {
        id: "asking-directions-1",
        question:
          "You're lost and need help. The most polite way to approach someone is:",
        options: [
          "Hey, where is bank?",
          "Excuse me, could you help me find the bank?",
          "Tell me bank location",
          "Bank where?",
        ],
        correctAnswer: "Excuse me, could you help me find the bank?",
        explanation:
          "Starting with 'Excuse me' and forming a complete, polite question is the most appropriate way to ask a stranger for directions.",
      },
      {
        id: "asking-directions-2",
        question:
          "Someone gives you directions: 'Go straight for two blocks, then turn left.' What does this mean?",
        options: [
          "Walk forward, then go left at the second street",
          "Go left immediately",
          "Walk forward only",
          "Turn around and go left",
        ],
        correctAnswer: "Walk forward, then go left at the second street",
        explanation:
          "A 'block' typically refers to the distance between streets in a city grid. Going straight for two blocks means passing two intersections before turning.",
      },
      {
        id: "asking-directions-3",
        question: "You want to know if your destination is far. You ask:",
        options: [
          "Far place?",
          "Is it far from here?",
          "How far?",
          "Distance what?",
        ],
        correctAnswer: "Is it far from here?",
        explanation:
          "The question 'Is it far from here?' is a complete, grammatically correct way to ask about distance.",
      },
      {
        id: "asking-directions-4",
        question:
          "Complete the direction: 'The bank is _____ your right, next to the pharmacy.'",
        options: ["in", "at", "on", "by"],
        correctAnswer: "on",
        explanation:
          "In English, we use the preposition 'on' when indicating something is to the right or left of us.",
      },
      {
        id: "asking-directions-5",
        question: "If someone says 'You can't miss it,' they mean:",
        options: [
          "You will definitely lose it",
          "It's very easy to find",
          "It's hidden",
          "You shouldn't go there",
        ],
        correctAnswer: "It's very easy to find",
        explanation:
          "The expression 'You can't miss it' means the place is very obvious or easy to find.",
      },
    ],
  },
  {
    id: "small-talk-basics",
    title: "Small Talk Basics Assessment",
    description: "Test your knowledge of making small talk in English",
    questions: [
      {
        id: 1,
        question:
          "A colleague says 'Nice weather today!' The best response is:",
        options: [
          "I don't care about weather",
          "Yes, it's beautiful! Perfect for walking",
          "Weather is weather",
          "So what?",
        ],
        correctAnswer: "Yes, it's beautiful! Perfect for walking",
        explanation:
          "In small talk, it's polite to agree and expand on the topic to keep the conversation flowing.",
      },
      {
        id: 2,
        question:
          "Someone asks 'What do you do?' They want to know about your:",
        options: ["Daily activities", "Job/profession", "Hobbies", "Problems"],
        correctAnswer: "Job/profession",
        explanation:
          "'What do you do?' is a common small talk question asking about your occupation or profession.",
      },
      {
        id: 3,
        question:
          "Which topic is generally safe for small talk with strangers?",
        options: [
          "Personal income",
          "Political opinions",
          "Weekend activities",
          "Family problems",
        ],
        correctAnswer: "Weekend activities",
        explanation:
          "Weekend activities are considered a safe, neutral topic for small talk, unlike personal finances, politics, or personal problems.",
      },
      {
        id: 4,
        question: "How do you politely end a small talk conversation?",
        options: [
          "I'm bored now",
          "Stop talking",
          "It was nice chatting with you",
          "Go away",
        ],
        correctAnswer: "It was nice chatting with you",
        explanation:
          "Saying 'It was nice chatting with you' is a polite way to signal the end of a conversation.",
      },
      {
        id: 5,
        question: "Someone mentions they like hiking. You respond:",
        options: [
          "That's boring",
          "Oh, that sounds interesting! Where do you usually hike?",
          "I hate hiking",
          "Why do you like that?",
        ],
        correctAnswer:
          "Oh, that sounds interesting! Where do you usually hike?",
        explanation:
          "Showing interest and asking a follow-up question is the best way to maintain a friendly small talk conversation.",
      },
    ],
  },
];
