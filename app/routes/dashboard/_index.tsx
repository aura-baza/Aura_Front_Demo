/*
// Dashboard Index Route//
 *Esta es la ruta principal del módulo "Dashboard".
 *Cuando un usuario accede a /dashboard, se muestra este componente por defecto.
 *Aquí se renderiza el componente <Dashboard />, que actúa como la vista general del panel.
 */
import Dashboard from "~/components/Dashboard";

export default function DashboardIndex() {
  return (
    <div>
      {/* Renderiza el componente principal del dashboard */}
      <Dashboard/>
    </div>
  );
}
