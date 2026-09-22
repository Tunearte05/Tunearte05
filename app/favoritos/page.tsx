import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import FavoritesGrid from "@/components/FavoritesGrid";
import { getAllProducts } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Mis favoritos | Tune Arte",
};

export default async function FavoritesPage() {
  const products = await getAllProducts();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
          <h1 className="mb-8 font-display text-3xl text-brand-pink">MIS FAVORITOS</h1>
          <FavoritesGrid products={products} />
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
