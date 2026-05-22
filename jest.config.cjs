const { pathsToModuleNameMapper } = require('ts-jest');
const { readFileSync } = require('fs');
const { compilerOptions } = JSON.parse(readFileSync('./tsconfig.json', 'utf8'));

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
};
