import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "@supabase/supabase-js";
import { LogOutIcon } from "lucide-react";
import { Form } from "react-router-dom";

export const UserButton = ({ user }: { user: Session["user"] }) => {
  const nameInitials = user.user_metadata?.full_name
    ? user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
    : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="border">
          <AvatarImage
            src={user.user_metadata.avatar_url}
            className="object-cover w-full h-full"
          />
          <AvatarFallback>{nameInitials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <p>{user.user_metadata.full_name}</p>
          <p className="text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Form method="POST" action={"/auth/sign-out"}>
          <DropdownMenuItem asChild>
            <Button className="w-full hover:outline-none" variant={"ghost"}>
              <LogOutIcon className="size-4" />
              Sign Out
            </Button>
          </DropdownMenuItem>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
