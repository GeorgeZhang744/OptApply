import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
//import {mockUsers} from "../data/signupData";


const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleLogin = async (login: React.FormEvent) => {
    login.preventDefault();



    try {
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(true);
        setErrorMessage(data.message || "Login failed");
        return;
      }

      // Login successful
      console.log("Login successful:", data);
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Could not connect to server");
      setError(true);
    }

    // const isUser = mockUsers.find(
    //   user => user.email === email && user.password ===password
    // )

    // if(isUser){
    //   login.preventDefault();
    //   navigate("/home");
    //   console.log("Login Successful");
    //   console.log("Email: ", email);
    //   console.log("Password: ", password);
    // } else{
    //   console.log("Invalid email or password");
    //   setError(true);
    // }
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      
      <div className="flex flex-col items-center mb-6">
        <img src={logo} alt="Logo" className="w-30 h-30" />
      </div>

      
      <div className="bg-neutral text-neutral-content p-8 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>

        {error && (
              <p className="text-error text-sm mt-1">{errorMessage}</p>
        )}
        
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          
          <div>
            <label className="flex justify-start text-sm font-medium">Email</label>
            <input
              type="email"
              className="input text-base-content input-bordered w-full mt-1"
              value={email}
              onChange={email => setEmail(email.target.value)}
              placeholder="Enter Email"
              required
            />
          </div>

          
          <div>
            <label className="flex justify-start text-sm font-medium">Password</label>
            <input
              type="password"
              className="input text-base-content input-bordered w-full mt-1"
              value={password}
              onChange={password => setPassword(password.target.value)}
              placeholder="Enter Password"
              required
            />
          </div>

          
          <button type="submit" className="btn btn-success btn-soft ">
            Sign In
          </button>
        </form>

        <div className="flex justify-end mt-3 text-sm">
          <Link to="/signup" className="text-info font-semibold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;