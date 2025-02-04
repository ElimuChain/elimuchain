import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GetStarted from "./pages/GetStarted";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import AboutPage from "./pages/AboutPage";
import CareersPage from "./pages/CareersPage";
import BlogPage from "./pages/BlogPage";
import DocumentationPage from "./pages/DocumentationPage";
import SupportPage from "./pages/SupportPage";
import PartnersPage from "./pages/PartnersPage";

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/get-started/*" element={<GetStarted />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
