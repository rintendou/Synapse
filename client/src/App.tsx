import { Routes, Route } from "react-router-dom"

import Body from "./components/layout/body/Body"
import Footer from "./components/layout/footer/Footer"
import Header from "./components/layout/header/Header"
import Application from "./components/routes/application/Application"
import LandingPage from "./components/routes/landing-page/LandingPage"
import PageNotFound from "./components/routes/page-not-found/PageNotFound"

function App() {
  return (
    <div className="bg-primary text-secondary">
      <Header />
      <Body>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<Application />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Body>
      <Footer />
    </div>
  )
}

export default App
