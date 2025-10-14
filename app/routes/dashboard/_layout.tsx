import { Outlet } from "react-router-dom";
// import { Header } from "~/components/header";
import Sidebar from "~/components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="flex-1 ">
        <header className=" border-b border-slate-200 p-4 !bg-[#78b342]">
          <h1 className="text-xl font-semibold text-slate-800 ">
            Panel de Administración
          </h1>
          {/* <Header/> */}
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
