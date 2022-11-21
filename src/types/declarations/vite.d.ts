/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly _OPEN_WEATHER_MAP_API_KEY: string;
    readonly _WINDY_API_KEY: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
