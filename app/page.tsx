import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategoryStrip from "@/components/CategoryStrip";
import PromoBanners from "@/components/PromoBanners";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <CategoryStrip />
        <PromoBanners />
        <FeaturedProducts />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
