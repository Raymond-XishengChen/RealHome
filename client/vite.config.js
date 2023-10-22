import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // Adding a proxy so that everytime when a request occurs to the "api" route, add the localhost 3000 to the beginning
  server:{
    proxy: {
        "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  plugins: [react()],
})
