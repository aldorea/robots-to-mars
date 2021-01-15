import type { Config } from '@jest/types';
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    testEnvironment: 'node',
    preset: 'ts-jest',
    moduleFileExtensions: ['ts', 'js'],
    clearMocks: true,
    collectCoverage: true
  };
};
