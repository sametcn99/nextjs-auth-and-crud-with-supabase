import Link from "next/link";

export default async function AccountButton() {
  return (
    <div className="flex gap-4 items-center">
      <Link
        href="/account"
        className="py-2 px-4 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
      >
        Account
      </Link>
    </div>
  );
}
