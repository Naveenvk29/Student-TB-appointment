import { useLogoutUserMutation } from "../../redux/Api/userApi";
import { logout } from "../../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navigation = () => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const handleDropMenu = () => setIsDropOpen(!isDropOpen);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleToggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full border-b h-[15vh] bg-white sticky top-0 mx-auto flex items-center justify-between px-4 md:px-8 lg:px-16 z-[1000]">
      {/* Logo Section */}
      <div className="flex justify-center items-center">
        <img src={logo} alt="" className="w-[20vw] md:w-[10vw]" />
      </div>

      {/* Links Section */}
      <div className="hidden md:flex gap-5 ">
        <Link
          className="text-lg md:text-xl font-semibold hover:underline"
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-lg md:text-xl font-semibold hover:underline"
          to="/about"
        >
          About
        </Link>

        {userInfo && (
          <Link
            className="text-lg md:text-xl font-semibold hover:underline"
            to="/appointments"
          >
            Appointments
          </Link>
        )}
        <Link
          className="text-lg md:text-xl font-semibold hover:underline"
          to="/book-appointment"
        >
          Book Appointment
        </Link>
        <Link
          className="text-lg md:text-xl font-semibold hover:underline"
          to="/massage"
        >
          Message
        </Link>
      </div>

      {/* User Section */}
      <div className="relative flex items-center">
        <button onClick={handleDropMenu}>
          {userInfo ? (
            <h1 className="text-lg md:text-2xl font-semibold flex items-center justify-center">
              {userInfo.username}
              <RiArrowDropDownLine size={30} />
            </h1>
          ) : null}
        </button>
        {isDropOpen && userInfo && (
          <div className="absolute w-[40vw] md:w-[14vw] -right-3 top-8 md:top-10 py-4 rounded-lg flex flex-col items-center bg-gray-700 text-white px-5 hover:bg-black hover:text-white transition duration-300 ease-in-out">
            {userInfo?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="flex items-center text-sm md:text-lg my-2 md:my-3"
              >
                <h1>Dashboard</h1>
              </Link>
            )}
            {userInfo?.role === "teacher" && (
              <Link
                to={"/teacher/get-appointment"}
                className="flex items-center text-sm md:text-lg my-2 md:my-3"
              >
                <h1>Get Application</h1>
              </Link>
            )}
            <Link
              to="/profile"
              className="flex items-center text-sm md:text-lg my-2 md:my-3"
            >
              <span>Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center text-sm md:text-lg my-2 md:my-3"
            >
              <span>Logout</span>
            </button>
          </div>
        )}

        {!userInfo && (
          <div className="hidden md:flex gap-5">
            <Link to="/login" className="text-lg md:text-xl font-semibold">
              Login
            </Link>
            <Link to="/register" className="text-lg md:text-xl font-semibold">
              Register
            </Link>
          </div>
        )}
      </div>

      <div className="md:hidden flex">
        <button onClick={handleToggleMenu} className="text-lg">
          {isMenuOpen ? <IoIosCloseCircle /> : <GiHamburgerMenu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-[12vh] left-0 w-full bg-white text-black z-[999] p-5 md:hidden flex flex-col items-center space-y-4">
          <Link className="text-lg font-semibold hover:underline" to="/">
            Home
          </Link>
          <Link className="text-lg font-semibold hover:underline" to="/about">
            About
          </Link>
          {userInfo && (
            <Link
              className="text-lg font-semibold hover:underline"
              to="/appointments"
            >
              Appointments
            </Link>
          )}
          <Link
            className="text-lg font-semibold hover:underline"
            to="/book-appointment"
          >
            Book Appointment
          </Link>
          <Link className="text-lg font-semibold hover:underline" to="/massage">
            Message
          </Link>
          {!userInfo && (
            <div className="flex flex-col space-y-2">
              <Link to="/login" className="text-lg font-semibold">
                Login
              </Link>
              <Link to="/register" className="text-lg font-semibold">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navigation;
