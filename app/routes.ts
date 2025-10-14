import { type RouteConfig, index, route } from "@react-router/dev/routes";


export default [
  //  Ruta raíz → Login
    index("routes/_index.tsx"),
  // Dashboard con layout y subrutas
    route("dashboard", "routes/dashboard/_layout.tsx", [
    index("routes/dashboard/_index.tsx"),
    route("home", "routes/dashboard/home.tsx"),
    
    // 📦 Alimentación (con subrutas)
    route("alimentacion", "routes/dashboard/feeding/_layout.tsx", [
      // index("routes/dashboard/feeding/lunch.tsx"), // opcional: que el index sea almuerzos
      route("almuerzos", "routes/dashboard/feeding/lunch.tsx"),
      route("cenas", "routes/dashboard/feeding/dinner.tsx"),
      route("almuerzos-totales", "routes/dashboard/feeding/lunch-menu.tsx"),
      route("cenas-totales", "routes/dashboard/feeding/dinner-menu.tsx"),
   
    ]),
  ]),
] satisfies RouteConfig;


