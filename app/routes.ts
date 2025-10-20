// import { type RouteConfig, index, route } from "@react-router/dev/routes";


// export default [
//   //  Ruta raíz → Login
//     index("routes/_index.tsx"),
//     route("dashboard", "routes/dashboard/_layout.tsx", [
//   // Dashboard con layout y subrutas
//     index("routes/dashboard/_index.tsx"),
//     route("home", "routes/dashboard/home.tsx"),
//     )],
//     // 📦 Alimentación (con subrutas)
//       route("alimentacion", "routes/feeding/_layout.tsx", [
//       // index("routes/feeding/lunch.tsx"), // opcional: que el index sea almuerzos
//       route("almuerzos", "routes/feeding/lunch.tsx"),
//       route("cenas", "routes/feeding/dinner.tsx"),
//       route("almuerzos-totales", "routes/feeding/lunch-menu.tsx"),
//       route("cenas-totales", "routes/feeding/dinner-menu.tsx"),

//     ]),

// ] satisfies RouteConfig;

// app/routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  //Ruta raíz → Login
  index("routes/_index.tsx"),

  //Dashboard con layout y subrutas
  route("dashboard", "routes/dashboard/_layout.tsx", [
    index("routes/dashboard/_index.tsx"),
    route("home", "routes/dashboard/home.tsx"),

  ]),
  //Alimentación fuera del dashboard
  route("feeding", "routes/feeding/_layout.tsx", [
    route("lunch", "routes/feeding/lunch.tsx"),
    route("dinner", "routes/feeding/dinner.tsx"),
    route("lunch-menu", "routes/feeding/lunch-menu.tsx"),
    route("dinner-menu", "routes/feeding/dinner-menu.tsx"),

  ]),
  //Rutas Reportes
  route("reports", "routes/reports/_layout.tsx", [
    route("total-lunchs", "routes/reports/total-lunchs.tsx"),
    route("total-dinners", "routes/reports/total-dinners.tsx"),
     ]),
  
  //Rutas Administracion
  route("administration", "routes/administration/_layout.tsx", [
    route("users", "routes/administration/users.tsx"),
    // route("total-dinners", "routes/reports/total-dinners.tsx"),
     ]),
  
] satisfies RouteConfig;


