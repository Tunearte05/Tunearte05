"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import CategoryIcon from "./CategoryIcon";

const slides = [
  {
    title: "ACCESORIOS\nCARTERAS\nPERFUMES\nPIERCINGS\nY MUCHO MÁS...",
    tagline: "TU ESTILO, EN UN SOLO LUGAR",
    icons: ["accesorios", "carteras", "perfumes"] as const,
  },
  {
    title: "MAQUILLAJE\nLENTES\nGORROS\nY MUCHO MÁS...",
    tagline: "TODO LO QUE TE GUSTA, EN UN CLICK",
    icons: ["maquillaje", "lentes", "gorros"] as const,
  },
];

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const current = slides[slide];

  return (
    <section className="relative overflow-hidden bg-brand-black">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-pink/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-brand-pink/15 blur-3xl" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 py-14 sm:px-10 md:grid-cols-2 md:py-20">
        <div key={slide} className="[animation:fade-in_0.4s_ease-out]">
          <h1 className="whitespace-pre-line text-4xl font-extrabold leading-[1.05] text-brand-pink sm:text-5xl">
            {current.title}
          </h1>
          <p className="mt-6 inline-block border-b-2 border-brand-pink pb-1 text-lg font-bold text-white sm:text-xl">
            {current.tagline} ♡
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative flex h-64 w-full max-w-md items-center justify-center gap-6 rounded-3xl border border-brand-pink/40 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 sm:h-80">
            {current.icons.map((icon) => (
              <div
                key={icon}
                className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-brand-pink bg-black text-brand-pink sm:h-24 sm:w-24"
              >
                <CategoryIcon icon={icon} className="h-9 w-9 sm:h-10 sm:w-10" />
              </div>
            ))}

            <div className="absolute -right-3 -top-3 flex h-20 w-20 rotate-6 [animation:pulse-glow_2.4s_ease-in-out_infinite] items-center justify-center rounded-2xl bg-brand-pink p-3 text-center text-xs font-bold leading-tight text-white shadow-lg sm:h-24 sm:w-24 sm:text-sm">
              TODO LO QUE TE GUSTA ESTÁ AQUÍ
            </div>
            <Sparkles className="absolute -left-4 -top-4 text-brand-pink [animation:twinkle_2.2s_ease-in-out_infinite]" size={28} />
            <Sparkles className="absolute -bottom-3 -right-2 text-brand-pink/70 [animation:twinkle_3s_ease-in-out_infinite]" size={20} />
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={() => setSlide((s) => (s - 1 + slides.length) % slides.length)}
        aria-label="Anterior"
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-brand-pink sm:block"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => setSlide((s) => (s + 1) % slides.length)}
        aria-label="Siguiente"
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-brand-pink sm:block"
      >
        <ChevronRight size={24} />
      </button>

      <div className="flex justify-center gap-2 pb-5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            aria-label={`Ir a slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === slide ? "w-6 bg-brand-pink" : "w-2.5 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
