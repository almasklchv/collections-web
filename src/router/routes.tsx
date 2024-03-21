import { RouteObject } from "react-router-dom";
import AuthLayout from "../pages/Auth/AuthLayout/auth-layout";
import SignUpPage from "../pages/Auth/SignUpPage";
import SignInPage from "../pages/Auth/SignInPage";
import HomePage from "../pages/HomePage";

export const routes: RouteObject[] = [
  {
    element: <HomePage />,
    path: "/",
    errorElement: <p>Page not found.</p>
  },
  {
    element: <AuthLayout />,
    path: "/auth",
    children: [
      {
        element: <SignUpPage />,
        path: "sign-up",
      },
      {
        element: <SignInPage />,
        path: "sign-in",
      },
    ],
  },
];
