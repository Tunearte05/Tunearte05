"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { formatPrice, type Product } from "@/lib/data";
import CategoryIcon from "./CategoryIcon";

type Props = {
  product: Product;
  onClose: () => void;
  onAdd: () => void;
  added: boolean;
};

export default function ProductDetail({ product, onClose, onAdd, added }: Props) {
  const images = product.images?.length ? product.images : product.imageUrl ? [product.imageUrl] : [];
  const total = images.length;
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (total > 1) setIndex((i) => (i + dir + total) % total);
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, go]);

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
          className="absolute right-3 top-3 z-20 rounded-full bg-white/90 p-1.5 text-zinc-500 shadow transition-colors hover:text-brand-pink"
        >
          <X size={20} />
        </button>

        <div
          className="relative aspect-square w-full shrink-0 bg-gradient-to-br from-pink-50 to-zinc-100 sm:w-1/2"
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }}
        >
          {total > 0 ? (
            <Image
              key={images[index]}
              src={images[index]}
              alt={`${product.name} (foto ${index + 1} de ${total})`}
              fill
              priority
              sizes="(min-width: 640px) 384px, 100vw"
              className="object-cover [animation:fade-in_0.3s_ease-out]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-brand-pink">
              <CategoryIcon icon={product.categoryIcon ?? "mas"} className="h-20 w-20 opacity-70" />
            </div>
          )}

          {total > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                aria-label="Foto anterior"
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-brand-pink"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Foto siguiente"
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-brand-pink"
              >
                <ChevronRight size={22} />
              </button>

              <span className="absolute left-3 top-3 z-10 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
                {index + 1}/{total}
              </span>
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                {images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setIndex(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? "w-5 bg-brand-pink" : "w-2 bg-white/70 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-6">
          <h2 className="pr-8 font-sans text-xl font-extrabold text-zinc-800">{product.name}</h2>
          <p className="text-3xl font-extrabold text-brand-pink">{formatPrice(product.price)}</p>
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
