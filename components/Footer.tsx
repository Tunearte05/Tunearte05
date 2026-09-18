import Image from "next/image";
import { Truck, ShieldCheck, CreditCard, Headset } from "lucide-react";

const benefits = [
  { icon: Truck, title: "Envíos a todo el país", subtitle: "Dentro de Uruguay" },
  { icon: ShieldCheck, title: "Compra segura", subtitle: "Tus datos están protegidos" },
  { icon: CreditCard, title: "Múltiples formas de pago", subtitle: "Tarjeta, transferencia y más" },
  { icon: Headset, title: "Atención personalizada", subtitle: "Estamos para ayudarte" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 sm:px-10 md:grid-cols-4">
        {benefits.map((b) => (
          <div key={b.title} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
            <b.icon className="text-brand-pink" size={26} />
            <div>
              <p className="text-sm font-semibold">{b.title}</p>
              <p className="text-xs text-zinc-400">{b.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-3 border-t border-zinc-800 py-6 text-center">
        <div className="rounded-xl bg-white p-1.5 shadow-[0_0_10px_rgba(236,23,130,0.5)]">
          <Image
            src="/logo-tunearte.jpg"
            alt="Tune Arte"
            width={160}
            height={160}
            className="h-12 w-12 rounded-lg object-cover"
          />
        </div>
        <p className="font-display text-xl text-brand-pink">GRACIAS POR ELEGIRNOS ♡</p>
        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} Tune Arte — San Carlos, Uruguay
        </p>
      </div>
    </footer>
  );
}
