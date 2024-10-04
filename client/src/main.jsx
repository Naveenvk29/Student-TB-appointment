import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
//
import store from "./redux/store.js";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//
import Login from "./pages/Auth/Login.jsx";
import Registration from "./pages/Auth/Registration.jsx";
import PrivateRoutes from "./pages/User/privateRoutes.jsx";
import Profile from "./pages/User/Profile.jsx";
import BookAppointment from "./pages/Appointment/BookAppointment.jsx";
//
import AdminRoutes from "./pages/Admin/AdminRoutes.jsx";
import AddTeacher from "./pages/Admin/AddTeacher.jsx";
import ApproveStudents from "./pages/Admin/ApproveStudents.jsx";
import GetAllUser from "./pages/Admin/UserList.jsx";
import Teacterslist from "./pages/Admin/Teacterslist.jsx";
import TeacherbyID from "./pages/Admin/TeacherbyID.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import UserByID from "./pages/Admin/UserByID.jsx";
import AdminDashBoard from "./pages/Admin/DashBoard/AdminDashBoard.jsx";
import Appointments from "./pages/User/Appointments.jsx";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/book-appointment" element={<BookAppointment />} />

      {/* Private routes */}
      <Route path="" element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/appointments" element={<Appointments />} />
      </Route>

      {/* Admin routes */}
      <Route path="" element={<AdminRoutes />}>
        {/* Add admin routes here */}
        <Route path="/admin/dashboard" element={<AdminDashBoard />} />
        <Route path="/admin/get-all-users" element={<GetAllUser />} />
        <Route path="/admin/add-teacher" element={<AddTeacher />} />
        <Route path="/admin/teachers" element={<Teacterslist />} />
        <Route path="/admin/teacher/:userId" element={<TeacherbyID />} />

        <Route path="/admin/user/:userId" element={<UserByID />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route
          path="/admin/approve-students/:id"
          element={<ApproveStudents />}
        />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
