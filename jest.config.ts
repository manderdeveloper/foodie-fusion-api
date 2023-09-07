export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleNameMapper: {
      "^@application(.*)$": "<rootDir>/src/application$1",
      "^@dependency-injection(.*)$": "<rootDir>/src/dependency-injection$1",
      "^@domain(.*)$": "<rootDir>/src/domain$1",
      "^@infraestructure(.*)$": "<rootDir>/src/infraestructure$1",
      "^@shared(.*)$": "<rootDir>/src/shared$1",
      "^@tests(.*)$": "<rootDir>/tests$1",
    }
};