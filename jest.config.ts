export default {
  preset: "ts-jest",
  transform: { "^.+\\.ts?$": "ts-jest" },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "jsdom",
};
