import SignInPage from "@/pages/SignInPage";
import { RouteObject } from "react-router-dom";
import { signOut } from "./actions";

export const AUTH_ROUTES: RouteObject[] = [
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/auth/sign-out",
    action: signOut,
  },
];
