import { useState, useEffect } from "react";
import { useLoginUserMutation } from "../../redux/Api/userApi";
import { Setcredentials } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password }).unwrap();
      dispatch(Setcredentials({ ...res }));
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      console.error(error.message);
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-evenly p-5">
      <div className="p-5 shadow-lg w-full md:w-auto md:max-w-md">
        <h1 className="text-2xl font-bold my-10">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-5">
            <label htmlFor="email" className="text-lg font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full md:w-[26vw] py-2 px-2 border border-black rounded-lg"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="password" className="text-lg font-semibold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full md:w-[26vw] py-2 px-2 border border-black rounded-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full md:w-[26vw] py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition duration-300 ease-in-out"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {isLoading && <Loader />}
        </form>
        <p className="text-md mt-2 font-semibold">
          Don't have an account?
          <Link to="/register" className="hover:text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
      <div className="flex justify-end mt-10 md:mt-0">
        <img
          className="h-[50vh] md:h-[78vh] object-cover"
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login"
        />
      </div>
    </div>
  );
};

export default Login;
