import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login.tsx";
import SignUp from "./pages/Auth/SignUp.tsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Hero from "./components/Hero.jsx";
import Profile from "./pages/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Hero /> },
      { path: "/:profileid", element: <Profile /> },
      { path: "/accounts/login/", element: <Login /> },
      { path: "/accounts/emailsignup/", element: <SignUp /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
