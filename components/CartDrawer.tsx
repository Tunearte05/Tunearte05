"use client";

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/data";
import { buildOrderWhatsAppLink } from "@/lib/whatsapp";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, total, isOpen, closeCart, removeItem, updateQuantity } = useCart();

  if (!isOpen) return null;

  const whatsappLink = buildOrderWhatsAppLink(items, total);

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <button
        aria-label="Cerrar pedido"
        className="absolute inset-0 bg-black/50"
        onClick={closeCart}
      />

      <div className="relative flex h-full w-full max-w-sm flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <h2 className="font-display text-xl text-brand-pink">Tu pedido</h2>
          <button aria-label="Cerrar" onClick={closeCart} className="text-zinc-500 hover:text-brand-pink">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center text-zinc-400">
            <ShoppingBag size={40} />
            <p className="text-sm">Todavía no agregaste productos.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-zinc-800">{item.name}</p>
                    <p className="text-sm text-brand-pink">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-zinc-200 px-2 py-1">
                    <button
                      aria-label="Restar"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-zinc-500 hover:text-brand-pink"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      aria-label="Sumar"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-zinc-500 hover:text-brand-pink"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    aria-label="Quitar producto"
                    onClick={() => removeItem(item.id)}
                    className="text-zinc-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {items.length > 0 && (
          <div className="border-t border-zinc-200 px-5 py-4">
            <div className="mb-4 flex items-center justify-between text-base font-bold text-zinc-800">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-brand-pink py-3 text-sm font-bold text-white hover:bg-brand-pink-dark"
            >
              Finalizar pedido por WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
