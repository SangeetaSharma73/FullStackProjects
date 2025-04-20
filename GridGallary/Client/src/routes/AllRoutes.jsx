import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFound from "../components/NotFound";
import Explore from "../pages/Explore/Explore";
import SignUp from "../pages/SignUp/SignUp";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
// import Profile from "../pages/Profile";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<UpdateProfile />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
