import { useEffect, useRef } from "react"

import Card from "../../ui/Card"
import StyledButton from "../../ui/StyledButton"
import StyledInputRef from "../../ui/StyledInputRef"

const RegisterForm = () => {
  // I opted to use the useRef hook instead of useState to prevent
  // unnecessary re-renders of this component per each character typed
  const fullNameRef = useRef<HTMLInputElement>(null)
  const emailAddressRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  // focus on the first input on component mount
  useEffect(() => {
    fullNameRef.current!.focus()
  }, [])

  const registerUserHandler = () => {
    const registerUser = async () => {
      const fullName = fullNameRef.current!.value
      const emailAddress = emailAddressRef.current!.value
      const password = passwordRef.current!.value

      const response = await fetch("http://localhost:5173/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ fullName, emailAddress, password }),
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()
      console.log(data)
    }
    registerUser()
  }

  return (
    <Card twClasses="w-fit mx-auto p-20 border-4 border-secondary space-y-20">
      <h1 className="text-4xl font-bold text-center">Register</h1>
      <div className="flex flex-col">
        <StyledInputRef
          name="Full Name"
          type="text"
          placeholder="Full Name"
          ref={fullNameRef}
        />
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
        buttonText="Register"
        twClasses="w-full py-3"
        onClick={registerUserHandler}
      />
    </Card>
  )
}

export default RegisterForm
