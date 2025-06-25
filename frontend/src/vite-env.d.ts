/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH_PROD: string;
  readonly VITE_BASE_PATH_LOCAL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}