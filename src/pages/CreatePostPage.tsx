import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TailwindEditor from "@/features/common/editor/EditorWrapper";
import { ImageUploader } from "@/features/common/ImageUploader";
import { createPostSchema, CreatePostType } from "@/features/posts/schema";
import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { JSONContent } from "novel";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { redirect, useNavigate } from "react-router-dom";

export default function CreatePostPage() {
  const [content, setContent] = useState<JSONContent | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
    resolver: zodResolver(createPostSchema),
  });

  useEffect(() => {
    if (!content) return;
    setValue("content", JSON.stringify(content));
  }, [content, setValue]);

  useEffect(() => {
    if (!imageUrl) return;
    setValue("image", imageUrl);
  }, [imageUrl, setValue]);

  const onSubmit = async (data: CreatePostType) => {
    const formattedData = {
      ...data,
      content: JSON.parse(data.content),
    };

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.id) {
      console.error("User not found");
      redirect("/auth/sign-in");
      throw new Error("User not found");
    }

    const { error } = await supabase.from("posts").insert({
      title: formattedData.title,
      content: formattedData.content,
      image: formattedData.image,
      user_id: user.id,
    });

    if (error) {
      console.error("Error creating post", error);
      toast.error("Error creating post");
      throw new Error("Error creating post");
    } else {
      console.log("Post created successfully");
      toast.success("Post created successfully");
      navigate("/");
    }
  };

  return (
    <section className="container">
      <Card>
        <CardHeader>
          <CardTitle className="tracking-tighter">Write A Post</CardTitle>
          <CardDescription>Describe your post</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input placeholder="My New Post" {...register("title")} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <input type="hidden" {...register("content")} />
              <TailwindEditor initialValue={content} onChange={setContent} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="image">Image</Label>
              <input
                type="hidden"
                name={"image"}
                // defaultValue={imageUrl}
                value={imageUrl}
              />
              <ImageUploader onUploadComplete={(url) => setImageUrl(url)} />
              {imageUrl && (
                <div className="h-[200px] aspect-square">
                  <img
                    src={imageUrl}
                    alt="Post Image"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
            {isSubmitting ? (
              <Button type="button" disabled>
                <Loader2Icon className="animate-spin" />
                Creating Post...
              </Button>
            ) : (
              <Button type="submit">Create Post</Button>
            )}
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
