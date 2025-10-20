import { Outlet } from "react-router-dom";
import { Header } from "~/components/Header";
import Sidebar from "~/components/Sidebar";

// Contenedor principal: ocupa toda la altura de la pantalla
// y define un fondo neutro para la interfaz del Dashboard
export default function AppLayout() {
    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Barra lateral de navegación */}
            <Sidebar />
            {/* Contenedor del contenido principal */}
            <div className="flex-1">
                {/* Encabezado superior del Dashboard */}
                <Header />
                {/* Área principal donde se renderizan las rutas hijas */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
