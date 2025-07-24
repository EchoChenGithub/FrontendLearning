import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { // <-- 关键：resolve 对象在这里
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
