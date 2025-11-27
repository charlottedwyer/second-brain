import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Journal from "../pages/Journal";
import Tasks from "../pages/Tasks";
import Tracker from "../pages/Tracker";
import Wiki from "../pages/Wiki";
import Media from "../pages/Media";
import Settings from "../pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "journal", element: <Journal /> },
      { path: "tasks", element: <Tasks /> },
      { path: "tracker", element: <Tracker /> },
      { path: "wiki", element: <Wiki /> },
      { path: "media", element: <Media /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);
