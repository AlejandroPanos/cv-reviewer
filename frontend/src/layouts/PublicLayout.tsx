import { Outlet } from "react-router";
import Navbar from "@/components/navbar";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default PublicLayout;
