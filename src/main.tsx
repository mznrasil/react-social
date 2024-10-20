import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AUTH_ROUTES } from "@/features/users/routes.tsx";
import App from "./App";
import AppLayout from "@/layouts/AppLayout";
import { ErrorPage } from "@/pages/ErrorPage";
import { POST_ROUTES } from "@/features/posts/routes";
import { Toaster } from "react-hot-toast";
import { postsLoader } from "@/features/posts/loaders";
import DocsPage from "@/pages/DocsPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <App />,
          loader: postsLoader,
        },
        {
          path: "/docs",
          element: <DocsPage />,
        },
        ...POST_ROUTES,
      ],
    },
    ...AUTH_ROUTES,
  ],
  {
    basename: "/react-social",
  },
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>,
);
