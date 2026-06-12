import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    // Redirige todas las rutas al index.html para que el router SPA funcione
    historyApiFallback: true,
  }
})
