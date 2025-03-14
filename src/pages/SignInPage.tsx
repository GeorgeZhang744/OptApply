import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";


const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (login: React.FormEvent) => {
    login.preventDefault();
    navigate("/home");
    console.log("Email: ", email);
    console.log("Password: ", password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      
      <div className="flex flex-col items-center mb-6">
        <img src={logo} alt="Logo" className="w-30 h-30" />
      </div>

      
      <div className="bg-neutral text-neutral-content p-8 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>

        
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