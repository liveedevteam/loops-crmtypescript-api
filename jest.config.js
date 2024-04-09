module.exports = {
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    }
};
