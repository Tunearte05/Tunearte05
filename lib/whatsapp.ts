import { formatPrice } from "./data";
import type { CartItem } from "@/context/CartContext";

export const WHATSAPP_NUMBER = "59895308809";

export function buildOrderWhatsAppLink(items: CartItem[], total: number) {
  const lines = items.map(
    (item) => `- ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
  );

  const message = [
    "¡Hola! Quiero hacer este pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatPrice(total)}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
