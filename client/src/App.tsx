import "./App.css";
import { useCallback, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import SignInPage from "./pages/SignInPage";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import ApplicationDetailPage from "./pages/ApplicationDetailPage";
import AddApplicationPage from "./pages/AddApplicationPage";
import EditApplicationPage from "./pages/EditApplicationPage";
import CalendarModal from "./components/Calendar/Calendar";
import { AuthContext } from "./contexts/AuthContext";
import { LoadingContext } from "./contexts/LoadingContext";

function App() {
  const [jwtToken, setJwtToken] = useState("");

  const [loading, setLoading] = useState(false);
  const updateLoading = useCallback((newLoading: boolean) => setLoading(newLoading), []);

  const loadingContextValue = { loading, updateLoading };
  const authContextValue = { jwtToken, setJwtToken };

  return (
    <AuthContext.Provider value={authContextValue}>
      <LoadingContext.Provider value={loadingContextValue}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/home" element={<MainPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/add" element={<AddApplicationPage />} />
            <Route path="/edit/:applicationId" element={<EditApplicationPage />} />
            <Route path="/application/:applicationId" element={<ApplicationDetailPage />} />
          </Routes>
          <CalendarModal />
        </Router>
      </LoadingContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
