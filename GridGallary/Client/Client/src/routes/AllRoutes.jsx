import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFound from "../components/NotFound";
import Explore from "../pages/Explore/Explore";
import SignUp from "../pages/SignUp/SignUp";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
