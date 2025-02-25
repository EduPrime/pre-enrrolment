/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_DATABASE_URL: string
    readonly VITE_POSTGREST_URL: string

    readonly VITE_JWT_TOKEN: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  