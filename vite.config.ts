import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port:3001
  },
  plugins: [react()],
})

// https://stackoverflow.com/questions/66147328/is-there-a-way-to-debug-code-in-vscode-initiated-with-vite