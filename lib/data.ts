export type Category = {
  name: string;
  icon:
    | "accesorios"
    | "carteras"
    | "perfumes"
    | "piercings"
    | "maquillaje"
    | "lentes"
    | "gorros"
    | "mas";
};

export const categories: Category[] = [
  { name: "Accesorios", icon: "accesorios" },
  { name: "Carteras", icon: "carteras" },
  { name: "Perfumes", icon: "perfumes" },
  { name: "Piercings", icon: "piercings" },
  { name: "Maquillaje", icon: "maquillaje" },
  { name: "Lentes", icon: "lentes" },
  { name: "Gorros", icon: "gorros" },
  { name: "Y mucho más", icon: "mas" },
];

export const navLinks = [
  "Accesorios",
  "Carteras",
  "Perfumes",
  "Piercings",
  "Maquillaje",
];

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category["icon"];
  imageUrl?: string;
};

export const featuredProducts: Product[] = [
  { id: "1", name: "Set de Aros Corazón", price: 790, category: "accesorios" },
  { id: "2", name: "Collar Doble Cadena", price: 990, category: "accesorios" },
  { id: "3", name: "Cartera Mini Charol", price: 2650, category: "carteras" },
  { id: "4", name: "Perfume Floral Intenso", price: 1290, category: "perfumes" },
  { id: "5", name: "Set de Piercings Acero", price: 690, category: "piercings" },
  { id: "6", name: "Paleta de Sombras", price: 1990, category: "maquillaje" },
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("es-UY", {
    style: "currency",
    currency: "UYU",
    maximumFractionDigits: 0,
  }).format(value);
}
