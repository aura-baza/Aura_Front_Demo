// Importamos utilidades esenciales de React Router para manejar el layout, los scripts, los metadatos y los errores.
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
// Tipado del objeto `Route` generado por React Router (ayuda a mantener tipado el código).
import type { Route } from "./+types/root";
// Importamos los estilos globales de la aplicación.
import "./app.css";
// Importamos el contexto de autenticación para proveer el estado global del usuario.
import { AuthProvider } from "./context/AuthContext";

// Definimos los enlaces (links) que React Router inyectará en el <head> del HTML.
// En este caso, se agregan los enlaces para las fuentes de Google Fonts
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];
/* Layout global de la aplicación
  *Este layout define la estructura base del HTML que envolverá toda la app.
 *React Router lo usa para renderizar las páginas de manera universal. */

// export function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         {/* El contenido principal se inserta aquí */}
//         {children}
//         {/* Componente que mantiene la posición del scroll al navegar entre rutas */}
//         <ScrollRestoration />
//         {/* Scripts necesarios para la aplicación (carga automática de bundles, etc.) */}
//         <Scripts />
//       </body>
//     </html>
//   );
// }

/*
* Punto de entrada principal de la aplicación.
*Aquí es donde se inyectan las rutas y el contexto global.
*/
export default function App() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* Envolvemos la aplicación con el AuthProvider. */}
        {/* Esto asegura que cualquier componente (por ejemplo Header) pueda usar `useAuth()`. */}
    <AuthProvider>
       {/* Outlet es donde React Router renderiza las rutas hijas */}
      <Outlet />
    </AuthProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
   
  );
}

//Componente que maneja errores de rutas o excepciones no controladas.
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // Valores por defecto del mensaje
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  // Si el error proviene de una respuesta de ruta (por ejemplo, un 404 o 500)
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  // Si estamos en modo desarrollo y el error es una instancia de Error de JS
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }
  // Renderiza una página de error simple
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
