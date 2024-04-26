import { FC, ReactNode, createContext } from "react"
import { createClient } from "@supabase/supabase-js"

interface SupabaseProvider {
  children: ReactNode
}

const app = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export const AppContext = createContext(app)

export const SupabaseProvider: FC<SupabaseProvider> = ({ children }) => {
  console.log(app)
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>
}
