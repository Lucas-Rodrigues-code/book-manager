export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Mapeia o alias "@" para a pasta "src"
    },
    setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.tsx'],
};
