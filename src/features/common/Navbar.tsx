import { Button } from "@/components/ui/button";
import { useSession } from "@/features/users/hooks";
import { ScrollTextIcon, WebhookIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { UserButton } from "./UserButton";

export const Navbar = () => {
  const session = useSession();
  const isAuthenticated = session?.user;

  return (
    <header className="bg-muted border-b h-14 flex items-center">
      <div className="container flex justify-between items-center">
        <Link to={"/"} className="inline-flex items-center gap-2">
          <WebhookIcon />
          <p className="font-semibold">
            React<span className="text-primary">Social</span>
          </p>
        </Link>

        <div className="flex">
          <Button variant={"outline"} asChild>
            <Link to={"/docs"} className="flex items-center gap-1">
              <ScrollTextIcon className="size-3" />
              Docs
            </Link>
          </Button>

          {isAuthenticated ? (
            <UserButton user={session?.user} />
          ) : (
            <Button variant={"link"} asChild>
              <Link to={"auth/sign-in"}>Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
