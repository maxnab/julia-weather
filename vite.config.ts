/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { UserConfig } from 'vite';
import * as dns from 'dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig(({ mode }) => {
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
      react(),
    ],
    envDir: 'env',
    envPrefix: '_',
    build: {
      outDir: `build_${mode}`,
      // rollupOptions: {
      //   output: {
      //     chunkFileNames: 'chunks/[name].[hash].js',
      //   },
      // },
    },
    server: {
      host: 'localhost',
      port: 3000,
      open: '/',
    },
  };

  return config;
});
