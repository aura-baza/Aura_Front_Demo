import { Outlet } from "react-router-dom";

export default function FeedingLayout() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Módulo de Alimentación 🍽️</h1>
      <Outlet />
    </div>
  );
}
