
// app/lib/menu.ts
import { Home, ClipboardList, Users, Gift, Utensils } from "lucide-react";

export interface MenuItem {
  id: string;
  label: string;
  icon?: any;
  to?: string;
  children?: MenuItem[];
}

export const MENU: MenuItem[] = [
  {
    id: "inicio",
    label: "Inicio",
    icon: Home,
    to: "/dashboard/home",
  },
  {
    id: "feeding",
    label: "Alimentación",
    icon: Utensils,
    children: [
      { id: "lunch", label: "Almuerzos", to: "/dashboard/feeding/lunch" },
      { id: "dinner", label: "Cenas", to: "/dashboard/feeding/dinner" },
      { id: "lunch-menu", label: "Almuerzos Totales", to: "/dashboard/feeding/lunch-menu" },
      { id: "dinner-menu", label: "Cenas Totales", to: "/dashboard/feeding/dinner-menu" },
    ],
  },
  {
    id: "reportes",
    label: "Reportes",
    icon: ClipboardList,
    to: "/dashboard/reportes",
  },
  {
    id: "permisos",
    label: "Permisos",
    icon: Users,
    to: "/dashboard/permisos",
  },
  {
    id: "beneficios",
    label: "Beneficios",
    icon: Gift,
    to: "/dashboard/beneficios",
  },
];
