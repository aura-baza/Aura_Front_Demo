/*
//Dashboard Layout//
*Este layout define la estructura base del panel principal
*(Dashboard) de la plataforma de administración de recursos humanos.
*Aquí se renderizan el encabezado (Header), la barra lateral (Sidebar)
 y el contenido dinámico según la ruta actual del usuario.
 */

// import { Outlet } from "react-router-dom";
// import { Header } from "~/components/Header";
import AppLayout from "~/components/layout/AppLayout";
// import Sidebar from "~/components/Sidebar";

export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
    // Contenedor principal: ocupa toda la altura de la pantalla
    // y define un fondo neutro para la interfaz del Dashboard
  return (
    // <div className="min-h-screen flex bg-slate-50 ">
    //   {/* Barra lateral de navegación */}
    //   <Sidebar />
    //   {/* Contenedor del contenido principal */}
    //   <div className="flex-1">
    //     {/* Encabezado superior del Dashboard */}
    //       <Header/>
    //       {/* Área principal donde se renderizan las rutas hijas */}
    //     <main className="p-6">
    //       {children || <Outlet />}
    //     </main>
    //   </div>
    // </div>
    <AppLayout/>
  );
}
