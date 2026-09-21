import Link from "next/link";
import { Heart, Sparkles, Star } from "lucide-react";
import { getCategories } from "@/lib/sanity/queries";
import CategoryIcon from "./CategoryIcon";
import Reveal from "./Reveal";

export default async function CategoryStrip() {
  const categories = await getCategories();

  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-10">
      <Sparkles
        aria-hidden
        className="absolute left-4 top-6 text-brand-pink/40 [animation:twinkle_3s_ease-in-out_infinite] sm:left-10"
        size={26}
      />
      <Heart
        aria-hidden
        className="absolute right-6 top-10 text-brand-pink/30 [animation:float_4s_ease-in-out_infinite] sm:right-14"
        size={22}
        fill="currentColor"
      />
      <Star
        aria-hidden
        className="absolute bottom-6 right-4 text-brand-pink/30 [animation:twinkle_3.6s_ease-in-out_infinite] sm:right-12"
        size={20}
        fill="currentColor"
      />

      <div className="relative flex flex-wrap items-start justify-center gap-x-3 gap-y-6 sm:gap-x-6">
        {categories.map((cat) => (
          <Reveal key={cat.slug}>
            <Link
              href={`/categoria/${cat.slug}`}
              className="group flex min-w-[5.5rem] flex-col items-center transition-transform duration-300 hover:-translate-y-1 hover:scale-105 sm:min-w-[6.5rem]"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full border-[5px] border-brand-pink bg-brand-black text-white shadow-[0_0_0_2px_#0d0d0d,0_0_0_4px_rgba(236,23,130,0.45)] transition-shadow group-hover:shadow-[0_0_0_2px_#0d0d0d,0_0_14px_4px_rgba(236,23,130,0.5)] sm:h-24 sm:w-24">
                <CategoryIcon
                  icon={cat.icon}
                  className="h-9 w-9 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 sm:h-11 sm:w-11"
                />
              </span>
              <span className="-mt-3 -rotate-2 skew-x-[-8deg] rounded-[3px] bg-brand-pink px-3 py-1 font-display text-xs text-white shadow-md transition-transform duration-300 group-hover:rotate-0 sm:text-sm">
                {cat.name.toUpperCase()}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
