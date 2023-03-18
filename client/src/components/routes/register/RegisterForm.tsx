import Card from "../../ui/Card"
import StyledInput from "../../ui/StyledInput"
import StyledButton from "../../ui/StyledButton"

const RegisterForm = () => {
  const registerUserHandler = () => {}

  return (
    <Card twClasses="w-fit mx-auto p-20 border-4 border-secondary space-y-20">
      <h1 className="text-2xl font-bold text-center">Register</h1>
      <div className="flex flex-col">
        <StyledInput name="Full Name" type="text" placeholder="Full Name" />
        <StyledInput
          name="Email Address"
          type="email"
          placeholder="Email Address"
        />
        <StyledInput name="Password" type="password" placeholder="Password" />
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
