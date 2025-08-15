module.exports = {
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: false,
    collectCoverageFrom: [
        '**/*.js',
        '!**/node_modules/**',
        '!**/coverage/**',
        '!jest.config.js',
        '!.eslintrc.js',
        '!**/api/**',
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
    coverageThreshold: {
        global: {
            branches: 65,
            functions: 75,
            lines: 70,
            statements: 70,
        },
    },
    testMatch: ['**/tests/**/*.test.js', '**/?(*.)+(spec|test).js'],
    testTimeout: 10000,
    setupFilesAfterEnv: [],
};
