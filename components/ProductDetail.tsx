"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import { formatPrice, type Product } from "@/lib/data";
import CategoryIcon from "./CategoryIcon";

type Props = {
  product: Product;
  onClose: () => void;
  onAdd: () => void;
  added: boolean;
};

export default function ProductDetail({ product, onClose, onAdd, added }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 [animation:fade-in_0.2s_ease-out]"
    >
      <button aria-label="Cerrar" className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:flex-row">
        <button
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1.5 text-zinc-500 shadow transition-colors hover:text-brand-pink"
        >
          <X size={20} />
        </button>

        <div className="relative aspect-square w-full shrink-0 bg-gradient-to-br from-pink-50 to-zinc-100 sm:w-1/2">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 640px) 384px, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-brand-pink">
              <CategoryIcon icon={product.categoryIcon ?? "mas"} className="h-20 w-20 opacity-70" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-6">
          <h2 className="pr-8 text-xl font-bold text-zinc-800">{product.name}</h2>
          <p className="text-2xl font-bold text-brand-pink">{formatPrice(product.price)}</p>
          {product.description ? (
            <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-600">{product.description}</p>
          ) : (
            <p className="text-sm text-zinc-400">Este producto todavía no tiene descripción.</p>
          )}
          <button
            onClick={onAdd}
            className={`mt-auto rounded-full py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:shadow-lg active:scale-95 ${
              added ? "bg-green-600" : "bg-brand-pink hover:bg-brand-pink-dark"
            }`}
          >
            {added ? "AGREGADO" : "AGREGAR AL CARRITO"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
