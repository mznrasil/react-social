import { type PostType } from "../types";
import { PostCard } from "./PostCard";

export const PostsList = ({ posts }: { posts: PostType[] }) => {
  return (
    <div className="my-8 grid gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
