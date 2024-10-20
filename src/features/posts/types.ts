import { JSONContent } from "novel";

export type PostType = {
  id: number;
  title: string | null;
  content: JSONContent | null;
  image: string | null;
  like_count: number;
  repost_count: number;
  created_at: string;
  user_id: string;
  reposted_post_id: number | null;
  reposted_post: PostType;
  profiles: {
    id: string;
    full_name: string;
    avatar_url: string;
    username: string;
  };
};
