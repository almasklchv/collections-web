import { RouteObject } from "react-router-dom";
import AuthLayout from "../pages/Auth/AuthLayout/auth-layout";
import SignUpPage from "../pages/Auth/SignUpPage";
import SignInPage from "../pages/Auth/SignInPage";
import HomePage from "../pages/HomePage";
import MyPage from "../pages/Collections/MyPage";
import CollectionsLayout from "../pages/Collections/CollectionsLayout";
import CollectionPage from "../pages/Collections/CollectionPage";

export const routes: RouteObject[] = [
  {
    element: <HomePage />,
    path: "/",
    errorElement: <p>Page not found.</p>,
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
  {
    element: <CollectionsLayout />,
    path: "/collections",
    children: [
      {
        element: <MyPage />,
        path: "my",
      },
      {
        element: <CollectionPage />,
        path: ":id",
      },
    ],
  },
];
