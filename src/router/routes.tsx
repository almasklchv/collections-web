import { RouteObject } from "react-router-dom";
import AuthLayout from "../pages/Auth/AuthLayout/auth-layout";
import SignUpPage from "../pages/Auth/SignUpPage";
import SignInPage from "../pages/Auth/SignInPage";
import HomePage from "../pages/HomePage";
import MyPage from "../pages/Collections/MyPage";
import CollectionsLayout from "../pages/Collections/CollectionsLayout";
import CollectionPage from "../pages/Collections/CollectionPage";
import AppLayout from "../layouts/AppLayout";

export const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "sign-up",
            element: <SignUpPage />,
          },
          {
            path: "sign-in",
            element: <SignInPage />,
          },
        ],
      },
      {
        path: "collections",
        element: <CollectionsLayout />,
        children: [
          {
            path: "my",
            element: <MyPage />,
          },
          {
            path: ":id",
            element: <CollectionPage />,
          },
        ],
      },
    ],
  },
];
