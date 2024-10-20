import { supabase } from "@/lib/supabase";
import { redirect } from "react-router-dom";

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }

  return redirect("/");
}
