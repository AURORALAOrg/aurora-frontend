export const lesson1Data = {
  title: "Personal Pronouns (Subject & Object)",
  description: "Learn the difference between subject and object pronouns and when to use each type",
  content: {
    theory: {
      title: "Personal Pronoun Types",
      rules: [
        {
          rule: "Subject Pronouns: I, you, he, she, it, we, they",
          examples: ["I love pizza", "You are smart", "He works here", "She studies hard"]
        },
        {
          rule: "Object Pronouns: me, you, him, her, it, us, them",
          examples: ["Tell me the truth", "I saw you yesterday", "Give him the book", "Help her with homework"]
        },
        {
          rule: "Subject pronouns come before the verb",
          examples: ["I eat breakfast", "She walks to school", "They play soccer"]
        },
        {
          rule: "Object pronouns come after the verb or preposition",
          examples: ["Call me later", "Look at him", "Talk to us", "Between you and me"]
        }
      ],
      exceptions: [
        "The pronoun 'you' is the same for both subject and object",
        "The pronoun 'it' is the same for both subject and object",
        "Formal vs informal: 'It is I' (formal) vs 'It's me' (informal)"
      ]
    },
    examples: [
      {
        category: "Subject Position",
        sentences: [
          "I am a student.",
          "You speak English well.",
          "He lives in New York.",
          "She works as a doctor.",
          "We study together.",
          "They are my friends."
        ]
      },
      {
        category: "Object Position",
        sentences: [
          "Please help me with this problem.",
          "I will call you tomorrow.",
          "Give her the message.",
          "Put it on the table.",
          "Come with us to the party.",
          "I know them from school."
        ]
      }
    ]
  },
  exercises: [
    {
      type: "pronoun_replacement",
      title: "Pronoun Replacement",
      instructions: "Replace the words with the correct pronoun.",
      questions: [
        {
          question: "Replace: 'Maria likes pizza' → _____ likes pizza",
          options: ["She", "Her", "Hers", "Maria"],
          correctAnswer: "She",
          explanation: "Maria is the subject, so use 'She'."
        },
        {
          question: "Replace: 'Give the book to John' → Give the book to _____",
          options: ["he", "him", "his", "John"],
          correctAnswer: "him",
          explanation: "John comes after 'to', so use object pronoun 'him'."
        },
        {
          question: "Replace: 'The students are studying' → _____ are studying",
          options: ["They", "Them", "Their", "Students"],
          correctAnswer: "They",
          explanation: "Students is the subject, so use 'They'."
        },
        {
          question: "Replace: 'I saw my sister' → I saw _____",
          options: ["she", "her", "hers", "sister"],
          correctAnswer: "her",
          explanation: "Sister comes after 'saw', so use object pronoun 'her'."
        },
        {
          question: "Replace: 'Tom and I went shopping' → _____ went shopping",
          options: ["We", "Us", "Our", "They"],
          correctAnswer: "We",
          explanation: "Tom and I is the subject, so use 'We'."
        }
      ]
    },
    {
      type: "multiple_choice",
      title: "Choose the Correct Pronoun",
      instructions: "Pick the right pronoun.",
      questions: [
        {
          question: "_____ and Maria are friends.",
          options: ["I", "Me", "My", "Mine"],
          correctAnswer: "I",
          explanation: "Subject position needs 'I'."
        },
        {
          question: "Give _____ the keys.",
          options: ["I", "me", "my", "mine"],
          correctAnswer: "me",
          explanation: "After 'give' use object pronoun 'me'."
        },
        {
          question: "_____ works in a bank.",
          options: ["He", "Him", "His", "Himself"],
          correctAnswer: "He",
          explanation: "Subject position needs 'He'."
        },
        {
          question: "The teacher is looking at _____.",
          options: ["we", "us", "our", "ours"],
          correctAnswer: "us",
          explanation: "After 'at' use object pronoun 'us'."
        }
      ]
    },
    {
      type: "fill_blanks",
      title: "Fill in the Blanks",
      instructions: "Complete with the right pronoun.",
      questions: [
        {
          question: "My brother and _____ live together.",
          options: ["I", "me", "my", "mine"],
          correctAnswer: "I",
          explanation: "Compound subject needs 'I'."
        },
        {
          question: "Can you help _____?",
          options: ["I", "me", "my", "mine"],
          correctAnswer: "me",
          explanation: "After 'help' use 'me'."
        },
        {
          question: "_____ are planning a party.",
          options: ["We", "Us", "Our", "Ours"],
          correctAnswer: "We",
          explanation: "Subject position needs 'We'."
        }
      ]
    }
  ],
  commonMistakes: [
    {
      mistake: "Object pronouns as subjects",
      example: "❌ Me and John went shopping",
      correction: "✅ John and I went shopping",
      explanation: "Use 'I', not 'me' as subject."
    },
    {
      mistake: "Subject pronouns as objects",
      example: "❌ Give it to she",
      correction: "✅ Give it to her",
      explanation: "After verbs use object pronouns."
    },
    {
      mistake: "Wrong compound subjects",
      example: "❌ Him and me are here",
      correction: "✅ He and I are here",
      explanation: "Both parts need subject pronouns."
    },
    {
      mistake: "Between you and I",
      example: "❌ Between you and I",
      correction: "✅ Between you and me",
      explanation: "After 'between' use object pronouns."
    }
  ]
};