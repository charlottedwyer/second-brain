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

  return (
    <div className="min-h-screen flex font-serif">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 p-6 border-r transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold text-xl">Second Brain</h1>
          <button className="lg:hidden" onClick={() => setOpen(false)}>Close</button>
        </div>

        <nav className="flex flex-col space-y-3">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm ${isActive ? 'font-semibold underline' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Page content */}
      <div className="flex-1 lg:ml-64 main-content">
        <header className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="lg:hidden px-3 py-1 rounded-md" onClick={() => setOpen(true)}>
              Menu
            </button>
            <h2 className="text-lg font-medium">Welcome</h2>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
