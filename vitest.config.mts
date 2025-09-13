import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'istanbul',
      exclude: [
        'node_modules/**',
        'dist/**',
        '.next/**',
        '.storybook/**',
        'src/middleware.ts',
        '**/*.stories.{js,ts,jsx,tsx}',
        '**/*.config.{js,ts,jsx,tsx,mjs}',
        '**/*.types.{js,ts,jsx,tsx,mjs}',
        '**/*.d.ts',
      ],
    },
  },
})
