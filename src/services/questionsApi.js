import logger from "@/lib/logger";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const questionsApi = {
  // Create a new question
  createQuestion: async (questionData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });

      if (!response.ok) {
        logger.error("Failed to create question", { response: response.status, statusText: response.statusText });
        throw new Error("Failed to create question");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating question:", error);
      throw error;
    }
  },

  // Get all questions
  getAllQuestions: async ({ type, category, subCategory, englishLevel, difficulty } = {}) => {
    try {
      const params = new URLSearchParams();
      if (type) params.append("type", type);
      if (category) params.append("category", category);
      if (subCategory) params.append("subCategory", subCategory);
      if (englishLevel) params.append("englishLevel", englishLevel);
      if (difficulty) params.append("difficulty", difficulty);

      const queryString = params.toString();
      const url = `${API_BASE_URL}/questions${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  },

  // Get a specific question
  getQuestion: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/questions/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch question");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching question:", error);
      throw error;
    }
  },

  // Update a question
  updateQuestion: async (id, questionData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/questions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });

      if (!response.ok) {
        throw new Error("Failed to update question");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating question:", error);
      throw error;
    }
  },

  // Delete a question
  deleteQuestion: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/questions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete question");
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting question:", error);
      throw error;
    }
  },
};
