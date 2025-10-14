
// app/lib/menu.ts
import { Home, ClipboardList, Users, Gift, Utensils, Medal, ArrowLeftRight, CalendarClock, TreePalm, UserStar, ShieldCheck } from "lucide-react";

export interface MenuItem {
  id: string;
  label: string;
  icon?: any;
  to?: string;
  children?: MenuItem[];
}

export const MENU: MenuItem[] = [
  //INICIO
  {
    id: "inicio",
    label: "Inicio",
    icon: Home,
    to: "/dashboard/home",
  },
  //ALIMENTACION
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
  //REPORTES
  {
    id: "reportes",
    label: "Reportes",
    icon: ClipboardList,
    to: "/dashboard/reportes",
    children: [
      { id: "total-lunch", label: "Almuerzos Totales", to: "/dashboard/feeding/lunch" },
      { id: "total-dinner", label: "Cenas Totales", to: "/dashboard/feeding/dinner" },
    ],
  },
  //PERMISOS
  {
    id: "permisos",
    label: "Permisos",
    icon: Users,
    to: "/dashboard/permisos",
    children: [
      { id: "lunch", label: "Listar Permisos", to: "/dashboard/feeding/lunch" },
      { id: "dinner", label: "Tipo De Permiso", to: "/dashboard/feeding/dinner" },
      { id: "lunch-menu", label: "Permiso Admin", to: "/dashboard/feeding/lunch-menu" },
      { id: "dinner-menu", label: "Permiso Super", to: "/dashboard/feeding/dinner-menu" },
    ],
  },
  //BENEFICIOS
  {
    id: "beneficios",
    label: "Beneficios",
    icon: Medal,
    to: "/dashboard/beneficios",
     children: [
      { id: "lunch", label: "Listar Beneficios", to: "/dashboard/feeding/lunch" },
      { id: "dinner", label: "Tipo Beneficio", to: "/dashboard/feeding/dinner" },
      { id: "lunch-menu", label: "Beneficio Admin", to: "/dashboard/feeding/lunch-menu" },
      { id: "dinner-menu", label: "Beneficio Supervisor", to: "/dashboard/feeding/dinner-menu" },
    ],
  },
  //CAMBIO DE TURNO 
  {
    id: "turno",
    label: "Cambio De Turno",
    icon: ArrowLeftRight,
    to: "/dashboard/turnos",
     children: [
       { id: "lunch-menu", label: "Turno", to: "/dashboard/feeding/lunch-menu" },
      { id: "lunch", label: "Turno Admin", to: "/dashboard/feeding/lunch" },
      { id: "dinner", label: "Turno Supervisor", to: "/dashboard/feeding/dinner" },
    ],
  },
  //HORARIO
  {
    id: "horario",
    label: "Horario",
    icon: CalendarClock,
    to: "/dashboard/horario",
     children: [
      { id: "lunch", label: "Cambio Hororio", to: "/dashboard/feeding/lunch" },
      { id: "dinner", label: "Horario Admin", to: "/dashboard/feeding/dinner" },
      { id: "lunch-menu", label: "Horario Supervisor", to: "/dashboard/feeding/lunch-menu" },
    ],
  },
  //VACACIONES
   {
    id: "vacaciones",
    label: "Vacaciones",
    icon: TreePalm,
    to: "/dashboard/vacaciones",
     children: [
      { id: "lunch", label: "Solicitar Vacaciones", to: "/dashboard/feeding/lunch" },
      { id: "dinner", label: "Gestionar Vacaciones", to: "/dashboard/feeding/dinner" },
    ],
  },
  //ADMINISTRACION
   {
    id: "admin",
    label: "Administracion",
    icon: UserStar,
    to: "/dashboard/admin",
     children: [
      { id: "users", label: "Usuarios", to: "/dashboard/feeding/lunch" },
      { id: "dinner", label: "Roles", to: "/dashboard/feeding/dinner" },
      { id: "lunch-menu", label: "Visitas", to: "/dashboard/feeding/lunch-menu" },
      { id: "dinner-menu", label: "Novedades", to: "/dashboard/feeding/dinner-menu" },
      { id: "dinner", label: "Hora Limite", to: "/dashboard/feeding/dinner" },
      { id: "dinner", label: "Programar Turno", to: "/dashboard/feeding/dinner" },
      { id: "menu", label: "Menú", to: "/dashboard/feeding/dinner" },
    ],
  },
  //CALIDAD
   {
    id: "calidad",
    label: "Calidad",
    icon: ShieldCheck,
    to: "/dashboard/beneficios",
     children: [
      { id: "lunch", label: "Campaña", to: "/dashboard/feeding/lunch" },
      { id: "dinner", label: "Categorias", to: "/dashboard/feeding/dinner" },
      { id: "lunch-menu", label: "Preguntas", to: "/dashboard/feeding/lunch-menu" },
      { id: "dinner-menu", label: "Formulario", to: "/dashboard/feeding/dinner-menu" },
      { id: "dinner-menu", label: "Calificar", to: "/dashboard/feeding/dinner-menu" },
    ],
  },
];
