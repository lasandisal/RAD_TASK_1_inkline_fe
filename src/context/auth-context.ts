import { createContext } from "react"

export type User = { id: string; email: string; roles: string[] }
export type AuthContextValue = {
  user: User | null
  setUser: (user: User | null) => void
  loading: boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
