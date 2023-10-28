import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import AccountForm from "./components/user-details";
import NotAuthanticated from "@/components/NotAuthanticated";

export default async function Account() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session ? <AccountForm session={session} /> : <NotAuthanticated />;
}
