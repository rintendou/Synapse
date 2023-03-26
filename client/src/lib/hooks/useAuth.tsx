import { useContext } from "react"

import { AuthContext } from "../store/AuthContext"

const useAuth = () => {
  const authCtx = useContext(AuthContext)
  return { ...authCtx }
}

export default useAuth
