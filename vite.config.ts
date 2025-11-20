import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '');
  
  // Prioritize env var from loadEnv, fallback to process.env (for Render/Cloud)
  const apiKey = env.API_KEY || process.env.API_KEY;

  return {
    plugins: [react()],
    define: {
      // Polyfill process.env.API_KEY so the existing code works in the browser
      'process.env.API_KEY': JSON.stringify(apiKey)
    },
    build: {
      outDir: 'dist',
    }
  };
});