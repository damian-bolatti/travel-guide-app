module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '^~/(.*)$': '<rootDir>/src/$1',
    },
  };
  