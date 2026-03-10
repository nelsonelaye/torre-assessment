import { SearchExplorer } from "@/components/SearchExplorer";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-zinc-950 selection:text-white dark:bg-black dark:selection:bg-white dark:selection:text-black">
      <Header />

      <main className="relative mx-auto max-w-5xl px-6 pt-32 pb-24">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-100">
            Find your next{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
              collaborator.
            </span>
          </h1>
          <p className="mt-6 text-lg text-zinc-500 dark:text-zinc-400">
            Explore world-class talent across your organization's engineering,
            design, and product teams.
          </p>
        </div>

        <SearchExplorer />
      </main>

      <Footer />
    </div>
  );
}
