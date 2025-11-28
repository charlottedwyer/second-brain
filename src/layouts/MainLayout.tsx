import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const navItems = [
  { to: "/", label: "Dashboard", exact: true },
  { to: "/journal", label: "Journal" },
  { to: "/tasks", label: "Tasks" },
  { to: "/tracker", label: "Tracker" },
  { to: "/wiki", label: "Wiki" },
  { to: "/media", label: "Media" },
  { to: "/settings", label: "Settings" },
];

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"purple" | "lavender">("lavender");

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "purple") html.setAttribute("data-theme", "purple");
    else html.removeAttribute("data-theme");
  }, [theme]);

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--background)", color: "var(--text)" }}>
      {/* Sidebar */}
      <aside
        style={{ backgroundColor: "var(--forest)", borderColor: "var(--border)" }}
        className={`fixed inset-y-0 left-0 w-64 p-6 border-r transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 style={{ color: "var(--accent)" }} className="font-bold ">Second Brain</h1>
          <button className="lg:hidden" style={{ color: "var(--text)" }} onClick={() => setOpen(false)}>Close</button>
        </div>

        <nav className="flex flex-col space-y-3">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "var(--background)" : "var(--link)"
              })}
              className="px-3 py-2 rounded-md "
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Page content */}
      <div className="flex-1 lg:ml-64">
        <header
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
          className="border-b p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <button
              className="lg:hidden px-3 py-1 rounded-md"
              style={{ backgroundColor: "var(--forest)", color: "var(--text)" }}
              onClick={() => setOpen(true)}
            >
              Menu
            </button>
            <h2 className=" font-medium">Welcome</h2>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline " style={{ color: "var(--muted)" }}>
            </span>
            <button
              onClick={() => setTheme(theme === "purple" ? "lavender" : "purple")}
              className="px-3 py-1 rounded-md  font-medium"
              style={{ backgroundColor: "var(--button-bg)", color: "var(--text)" }}
            >
            </button>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
