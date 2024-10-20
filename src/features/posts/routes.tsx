import CreatePostPage from "@/pages/CreatePostPage";
import { RouteObject } from "react-router-dom";

export const POST_ROUTES: RouteObject[] = [
  {
    path: "/posts/create",
    element: <CreatePostPage />,
  },
];
