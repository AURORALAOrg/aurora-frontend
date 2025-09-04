// Direction Course Data 
// TODO: Add more exercises, maybe audio files later
// FIXME: Some questions might be too easy/hard - need user testing

export const directionsCourseData = {
  lesson1: {
    title: "Direction Vocabulary",
    description: "Master basic direction words and map navigation",
    content: [
      "left", "right", "straight", "turn", "corner", "block", "street", 
      "avenue", "north", "south", "east", "west"
    ],
    exercises: [
      // Map-based multiple choice questions
      {
        id: 1,
        type: "multiple-choice",
        question: "Look at the map. To go from the hotel to the bank, you go:",
        options: ["straight", "turn left", "turn right", "go back"],
        correctAnswer: "turn left",
        explanation: "From the hotel, you need to turn left to reach the bank.",
        mapData: {
          hotel: { x: 100, y: 200 },
          bank: { x: 50, y: 200 },
          path: "left"
        }
      },
      {
        id: 2,
        type: "multiple-choice", 
        question: "Which direction is opposite to 'north'?",
        options: ["east", "west", "south", "northeast"],
        correctAnswer: "south",
        explanation: "South is directly opposite to north on a compass."
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "You walk 3 blocks north, then turn right. Which direction are you facing?",
        options: ["north", "south", "east", "west"],
        correctAnswer: "east",
        explanation: "If you were facing north and turn right, you're now facing east."
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "The library is at the corner of Main Street and Oak Avenue. Where exactly is it?",
        options: ["middle of the street", "where two streets meet", "end of the block", "inside a building"],
        correctAnswer: "where two streets meet",
        explanation: "A corner is where two streets intersect."
      },
      // Direction matching exercises
      {
        id: 5,
        type: "matching",
        question: "Match the direction words with their meanings:",
        pairs: [
          { word: "block", meaning: "distance between two streets" },
          { word: "avenue", meaning: "wide street, usually running north-south" },
          { word: "straight", meaning: "continue without turning" }
        ]
      },
      {
        id: 6,
        type: "matching", 
        question: "Match the compass directions:",
        pairs: [
          { word: "N", meaning: "North" },
          { word: "E", meaning: "East" },
          { word: "W", meaning: "West" }
        ]
      },
      {
        id: 7,
        type: "matching",
        question: "Match the action words:",
        pairs: [
          { word: "turn", meaning: "change direction" },
          { word: "corner", meaning: "where streets meet" },
          { word: "block", meaning: "section between streets" }
        ]
      }
    ]
  },

  lesson2: {
    title: "Asking for Directions Politely", 
    description: "Learn polite ways to ask for help with directions",
    content: [
      "Excuse me, where is...?", "How do I get to...?", "Can you help me find...?", 
      "Is it far?", "Could you please tell me...", "I'm looking for..."
    ],
    exercises: [
      // Polite question formation
      {
        id: 1,
        type: "multiple-choice",
        question: "Most polite way to ask for directions:",
        options: [
          "Where is bank?", 
          "Excuse me, where is the bank?", 
          "Tell me bank location", 
          "Bank where?"
        ],
        correctAnswer: "Excuse me, where is the bank?",
        explanation: "'Excuse me' shows politeness, and the complete sentence is grammatically correct."
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "Which is the most polite way to ask about distance?",
        options: [
          "How far?",
          "Is it far from here?", 
          "Distance to place?",
          "Long way?"
        ],
        correctAnswer: "Is it far from here?",
        explanation: "This is a complete, polite question that's easy to understand."
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "Best way to ask for help finding a place:",
        options: [
          "Find restaurant for me",
          "Could you help me find the restaurant?",
          "Restaurant location?", 
          "Where restaurant is?"
        ],
        correctAnswer: "Could you help me find the restaurant?",
        explanation: "'Could you help me' is very polite and shows respect for the person's time."
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "If you don't understand the directions, you should say:",
        options: [
          "I don't get it",
          "Could you repeat that, please?",
          "Say again", 
          "What?"
        ],
        correctAnswer: "Could you repeat that, please?",
        explanation: "This shows politeness while asking for clarification."
      },
      {
        id: 5,
        type: "multiple-choice",
        question: "How to politely ask for specific directions:",
        options: [
          "How do I get to the museum?",
          "Museum directions",
          "Tell me museum way",
          "Museum how?"
        ],
        correctAnswer: "How do I get to the museum?",
        explanation: "This is a complete, clear, and polite way to ask for directions."
      },
      // Audio comprehension (simulated)
      {
        id: 6,
        type: "audio-comprehension", 
        question: "Listen and choose the correct response:",
        audioText: "Excuse me, can you tell me where the post office is?",
        options: [
          "Yes, it's two blocks down on your left",
          "No, I don't know", 
          "Post office is closed",
          "What do you want?"
        ],
        correctAnswer: "Yes, it's two blocks down on your left",
        explanation: "This gives helpful, specific directions."
        // NOTE: Audio implementation is simulated for now - need real audio files
      },
      {
        id: 7,
        type: "audio-comprehension", 
        question: "What is the person asking for?",
        audioText: "Is the train station far from here?",
        options: [
          "Time information",
          "Distance information", 
          "Train schedule",
          "Ticket price"
        ],
        correctAnswer: "Distance information",
        explanation: "They want to know how far away the train station is."
      },
      {
        id: 8,
        type: "audio-comprehension",
        question: "Choose the best response:",
        audioText: "I'm looking for a good restaurant nearby.",
        options: [
          "There's a great Italian place around the corner",
          "I don't eat much",
          "Restaurants are expensive", 
          "Why are you hungry?"
        ],
        correctAnswer: "There's a great Italian place around the corner",
        explanation: "This directly answers their request with a helpful suggestion."
      }
    ]
  },

  lesson3: {
    title: "Understanding Directions",
    description: "Learn to follow and understand direction instructions",
    content: [
      "Go straight for two blocks", "Turn left at the traffic light", 
      "It's on your right", "You can't miss it", "Keep going until you see...",
      "At the intersection", "Next to the...", "Across from..."
    ],
    exercises: [
      // Direction following exercises  
      {
        id: 1,
        type: "direction-following",
        question: "Follow the directions: 'Go straight, turn right at the church, it's on your left' - Where do you end up?",
        startPoint: { x: 100, y: 300 },
        landmarks: [
          { name: "church", x: 200, y: 300 },
          { name: "school", x: 200, y: 200 },
          { name: "park", x: 200, y: 400 }
        ],
        correctAnswer: "school",
        explanation: "Following the directions leads you to the school."
      },
      {
        id: 2, 
        type: "direction-following",
        question: "Starting from the hotel, follow: 'Walk two blocks north, then turn east' - What building do you reach?",
        startPoint: { x: 100, y: 400 },
        directions: ["north", "north", "east"],
        landmarks: [
          { name: "hotel", x: 100, y: 400 },
          { name: "bank", x: 200, y: 200 },
          { name: "store", x: 300, y: 200 }
        ],
        correctAnswer: "store",
        explanation: "Two blocks north, then east takes you to the store."
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "Someone says 'It's just past the traffic light.' This means:",
        options: [
          "before the traffic light",
          "at the traffic light", 
          "a little bit after the traffic light",
          "very far from the traffic light"
        ],
        correctAnswer: "a little bit after the traffic light",
        explanation: "'Just past' means a short distance beyond the landmark."
      },
      {
        id: 4,
        type: "multiple-choice", 
        question: "'You can't miss it' means:",
        options: [
          "it's very hidden",
          "it's very obvious/easy to see",
          "it's not there anymore",
          "you need to look carefully"
        ],
        correctAnswer: "it's very obvious/easy to see",
        explanation: "This phrase means the place is very noticeable and easy to find."
      },
      // Map tracing exercises
      {
        id: 5,
        type: "map-tracing",
        question: "Trace the path: 'From the library, go south one block, then west two blocks'",
        startPoint: "library",
        expectedPath: ["south", "west", "west"],
        landmarks: [
          { name: "library" },
          { name: "cafe" },
          { name: "museum" }
        ],
        correctAnswer: "museum"
      },
      {
        id: 6,
        type: "map-tracing",
        question: "Follow: 'Turn left at the corner, then it's the second building on your right'",
        startPoint: "entrance", 
        expectedPath: ["left", "pass", "arrive"],
        landmarks: [
          { name: "entrance" },
          { name: "shop1" },
          { name: "target" },
          { name: "shop2" }
        ],
        correctAnswer: "target"
      },
      {
        id: 7,
        type: "map-tracing",
        question: "From the park, follow: 'Head east, turn right at the first intersection'",
        startPoint: "park",
        expectedPath: ["east", "right"], 
        landmarks: [
          { name: "park" },
          { name: "first_intersection" },
          { name: "hospital" }
        ],
        correctAnswer: "hospital"
      }
    ]
  },

  lesson4: {
    title: "Transportation & Getting Help",
    description: "Learn about transport options and emergency phrases",
    content: [
      "bus", "taxi", "subway", "walk", "How long does it take?", 
      "I'm lost", "Can you show me on the map?", "Which way to...?",
      "Is there a bus stop nearby?", "Where can I catch a taxi?"
    ],
    exercises: [
      // Transportation options
      {
        id: 1,
        type: "multiple-choice", 
        question: "Fastest way to travel short distances in the city:",
        options: ["bus", "walking", "taxi", "subway"],
        correctAnswer: "taxi",
        explanation: "Taxis can take direct routes and avoid waiting for scheduled transport."
      },
      {
        id: 2,
        type: "multiple-choice",
        question: "Most economical way to travel across town:",
        options: ["taxi", "bus", "walking", "rental car"],
        correctAnswer: "bus", 
        explanation: "Public buses are usually the cheapest transportation option."
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "If the subway station is 5 minutes away and your destination is 30 minutes by subway, you should:",
        options: [
          "walk the whole way",
          "take a taxi", 
          "walk to subway and take it",
          "stay where you are"
        ],
        correctAnswer: "walk to subway and take it",
        explanation: "The subway will be much faster than walking 30+ minutes."
      },
      {
        id: 4,
        type: "multiple-choice",
        question: "Best question to ask about journey time:",
        options: [
          "Time?",
          "How long does it take to get there?",
          "Fast or slow?", 
          "Quick trip?"
        ],
        correctAnswer: "How long does it take to get there?",
        explanation: "This is a complete, clear question about travel time."
      },
      // Emergency phrases
      {
        id: 5,
        type: "multiple-choice",
        question: "You're lost and need help. You say:",
        options: [
          "I don't know place",
          "I'm lost, can you help?", 
          "Where am I?",
          "Help me please"
        ],
        correctAnswer: "I'm lost, can you help?",
        explanation: "This clearly explains your situation and politely asks for help."
      },
      {
        id: 6,
        type: "multiple-choice",
        question: "If someone offers to show you on a map, you say:",
        options: [
          "No thanks",
          "That would be very helpful, thank you",
          "Maps are confusing",
          "I can't read maps"
        ],
        correctAnswer: "That would be very helpful, thank you",
        explanation: "This shows appreciation and accepts the kind offer."
      },
      {
        id: 7,
        type: "multiple-choice",
        question: "Emergency situation - you need to find a hospital quickly:",
        options: [
          "Where is hospital?",
          "Hospital please",
          "This is urgent - where's the nearest hospital?",
          "I need medical place"
        ],
        correctAnswer: "This is urgent - where's the nearest hospital?",
        explanation: "This clearly communicates the urgency and your specific need."
      }
    ]
  }
};

// Course navigation structure
// Quick setup - might need to reorganize this later
export const courseNavigation = {
  courseId: "asking-for-directions",
  title: "Asking for Directions Course", 
  description: "Master navigation and direction conversations for real-world situations",
  level: "Basic Conversation", 
  totalLessons: 4, // FIXME: Hardcoded for now
  lessons: [
    {
      id: 1,
      title: "Direction Vocabulary",
      duration: "15 minutes",
      exercises: 7
    },
    {
      id: 2, 
      title: "Asking for Directions Politely",
      duration: "20 minutes",
      exercises: 8
    },
    {
      id: 3,
      title: "Understanding Directions", 
      duration: "25 minutes",
      exercises: 7
    },
    {
      id: 4,
      title: "Transportation & Getting Help",
      duration: "20 minutes", 
      exercises: 7
    }
  ]
};