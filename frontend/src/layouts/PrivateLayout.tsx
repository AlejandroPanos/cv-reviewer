import { Outlet } from "react-router";
import Navbar from "@/components/navbar";

const PrivateLayout = () => {
  return (
    <>
      <Navbar />
      <main className="w-full lg:max-w-2/3 md:max-w-5/6 mx-auto flex flex-col items-center gap-16 px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </>
  );
};

export default PrivateLayout;
