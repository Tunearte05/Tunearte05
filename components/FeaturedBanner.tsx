"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/data";
import ProductCard from "./ProductCard";

export default function FeaturedBanner({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [scrollable, setScrollable] = useState(false);

  const step = useCallback(() => {
    const el = trackRef.current;
    const item = el?.firstElementChild as HTMLElement | null;
    return item ? item.offsetWidth + 16 : 0;
  }, []);

  const scrollByDir = useCallback(
    (dir: 1 | -1) => {
      const el = trackRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      const atStart = el.scrollLeft <= 4;
      if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
      else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      else el.scrollBy({ left: dir * step(), behavior: "smooth" });
    },
    [step]
  );

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const check = () => setScrollable(el.scrollWidth > el.clientWidth + 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [products.length]);

  useEffect(() => {
    if (paused || !scrollable) return;
    const id = setInterval(() => scrollByDir(1), 4000);
    return () => clearInterval(id);
  }, [paused, scrollable, scrollByDir]);

  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-brand-pink/40 bg-brand-black p-8 text-center text-sm text-zinc-300">
        Muy pronto vas a ver acá nuestros productos destacados.
      </div>
    );
  }

  return (
    <div
      className="relative min-w-0 rounded-3xl border border-brand-pink/40 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 p-3 shadow-xl shadow-brand-pink/10 sm:p-5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-brand-pink/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-brand-pink/15 blur-3xl" />

      <div
        ref={trackRef}
        className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[62%] shrink-0 snap-start sm:w-[36%] lg:w-[31.5%]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {scrollable && (
        <>
          <button
            onClick={() => scrollByDir(-1)}
            aria-label="Anterior"
            className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-brand-pink"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => scrollByDir(1)}
            aria-label="Siguiente"
            className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-brand-pink"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </div>
  );
}
