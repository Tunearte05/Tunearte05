const words = [
  "ACCESORIOS",
  "PIERCINGS",
  "PERFUMES",
  "CARTERAS",
  "MAQUILLAJE",
  "LENTES",
  "GORROS",
  "ENVÍOS A TODO EL PAÍS",
];

export default function Marquee() {
  const row = words.flatMap((w) => [w, "♡"]);

  return (
    <div className="relative z-10 -my-2 overflow-hidden py-4" aria-hidden>
      <div className="-rotate-1 scale-[1.03] overflow-hidden bg-brand-pink py-2 shadow-lg shadow-brand-pink/30">
        <div className="flex w-max [animation:marquee_28s_linear_infinite]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-6 pr-6">
              {row.map((item, i) => (
                <span
                  key={i}
                  className={`text-lg font-bold text-white sm:text-xl ${item === "♡" ? "text-black/70" : ""}`}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
