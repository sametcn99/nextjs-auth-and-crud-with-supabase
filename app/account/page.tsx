import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import AccountForm from "./components/user-details";
import NotAuthanticated from "@/components/NotAuthanticated";

export default async function Account() {
  // use the cookies from the request
  const cookieStore = cookies();
  // create a supabase client
  const supabase = createClient(cookieStore);
  // get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if the user is signed in, show the form
  if (session) {
    return <AccountForm session={session} />;
  }

  // if the user is not signed in, show a message
  return <NotAuthanticated />;
}
