import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Todos los productos | Tune Arte",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
          <h1 className="mb-8 text-3xl font-extrabold text-brand-pink">TODOS LOS PRODUCTOS</h1>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
