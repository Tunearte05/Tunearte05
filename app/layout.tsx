import type { Metadata } from "next";
import { Poppins, Permanent_Marker } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const marker = Permanent_Marker({
  variable: "--font-marker",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Tune Arte | Accesorios, Piercings, Carteras y Perfumes",
  description:
    "Tune Arte: accesorios, piercings, carteras, perfumes y maquillaje en un solo lugar. Envíos a todo el país.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${poppins.variable} ${marker.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
