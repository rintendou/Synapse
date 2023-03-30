import useAuth from "../../../lib/hooks/useAuth"
import LoginRegister from "./LoginRegister"

const Application = () => {
  const { user } = useAuth()

  console.log(user)

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <LoginRegister />
    </div>
  )
}

export default Application
