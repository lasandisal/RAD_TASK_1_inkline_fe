// tsx - for both ui and ts

import { useEffect, useState, type ReactNode } from "react";
import { getMyDetails } from "../service/auth.";
import { AuthContext, type User } from "./auth-context";

export const AuthProvider =({children}: { children: ReactNode }) =>{
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem("ACCESS_TOKEN")))

  // check if there user exists or not
  useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN')

    if(token){
      getMyDetails()
      .then((res) => {
        if(res.data?.data) setUser(res.data.data)
          else setUser(null)
      })
      .catch((err) => {
        console.error(err)
        setUser(null)
      })
      .finally(() => setLoading(false))
    }
  }, [])
  
  const logout = () => {
    localStorage.removeItem("ACCESS_TOKEN")
    localStorage.removeItem("REFRESH_TOKEN")
    setUser(null)
  }

  return <AuthContext.Provider value={{user, setUser, loading, logout}}>
    {children}</AuthContext.Provider>
}

export default AuthContext