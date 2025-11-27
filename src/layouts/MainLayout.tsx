import { Outlet, NavLink } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-purple-50 text-black flex">
      {/* Sidebar */}
      <aside className="w-52 bg-purple-100 p-4 space-y-4 border-r border-purple-200">
        <h1 className="font-semibold text-xl">Second Brain</h1>

        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "font-bold text-purple-700" : "text-purple-600"
            }
          >
            Dashboard
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
