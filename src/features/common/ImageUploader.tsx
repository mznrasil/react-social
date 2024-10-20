import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { UploadIcon } from "@radix-ui/react-icons";
import { Loader2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
}

export const ImageUploader = ({ onUploadComplete }: ImageUploaderProps) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setIsLoading(false);
      throw new Error("User not found");
    }

    const { data, error } = await supabase.storage
      .from("posts")
      .upload(`${user.id}/${file.name}/${uuidv4()}`, file);

    if (error) {
      setIsLoading(false);
      console.error(error);
      throw new Error("An error occurred while uploading the image");
    }

    onUploadComplete(import.meta.env.VITE_SUPABASE_STORAGE_URL + data.path);
    setIsLoading(false);
  };

  return (
    <div>
      <input
        type="file"
        ref={inputFileRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {isLoading ? (
        <Button
          type="button"
          disabled
          variant={"secondary"}
          onClick={() => inputFileRef.current?.click()}
        >
          <Loader2Icon className="animate-spin" />
          Uploading...
        </Button>
      ) : (
        <Button
          type="button"
          variant={"secondary"}
          onClick={() => inputFileRef.current?.click()}
        >
          <UploadIcon />
          Upload
        </Button>
      )}
    </div>
  );
};
