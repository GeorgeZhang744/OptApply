import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
//import {mockUsers} from "../data/signupData";



const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const passwordsMatch = (password === password2);

  const handleSignup = async (login: React.FormEvent) => {
    login.preventDefault();
    if (!passwordsMatch) {
      console.error("Passwords do not match!");
      setError(true);
      setErrorMessage("Passwords do not match!")
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        setError(true);
        setErrorMessage(data.message || "Something went wrong");
        return;
      }
  
      // Success
      navigate("/home");
      console.log("User ID:", data.userId);
    } catch (err) {
      setError(true);
      setErrorMessage("Failed to connect to server.");
      console.log(err);
    }

    // const emailExists = mockUsers.some(user => user.email === email);

    // if (emailExists) {
    //   console.error("Email already exists");
    //   setErrorMessage("Email already in use");
    //   setError(true);
    //   return;
    // }

    // const newUser = {
    //   id: `u${mockUsers.length + 1}`,
    //   email,
    //   password,
    // };
    // mockUsers.push(newUser);

    // navigate("/home");
    // console.log("ID: ", newUser.id);
    // console.log("Email: ", newUser.email);
    // console.log("Password: ", newUser.password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      
      <div className="flex flex-col items-center mb-6">
        <img src={logo} alt="Logo" className="w-30 h-30" />
      </div>

      
      <div className="bg-neutral text-neutral-content p-8 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        {isError && (
              <p className="text-error text-sm mt-1">{errorMessage}</p>
          )}
        <form onSubmit={handleSignup} className="flex flex-col space-y-4">
          
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
              placeholder="Set Password"
              required
            />
          </div>

          <div>
            <label className="flex justify-start text-sm font-medium">Re-Enter Password</label>
            <input
              type="password"
              className="input text-base-content input-bordered w-full mt-1"
              value={password2}
              onChange={password2 => setPassword2(password2.target.value)}
              placeholder="Re-Enter Password"
              required
            />
          </div>

          
          <button type="submit" className="btn btn-success btn-soft" >
            Sign Up
          </button>
        </form>

        <div className="flex justify-end mt-3 text-sm">
          <Link to="/login" className="text-info font-semibold">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;