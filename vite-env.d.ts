/// <reference types="vite/client" />


interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // Add more custom environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
