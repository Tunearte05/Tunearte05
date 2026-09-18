"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, Heart, User, ShoppingCart, ChevronDown, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import InstagramIcon from "./icons/InstagramIcon";

export default function Header() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top announcement bar */}
      <div className="bg-brand-pink text-white text-[11px] sm:text-xs font-semibold tracking-wide">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-1.5 text-center sm:justify-between">
          <span className="hidden sm:inline">♡ ENVÍOS A TODO EL PAÍS ♡</span>
          <span>¡TUS ACCESORIOS, PERFUMES Y MUCHO MÁS EN UN SOLO LUGAR!</span>
          <span className="hidden sm:inline">♡ SAN CARLOS ♡</span>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-brand-black">
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

          <div className="hidden flex-1 items-center sm:flex">
            <div className="relative w-full max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full rounded-full border border-zinc-700 bg-zinc-900 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-brand-pink"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4 text-white sm:ml-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 text-sm font-medium md:flex"
            >
              <InstagramIcon size={20} />
              @tunearte.sc
            </a>
            <button aria-label="Cuenta" className="hover:text-brand-pink">
              <User size={22} />
            </button>
            <button aria-label="Favoritos" className="hover:text-brand-pink">
              <Heart size={22} />
            </button>
            <button aria-label="Carrito" className="relative hover:text-brand-pink">
              <ShoppingCart size={22} />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-pink text-[11px] font-bold text-white">
                {count}
              </span>
            </button>
          </div>
        </div>

        {/* Search bar (mobile) */}
        <div className="px-4 pb-3 sm:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full rounded-full border border-zinc-700 bg-zinc-900 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-brand-pink"
            />
          </div>
        </div>

        {/* Nav links */}
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col border-t border-zinc-800 px-4 py-3 text-sm font-semibold text-white lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-8 lg:border-t lg:py-3`}
        >
          <Link href="/" className="border-b-2 border-brand-pink py-2 text-brand-pink lg:border-b-2 lg:py-0">
            INICIO
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link}
              href="#"
              className="flex items-center gap-1 py-2 uppercase hover:text-brand-pink lg:py-0"
            >
              {link}
            </Link>
          ))}
          <Link href="#" className="flex items-center gap-1 py-2 uppercase hover:text-brand-pink lg:py-0">
            Más <ChevronDown size={16} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
