// jest.config.ts
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default async () => {
  const nextConfig = await createJestConfig(config)()
  // next/jest's default transformIgnorePatterns blocks the entire ESM-only
  // markdown ecosystem (react-markdown + its remark/rehype/unist/mdast/
  // micromark/hast/vfile transitive deps) used by MessageBubble. That tree
  // is large and changes with every dependency bump, so rather than
  // enumerate each package, allow node_modules to be transformed entirely.
  nextConfig.transformIgnorePatterns = ['^.+\\.module\\.(css|sass|scss)$']
  return nextConfig
}
