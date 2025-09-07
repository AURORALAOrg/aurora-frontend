export const grammarLessons = {
    lesson1: {
      title: "Subject-Verb-Object Pattern",
      description: "Learn the basic SVO structure and identify sentence components",
      content: {
        explanation: "Every English sentence follows the Subject-Verb-Object (SVO) pattern. The subject does the action (verb) to the object.",
        examples: [
          "Maria reads books → Subject: Maria, Verb: reads, Object: books",
          "The cat drinks milk → Subject: The cat, Verb: drinks, Object: milk",
          "Students study English → Subject: Students, Verb: study, Object: English"
        ]
      },
      exercises: [
        // Sentence ordering (5 exercises)
        {
          type: "ordering",
          question: "Put in correct order: 'books / reads / Maria / every day'",
          options: [
            "Maria books reads every day",
            "Maria reads books every day",
            "Reads Maria books every day",
            "Books reads Maria every day"
          ],
          answer: 1,
          explanation: "Subject (Maria) + Verb (reads) + Object (books) + Time (every day)"
        },
        {
          type: "ordering",
          question: "Put in correct order: 'the piano / plays / John / beautifully'",
          options: [
            "John plays the piano beautifully",
            "The piano plays John beautifully",
            "Plays John the piano beautifully",
            "Beautifully John plays the piano"
          ],
          answer: 0,
          explanation: "Subject (John) + Verb (plays) + Object (the piano) + Adverb (beautifully)"
        },
        {
          type: "ordering",
          question: "Put in correct order: 'homework / do / students / their'",
          options: [
            "Homework do students their",
            "Students their homework do",
            "Students do their homework",
            "Do students their homework"
          ],
          answer: 2,
          explanation: "Subject (Students) + Verb (do) + Object (their homework)"
        },
        {
          type: "ordering",
          question: "Put in correct order: 'coffee / drinks / she / hot'",
          options: [
            "She drinks hot coffee",
            "Coffee drinks she hot",
            "Hot coffee drinks she",
            "Drinks she hot coffee"
          ],
          answer: 0,
          explanation: "Subject (She) + Verb (drinks) + Adjective + Object (hot coffee)"
        },
        {
          type: "ordering",
          question: "Put in correct order: 'the newspaper / reads / my father / morning / every'",
          options: [
            "My father reads the newspaper every morning",
            "The newspaper reads my father every morning",
            "Every morning my father reads the newspaper",
            "Reads my father the newspaper every morning"
          ],
          answer: 0,
          explanation: "Subject (My father) + Verb (reads) + Object (the newspaper) + Time (every morning)"
        },
        // Component identification (4 exercises)
        {
          type: "identification",
          question: "Identify the SUBJECT in: 'The teacher explains the lesson clearly.'",
          options: ["The teacher", "explains", "the lesson", "clearly"],
          answer: 0,
          explanation: "The subject is who or what performs the action - 'The teacher'"
        },
        {
          type: "identification",
          question: "Identify the VERB in: 'Children play games in the park.'",
          options: ["Children", "play", "games", "park"],
          answer: 1,
          explanation: "The verb shows the action - 'play'"
        },
        {
          type: "identification",
          question: "Identify the OBJECT in: 'We watch movies on weekends.'",
          options: ["We", "watch", "movies", "weekends"],
          answer: 2,
          explanation: "The object receives the action - 'movies'"
        },
        {
          type: "identification",
          question: "Identify the SUBJECT in: 'My sister cooks delicious food.'",
          options: ["My sister", "cooks", "delicious", "food"],
          answer: 0,
          explanation: "The subject performs the action - 'My sister'"
        },
        // Sentence creation (3 exercises)
        {
          type: "creation",
          question: "Create a sentence with: Subject: 'Dogs' + Verb: 'chase' + Object: 'cats'",
          options: [
            "Dogs chase cats",
            "Cats chase dogs",
            "Chase dogs cats",
            "Dogs cats chase"
          ],
          answer: 0,
          explanation: "Subject (Dogs) + Verb (chase) + Object (cats)"
        },
        {
          type: "creation",
          question: "Create a sentence with: Subject: 'The boy' + Verb: 'kicks' + Object: 'the ball'",
          options: [
            "The ball kicks the boy",
            "The boy kicks the ball",
            "Kicks the boy the ball",
            "The boy the ball kicks"
          ],
          answer: 1,
          explanation: "Subject (The boy) + Verb (kicks) + Object (the ball)"
        },
        {
          type: "creation",
          question: "Create a sentence with: Subject: 'She' + Verb: 'writes' + Object: 'letters'",
          options: [
            "Letters writes she",
            "She letters writes",
            "She writes letters",
            "Writes she letters"
          ],
          answer: 2,
          explanation: "Subject (She) + Verb (writes) + Object (letters)"
        }
      ]
    },
  
    lesson2: {
      title: "Adding Adjectives & Adverbs",
      description: "Learn proper placement of descriptive words in sentences",
      content: {
        explanation: "Adjectives describe nouns and usually come BEFORE the noun. Adverbs describe verbs and can be placed in different positions.",
        examples: [
          "Adjective: 'I have a red car' (adjective before noun)",
          "Adverb: 'She sings beautifully' (adverb after verb)",
          "Adverb: 'Quickly, he ran home' (adverb at beginning)"
        ]
      },
      exercises: [
        // Adjective placement (4 exercises)
        {
          type: "adjective",
          question: "Add the adjective 'beautiful' to: 'I saw a flower'",
          options: [
            "I saw a beautiful flower",
            "I beautiful saw a flower",
            "I saw beautiful a flower",
            "Beautiful I saw a flower"
          ],
          answer: 0,
          explanation: "Adjectives come before the noun: 'a beautiful flower'"
        },
        {
          type: "adjective",
          question: "Add the adjective 'old' to: 'The man walks slowly'",
          options: [
            "The old man walks slowly",
            "The man old walks slowly",
            "The man walks old slowly",
            "Old the man walks slowly"
          ],
          answer: 0,
          explanation: "Adjectives come before the noun: 'The old man'"
        },
        {
          type: "adjective",
          question: "Add the adjective 'delicious' to: 'We ate food'",
          options: [
            "We ate delicious food",
            "We delicious ate food",
            "Delicious we ate food",
            "We ate food delicious"
          ],
          answer: 0,
          explanation: "Adjectives come before the noun: 'delicious food'"
        },
        {
          type: "adjective",
          question: "Add the adjective 'small' to: 'The child plays with toys'",
          options: [
            "The small child plays with toys",
            "The child small plays with toys",
            "The child plays with small toys",
            "Both A and C are correct"
          ],
          answer: 3,
          explanation: "Both 'small child' and 'small toys' are grammatically correct"
        },
        // Adverb positioning (4 exercises)
        {
          type: "adverb",
          question: "Add the adverb 'carefully' to: 'She drives the car'",
          options: [
            "She carefully drives the car",
            "She drives the car carefully",
            "Carefully, she drives the car",
            "All of the above are correct"
          ],
          answer: 3,
          explanation: "Adverbs can be placed before the verb, after the object, or at the beginning"
        },
        {
          type: "adverb",
          question: "Add the adverb 'loudly' to: 'The dog barks'",
          options: [
            "The dog barks loudly",
            "The dog loudly barks",
            "Loudly the dog barks",
            "The loudly dog barks"
          ],
          answer: 0,
          explanation: "For simple sentences, adverbs usually come after the verb: 'barks loudly'"
        },
        {
          type: "adverb",
          question: "Add the adverb 'quickly' to: 'He finished his work'",
          options: [
            "He quickly finished his work",
            "He finished his work quickly",
            "Quickly, he finished his work",
            "All of the above are correct"
          ],
          answer: 3,
          explanation: "Adverbs of manner can be placed in multiple positions"
        },
        {
          type: "adverb",
          question: "Add the adverb 'always' to: 'She arrives on time'",
          options: [
            "She always arrives on time",
            "She arrives always on time",
            "Always she arrives on time",
            "She arrives on time always"
          ],
          answer: 0,
          explanation: "Frequency adverbs like 'always' come before the main verb"
        },
        // Sentence expansion (3 exercises)
        {
          type: "expansion",
          question: "Expand: 'The cat sleeps' (add adjective + adverb)",
          options: [
            "The black cat sleeps peacefully",
            "The cat black sleeps peacefully",
            "The cat sleeps black peacefully",
            "Black the cat peacefully sleeps"
          ],
          answer: 0,
          explanation: "Adjective before noun (black cat) + adverb after verb (sleeps peacefully)"
        },
        {
          type: "expansion",
          question: "Expand: 'Students study' (add adjective + adverb)",
          options: [
            "Smart students study hard",
            "Students smart study hard",
            "Smart students hard study",
            "Students study smart hard"
          ],
          answer: 0,
          explanation: "Adjective before noun (smart students) + adverb after verb (study hard)"
        },
        {
          type: "expansion",
          question: "Expand: 'The bird flies' (add adjective + adverb)",
          options: [
            "The beautiful bird flies gracefully",
            "The bird beautiful flies gracefully",
            "Beautiful the bird gracefully flies",
            "The beautiful bird gracefully flies"
          ],
          answer: 0,
          explanation: "Adjective before noun (beautiful bird) + adverb after verb (flies gracefully)"
        }
      ]
    },
  
    lesson3: {
      title: "Time & Place Expressions",
      description: "Learn correct placement of time and place expressions in sentences",
      content: {
        explanation: "Time expressions usually come at the END of sentences. Place expressions come AFTER the object but BEFORE time expressions. Order: Subject + Verb + Object + Place + Time",
        examples: [
          "I study English at home in the evening",
          "She works in the office every day",
          "We play football in the park on Sundays"
        ]
      },
      exercises: [
        // Expression placement (4 exercises)
        {
          type: "placement",
          question: "Correct order for: 'I / study / English / in the evening / at home'",
          options: [
            "I study English at home in the evening",
            "I study English in the evening at home",
            "At home I study English in the evening",
            "In the evening I study English at home"
          ],
          answer: 0,
          explanation: "Order: Subject + Verb + Object + Place + Time"
        },
        {
          type: "placement",
          question: "Correct order for: 'She / works / on weekdays / in the city'",
          options: [
            "She works in the city on weekdays",
            "She works on weekdays in the city",
            "In the city she works on weekdays",
            "On weekdays she works in the city"
          ],
          answer: 0,
          explanation: "Place (in the city) comes before time (on weekdays)"
        },
        {
          type: "placement",
          question: "Correct order for: 'We / eat / dinner / at 7 PM / in the kitchen'",
          options: [
            "We eat dinner in the kitchen at 7 PM",
            "We eat dinner at 7 PM in the kitchen",
            "In the kitchen we eat dinner at 7 PM",
            "At 7 PM we eat dinner in the kitchen"
          ],
          answer: 0,
          explanation: "Place (in the kitchen) comes before time (at 7 PM)"
        },
        {
          type: "placement",
          question: "Correct order for: 'They / play / tennis / every Saturday / at the club'",
          options: [
            "They play tennis at the club every Saturday",
            "They play tennis every Saturday at the club",
            "At the club they play tennis every Saturday",
            "Every Saturday they play tennis at the club"
          ],
          answer: 0,
          explanation: "Place (at the club) comes before time (every Saturday)"
        },
        // Preposition selection (5 exercises)
        {
          type: "preposition",
          question: "Choose the correct preposition: 'I wake up ___ 6 AM'",
          options: ["at", "in", "on", "by"],
          answer: 0,
          explanation: "Use 'at' with specific times: at 6 AM, at noon, at midnight"
        },
        {
          type: "preposition",
          question: "Choose the correct preposition: 'We have class ___ Monday'",
          options: ["at", "in", "on", "by"],
          answer: 2,
          explanation: "Use 'on' with days of the week: on Monday, on Friday"
        },
        {
          type: "preposition",
          question: "Choose the correct preposition: 'She was born ___ 1995'",
          options: ["at", "in", "on", "by"],
          answer: 1,
          explanation: "Use 'in' with years, months, seasons: in 1995, in January"
        },
        {
          type: "preposition",
          question: "Choose the correct preposition: 'The book is ___ the table'",
          options: ["at", "in", "on", "by"],
          answer: 2,
          explanation: "Use 'on' for surfaces: on the table, on the floor"
        },
        {
          type: "preposition",
          question: "Choose the correct preposition: 'He lives ___ New York'",
          options: ["at", "in", "on", "by"],
          answer: 1,
          explanation: "Use 'in' with cities, countries: in New York, in Japan"
        },
        // Complete sentences (3 exercises)
        {
          type: "complete",
          question: "Complete: 'I go to school ___'",
          options: [
            "in the morning by bus",
            "by bus in the morning",
            "morning by bus in the",
            "by morning bus in the"
          ],
          answer: 1,
          explanation: "Place (by bus) comes before time (in the morning)"
        },
        {
          type: "complete",
          question: "Complete: 'She reads books ___'",
          options: [
            "in the library every evening",
            "every evening in the library",
            "library in the every evening",
            "evening every in the library"
          ],
          answer: 0,
          explanation: "Place (in the library) comes before time (every evening)"
        },
        {
          type: "complete",
          question: "Complete: 'We have dinner ___'",
          options: [
            "at home at 6 PM",
            "at 6 PM at home",
            "home at at 6 PM",
            "6 PM at at home"
          ],
          answer: 0,
          explanation: "Place (at home) comes before time (at 6 PM)"
        }
      ]
    },
  
    lesson4: {
      title: "Connecting Ideas with 'And', 'But', 'Or'",
      description: "Learn to combine sentences using simple conjunctions",
      content: {
        explanation: "Conjunctions connect ideas. 'And' adds information, 'But' shows contrast, 'Or' shows choice. Use commas before conjunctions when connecting complete sentences.",
        examples: [
          "I like coffee, and I like tea. (addition)",
          "I like coffee, but I don't like tea. (contrast)",
          "Do you want coffee or tea? (choice)"
        ]
      },
      exercises: [
        // Sentence combining (4 exercises)
        {
          type: "combining",
          question: "Combine: 'I like pizza.' + 'I like pasta.'",
          options: [
            "I like pizza and pasta",
            "I like pizza but pasta",
            "I like pizza or pasta",
            "I like pizza so pasta"
          ],
          answer: 0,
          explanation: "Use 'and' to add similar ideas together"
        },
        {
          type: "combining",
          question: "Combine: 'It's sunny.' + 'It's cold.'",
          options: [
            "It's sunny and cold",
            "It's sunny but cold",
            "It's sunny or cold",
            "It's sunny so cold"
          ],
          answer: 1,
          explanation: "Use 'but' to show contrast between sunny and cold"
        },
        {
          type: "combining",
          question: "Combine: 'We can walk.' + 'We can take the bus.'",
          options: [
            "We can walk and take the bus",
            "We can walk but take the bus",
            "We can walk or take the bus",
            "We can walk so take the bus"
          ],
          answer: 2,
          explanation: "Use 'or' to show choice between two options"
        },
        {
          type: "combining",
          question: "Combine: 'She studies hard.' + 'She gets good grades.'",
          options: [
            "She studies hard and gets good grades",
            "She studies hard but gets good grades",
            "She studies hard or gets good grades",
            "She studies hard so gets good grades"
          ],
          answer: 0,
          explanation: "Use 'and' to connect related positive ideas"
        },
        // Conjunction selection (4 exercises)
        {
          type: "conjunction",
          question: "Choose: 'I want to go out, ___ it's raining.'",
          options: ["and", "but", "or", "so"],
          answer: 1,
          explanation: "Use 'but' to show contrast between wanting to go out and the rain"
        },
        {
          type: "conjunction",
          question: "Choose: 'Do you prefer tea ___ coffee?'",
          options: ["and", "but", "or", "so"],
          answer: 2,
          explanation: "Use 'or' to offer a choice between tea and coffee"
        },
        {
          type: "conjunction",
          question: "Choose: 'He works hard ___ saves money.'",
          options: ["and", "but", "or", "so"],
          answer: 0,
          explanation: "Use 'and' to connect two related actions"
        },
        {
          type: "conjunction",
          question: "Choose: 'The food looks good, ___ it tastes bad.'",
          options: ["and", "but", "or", "so"],
          answer: 1,
          explanation: "Use 'but' to show contrast between appearance and taste"
        },
        // Complex sentence creation (3 exercises)
        {
          type: "complex",
          question: "Create a complex sentence: 'I study English.' + 'I practice speaking.' + 'I want to improve.'",
          options: [
            "I study English and practice speaking because I want to improve",
            "I study English but practice speaking because I want to improve",
            "I study English or practice speaking because I want to improve",
            "I study English so practice speaking because I want to improve"
          ],
          answer: 0,
          explanation: "Use 'and' to connect similar learning activities"
        },
        {
          type: "complex",
          question: "Create a complex sentence: 'The movie was long.' + 'The movie was boring.' + 'We left early.'",
          options: [
            "The movie was long and boring, so we left early",
            "The movie was long but boring, so we left early",
            "The movie was long or boring, so we left early",
            "The movie was long and boring, but we left early"
          ],
          answer: 0,
          explanation: "Use 'and' for similar negative qualities, 'so' to show result"
        },
        {
          type: "complex",
          question: "Create a complex sentence: 'We can eat at home.' + 'We can go to a restaurant.' + 'You decide.'",
          options: [
            "We can eat at home and go to a restaurant, you decide",
            "We can eat at home but go to a restaurant, you decide",
            "We can eat at home or go to a restaurant, you decide",
            "We can eat at home so go to a restaurant, you decide"
          ],
          answer: 2,
          explanation: "Use 'or' to show choice between two options"
        }
      ]
    }
  };