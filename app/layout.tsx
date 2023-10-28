import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Next.js Auth and CRUD with Supabase",
  description:
    "A web project that involves using Next.js and Supabase for authentication and CRUD (Create, Read, Update, Delete) operations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="flex flex-col items-center min-h-screen">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
