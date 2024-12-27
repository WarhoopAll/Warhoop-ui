import { defineConfig } from 'vite'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  css: {
    postcss,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      find: /^~.+/,
      replacement: (val) => {
        return val.replace(/^~/, "");
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },

  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
});