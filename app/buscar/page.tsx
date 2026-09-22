import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import { searchProducts } from "@/lib/sanity/queries";

export const metadata = {
  title: "Buscar productos | Tune Arte",
};

export default async function SearchPage({ searchParams }: PageProps<"/buscar">) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";
  const products = query ? await searchProducts(query) : [];

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
          <h1 className="mb-2 text-3xl font-extrabold text-brand-pink">
            {query ? `RESULTADOS PARA "${query}"` : "BUSCAR PRODUCTOS"}
          </h1>

          {query && (
            <p className="mb-8 text-sm text-zinc-500">
              {products.length === 0
                ? "No encontramos productos con ese nombre."
                : `${products.length} producto${products.length === 1 ? "" : "s"} encontrado${products.length === 1 ? "" : "s"}`}
            </p>
          )}

          {!query ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-zinc-400">
              <Search size={40} />
              <p className="text-sm">Escribí algo en el buscador para empezar.</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-zinc-400">
              <Search size={40} />
              <p className="text-sm">Probá con otra palabra, o mirá el catálogo completo.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
