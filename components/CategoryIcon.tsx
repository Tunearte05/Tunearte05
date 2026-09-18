import {
  Gem,
  ShoppingBag,
  SprayCan,
  CircleDot,
  Paintbrush,
  Glasses,
  Crown as CrownIcon,
  Plus,
  LucideIcon,
} from "lucide-react";
import type { Category } from "@/lib/data";

const ICONS: Record<Category["icon"], LucideIcon> = {
  accesorios: Gem,
  carteras: ShoppingBag,
  perfumes: SprayCan,
  piercings: CircleDot,
  maquillaje: Paintbrush,
  lentes: Glasses,
  gorros: CrownIcon,
  mas: Plus,
};

export default function CategoryIcon({
  icon,
  className,
}: {
  icon: Category["icon"];
  className?: string;
}) {
  const Icon = ICONS[icon];
  return <Icon className={className} />;
}
