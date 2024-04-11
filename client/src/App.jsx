import "./app.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import List from "./pages/List";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { Navigate } from "react-router-dom";
import { listLoader, profileLoader, singleLoader } from "./loader";
import SinglePage from "./pages/SinglePage/SinglePage";
export default function App() {
  const { currentUser } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/list",
          loader: listLoader,
          element: <List />,
        },
        {
          path: "/list/:id",
          loader: singleLoader,
          element: <SinglePage />,
        },
        {
          path: "/profile",
          element: currentUser ? <Profile /> : <Navigate to={"/login"} />,
          loader: profileLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
