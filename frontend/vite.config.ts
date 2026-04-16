/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  root: '.',
  server: {
    fs: {
      strict: false,
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      // input: {
      //   main: path.resolve(__dirname, 'src/app/index.tsx')
      // }
      input: path.resolve(__dirname, 'index.html')
    }
  },
  base: './', // чтобы пути к assets работали правильно
  test: {  
    environment: "jsdom",  // Эмулируем браузерное окружение 
    globals: true,  // Чтобы не импортировать describe, it, expect в каждом тесте
    setupFiles: "./src/shared/config/test/setup.ts",  
  },  
})
