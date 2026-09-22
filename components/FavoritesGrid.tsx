"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import type { Product } from "@/lib/data";
import ProductCard from "./ProductCard";

export default function FavoritesGrid({ products }: { products: Product[] }) {
  const { favoriteIds } = useFavorites();
  const favorites = products.filter((p) => favoriteIds.includes(p.id));

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-zinc-400">
        <Heart size={40} />
        <p className="text-sm">
          Todavía no guardaste ningún producto. Tocá el corazón de un producto para agregarlo acá.
        </p>
        <Link
          href="/productos"
          className="mt-2 rounded-full bg-brand-pink px-5 py-2 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-brand-pink-dark hover:shadow-md active:scale-95"
        >
          VER PRODUCTOS
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {favorites.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
