/**
 * Cultural Insights Area Assessment Data
 * This file contains assessment data for the four cultural courses:
 * 1. American vs British English
 * 2. Business Etiquette Basics
 * 3. Holiday Traditions
 * 4. Social Media & Modern Communication
 */

export const culturalAssessments = [
  {
    id: "american-vs-british-english",
    title: "American vs British English Assessment",
    description:
      "Test your knowledge of the key differences between American and British English",
    questions: [
      {
        id: "american-vs-british-english-1",
        question:
          "You're writing an email to a British colleague. Which spelling should you use?",
        options: [
          "I will organize the color-coded files in the center",
          "I will organise the colour-coded files in the centre",
          "I will organize the colour-coded files in the center",
          "It doesn't matter",
        ],
        correctAnswer: "I will organise the colour-coded files in the centre",
        explanation:
          "In British English, 'organise', 'colour', and 'centre' are the correct spellings.",
      },
      {
        id: "american-vs-british-english-2",
        question:
          "An American says 'I need to fill up my car.' A British person would say:",
        options: [
          "I need to fill up my car",
          "I need to fill up my automobile",
          "I need to put petrol in my car",
          "I need to gas up my vehicle",
        ],
        correctAnswer: "I need to put petrol in my car",
        explanation:
          "British English uses 'petrol' instead of the American 'gas' or 'gasoline'.",
      },
      {
        id: "american-vs-british-english-3",
        question:
          "Listen to the pronunciation: Which version do you hear? (Audio: 'schedule' pronounced /ˈʃedjuːl/)",
        options: [
          "American pronunciation",
          "British pronunciation",
          "Australian pronunciation",
          "Can't tell",
        ],
        correctAnswer: "British pronunciation",
        explanation:
          "The pronunciation /ˈʃedjuːl/ is characteristic of British English. American English typically uses /ˈskedʒuːl/.",
      },
      {
        id: "american-vs-british-english-4",
        question:
          "You're learning English for international business. Which variety should you focus on?",
        options: [
          "American English only",
          "British English only",
          "Either one, but be consistent",
          "Mix both freely",
        ],
        correctAnswer: "Either one, but be consistent",
        explanation:
          "Both are widely understood in international business. The key is to be consistent in your usage to avoid confusion.",
      },
      {
        id: "american-vs-british-english-5",
        question:
          "In casual conversation, 'rubber' means different things. In American English it can mean _____, in British English it means _____.",
        options: [
          "tire/eraser",
          "eraser/tire",
          "condom/eraser",
          "plastic/elastic",
        ],
        correctAnswer: "condom/eraser",
        explanation:
          "This is a classic example of a 'false friend'. In the US, a 'rubber' is a condom, while in the UK, it's an eraser.",
      },
    ],
  },
  {
    id: "business-etiquette-basics",
    title: "Business Etiquette Basics Assessment",
    description:
      "Assess your understanding of professional etiquette in business contexts",
    questions: [
      {
        id: "business-etiquette-basics-1",
        question:
          "You're 5 minutes late to an important meeting. What should you do?",
        options: [
          "Enter quietly and sit down",
          "Apologize briefly and sit down",
          "Explain in detail why you're late",
          "Wait outside until the meeting ends",
        ],
        correctAnswer: "Apologize briefly and sit down",
        explanation:
          "A brief, quiet apology is professional and shows respect for others' time without causing further disruption.",
      },
      {
        id: "business-etiquette-basics-2",
        question:
          "How should you end a professional email to someone you don't know well?",
        options: [
          "Love, [Your name]",
          "Cheers, [Your name]",
          "Best regards, [Your name]",
          "See ya, [Your name]",
        ],
        correctAnswer: "Best regards, [Your name]",
        explanation:
          "'Best regards' or 'Sincerely' are standard, professional closings for formal emails.",
      },
      {
        id: "business-etiquette-basics-3",
        question:
          "In a business meeting, someone disagrees with your idea. The most professional response is:",
        options: [
          "You're wrong about that",
          "I understand your point, but I see it differently",
          "That's a terrible idea",
          "You don't know what you're talking about",
        ],
        correctAnswer: "I understand your point, but I see it differently",
        explanation:
          "This response acknowledges their perspective respectfully while allowing you to present your own, fostering constructive dialogue.",
      },
      {
        id: "business-etiquette-basics-4",
        question:
          "When introducing yourself in a professional context, you should include:",
        options: [
          "Your name and personal problems",
          "Your name, position, and company",
          "Your name and family details",
          "Just your first name",
        ],
        correctAnswer: "Your name, position, and company",
        explanation:
          "Providing your name, title, and affiliation gives the other person context for who you are and why you're there.",
      },
      {
        id: "business-etiquette-basics-5",
        question: "During a business lunch, when should you start eating?",
        options: [
          "As soon as food arrives",
          "When everyone has been served",
          "After saying grace",
          "When the most important person starts",
        ],
        correctAnswer: "When everyone has been served",
        explanation:
          "It is considered polite to wait until all guests at the table have received their food before you begin eating.",
      },
    ],
  },
  {
    id: "holiday-traditions",
    title: "Holiday Traditions Assessment",
    description:
      "Learn about common holiday traditions and greetings in North America",
    questions: [
      {
        id: "holiday-traditions-1",
        question:
          "Americans typically say '_____' on December 25th and '_____' on January 1st.",
        options: [
          "Happy Holiday/Happy New Year",
          "Merry Christmas/Happy New Year",
          "Good Christmas/Good New Year",
          "Nice Christmas/Nice New Year",
        ],
        correctAnswer: "Merry Christmas/Happy New Year",
        explanation:
          "'Merry Christmas' is the traditional greeting for December 25th, and 'Happy New Year' for January 1st.",
      },
      {
        id: "holiday-traditions-2",
        question: "On Halloween, children dress up in costumes and:",
        options: [
          "Give candy to adults",
          "Go trick-or-treating for candy",
          "Have Easter egg hunts",
          "Watch fireworks",
        ],
        correctAnswer: "Go trick-or-treating for candy",
        explanation:
          "'Trick-or-treating' is the central activity of Halloween for children, where they go door-to-door to collect candy.",
      },
      {
        id: "holiday-traditions-3",
        question: "Thanksgiving in the United States is celebrated on:",
        options: [
          "The third Thursday of November",
          "The fourth Thursday of November",
          "The last Thursday of November",
          "November 30th every year",
        ],
        correctAnswer: "The fourth Thursday of November",
        explanation:
          "Thanksgiving is a federal holiday in the U.S. celebrated on the fourth Thursday of November.",
      },
      {
        id: "holiday-traditions-4",
        question:
          "Which holiday is celebrated differently in the US and Canada?",
        options: ["Christmas", "Halloween", "Thanksgiving", "New Year's Eve"],
        correctAnswer: "Thanksgiving",
        explanation:
          "While both countries celebrate Thanksgiving, Canada celebrates it on the second Monday of October, while the US celebrates it on the fourth Thursday of November.",
      },
      {
        id: "holiday-traditions-5",
        question:
          "If an American colleague invites you to a 'Fourth of July barbecue,' they're inviting you to:",
        options: [
          "A Christmas party",
          "A Halloween party",
          "An Independence Day celebration",
          "A Thanksgiving dinner",
        ],
        correctAnswer: "An Independence Day celebration",
        explanation:
          "The 'Fourth of July' is American Independence Day, commonly celebrated with barbecues, parades, and fireworks.",
      },
    ],
  },
  {
    id: "social-media-communication",
    title: "Social Media & Modern Communication Assessment",
    description:
      "Test your knowledge of modern digital communication and social media etiquette",
    questions: [
      {
        id: "social-media-communication-1",
        question:
          "Your boss sends you a text that says 'Can you send me that report ASAP?' This means:",
        options: [
          "Send it as soon as possible",
          "Send it after school and play",
          "Send it at strange and peculiar times",
          "Send it when you feel like it",
        ],
        correctAnswer: "Send it as soon as possible",
        explanation:
          "ASAP is a common abbreviation for 'As Soon As Possible' and indicates urgency.",
      },
      {
        id: "social-media-communication-2",
        question: "In professional communication, which is most appropriate?",
        options: [
          "hey boss, got ur msg LOL 😂",
          "Hello Mr. Smith, I received your message.",
          "sup boss, ur msg is funny",
          "Boss, ur message LOL",
        ],
        correctAnswer: "Hello Mr. Smith, I received your message.",
        explanation:
          "Using formal language, correct grammar, and avoiding slang or emojis is essential for professional communication.",
      },
      {
        id: "social-media-communication-3",
        question:
          "If someone texts you in ALL CAPITAL LETTERS, it usually means:",
        options: [
          "They're excited",
          "They're shouting/angry",
          "Their caps lock is broken",
          "They want attention",
        ],
        correctAnswer: "They're shouting/angry",
        explanation:
          "In digital etiquette ('netiquette'), writing in all caps is interpreted as shouting and can be seen as aggressive.",
      },
      {
        id: "social-media-communication-4",
        question: "On social media, what does it mean to 'tag' someone?",
        options: [
          "Put a price label on them",
          "Mark them in a post so they get notified",
          "Follow them",
          "Block them",
        ],
        correctAnswer: "Mark them in a post so they get notified",
        explanation:
          "Tagging someone links their profile to your post or photo and sends them a notification.",
      },
      {
        id: "social-media-communication-5",
        question:
          "Which abbreviation would be appropriate in a casual text to a friend but NOT in a professional email?",
        options: [
          "FYI (For Your Information)",
          "ASAP (As Soon As Possible)",
          "BTW (By The Way)",
          "BRB (Be Right Back)",
        ],
        correctAnswer: "BRB (Be Right Back)",
        explanation:
          "While FYI, ASAP, and BTW are common in business, BRB is too informal and implies a real-time conversation that doesn't fit email.",
      },
    ],
  },
];
