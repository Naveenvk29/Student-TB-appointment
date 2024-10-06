import { useState, useEffect } from "react";
import { useRegisterUserMutation } from "../../redux/Api/userApi";
import { Setcredentials } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/loader";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { useInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (useInfo) {
      navigate("/");
    }
  }, [useInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await register({
        username,
        email,
        password,
        phone,
        address,
      });

      dispatch(Setcredentials({ ...res }));
      toast.success("Registration successful");
      navigate("/");
    } catch (error) {
      toast.error("Failed to register");
      console.error(error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-evenly p-5">
      <div className="w-full md:w-auto ">
        <img
          className="h-[40vh] md:h-[70vh] w-full md:w-auto object-cover rounded-xl shadow-sm"
          src="https://images.unsplash.com/photo-1610702877019-d2dad2973403?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Registration"
        />
      </div>
      <div className="p-5 shadow-lg w-full md:w-auto">
        <h1 className="text-2xl font-bold my-2">Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-5 p-2">
            <label className="text-lg font-semibold mb-2">Username</label>
            <input
              type="text"
              className="w-full md:w-[30vw] py-2 px-2 border border-black rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-5 p-2">
            <label className="text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              className="w-full md:w-[30vw] py-2 px-2 border border-black rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-5 p-2">
            <label className="text-lg font-semibold mb-2">Password</label>
            <input
              type="password"
              className="w-full md:w-[30vw] py-2 px-2 border border-black rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-5 p-2">
            <label className="text-lg font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full md:w-[30vw] py-2 px-2 border border-black rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-5 p-2">
            <label className="text-lg font-semibold mb-2">Phone</label>
            <input
              type="text"
              className="w-full md:w-[30vw] py-2 px-2 border border-black rounded-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-5 p-2">
            <label className="text-lg font-semibold mb-2">Address</label>
            <input
              type="text"
              className="w-full md:w-[30vw] py-2 px-2 border border-black rounded-lg"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button
            className="w-full md:w-[30vw] py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition duration-300 ease-in-out"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isLoading && <Loader />}
        </form>
        <p className="text-md mt-2 font-semibold">
          Already have an account?{" "}
          <Link to="/login" className="hover:text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
