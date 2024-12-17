import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copy } from 'vite-plugin-copy'
/* Huom. base määrittää aloituspolun 
   React-kehityspalvelin: ''
   XAMPP: react-sovellusmalli-ii
*/

export default defineConfig({
  plugins: [react(),
            copy({
              targets: [
                { src: 'public/.htaccess', dest: 'c:/xampp/htdocs/projektit_react/react-sovellusmalli' }
              ],
              hook: 'writeBundle' // run the plugin after the bundle is written
            })],
  base: 'projektit_react/react-sovellusmalli',
  build: {
    outDir: 'c:/xampp/htdocs/projektit_react/react-sovellusmalli',
    assetsDir: 'static'
  }
})