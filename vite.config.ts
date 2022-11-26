/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import viteCompression from 'vite-plugin-compression';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { UserConfig } from 'vite';
import * as dns from 'dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig(() => {
  const config: UserConfig = {
    plugins: [
      checker({
        overlay: {
          initialIsOpen: false,
        },
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx,json}"',
        },
      }),
      tsconfigPaths(),
      viteCompression(),
      react(),
    ],
    envDir: 'env',
    envPrefix: 'ENV_',
    build: {
      outDir: 'dist',
    },
    server: {
      host: 'localhost',
      port: 3000,
      open: '/',
    },
  };

  return config;
});
