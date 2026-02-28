import { Outlet } from "react-router";
import Navbar from "@/components/navbar";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="w-full mx-auto flex flex-col items-center gap-8 px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
