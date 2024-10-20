import { supabase } from "@/lib/supabase";

export const postsLoader = async () => {
  const response = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      content,
      image,
      like_count,
      repost_count,
      created_at,
      user_id,
      reposted_post_id,
      reposted_post:reposted_post_id (*, profiles (*)),
      profiles (
        id,
        full_name,
        avatar_url,
        username
      )
    `,
    )
    .order("created_at", { ascending: false });
  return response.data;
};
