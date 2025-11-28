import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <RouterProvider router={router} />
    </div>
  );
}
