import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import SignInPage from "./pages/SignInPage";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import ApplicationDetailPage from "./pages/ApplicationDetailPage";
import AddApplicationPage from "./pages/AddApplicationPage";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/home" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/add" element={<AddApplicationPage />} />
        <Route path="/application/:applicationId" element={<ApplicationDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
