import {
  Gem,
  ShoppingBag,
  SprayCan,
  CircleDot,
  Paintbrush,
  Glasses,
  Crown as CrownIcon,
  Plus,
  Shirt,
  Footprints,
  Watch,
  Gift,
  Heart,
  Sparkles,
  Flower2,
  Star,
  Scissors,
  Music,
  Smartphone,
  House,
  Palette,
  Ribbon,
  Baby,
  Camera,
  Umbrella,
  Backpack,
  Candy,
  Sticker,
  PawPrint,
  LucideIcon,
} from "lucide-react";
import type { IconKey } from "@/lib/icons";

const ICONS: Record<IconKey, LucideIcon> = {
  accesorios: Gem,
  carteras: ShoppingBag,
  perfumes: SprayCan,
  piercings: CircleDot,
  maquillaje: Paintbrush,
  lentes: Glasses,
  gorros: CrownIcon,
  mas: Plus,
  ropa: Shirt,
  calzado: Footprints,
  relojes: Watch,
  regalos: Gift,
  corazon: Heart,
  brillos: Sparkles,
  flores: Flower2,
  estrella: Star,
  tijera: Scissors,
  musica: Music,
  celulares: Smartphone,
  hogar: House,
  paleta: Palette,
  monos: Ribbon,
  bebes: Baby,
  camara: Camera,
  paraguas: Umbrella,
  mochilas: Backpack,
  golosinas: Candy,
  stickers: Sticker,
  mascotas: PawPrint,
};

export default function CategoryIcon({
  icon,
  className,
}: {
  icon: IconKey;
  className?: string;
}) {
  const Icon = ICONS[icon] ?? Plus;
  return <Icon className={className} />;
}
