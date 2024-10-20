import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "@/features/users/hooks";
import { supabase } from "@/lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { WebhookIcon } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function SignInPage() {
  const session = useSession();
  const user = session?.user;

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <main className="grid place-items-center h-screen bg-gradient-to-r from-primary/20 to-primary/30">
      <Card className="w-full md:w-[500px] shadow-none border-none">
        <CardHeader>
          <CardTitle className="mx-auto mb-4">
            <WebhookIcon className="size-12 text-primary" />
          </CardTitle>
          <CardDescription className="text-center">
            <span className="text-xl font-light tracking-tight">
              Welcome to React Social
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["github"]}
            view="sign_in"
            onlyThirdPartyProviders
            redirectTo={window.location.origin}
          />
        </CardContent>
      </Card>
    </main>
  );
}
