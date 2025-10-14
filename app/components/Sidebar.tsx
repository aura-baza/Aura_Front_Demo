import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { MenuItem } from "../lib/menu";
import { MENU } from "../lib/menu";
const auraLogo="/Aura_Community-1.png"
function IconWrapper({ Icon }: { Icon?: any }) {
  if (!Icon) return null;
  return <Icon className="w-5 h-5 mr-3 text-slate-600" aria-hidden />;
}

function Caret({ open }: { open: boolean }) {
  return (
    <ChevronRight
      className={`w-4 h-4 transition-transform duration-200 ${
        open ? "rotate-90" : "rotate-0"
      } text-slate-900`}
    />
  );
}

export default function Sidebar() {
  const location = useLocation();
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isActive = (to?: string) => {
    if (!to) return false;
    return location.pathname === to || location.pathname.startsWith(to + "/");
  };

  //Mantener abierto el menú padre si algún hijo está activo
  useEffect(() => {
    MENU.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some((child) =>
          location.pathname.startsWith(child.to || "")
        );
        if (hasActiveChild) {
          setOpenIds((prev) => ({ ...prev, [item.id]: true }));
        }
      }
    });
  }, [location.pathname]);

  return (
    <aside className="w-64 bg-white  min-h-screen p-4 !rounded-tr-4xl rounded-br-4xl z-100 shadow-xl">
      <div className="mb-6 px-2">
        <img src={auraLogo} alt="Aura Community" className="w-auto" />
      </div>

      <nav aria-label="Sidebar menu" className="space-y-1">
        {MENU.map((item: MenuItem) => (
          <div key={item.id} className="group">
            {item.children ? (
              <>
                <button
                  type="button" // ✅ evita comportamientos de submit
                  onClick={() => toggle(item.id)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-md hover:!bg-[#78b342] focus:outline-none transition ${
                    openIds[item.id] ? " !bg-[#78b342]" : ""
                  }`}
                  aria-expanded={!!openIds[item.id]}
                  aria-controls={`${item.id}-panel`}
                >
                  <div className="flex items-center">
                    <IconWrapper Icon={item.icon} />
                    <span className="text-slate-800 font-medium">
                      {item.label}
                    </span>
                  </div>
                  <Caret open={!!openIds[item.id]} />
                </button>

                <div
                  id={`${item.id}-panel`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIds[item.id]
                      ? "max-h-80 opacity-100 py-2"
                      : "max-h-0 opacity-0 py-0"
                  }`}
                >
                  <ul className="space-y-1 pl-4  border-l border-slate-100 ">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <NavLink
                          to={child.to || "#"}
                          className={({ isActive: navIsActive }) =>
                            `flex items-center px-3 py-2 rounded-md text-sm transition ${
                              navIsActive || isActive(child.to)
                                ? "bg-slate-200 text-slate-900 font-semibold"
                                : "text-slate-600 hover:bg-slate-50"
                            }`
                          }
                        >
                          <IconWrapper Icon={child.icon} />
                          <span>{child.label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <NavLink
                to={item.to || "#"}
                className={({ isActive: navIsActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm transition ${
                    navIsActive || isActive(item.to)
                      ? "bg-slate-200 text-slate-900 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                <IconWrapper Icon={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
