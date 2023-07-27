import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

const pathResolve = (dir: string): any => {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      "@": pathResolve('./src/'),
      assets: pathResolve('./src/assets')
    }
  }
})
