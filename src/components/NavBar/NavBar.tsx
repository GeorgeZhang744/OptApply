import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaCalendar } from "react-icons/fa";


const NavBar = () => {
  const curLocation = useLocation();
  const loggedIn = !(curLocation.pathname == "/" || curLocation.pathname == "/login" || curLocation.pathname == "/signup");
  return (
    <nav className="navbar bg-primary px-6 py-3 fixed top-0 left-0 w-full shadow-md flex items-center z-50">
      {loggedIn ? (
        <Link to="/home">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="OptApply Logo" className="w-10 h-10" />
            <span className="text-primary font-semibold">OptApply</span>
          </div>
        </Link>
      ) : (
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="OptApply Logo" className="w-10 h-10" />
            <span className="text-primary font-semibold">OptApply</span>
          </div>
        </Link>
      )}
      <div className="ml-auto flex space-x-3">
        {loggedIn ? (
          <div className="ml-auto flex space-x-3 items-center">
            <FaCalendar size={30} onClick={() => (document.getElementById('calendarModal') as HTMLDialogElement)!.showModal()} className="cursor-pointer" />
            <Link to="/">
              <button className="btn btn-error btn-sm btn-soft">Sign Out</button>
            </Link>
          </div>
        ) : (
          <div className="ml-auto flex space-x-3">
            <Link to="/login">
              <button className="btn btn-success btn-sm btn-soft">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-success btn-sm btn-soft">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
