import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

export default defineConfig(() => {
  return {
    mode: 'test',
    plugins: [react()],

    // All environment variable prefixes that should be exposed to the testing environment.
    envPrefix: ['FIREBASE_', 'FIRESTORE_', 'NEXT_PUBLIC_', 'VITE_PUBLIC_'],

    test: {
      environment: 'jsdom',
      alias: {
        app: '/app',
        lib: '/lib',
        '@/lib': '/lib',
        server: '/server',
        components: '/components',
      },
      globals: true,
      setupFiles: ['./tests/vitest-global-setup.mjs'],
    },
  }
})
