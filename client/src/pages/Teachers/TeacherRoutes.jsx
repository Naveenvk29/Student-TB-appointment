import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const TeacherRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo.role === "teacher" || userInfo.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default TeacherRoutes;
