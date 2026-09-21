"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [delay, setDelay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Content below the fold starts hidden and fades in; anything already
    // visible (or when JS/animations are unavailable) is left untouched.
    if (
      el.getBoundingClientRect().top < window.innerHeight ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
    setDelay((siblings.indexOf(el) % 6) * 70);
    setHidden(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: hidden ? "0ms" : `${delay}ms` }}
      className={`reveal ${hidden ? "reveal-hidden" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
