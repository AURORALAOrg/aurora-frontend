export const DIFFICULTY_SETTINGS = {
    Medium: { pairs: 8, time: 40 },
    Hard: { pairs: 12, time: 30 },
    Expert: { pairs: 16, time: 20 },
    Master: { pairs: 20, time: 15 }
  };
  
export const WORD_PAIRS = [ 
  // Academic and scientific terminology
  { id: 1, wordEn: "Hypothesis", wordEs: "Hipótesis" },
  { id: 2, wordEn: "Experiment", wordEs: "Experimento" },
  { id: 3, wordEn: "Theory", wordEs: "Teoría" },
  { id: 4, wordEn: "Observation", wordEs: "Observación" },
  { id: 5, wordEn: "Data", wordEs: "Datos" },
  { id: 6, wordEn: "Analysis", wordEs: "Análisis" },
  { id: 7, wordEn: "Publication", wordEs: "Publicación" },
  { id: 8, wordEn: "Peer review", wordEs: "Revisión por pares" },
  { id: 9, wordEn: "Variables", wordEs: "Variables" },
  { id: 10, wordEn: "Conclusion", wordEs: "Conclusión" },

  // Complex cognates
  { id: 11, wordEn: "Innovation", wordEs: "Innovación" },
  { id: 12, wordEn: "Adaptation", wordEs: "Adaptación" },
  { id: 13, wordEn: "Configuration", wordEs: "Configuración" },
  { id: 14, wordEn: "Migration", wordEs: "Migración" },
  { id: 15, wordEn: "Implementation", wordEs: "Implementación" },
  { id: 16, wordEn: "Evaluation", wordEs: "Evaluación" },
  { id: 17, wordEn: "Transformation", wordEs: "Transformación" },
  { id: 18, wordEn: "Optimization", wordEs: "Optimización" },
  { id: 19, wordEn: "Investigation", wordEs: "Investigación" },
  { id: 20, wordEn: "Interpretation", wordEs: "Interpretación" },

  // Philosophical terms
  { id: 21, wordEn: "Existence", wordEs: "Existencia" },
  { id: 22, wordEn: "Ethics", wordEs: "Ética" },
  { id: 23, wordEn: "Metaphysics", wordEs: "Metafísica" },
  { id: 24, wordEn: "Epistemology", wordEs: "Epistemología" },
  { id: 25, wordEn: "Ontology", wordEs: "Ontología" },
  { id: 26, wordEn: "Reason", wordEs: "Razón" },
  { id: 27, wordEn: "Consciousness", wordEs: "Conciencia" },
  { id: 28, wordEn: "Dualism", wordEs: "Dualismo" },
  { id: 29, wordEn: "Determinism", wordEs: "Determinismo" },
  { id: 30, wordEn: "Phenomenology", wordEs: "Fenomenología" },

  // Technical vocabulary
  { id: 31, wordEn: "Protocol", wordEs: "Protocolo" },
  { id: 32, wordEn: "Encryption", wordEs: "Cifrado" },
  { id: 33, wordEn: "Bandwidth", wordEs: "Ancho de banda" },
  { id: 34, wordEn: "Latency", wordEs: "Latencia" },
  { id: 35, wordEn: "Topology", wordEs: "Topología" },
  { id: 36, wordEn: "Cache", wordEs: "Caché" },
  { id: 37, wordEn: "Node", wordEs: "Nodo" },
  { id: 38, wordEn: "Cluster", wordEs: "Clúster" },
  { id: 39, wordEn: "Virtualization", wordEs: "Virtualización" },
  { id: 40, wordEn: "Scalability", wordEs: "Escalabilidad" }
];
  

// New game scoring and timing constants
export const GAME_SETTINGS = {
  POINTS: {
    MATCH: 100,          // Points for finding a match
    COMBO_BONUS: 50,     // Bonus points for combo (every 3 matches)
    SPEED_BONUS: 25,     // Bonus points for quick matches (under threshold)
  },
  TIMING: {
    CARD_FLIP_DELAY: 500,    // Time cards stay flipped when no match (ms)
    QUICK_MATCH_THRESHOLD: 3,  // Seconds threshold for speed bonus
    COMBO_THRESHOLD: 3,        // Number of matches needed for combo
  },
  ANIMATIONS: {
    CARD_FLIP_DURATION: 0.3,   // Card flip animation duration (seconds)
  }
};