import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFound from "../components/NotFound";
import SignUp from "../pages/SignUp/SignUp";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import ProfilePage from "../pages/Profile/ProfilePage";
import UpdateProfilePage from "../pages/UpdateProfilePage/UpdateProfilePage";
import { CreateRequestPage } from "../pages/CreateRequestPage/CreateRequestPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/update-profile" element={<UpdateProfilePage />} />
      <Route path="/create-request" element={<CreateRequestPage />} />
      {/* <Route path="/profile" element={<UpdateProfile />} /> */}
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
