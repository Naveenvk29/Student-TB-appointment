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

//
import AdminRoutes from "./pages/Admin/AdminRoutes.jsx";
import AddTeacher from "./pages/Admin/AddTeacher.jsx";
import ApproveStudents from "./pages/Admin/ApproveStudents.jsx";
import GetAllUser from "./pages/Admin/GetAllUser.jsx";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      {/* Private routes */}
      <Route path="" element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin routes */}
      <Route path="" element={<AdminRoutes />}>
        {/* Add admin routes here */}
        <Route path="/admin/add-teacher" element={<AddTeacher />} />
        <Route path="/admin/approve-students" element={<ApproveStudents />} />
        <Route path="/admin/get-all-users" element={<GetAllUser />} />

        {/* <Route path="/admin/users" element={<UserList />} /> */}
        {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
