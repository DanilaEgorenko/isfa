module.exports = {
    preset: "jest-preset-angular",
    setupFilesAfterEnv: ["<rootDir>/setupJest.ts"],
    transform: {
        "^.+\\.(ts|html)$": "ts-jest",
    },
    transformIgnorePatterns: [
        "node_modules/(?!(jest-preset-angular|@angular|rxjs)/)",
    ],
    collectCoverage: true,
    coverageReporters: ["text", "html"],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "\\.interfaces\\.ts$",
        "\\.types\\.ts$",
        "\\.enums\\.ts$",
        "\\.constants\\.ts$",
    ],
    moduleNameMapper: {
        "^@app/(.*)$": "<rootDir>/src/app/$1",
    },
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.spec.json",
        },
    },
    testEnvironment: "jsdom",
    moduleFileExtensions: ["ts", "html", "js", "json"],
};
