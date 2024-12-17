import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/projektit_react/react-sovellusmalli/',
  build: {
    outDir: 'react-sovellusmalli',
    assetsDir: 'static'
  }
})
