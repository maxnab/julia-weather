import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import environment from 'vite-plugin-environment';

export default () => defineConfig({
  plugins: [reactRefresh(), environment('all')],
});
