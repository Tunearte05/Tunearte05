import Link from "next/link";
import { categories } from "@/lib/data";
import CategoryIcon from "./CategoryIcon";

export default function CategoryStrip() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 sm:gap-x-10">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/categoria/${cat.icon}`}
            className="group flex w-20 flex-col items-center gap-2"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-pink bg-brand-black text-white transition-transform group-hover:scale-105 sm:h-20 sm:w-20">
              <CategoryIcon icon={cat.icon} className="h-7 w-7 sm:h-8 sm:w-8" />
            </span>
            <span className="font-display text-[11px] text-brand-pink sm:text-xs">
              {cat.name.toUpperCase()}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
