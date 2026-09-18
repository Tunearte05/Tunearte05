"use client";

import { useState } from "react";
import { Heart, Check } from "lucide-react";
import { featuredProducts, formatPrice } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import CategoryIcon from "./CategoryIcon";
import InstagramIcon from "./icons/InstagramIcon";

function ProductCard({ product }: { product: (typeof featuredProducts)[number] }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200">
      <button
        aria-label="Agregar a favoritos"
        className="absolute right-3 top-3 z-10 rounded-full bg-white p-1.5 text-zinc-400 shadow hover:text-brand-pink"
      >
        <Heart size={16} />
      </button>

      <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-pink-50 to-zinc-100 text-brand-pink">
        <CategoryIcon icon={product.category} className="h-14 w-14 opacity-70" />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-sm font-semibold text-zinc-800">{product.name}</h3>
        <p className="text-base font-bold text-brand-pink">{formatPrice(product.price)}</p>
        <button
          onClick={handleAdd}
          className={`mt-2 flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold text-white transition-colors ${
            added ? "bg-green-600" : "bg-brand-pink hover:bg-brand-pink-dark"
          }`}
        >
          {added ? (
            <>
              <Check size={14} /> AGREGADO
            </>
          ) : (
            "AGREGAR AL CARRITO"
          )}
        </button>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl text-brand-pink sm:text-3xl">
          ♛ PRODUCTOS DESTACADOS
        </h2>
        <a href="#" className="text-sm font-semibold text-zinc-700 hover:text-brand-pink">
          VER TODOS →
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-3">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-brand-black p-6 text-center text-white">
          <h3 className="font-display text-xl text-brand-pink">Seguinos en Instagram</h3>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-pink text-brand-pink">
            <InstagramIcon size={28} />
          </div>
          <a
            href="https://instagram.com"
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
