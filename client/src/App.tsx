import { Routes, Route } from "react-router-dom"

// Routes
import Application from "./components/routes/application/Application"
import Dev from "./components/routes/dev/Dev"
import LandingPage from "./components/routes/landing-page/LandingPage"
import PageNotFound from "./components/routes/page-not-found/PageNotFound"

// Components
import Body from "./components/layout/body/Body"
import Footer from "./components/layout/footer/Footer"
import Header from "./components/layout/header/Header"
import LoginRegister from "./components/routes/application/LoginRegister"

function App() {
  return (
    <div className="bg-primary text-secondary">
      <Header />
      <Body>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<Application />} />
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path="/dev" element={<Dev />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Body>
      <Footer />
    </div>
  )
}

export default App
