import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import Signin from "./pages/SignInPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <div className="text-center">
        <NavBar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/home" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
