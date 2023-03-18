import RouterLink from "./components/ui/RouterLink"

function App() {
  return (
    <div className="bg-primary">
      <RouterLink to="/" routerLinkText="Home"></RouterLink>
      <RouterLink to="/test" routerLinkText="Home"></RouterLink>
      <RouterLink to="/anotherroute" routerLinkText="Home"></RouterLink>
    </div>
  )
}

export default App
