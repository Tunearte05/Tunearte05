"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useState } from "react";
import { Heart, User, ShoppingCart, ChevronDown, Menu, X } from "lucide-react";
import { INSTAGRAM_URL, type Category } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { SearchForm, SearchFormFallback } from "./SearchForm";
import InstagramIcon from "./icons/InstagramIcon";

export default function HeaderClient({
  navCategories,
  moreCategories,
}: {
  navCategories: Category[];
  moreCategories: Category[];
}) {
  const { count, openCart } = useCart();
  const { favoriteIds } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top announcement bar */}
      <div className="bg-brand-pink text-white text-[11px] sm:text-xs font-bold tracking-wide">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-1.5 text-center sm:justify-between">
          <span className="hidden sm:inline">♡ ENVÍOS A TODO EL PAÍS ♡</span>
          <span>¡TUS ACCESORIOS, PERFUMES Y MUCHO MÁS EN UN SOLO LUGAR!</span>
          <span className="hidden sm:inline">♡ SAN CARLOS ♡</span>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-brand-black shadow-lg shadow-black/30">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <button
            className="mr-1 text-white lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          <Link href="/" className="shrink-0 rounded-xl bg-white p-1.5 leading-none shadow-[0_0_10px_rgba(236,23,130,0.5)]">
            <Image
              src="/logo-tunearte.jpg"
              alt="Tune Arte"
              width={160}
              height={160}
              priority
              className="h-11 w-11 rounded-lg object-cover sm:h-12 sm:w-12"
            />
          </Link>

          <Suspense fallback={<SearchFormFallback />}>
            <SearchForm />
          </Suspense>

          <div className="ml-auto flex items-center gap-4 text-white sm:ml-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 text-sm font-medium transition-colors hover:text-brand-pink md:flex"
            >
              <InstagramIcon size={20} />
              @tunearte.sc
            </a>
            <button aria-label="Cuenta" className="transition-colors hover:text-brand-pink">
              <User size={22} />
            </button>
            <Link href="/favoritos" aria-label="Favoritos" className="relative transition-colors hover:text-brand-pink">
              <Heart size={22} />
              {favoriteIds.length > 0 && (
                <span
                  key={favoriteIds.length}
                  className="absolute -right-2 -top-2 flex h-5 w-5 [animation:bump_0.35s_ease-out] items-center justify-center rounded-full bg-brand-pink text-[11px] font-bold text-white"
                >
                  {favoriteIds.length}
                </span>
              )}
            </Link>
            <button aria-label="Ver pedido" onClick={openCart} className="relative transition-colors hover:text-brand-pink">
              <ShoppingCart size={22} />
              <span key={count} className="absolute -right-2 -top-2 flex h-5 w-5 [animation:bump_0.35s_ease-out] items-center justify-center rounded-full bg-brand-pink text-[11px] font-bold text-white">
                {count}
              </span>
            </button>
          </div>
        </div>

        {/* Search bar (mobile) */}
        <Suspense fallback={<SearchFormFallback mobile />}>
          <SearchForm mobile />
        </Suspense>

        {/* Nav links */}
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col border-t border-zinc-800 px-4 py-3 text-sm font-semibold text-white lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-8 lg:border-t lg:py-3`}
        >
          <Link href="/" className="border-b-2 border-brand-pink py-2 text-brand-pink lg:border-b-2 lg:py-0">
            INICIO
          </Link>
          {navCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="flex items-center gap-1 py-2 uppercase transition-colors hover:text-brand-pink lg:py-0"
            >
              {cat.name}
            </Link>
          ))}
          {moreCategories.length > 0 && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                className="flex items-center gap-1 py-2 uppercase transition-colors hover:text-brand-pink lg:py-0"
              >
                Más
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${moreOpen ? "rotate-180" : ""}`}
                />
              </button>

              {moreOpen && (
                <>
                  <button
                    aria-label="Cerrar"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setMoreOpen(false)}
                  />
                  <div className="absolute left-0 top-full z-50 mt-2 flex min-w-[10rem] flex-col overflow-hidden rounded-xl border border-zinc-800 bg-brand-black py-1 shadow-xl [animation:fade-in_0.15s_ease-out] lg:left-1/2 lg:-translate-x-1/2">
                    {moreCategories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/categoria/${cat.slug}`}
                        onClick={() => setMoreOpen(false)}
                        className="px-4 py-2 text-left uppercase text-white transition-colors hover:bg-white/10 hover:text-brand-pink"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
