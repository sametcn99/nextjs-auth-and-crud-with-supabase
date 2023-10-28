import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default function Navbar() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  return (
    <nav className="flex sticky top-0 z-10 justify-center w-full h-16 border-b border-b-foreground/10 backdrop-blur">
      <div className="flex justify-between items-center p-3 w-full max-w-4xl text-sm">
        <Link
          className="py-2 px-4 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
          href="/"
        >
          Home
        </Link>
        {isSupabaseConnected && <AuthButton />}
      </div>
    </nav>
  );
}
