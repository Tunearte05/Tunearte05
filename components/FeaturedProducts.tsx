import Link from "next/link";
import { Sparkles } from "lucide-react";
import { INSTAGRAM_URL } from "@/lib/data";
import { getFeaturedProducts } from "@/lib/sanity/queries";
import FeaturedBanner from "./FeaturedBanner";
import Reveal from "./Reveal";
import InstagramIcon from "./icons/InstagramIcon";

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="relative inline-flex items-center gap-2 text-xl font-extrabold text-brand-pink sm:text-3xl">
          ♛ PRODUCTOS DESTACADOS
          <Sparkles className="hidden text-brand-pink sm:block [animation:twinkle_2.4s_ease-in-out_infinite]" size={22} />
          <span className="absolute -bottom-1.5 left-0 h-2 w-full -skew-x-12 rounded-sm bg-brand-pink/25" />
        </h2>
        <Link href="/productos" className="shrink-0 whitespace-nowrap text-sm font-semibold text-zinc-700 hover:text-brand-pink">
          VER TODOS →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="min-w-0 lg:col-span-3">
          <FeaturedBanner products={products} />
        </div>

        <Reveal className="h-full">
        <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-brand-black p-6 text-center text-white">
          <h3 className="text-xl font-extrabold text-brand-pink">Seguinos en Instagram</h3>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-pink text-brand-pink [animation:pulse-glow_2.6s_ease-in-out_infinite]">
            <InstagramIcon size={28} />
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold hover:text-brand-pink"
          >
            @tunearte.sc
          </a>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
