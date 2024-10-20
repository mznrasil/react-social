import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { type PostType } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMemo } from "react";

import { formatTime } from "@/lib/utils";
import { RenderArticle } from "./RenderArticle";
import { Repeat2Icon, ThumbsUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LikeButton } from "./LikeButton";

export const PostCard = ({ post }: { post: PostType }) => {
  const user = post.profiles;

  const userInitials = useMemo(
    () =>
      user?.full_name
        ? user?.full_name
            .split(" ")
            .map((name) => name[0])
            .join("")
        : "",
    [user?.full_name],
  );

  return (
    <Card key={post.id}>
      <CardHeader>
        <div className="flex gap-2">
          <Avatar className="shrink-0">
            <AvatarImage src={user?.avatar_url ?? ""} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <p className="font-bold">{user?.full_name ?? user?.username}</p>
            <p className="text-muted-foreground text-xs">
              {formatTime(post.created_at)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <RenderArticle json={post.content} />
        {post.image && (
          <div className="mt-6">
            <img
              src={post.image}
              alt="post"
              className="w-full h-64 object-cover rounded-md"
            />
          </div>
        )}
        <div className="mt-8 flex justify-between items-center">
          <p className="text-muted-foreground text-xs inline-flex gap-1 items-center">
            <ThumbsUpIcon className="size-4 fill-primary/70 stroke-none" />
            {post.like_count} {post.like_count > 1 ? "likes" : "like"}
          </p>
          <p className="text-muted-foreground text-xs inline-flex gap-1 items-center">
            <Repeat2Icon className="size-4 stroke-primary/70" />
            {post.repost_count} reposts
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t py-2">
        <div className="grid grid-cols-2 w-full">
          <LikeButton postId={post.id} />
          <Button
            variant={"ghost"}
            size={"lg"}
            className="flex flex-col gap-1 items-center text-muted-foreground w-fit hover:bg-transparent justify-self-end"
          >
            <Repeat2Icon className="size-5" />
            <span className="text-sm">Repost</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
