
// app/lib/menu.ts
// Importación de íconos desde la librería "lucide-react".
// Estos íconos se usarán para representar visualmente cada sección del menú.
import { Home, ClipboardList, Users, Gift, Utensils, Medal, ArrowLeftRight, CalendarClock, TreePalm, UserStar, ShieldCheck, LogOut } from "lucide-react";


// Interfaz que define la estructura de un elemento del menú lateral.
// Permite incluir íconos, rutas y submenús (children).
export interface MenuItem {
  id: string;
  label: string;
  icon?: any;
  to?: string;
  children?: MenuItem[];
}
// Arreglo principal con todos los elementos del menú de la plataforma.
// Cada objeto representa una sección o módulo del sistema.
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
    to:"/feeding/lunch",
    children: [
      { id: "lunch", label: "Almuerzos", to: "/feeding/lunch" },
      { id: "dinner", label: "Cenas", to: "/feeding/dinner" },
      { id: "lunch-menu", label: "Almuerzos Totales", to: "/feeding/lunch-menu" },
      { id: "dinner-menu", label: "Cenas Totales", to: "/feeding/dinner-menu" },
    ],
    
  },
  //REPORTES
  {
    id: "reportes",
    label: "Reportes",
    icon: ClipboardList,
    to: "/reports/total-lunchs",
    children: [
      // { id: "lunchs", label: "Almuerzos Totales", to: "/reports/_layout" },
      { id: "total-lunch", label: "Almuerzos Totales", to: "/reports/total-lunchs" },
      { id: "total-dinner", label: "Cenas Totales", to: "/reports/total-dinners" },
    ],
  },
  //PERMISOS
  {
    id: "permisos",
    label: "Permisos",
    icon: Users,
    to: "/permisos",
    children: [
      { id: "total-permissions", label: "Listar Permisos", to: "/#" },
      { id: "permit-type", label: "Tipo De Permiso", to: "/#" },
      { id: "admin-permission", label: "Permiso Admin", to: "/#" },
      { id: "super-permission", label: "Permiso Super", to: "/#" },
    ],
  },
  //BENEFICIOS
  {
    id: "beneficios",
    label: "Beneficios",
    icon: Medal,
    to: "/",
     children: [
      { id: "list-benefits", label: "Listar Beneficios", to: "/#" },
      { id: "benefit-type", label: "Tipo Beneficio", to: "/#" },
      { id: "admin-benefit", label: "Beneficio Admin", to: "/#" },
      { id: "super-benefit", label: "Beneficio Supervisor", to: "/#" },
    ],
  },
  //CAMBIO DE TURNO 
  {
    id: "turno",
    label: "Cambio De Turno",
    icon: ArrowLeftRight,
    to: "/",
     children: [
       { id: "shift", label: "Turno", to: "/#" },
      { id: "admin-shift", label: "Turno Admin", to: "/#" },
      { id: "super-shift", label: "Turno Supervisor", to: "/#" },
    ],
  },
  //HORARIO
  {
    id: "horario",
    label: "Horario",
    icon: CalendarClock,
    to: "/",
     children: [
      { id: "schedule-change", label: "Cambio Horario", to: "/#" },
      { id: "admin-schedule", label: "Horario Admin", to: "/#" },
      { id: "super-schedule", label: "Horario Supervisor", to: "/#"},
    ],
  },
  //VACACIONES
   {
    id: "vacaciones",
    label: "Vacaciones",
    icon: TreePalm,
    to: "/",
     children: [
      { id: "request-vacation", label: "Solicitar Vacaciones", to: "/#" },
      { id: "manage-vacations", label: "Gestionar Vacaciones", to: "/#" },
    ],
  },
  //ADMINISTRACION
   {
    id: "admin",
    label: "Administracion",
    icon: UserStar,
    to: "/administratrion",
     children: [
      { id: "users", label: "Usuarios", to: "/administration/users" },
      { id: "roles", label: "Roles", to: "/#" },
      { id: "visits", label: "Visitas", to: "/#" },
      { id: "news", label: "Novedades", to: "/#" },
      { id: "deadline-time", label: "Hora Limite", to: "/#" },
      { id: "schedule-shift", label: "Programar Turno", to: "/#"},
      { id: "menu", label: "Menú", to: "/#" },
    ],
  },
  //CALIDAD
   {
    id: "calidad",
    label: "Calidad",
    icon: ShieldCheck,
    to: "",
     children: [
      { id: "campaign", label: "Campaña", to: "/#" },
      { id: "category", label: "Categorias", to: "/#" },
      { id: "questions", label: "Preguntas", to: "/#" },
      { id: "form", label: "Formulario", to: "/#" },
      { id: "qualify", label: "Calificar", to: "/#" },
    ],
  },
];
