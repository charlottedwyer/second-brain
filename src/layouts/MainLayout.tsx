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
    <div className="min-h-screen bg-background text-textPrimary flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-forest p-6 border-r border-forestLight transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold text-xl text-accent">Second Brain</h1>
          <button className="lg:hidden text-forestLight" onClick={() => setOpen(false)}>Close</button>
        </div>

        <nav className="flex flex-col space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                'px-3 py-2 rounded-md text-sm ' + (isActive ? 'bg-accent text-background font-semibold' : 'text-forestLight hover:bg-forestLight')
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Page content wrapper */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="bg-surface border-b border-forestLight p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="lg:hidden px-3 py-1 rounded-md bg-forest text-forestLight" onClick={() => setOpen(true)}>
              Menu
            </button>
            <h2 className="text-lg font-medium text-textPrimary">Welcome</h2>
          </div>

          <div className="text-sm text-forestLight">
            <span className="hidden sm:inline">Dark purple & forest theme • Minimal UI</span>
          </div>
        </header>

        {/* Main content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
