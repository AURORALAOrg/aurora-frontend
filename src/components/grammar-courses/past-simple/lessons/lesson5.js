export const lesson5Data = {
  title: "Telling Simple Stories",
  description: "Learn to tell stories and describe past experiences using past simple with sequencing words",
  content: {
    theory: {
      title: "Storytelling with Past Simple",
      rules: [
        {
          rule: "Sequencing words for story order",
          examples: ["first", "then", "after that", "next", "finally", "lastly"]
        },
        {
          rule: "Time markers for story flow",
          examples: ["in the morning", "later that day", "that evening", "the next day", "a few hours later"]
        },
        {
          rule: "Connecting events",
          examples: ["so", "because", "but", "however", "meanwhile", "suddenly"]
        },
        {
          rule: "Describing past experiences",
          examples: ["I remember when...", "One time...", "Last year...", "When I was..."]
        }
      ],
      exceptions: [
        "Stories can mix past simple with other past tenses for variety",
        "Some sequencing words can be used in different positions in the sentence",
        "Personal stories often use 'I' and 'we' as subjects"
      ],
      importantNotes: [
        "Use past simple for completed actions in the story",
        "Sequencing words help organize the story chronologically",
        "Include details to make the story more interesting and clear"
      ]
    },
    examples: [
      {
        category: "Story Structure",
        sentences: [
          "First, I woke up early in the morning.",
          "Then, I had breakfast and got ready.",
          "After that, I went to the bus stop.",
          "Finally, I arrived at work on time."
        ]
      },
      {
        category: "Personal Experiences",
        sentences: [
          "I remember when I first learned to drive.",
          "One time, I got lost in a big city.",
          "Last year, I visited my grandparents.",
          "When I was young, I played in the park every day."
        ]
      }
    ]
  },
  exercises: [
    {
      type: "story_ordering",
      title: "Story Ordering",
      instructions: "Put the story events in the correct chronological order.",
      questions: [
        {
          question: "Put story in order: 'Finally, I went home.' 'First, I woke up early.' 'Then, I had breakfast.' 'After that, I went to work.'",
          options: ["First, I woke up early. Then, I had breakfast. After that, I went to work. Finally, I went home.", "First, I had breakfast. Then, I woke up early. After that, I went to work. Finally, I went home.", "First, I went to work. Then, I woke up early. After that, I had breakfast. Finally, I went home.", "First, I went home. Then, I woke up early. After that, I had breakfast. Finally, I went to work."],
          correctAnswer: "First, I woke up early. Then, I had breakfast. After that, I went to work. Finally, I went home.",
          explanation: "The correct order follows the natural daily routine: wake up → breakfast → work → home."
        },
        {
          question: "Put story in order: 'Then, I found my keys.' 'First, I looked in my bag.' 'Finally, I could leave the house.' 'After that, I checked under the sofa.'",
          options: ["First, I looked in my bag. Then, I found my keys. After that, I checked under the sofa. Finally, I could leave the house.", "First, I looked in my bag. Then, I checked under the sofa. After that, I found my keys. Finally, I could leave the house.", "First, I found my keys. Then, I looked in my bag. After that, I checked under the sofa. Finally, I could leave the house.", "First, I checked under the sofa. Then, I looked in my bag. After that, I found my keys. Finally, I could leave the house."],
          correctAnswer: "First, I looked in my bag. Then, I checked under the sofa. After that, I found my keys. Finally, I could leave the house.",
          explanation: "The correct order shows the logical search process: look in bag → check sofa → find keys → leave house."
        },
        {
          question: "Put story in order: 'Finally, I arrived at the restaurant.' 'First, I left my house.' 'Then, I took the bus.' 'After that, I walked for 10 minutes.'",
          options: ["First, I left my house. Then, I took the bus. After that, I walked for 10 minutes. Finally, I arrived at the restaurant.", "First, I took the bus. Then, I left my house. After that, I walked for 10 minutes. Finally, I arrived at the restaurant.", "First, I left my house. Then, I walked for 10 minutes. After that, I took the bus. Finally, I arrived at the restaurant.", "First, I walked for 10 minutes. Then, I left my house. After that, I took the bus. Finally, I arrived at the restaurant."],
          correctAnswer: "First, I left my house. Then, I took the bus. After that, I walked for 10 minutes. Finally, I arrived at the restaurant.",
          explanation: "The correct order shows the journey: leave house → take bus → walk → arrive at restaurant."
        },
        {
          question: "Put story in order: 'Then, I started cooking.' 'First, I went to the supermarket.' 'Finally, I served dinner.' 'After that, I prepared the ingredients.'",
          options: ["First, I went to the supermarket. Then, I started cooking. After that, I prepared the ingredients. Finally, I served dinner.", "First, I went to the supermarket. Then, I prepared the ingredients. After that, I started cooking. Finally, I served dinner.", "First, I started cooking. Then, I went to the supermarket. After that, I prepared the ingredients. Finally, I served dinner.", "First, I prepared the ingredients. Then, I went to the supermarket. After that, I started cooking. Finally, I served dinner."],
          correctAnswer: "First, I went to the supermarket. Then, Iprepared the ingredients. After that, Istarted cooking. Finally, Iserved dinner.",
          explanation: "The correct order shows the cooking process: buy ingredients → prepare → cook → serve."
        }
      ]
    },
    {
      type: "personal_experience_writing",
      title: "Personal Experience Writing",
      instructions: "Complete the personal experience stories with appropriate past simple verbs.",
      questions: [
        {
          question: "Complete: 'I remember when I first _____ to drive. I _____ very nervous.'",
          options: ["learned / was", "learn / was", "learned / am", "learn / am"],
          correctAnswer: "learned / was",
          explanation: "The correct answer is 'learned / was'. Use past simple for a completed past experience."
        },
        {
          question: "Complete: 'One time, I _____ lost in a big city. I _____ for help.'",
          options: ["got / asked", "get / asked", "got / ask", "get / ask"],
          correctAnswer: "got / asked",
          explanation: "The correct answer is 'got / asked'. Use past simple for both completed actions in the story."
        },
        {
          question: "Complete: 'Last year, I _____ my grandparents. We _____ a wonderful time together.'",
          options: ["visited / had", "visit / had", "visited / have", "visit / have"],
          correctAnswer: "visited / had",
          explanation: "The correct answer is 'visited / had'. Use past simple for both actions in the past story."
        }
      ]
    },
    {
      type: "sequencing_words",
      title: "Sequencing Words",
      instructions: "Choose the appropriate sequencing word to connect the story events.",
      questions: [
        {
          question: "I woke up at 7 AM. _____, I had breakfast.",
          options: ["Then", "First", "Finally", "After that"],
          correctAnswer: "Then",
          explanation: "The correct answer is 'Then'. 'Then' connects two sequential actions in a story."
        },
        {
          question: "I studied for three hours. _____, I took a break.",
          options: ["After that", "First", "Finally", "Then"],
          correctAnswer: "After that",
          explanation: "The correct answer is 'After that'. 'After that' indicates what happened following a completed action."
        },
        {
          question: "I packed my bags, booked my ticket, and _____, I left for the airport.",
          options: ["finally", "then", "after that", "first"],
          correctAnswer: "finally",
          explanation: "The correct answer is 'finally'. 'Finally' indicates the last action in a sequence."
        },
        {
          question: "_____, I checked my email. Then I replied to important messages.",
          options: ["First", "Then", "After that", "Finally"],
          correctAnswer: "First",
          explanation: "The correct answer is 'First'. 'First' indicates the beginning of a sequence of actions."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      mistake: "Mixing present and past tenses in stories",
      example: "❌ I went to the store and I buy some milk. Then I come home.",
      correction: "✅ I went to the store and I bought some milk. Then I came home.",
      explanation: "Use past simple consistently throughout the story for completed actions."
    },
    {
      mistake: "Incorrect sequencing word usage",
      example: "❌ Finally, I started my day. Then, I woke up. First, I went to work.",
      correction: "✅ First, I woke up. Then, I started my day. Finally, I went to work.",
      explanation: "Use sequencing words in logical order: First → Then → Finally."
    },
    {
      mistake: "Missing time expressions in stories",
      example: "❌ I went to Paris. I saw the Eiffel Tower. I ate French food.",
      correction: "✅ I went to Paris last summer. I saw the Eiffel Tower on the first day. I ate French food every evening.",
      explanation: "Include time expressions to make the story clearer and more engaging."
    }
  ]
};
