export default function Index() {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen text-center animate-in">
        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-7xl">
          This Page is Public view!
        </h1>
        <p className="mt-4 text-xl font-thin">
          You can see this page without logging in.
        </p>
        <a
          href="https://github.com/sametcn99/nextjs-auth-and-crud-with-supabase"
          target="_blank"
          className="p-2 mt-4 font-bold text-black rounded-md hover:scale-105 bg-slate-300"
          rel="noreferrer"
        >
          Check out Source from Github
        </a>
      </div>
    </>
  );
}
