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
import { LikeButton } from "./LikeButton";
import { RepostButton } from "./RepostButton";

export const PostCard = ({ post }: { post: PostType }) => {
  const user = post.profiles;

  const userInitials = useMemo(() => {
    return user?.full_name
      ? user?.full_name
          .split(" ")
          .map((name) => name[0])
          .join("")
      : "";
  }, [user?.full_name]);

  const avatarUrl = post.reposted_post_id
    ? post.reposted_post.profiles?.avatar_url
    : user?.avatar_url;
  const originalPostUserName = post.reposted_post_id
    ? post.reposted_post.profiles?.full_name ||
      post.reposted_post.profiles?.username
    : (user?.full_name ?? user?.username);
  const originalPostCreatedAt = post.reposted_post_id
    ? post.reposted_post.created_at
    : post.created_at;
  const originalPostTitle = post.reposted_post_id
    ? post.reposted_post.title
    : post.title;
  const originalPostContent = post.reposted_post_id
    ? post.reposted_post.content
    : post.content;
  const originalPostImage = post.reposted_post_id
    ? post.reposted_post.image
    : post.image;

  return (
    <Card key={post.id}>
      {post.reposted_post_id && (
        <div className="bg-muted text-muted-foreground px-6 py-3 flex justify-between items-center">
          <p className="text-xs inline-flex items-center gap-2">
            <Repeat2Icon className="size-4" />
            {post.profiles?.full_name || post.profiles?.username} reposted this
          </p>
          <p className="text-muted-foreground text-xs">
            {formatTime(post.created_at)}
          </p>
        </div>
      )}
      <CardHeader>
        <div className="flex gap-2">
          <Avatar className="shrink-0">
            <AvatarImage src={avatarUrl ?? ""} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <p className="font-bold">{originalPostUserName}</p>
            <p className="text-muted-foreground text-xs">
              {formatTime(originalPostCreatedAt)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <h3 className="font-semibold tracking-tighter">{originalPostTitle}</h3>
        <div className={"mt-2"}>
          <RenderArticle json={originalPostContent} />
        </div>

        {originalPostImage && (
          <div className="mt-6">
            <img
              src={originalPostImage}
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
          <RepostButton post={post} />
        </div>
      </CardFooter>
    </Card>
  );
};
