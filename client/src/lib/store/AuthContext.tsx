import { createContext, useState, ReactNode } from "react"

type User = {
  username: string
  _id: string
}

type initialContextType = {
  user: User
  authenticateUser: (authenticatedUser: User) => void
  isAuth: boolean
  invalidateUser: (authenticatedUser: User) => void
}

const initialContext = {
  user: { username: "", _id: "" },
  authenticateUser: () => {},
  isAuth: false,
  invalidateUser: () => {},
}

const AuthContext = createContext<initialContextType>(initialContext)

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ username: "", _id: "" })
  const [isAuth, setIsAuth] = useState(false)

  const authenticateUser = (authenticatedUser: User) => {
    setUser(authenticatedUser)
    setIsAuth(true)
  }

  const invalidateUser = () => {
    setUser({ username: "", _id: "" })
    setIsAuth(false)
  }

  const contextValue: initialContextType = {
    user,
    authenticateUser,
    isAuth,
    invalidateUser,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider
export { AuthContext }
