import { Outlet } from "react-router";
import Navbar from "@/components/navbar";

const PrivateLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default PrivateLayout;
