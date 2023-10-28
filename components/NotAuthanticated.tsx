import Link from "next/link";

export default function NotAuthanticated() {
  return (
    <div className="flex flex-col gap-y-2 justify-center items-center h-screen text-center">
      <span className="text-xl font-bold">
        This page is only accessible to users.
      </span>
      <div className="flex flex-row flex-wrap gap-2 justify-center items-center">
        <Link
          href="/login"
          className="flex justify-center py-2 px-3 w-28 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
        >
          Login
        </Link>
        <span className="font-thin">or</span>
        <Link
          href="/login"
          className="flex justify-center py-2 px-3 w-28 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
