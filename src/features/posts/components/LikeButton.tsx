import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { ThumbsUpIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSession } from "@/features/users/hooks";

export const LikeButton = ({ postId }: { postId: number }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const session = useSession();
  const user = session?.user;

  const isAlreadyLiked = useCallback(async () => {
    if (!user?.id) return false;
    const { data, error } = await supabase
      .from("likes")
      .select()
      .limit(1)
      .eq("user_id", user.id)
      .eq("post_id", postId)
      .maybeSingle();
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data === null) {
      return false;
    } else {
      return true;
    }
  }, [postId, user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    isAlreadyLiked().then((liked) => {
      if (liked) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    });
  }, [isAlreadyLiked, user?.id]);

  const handleLikeOrDislike = async () => {
    if (!user?.id) {
      return navigate("/auth/sign-in");
    }

    const alreadyLiked = await isAlreadyLiked();

    if (!alreadyLiked) {
      // insert an entry in likes table to indicate that the user liked the post
      await supabase
        .from("likes")
        .insert([{ user_id: user.id, post_id: postId }]);

      // get the current like_count from posts table
      const { data } = await supabase
        .from("posts")
        .select("like_count")
        .eq("id", postId)
        .maybeSingle();

      // update the like_count in posts table
      await supabase
        .from("posts")
        .update({ like_count: data?.like_count ? data.like_count + 1 : 1 })
        .eq("id", postId);

      setLiked(true);
      toast.success("Liked");
    } else {
      await supabase
        .from("likes")
        .delete()
        .eq("user_id", user.id)
        .eq("post_id", postId);

      const { data } = await supabase
        .from("posts")
        .select("like_count")
        .eq("id", postId)
        .maybeSingle();

      await supabase
        .from("posts")
        .update({ like_count: data?.like_count ? data.like_count - 1 : 0 })
        .eq("id", postId);
      setLiked(false);
      toast.success("Unliked");
    }

    navigate(".", { replace: true });
  };

  return (
    <Button
      variant={"ghost"}
      size={"lg"}
      className={cn(
        "flex flex-col gap-1 items-center text-muted-foreground w-fit hover:bg-transparent",
        {
          "text-primary": liked,
        },
      )}
      onClick={handleLikeOrDislike}
    >
      <ThumbsUpIcon
        className={cn("size-5", {
          "fill-primary text-primary": liked,
        })}
      />
      <span
        className={cn("text-sm", {
          "text-primary hover:text-primary/80": liked,
        })}
      >
        Like
      </span>
    </Button>
  );
};
