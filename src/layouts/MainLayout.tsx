import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";

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

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.getAttribute("data-theme") === "purple") {
      html.removeAttribute("data-theme"); // default lavender
      setTheme("lavender");
    } else {
      html.setAttribute("data-theme", "purple");
      setTheme("purple");
    }
  };

  return (
    <div style={{ backgroundColor: "var(--background)", color: "var(--text)" }} className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        style={{ backgroundColor: "var(--forest)", borderColor: "var(--border)" }}
        className={`fixed inset-y-0 left-0 w-64 p-6 border-r transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 style={{ color: "var(--accent)" }} className="font-bold text-xl">Second Brain</h1>
          <button className="lg:hidden text-white" onClick={() => setOpen(false)}>Close</button>
        </div>

        <nav className="flex flex-col space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "var(--background)" : "var(--link)",
              })}
              className="px-3 py-2 rounded-md text-sm"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Page content */}
      <div className="flex-1 lg:ml-64">
        <header style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }} className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="lg:hidden px-3 py-1 rounded-md" style={{ backgroundColor: "var(--forest)", color: "var(--text)" }} onClick={() => setOpen(true)}>
              Menu
            </button>
            <h2 className="text-lg font-medium">Welcome</h2>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline text-sm" style={{ color: "var(--muted)" }}>
              Dark purple & forest theme • Minimal UI
            </span>
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded-md text-sm font-medium"
              style={{ backgroundColor: "var(--button-bg)", color: "var(--text)" }}
            >
              Switch to {theme === "purple" ? "Lavender" : "Purple"} Theme
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
