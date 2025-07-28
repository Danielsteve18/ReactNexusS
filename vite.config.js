import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';



export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite acceder desde cualquier IP
    port: 5173, // Asegura que coincida con el puerto que usas
    strictPort: true,
    historyApiFallback: true,
    allowedHosts: ["b697-181-224-161-197.ngrok-free.app"] // Agrega la URL generada por Ngrok
  }
});
