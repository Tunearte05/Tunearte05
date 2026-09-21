import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import CategoryIcon from "@/components/CategoryIcon";
import { getCategories, getProductsByCategory } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/categoria/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = (await getCategories()).find((c) => c.slug === slug);
  return { title: category ? `${category.name} | Tune Arte` : "Tune Arte" };
}

export default async function CategoryPage({ params }: PageProps<"/categoria/[slug]">) {
  const { slug } = await params;
  const category = (await getCategories()).find((c) => c.slug === slug);

  if (!category) notFound();

  const products = await getProductsByCategory(category.slug);

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-pink bg-brand-black text-white">
              <CategoryIcon icon={category.icon} className="h-6 w-6" />
            </span>
            <h1 className="font-display text-3xl text-brand-pink">{category.name.toUpperCase()}</h1>
          </div>

          {products.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Todavía no hay productos cargados en esta categoría. ¡Volvé pronto!
            </p>
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
