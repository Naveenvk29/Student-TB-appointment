import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AsideNav = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="w-full md:w-[20vw] h-[85vh] px-5 py-5 border shadow-lg flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <img
          className="w-[40vw] md:w-[10vw] h-auto rounded-full mb-4"
          src="https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-a-handsome-and-young-graduate-student-png-image_12507727.png"
          alt="User Avatar"
        />
        {userInfo ? (
          <h3 className="text-xl font-medium mb-4 underline text-center">
            Welcome, {userInfo.username}
          </h3>
        ) : (
          <h3 className="text-xl font-medium mb-4 underline text-center">
            Welcome, Guest
          </h3>
        )}
      </div>
      <div className="w-full flex flex-col gap-3 text-xl">
        <Link
          className="p-2 font-semibold hover:bg-slate-700 hover:text-slate-50 transition duration-500 rounded-lg"
          to={"/admin/add-teacher"}
        >
          Add Teachers
        </Link>
        <Link
          className="p-2 font-semibold hover:bg-slate-700 hover:text-slate-50 transition duration-500 rounded-lg"
          to={"/admin/teachers"}
        >
          Teachers List
        </Link>
        <Link
          className="p-2 font-semibold hover:bg-slate-700 hover:text-slate-50 transition duration-500 rounded-lg"
          to={"/admin/users"}
        >
          Users List
        </Link>
        <Link
          className="p-2 font-semibold hover:bg-slate-700 hover:text-slate-50 transition duration-500 rounded-lg"
          to={"/teacher/get-appointment"}
        >
          Get Appointment
        </Link>
        <Link
          className="p-2 font-semibold hover:bg-slate-700 hover:text-slate-50 transition duration-500 rounded-lg"
          to={"/teacher/messages"}
        >
          Message List
        </Link>
      </div>
    </div>
  );
};

export default AsideNav;
