import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { UserProvider } from "./contexts/User.context";
import Flights from "./pages/Flights";
import Profile from "./pages/Profile";
import { Toaster } from "./components/ui/sonner";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/flights",
        element: <Flights />,
      },
      {
        path: "/profile",
        element: <ProtectedRoute requireAuth redirectTo="/login" />,
        children: [{ index: true, element: <Profile /> }],
      },
    ],
  },
  {
    element: <ProtectedRoute requireAuth={false} redirectTo="/" />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <RouterProvider router={router} />
    <Toaster />
  </UserProvider>,
);
