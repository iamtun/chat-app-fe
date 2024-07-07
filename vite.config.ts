import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  const PORT = env.VITE_PORT || '3000';
  const HOST = env.VITE_HOST || 'localhost';

  return {
    plugins: [react()],
    server: {
      port: +PORT,
      host: HOST,
    },
  };
});
