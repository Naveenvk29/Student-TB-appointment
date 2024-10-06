import { useLogoutUserMutation } from "../../redux/Api/userApi";
import { logout } from "../../redux/features/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState } from "react";
const Naigation = () => {
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
    <div className="w-full border-b h-[15vh] bg-transparent  mx-auto flex items-center justify-around">
      <div className="flex justify-center items-center">
        <img src={logo} alt="" className="w-[10vw]" />
      </div>
      <div className="flex gap-5 ">
        <Link className="text-xl font-semibold hover:underline" to="/">
          Home
        </Link>
        <Link className="text-xl font-semibold hover:underline" to="/about">
          About
        </Link>
        {userInfo && (
          <Link
            className="text-xl font-semibold hover:underline"
            to="/appointments"
          >
            Appointments
          </Link>
        )}
        <Link
          className="text-xl font-semibold hover:underline"
          to="/book-appointment"
        >
          Book Appointment
        </Link>
      </div>
      <div className=" relative">
        <button onClick={handleToggleMenu}>
          {userInfo ? (
            <h1 className="text-2xl font-semibold">{userInfo.username}</h1>
          ) : (
            <></>
          )}
        </button>
        {isMenuOpen && userInfo && (
          <div className="absolute top-[3vw] w-[12vw]  -right-10 py-4 rounded-lg flex flex-col items-center  bg-gray-700 text-white px-5 hover:bg-black hover:text-white   ">
            {userInfo?.role === "admin" && (
              <>
                <Link
                  to="/admin/dashboard"
                  className=" flex items-center text-[1.1vw] my-3  "
                >
                  <h1>DashBoard</h1>
                </Link>
              </>
            )}
            {userInfo?.role === "teacher" && (
              <Link
                to={"/teacher/get-appointment"}
                className=" flex items-center text-[1.1vw] my-3  "
              >
                <h1>Get aplication </h1>
              </Link>
            )}

            <Link
              to="/profile"
              className="flex items-center space-x-1 hover:underline text-[1.1vw] my-1"
            >
              <span>Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 hover:underline text-[1.1vw] my-1 "
            >
              <span>Logout</span>
            </button>
          </div>
        )}
        {!userInfo && (
          <div className="flex  gap-10">
            <Link to="/login" className="text-xl font-semibold ">
              Login
            </Link>
            <Link to="/register" className="text-xl font-semibold ">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Naigation;
