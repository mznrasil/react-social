import { UserPenIcon } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
import { PostsList } from "@/features/posts/components/PostsList";
import { type PostType } from "@/features/posts/types";

function App() {
  const posts = useLoaderData() as PostType[];

  return (
    <section className="container max-w-screen-md">
      <Link
        to={"/posts/create"}
        className="inline-block w-full text-center border border-muted-foreground border-dashed p-4 hover:bg-slate-100"
      >
        <p className="inline-flex items-center gap-4 text-muted-foreground">
          <UserPenIcon />
          Write a New Post
        </p>
      </Link>

      <PostsList posts={posts} />
    </section>
  );
}

export default App;
