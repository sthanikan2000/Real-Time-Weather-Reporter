/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_B_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}