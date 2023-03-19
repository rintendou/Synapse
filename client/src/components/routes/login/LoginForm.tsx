import { useRef, useState } from "react"
import Card from "../../ui/Card"
import Error from "../../ui/Error"
import StyledButton from "../../ui/StyledButton"
import StyledInputRef from "../../ui/StyledInputRef"
import Success from "../../ui/Success"

type Props = {
  didRegisterSuccessfully: boolean
  successMessage: string
}

const LoginForm = ({ didRegisterSuccessfully, successMessage }: Props) => {
  // I opted to use the useRef hook instead of useState to prevent
  // unnecessary re-renders of this component per each character typed
  const emailAddressRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const loginUserHandler = () => {
    const emailAddress = emailAddressRef.current!.value
    const password = passwordRef.current!.value

    const loginUser = async () => {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: emailAddress,
          password: password,
        }),
        headers: { "Content-Type": "application/json" },
      })

      const data = await response.json()

      if (!data.ok) {
        setIsError(true)
        setErrorMessage(data.message)
        return
      }

      setIsError(false)
      console.log(data)
    }
    loginUser()
  }

  return (
    <Card twClasses="w-[45rem] mx-auto p-20 border-4 border-secondary space-y-16">
      <h1 className="text-4xl font-bold text-center">Login</h1>
      <div className="flex flex-col">
        <StyledInputRef
          name="Email Address"
          type="email"
          placeholder="Email Address"
          ref={emailAddressRef}
        />
        <StyledInputRef
          name="Password"
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
      </div>
      <StyledButton
        buttonText="Login"
        twClasses="w-full py-3"
        onClick={loginUserHandler}
      />
      {didRegisterSuccessfully && <Success successMessage={successMessage} />}
      {isError && <Error errorMessage={errorMessage} />}
    </Card>
  )
}

export default LoginForm
