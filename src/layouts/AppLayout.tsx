import { Navbar } from "@/features/common/Navbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main className="container my-10">
        <Outlet />
      </main>
    </>
  );
}
