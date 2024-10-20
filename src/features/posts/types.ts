import { JSONContent } from "novel";

export type PostType = {
  id: number;
  title: string;
  content: JSONContent;
  image: string;
  like_count: number;
  repost_count: number;
  created_at: string;
  user_id: string;
  profiles: {
    id: string;
    full_name: string;
    avatar_url: string;
    username: string;
  };
};
