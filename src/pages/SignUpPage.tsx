import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";


const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const passwordsMatch = (password === password2);

  const handleSignup = (login: React.FormEvent) => {
    login.preventDefault();
    if (!passwordsMatch) {
      console.error("Passwords do not match!");
      setPasswordError(true);
      return;
    }
    navigate("/home");
    console.log("Email: ", email);
    console.log("Password: ", password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      
      <div className="flex flex-col items-center mb-6">
        <img src={logo} alt="Logo" className="w-30 h-30" />
      </div>

      
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">Sign Up</h2>
        {passwordError && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
          )}
        <form onSubmit={handleSignup} className="flex flex-col space-y-4">
          
          <div>
            <label className="flex justify-start text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="input input-bordered w-full mt-1 bg-gray-400 placeholder-gray-200"
              value={email}
              onChange={email => setEmail(email.target.value)}
              placeholder="Enter Email"
              required
            />
          </div>

          
          <div>
            <label className="flex justify-start text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="input input-bordered w-full mt-1 bg-gray-400 placeholder-gray-200"
              value={password}
              onChange={password => setPassword(password.target.value)}
              placeholder="Set Password"
              required
            />
          </div>

          <div>
            <label className="flex justify-start text-sm font-medium text-gray-700">Re-Enter Password</label>
            <input
              type="password"
              className="input input-bordered w-full mt-1 bg-gray-400 placeholder-gray-200"
              value={password2}
              onChange={password2 => setPassword2(password2.target.value)}
              placeholder="Re-Enter Password"
              required
            />
          </div>

          
          <button type="submit" className="btn btn-soft bg-red-200 text-red-800" >
            Sign Up
          </button>
        </form>

        <div className="flex justify-end mt-3 text-sm">
          <Link to="/login" className="text-red-800 font-semibold">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;