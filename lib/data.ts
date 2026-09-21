import type { IconKey } from "./icons";

export type Category = {
  name: string;
  slug: string;
  icon: IconKey;
  order: number;
  showInNav: boolean;
};

export const defaultCategories: Category[] = [
  { name: "Accesorios", slug: "accesorios", icon: "accesorios", order: 10, showInNav: true },
  { name: "Carteras", slug: "carteras", icon: "carteras", order: 20, showInNav: true },
  { name: "Perfumes", slug: "perfumes", icon: "perfumes", order: 30, showInNav: true },
  { name: "Piercings", slug: "piercings", icon: "piercings", order: 40, showInNav: true },
  { name: "Maquillaje", slug: "maquillaje", icon: "maquillaje", order: 50, showInNav: true },
  { name: "Lentes", slug: "lentes", icon: "lentes", order: 60, showInNav: false },
  { name: "Gorros", slug: "gorros", icon: "gorros", order: 70, showInNav: false },
  { name: "Y mucho más", slug: "mas", icon: "mas", order: 80, showInNav: false },
];

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  categoryIcon?: IconKey;
  description?: string;
  imageUrl?: string;
};

export const featuredProducts: Product[] = [
  { id: "1", name: "Set de Aros Corazón", price: 790, category: "accesorios", categoryIcon: "accesorios" },
  { id: "2", name: "Collar Doble Cadena", price: 990, category: "accesorios", categoryIcon: "accesorios" },
  { id: "3", name: "Cartera Mini Charol", price: 2650, category: "carteras", categoryIcon: "carteras" },
  { id: "4", name: "Perfume Floral Intenso", price: 1290, category: "perfumes", categoryIcon: "perfumes" },
  { id: "5", name: "Set de Piercings Acero", price: 690, category: "piercings", categoryIcon: "piercings" },
  { id: "6", name: "Paleta de Sombras", price: 1990, category: "maquillaje", categoryIcon: "maquillaje" },
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("es-UY", {
    style: "currency",
    currency: "UYU",
    maximumFractionDigits: 0,
  }).format(value);
}
