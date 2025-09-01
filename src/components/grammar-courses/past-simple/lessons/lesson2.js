export const lesson2Data = {
  title: "Common Irregular Verbs",
  description: "Learn the most common irregular verbs and their past simple forms",
  content: {
    theory: {
      title: "Common Irregular Verbs",
      rules: [
        {
          rule: "High-frequency irregular verbs",
          examples: ["go → went", "see → saw", "have → had", "do → did"]
        },
        {
          rule: "Communication verbs",
          examples: ["say → said", "tell → told", "speak → spoke", "write → wrote"]
        },
        {
          rule: "Movement and action verbs",
          examples: ["come → came", "get → got", "take → took", "make → made"]
        },
        {
          rule: "Mental and perception verbs",
          examples: ["know → knew", "think → thought", "feel → felt", "hear → heard"]
        },
        {
          rule: "Common daily verbs",
          examples: ["eat → ate", "drink → drank", "sleep → slept", "wake → woke"]
        }
      ],
      exceptions: [
        "Some verbs have the same form in present and past (cut → cut, put → put, hit → hit)",
        "Some verbs have completely different forms (be → was/were, go → went)",
        "Some verbs follow patterns but are still irregular (bring → brought, buy → bought, think → thought)"
      ],
      importantNotes: [
        "Irregular verbs must be memorized as they don't follow regular patterns",
        "These are the most commonly used irregular verbs in English",
        "Practice with sentences helps remember irregular forms better"
      ]
    },
    examples: [
      {
        category: "Daily Activities",
        sentences: [
          "I went to the store yesterday.",
          "She had breakfast at 8 AM.",
          "They saw a movie last weekend.",
          "He did his homework after school."
        ]
      },
      {
        category: "Communication",
        sentences: [
          "She said hello to everyone.",
          "He told me the truth.",
          "We spoke for hours.",
          "I wrote a letter to my friend."
        ]
      }
    ]
  },
  exercises: [
    {
      type: "irregular_verb_matching",
      title: "Irregular Verb Matching",
      instructions: "Match the base verb with its correct past simple form.",
      questions: [
        {
          question: "Yesterday I _____ to the store. (go)",
          options: ["goed", "went", "wented", "going"],
          correctAnswer: "went",
          explanation: "The correct answer is 'went'. 'Go' is an irregular verb: go → went → gone."
        },
        {
          question: "She _____ her grandmother last week. (see)",
          options: ["seed", "saw", "seen", "seeing"],
          correctAnswer: "saw",
          explanation: "The correct answer is 'saw'. 'See' is an irregular verb: see → saw → seen."
        },
        {
          question: "We _____ a great time at the party. (have)",
          options: ["haved", "had", "has", "having"],
          correctAnswer: "had",
          explanation: "The correct answer is 'had'. 'Have' is an irregular verb: have → had → had."
        },
        {
          question: "He _____ his homework before dinner. (do)",
          options: ["doed", "did", "done", "doing"],
          correctAnswer: "did",
          explanation: "The correct answer is 'did'. 'Do' is an irregular verb: do → did → done."
        },
        {
          question: "They _____ goodbye to their friends. (say)",
          options: ["sayed", "said", "sayd", "saying"],
          correctAnswer: "said",
          explanation: "The correct answer is 'said'. 'Say' is an irregular verb: say → said → said."
        }
      ]
    },
    {
      type: "sentence_completion",
      title: "Sentence Completion",
      instructions: "Complete the sentences with the correct irregular verb form.",
      questions: [
        {
          question: "Complete: 'I _____ to the movies last night.'",
          options: ["go", "went", "gone", "going"],
          correctAnswer: "went",
          explanation: "The correct answer is 'went'. Use the past simple form of 'go'."
        },
        {
          question: "Complete: 'She _____ a beautiful dress.'",
          options: ["buy", "buyed", "bought", "buying"],
          correctAnswer: "bought",
          explanation: "The correct answer is 'bought'. 'Buy' is irregular: buy → bought → bought."
        },
        {
          question: "Complete: 'We _____ dinner at 7 PM.'",
          options: ["eat", "eated", "ate", "eating"],
          correctAnswer: "ate",
          explanation: "The correct answer is 'ate'. 'Eat' is irregular: eat → ate → eaten."
        },
        {
          question: "Complete: 'He _____ me the truth.'",
          options: ["tell", "telled", "told", "telling"],
          correctAnswer: "told",
          explanation: "The correct answer is 'told'. 'Tell' is irregular: tell → told → told."
        }
      ]
    },
    {
      type: "memory_exercises",
      title: "Memory Exercises",
      instructions: "Test your memory of irregular verb forms.",
      questions: [
        {
          question: "What is the past simple of 'get'?",
          options: ["getted", "got", "gotten", "getting"],
          correctAnswer: "got",
          explanation: "The past simple of 'get' is 'got'. The past participle is 'gotten' (in American English)."
        },
        {
          question: "What is the past simple of 'come'?",
          options: ["comed", "came", "come", "coming"],
          correctAnswer: "came",
          explanation: "The past simple of 'come' is 'came'. The past participle is 'come'."
        },
        {
          question: "What is the past simple of 'know'?",
          options: ["knowed", "knew", "known", "knowing"],
          correctAnswer: "knew",
          explanation: "The past simple of 'know' is 'knew'. The past participle is 'known'."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      mistake: "Adding -ed to irregular verbs",
      example: "❌ goed, seed, doed, eated",
      correction: "✅ went, saw, did, ate",
      explanation: "Irregular verbs don't follow the -ed pattern. They must be memorized."
    },
    {
      mistake: "Confusing past simple and past participle",
      example: "❌ I have went, I have saw",
      correction: "✅ I have gone, I have seen",
      explanation: "Past simple is used for completed actions, past participle is used with 'have/has'."
    },
    {
      mistake: "Using regular forms for irregular verbs",
      example: "❌ buyed, telled, thinked",
      correction: "✅ bought, told, thought",
      explanation: "These verbs are irregular and have special past forms that must be learned."
    }
  ]
};
