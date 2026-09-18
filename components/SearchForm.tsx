"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export function SearchForm({ mobile = false }: { mobile?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q");
    const query = typeof q === "string" ? q.trim() : "";
    if (query) router.push(`/buscar?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={handleSearch} className={mobile ? "px-4 pb-3 sm:hidden" : "hidden flex-1 items-center sm:flex"}>
      <div className="relative w-full max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
        <input
          type="text"
          name="q"
          defaultValue={currentQuery}
          placeholder="Buscar productos..."
          className="w-full rounded-full border border-zinc-700 bg-zinc-900 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-brand-pink"
        />
      </div>
    </form>
  );
}

export function SearchFormFallback({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={mobile ? "px-4 pb-3 sm:hidden" : "hidden flex-1 items-center sm:flex"}>
      <div className="relative w-full max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
        <input
          type="text"
          disabled
          placeholder="Buscar productos..."
          className="w-full rounded-full border border-zinc-700 bg-zinc-900 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none"
        />
      </div>
    </div>
  );
}
