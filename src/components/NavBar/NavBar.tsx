import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const NavBar = () => {
  return (
    <nav className="navbar bg-gray-200 px-6 py-3 fixed top-0 left-0 w-full shadow-md flex items-center">

      <div className="flex items-center space-x-2">
        <img src={logo} alt="OptApply Logo" className="w-10 h-10" />
        <span className="text-gray-800 font-semibold">OptApply</span>
      </div>

      <div className="ml-auto flex space-x-3">
        <Link to="/login">
          <button className="btn btn-sm btn-soft bg-red-200 text-red-800">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn btn-sm btn-soft bg-red-200 text-red-800">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;