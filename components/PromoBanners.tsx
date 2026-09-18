import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CategoryIcon from "./CategoryIcon";
import type { Category } from "@/lib/data";

const banners: { icon: Category["icon"]; title: string; subtitle: string }[] = [
  { icon: "piercings", title: "PIERCINGS", subtitle: "Por orden de llegada hasta las 19hs" },
  { icon: "perfumes", title: "PERFUMES", subtitle: "Las mejores marcas y fragancias" },
  { icon: "carteras", title: "CARTERAS", subtitle: "Estilo, comodidad y variedad" },
];

export default function PromoBanners() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 pb-10 sm:px-10 md:grid-cols-3">
      {banners.map((b) => (
        <div
          key={b.title}
          className="flex items-center gap-4 rounded-2xl border border-brand-pink/30 bg-brand-black p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink/60 hover:shadow-lg hover:shadow-brand-pink/10"
        >
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-brand-pink text-brand-pink">
            <CategoryIcon icon={b.icon} className="h-8 w-8" />
          </span>
          <div>
            <h3 className="font-display text-2xl text-brand-pink">{b.title}</h3>
            <p className="mt-1 text-xs text-zinc-300">{b.subtitle}</p>
            <Link
              href={`/categoria/${b.icon}`}
              className="mt-3 flex w-fit items-center gap-1 rounded-full bg-brand-pink px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-pink-dark hover:shadow-md active:scale-95"
            >
              VER MÁS <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
