import { createElement, useEffect, useState, type ReactNode } from "react";
import { animationDelay, cn } from "@/lib/utils";

type RevealProps = {
  as?: "div" | "article" | "figure" | "section" | "span";
  variant?: "up" | "fade" | "zoom";
  delay?: number;
  className?: string;
  children?: ReactNode;
};

// Revela o conteúdo (fade + deslize) na primeira vez que ele entra na tela. Estilos em index.css.
function Reveal({ as = "div", variant = "up", delay = 0, className, children }: RevealProps) {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return createElement(
    as,
    {
      ref: setElement,
      className: cn("reveal", className),
      "data-variant": variant,
      "data-visible": visible || undefined,
      style: animationDelay(delay),
    },
    children,
  );
}

export default Reveal;
