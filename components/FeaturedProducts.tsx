import Link from "next/link";
import { INSTAGRAM_URL } from "@/lib/data";
import { getFeaturedProducts } from "@/lib/sanity/queries";
import ProductCard from "./ProductCard";
import InstagramIcon from "./icons/InstagramIcon";

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl text-brand-pink sm:text-3xl">
          ♛ PRODUCTOS DESTACADOS
        </h2>
        <Link href="/productos" className="text-sm font-semibold text-zinc-700 hover:text-brand-pink">
          VER TODOS →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-brand-black p-6 text-center text-white">
          <h3 className="font-display text-xl text-brand-pink">Seguinos en Instagram</h3>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-pink text-brand-pink">
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
      </div>
    </section>
  );
}
