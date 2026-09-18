"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Check } from "lucide-react";
import { formatPrice, type Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import CategoryIcon from "./CategoryIcon";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({ id: product.id, name: product.name, price: product.price });
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

      <div className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-pink-50 to-zinc-100 text-brand-pink">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
        ) : (
          <CategoryIcon icon={product.category} className="h-14 w-14 opacity-70" />
        )}
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
