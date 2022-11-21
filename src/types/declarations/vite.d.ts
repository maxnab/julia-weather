/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly ENV_OPEN_WEATHER_MAP_API_KEY: string;
    readonly ENV_WINDY_API_KEY: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
