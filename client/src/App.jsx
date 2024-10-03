import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Naigation from "./pages/Home/Naigation";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Naigation />
      <Outlet />
    </>
  );
};

export default App;
