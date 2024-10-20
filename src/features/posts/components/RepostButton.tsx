import { Button } from "@/components/ui/button";
import { Repeat2Icon } from "lucide-react";
import { type PostType } from "../types";
import { useSession } from "@/features/users/hooks";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export const RepostButton = ({ post }: { post: PostType }) => {
  const navigate = useNavigate();

  const session = useSession();
  const user = session?.user;

  const [reposted, setReposted] = useState(false);
  const hasAlreadyReposted = useCallback(async () => {
    if (!user?.id) {
      return navigate("/auth/sign-in");
    }
    const { data } = await supabase
      .from("posts")
      .select()
      .eq("user_id", user.id)
      .eq("reposted_post_id", post.id)
      .limit(1)
      .maybeSingle();
    return data !== null;
  }, [navigate, user?.id, post.id]);

  useEffect(() => {
    if (!user?.id) return;
    hasAlreadyReposted().then((res) =>
      res ? setReposted(true) : setReposted(false),
    );
  }, [hasAlreadyReposted, user?.id]);

  const handleRepost = async () => {
    if (!user) {
      return navigate("/auth/sign-in");
    }

    // check if the post has already been reposted
    const alreadyReposted = await hasAlreadyReposted();

    // if not reposted,
    // insert a new post with the user_id and the reposted_post_id
    // increment the repost_count of the original post
    if (!alreadyReposted) {
      await supabase.from("posts").insert([
        {
          user_id: user.id,
          reposted_post_id: post.id,
        },
      ]);
      await supabase
        .from("posts")
        .update({
          repost_count: post.repost_count + 1,
        })
        .eq("id", post.id);
      setReposted(true);
      toast.success("Reposted");
    } else {
      // if already reposted,
      // delete the post with the user_id and the reposted_post_id
      // decrement the repost_count of the original post
      await supabase
        .from("posts")
        .delete()
        .eq("user_id", user.id)
        .eq("reposted_post_id", post.id);
      await supabase
        .from("posts")
        .update({
          repost_count: post.repost_count - 1,
        })
        .eq("id", post.id);
      setReposted(false);
      toast.success("Repost removed");
    }

    navigate(".", { replace: true });
  };

  const isMyPost = user?.id === post.user_id;
  const isRepostedPost = post.reposted_post_id !== null;

  return (
    <Button
      disabled={isMyPost || isRepostedPost}
      variant={"ghost"}
      size={"lg"}
      className="flex flex-col gap-1 items-center text-muted-foreground w-fit hover:bg-transparent justify-self-end"
      onClick={handleRepost}
    >
      <Repeat2Icon
        className={cn("size-5", {
          "stroke-primary": reposted,
        })}
      />
      <span
        className={cn("text-sm", {
          "text-primary": reposted,
        })}
      >
        {reposted ? "Reposted" : "Repost"}
      </span>
    </Button>
  );
};
