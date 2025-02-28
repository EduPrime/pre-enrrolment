/// <reference types="vite/client" />
// <reference types="vite/types/importMeta.d.ts" />

declare interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_DATABASE_URL: string
    readonly VITE_POSTGREST_URL: string

    readonly VITE_JWT_TOKEN: string
  }
  
declare interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  