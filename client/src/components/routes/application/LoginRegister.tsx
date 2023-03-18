import Card from "../../ui/Card"
import Overview from "../../ui/Overview"
import StyledButton from "../../ui/StyledButton"

const LoginRegister = () => {
  return (
    <Card twClasses="w-fit mx-auto p-20">
      <Overview twClasses="space-y-10">
        <h1 className="text-5xl font-bold">Do you have an account with us?</h1>
        <div className="flex flex-row gap-10 justify-center">
          <StyledButton
            buttonText="Login"
            intent="primary"
            onClick={() => {
              console.log("Hello")
            }}
            twClasses="w-32 font-bold text-lg"
          />
          <StyledButton
            buttonText="Register"
            intent="secondary"
            onClick={() => {
              console.log("Hello")
            }}
            twClasses="w-32 font-bold text-lg"
          />
        </div>
      </Overview>
    </Card>
  )
}

export default LoginRegister
