import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { UserProvider } from "./contexts/User.context";
import Flights from "./pages/Flights";
import FlightDetails from "./pages/FlightDetails";
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
        path: "/flights/:id",
        element: <FlightDetails />,
        handle: { hideHeaderOnMobile: true },
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
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ""}
    locale="pt-BR"
  >
    <UserProvider>
      <RouterProvider router={router} />
      <Toaster />
    </UserProvider>
  </GoogleOAuthProvider>,
);
