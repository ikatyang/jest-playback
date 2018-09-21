module.exports = /** @type {jest.ProjectConfig} */ ({
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/tests/**/test.ts'],
  transform: { '\\.ts$': 'ts-jest' },
  coverageReporters: ['lcov', 'text-summary'],
});
