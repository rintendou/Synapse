import Card from "../../ui/Card"
import StyledButton from "../../ui/StyledButton"
import StyledInput from "../../ui/StyledInput"

const LoginForm = () => {
  const loginUserHandler = () => {}

  return (
    <Card twClasses="w-[45rem] mx-auto p-20 border-4 border-secondary space-y-16">
      <h1 className="text-4xl font-bold text-center">Login</h1>
      <div className="flex flex-col">
        <StyledInput
          name="Email Address"
          type="email"
          placeholder="Email Address"
        />
        <StyledInput name="Password" type="password" placeholder="Password" />
      </div>
      <StyledButton
        buttonText="Login"
        twClasses="w-full py-3"
        onClick={loginUserHandler}
      />
    </Card>
  )
}

export default LoginForm
