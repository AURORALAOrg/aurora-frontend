// jest.config.mjs
/** @type {import('jest').Config} */

export default {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  extensionsToTreatAsEsm: [".jsx"], // Treat only .jsx as ESM explicitly
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
