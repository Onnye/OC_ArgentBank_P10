import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Landing from "./pages/Landing.jsx";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <div>Erreur 404, App not found</div>,
    children: [
      {
        path: "/",
        element: <Landing />,
        errorElement: <div>Erreur 404, Home page not found</div>,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <div>Erreur 404, Login page not found</div>,
      },

      {
        path: "/profile",
        element: <Profile />,
        errorElement: <div>Erreur 404, Profile page not found</div>,
      },
    ],
  },
]);
