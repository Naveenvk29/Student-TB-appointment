import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const AsideNav = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="w-[20vw] h-[85vh] px-10 py-5 border ">
      <div className="w-full">
        <img
          src="https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-a-handsome-and-young-graduate-student-png-image_12507727.png"
          alt=""
        />
        <h3 className="text-xl font-medium mb-2 underline">
          Welcome, {userInfo.username}
        </h3>
      </div>
      <div className=" w-full flex flex-col gap-1 text-2xl ">
        <Link
          className="text-2xl p-2 font-semibold hover:bg-slate-700 hover:text-slate-50 duration-500 rounded-lg"
          to={"/admin/add-teacher"}
        >
          Add Teachers
        </Link>
        <Link
          className="text-2xl p-2 font-semibold hover:bg-slate-700 hover:text-slate-50 duration-500 rounded-lg"
          to={"/admin/teachers"}
        >
          Teachers List
        </Link>
        <Link
          className="text-2xl p-2 font-semibold hover:bg-slate-700 hover:text-slate-50 duration-500 rounded-lg"
          to={"/admin/users"}
        >
          UserList
        </Link>
        <Link
          className="text-2xl p-2 font-semibold hover:bg-slate-700 hover:text-slate-50 duration-500 rounded-lg"
          to={"/teacher/get-appointment"}
        >
          Get Appointment
        </Link>
      </div>
    </div>
  );
};

export default AsideNav;
