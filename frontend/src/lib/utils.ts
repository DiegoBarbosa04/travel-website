import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { CSSProperties } from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Atraso das animações de entrada (lido pela variável `--delay` em index.css).
export function animationDelay(ms: number) {
  return { "--delay": `${ms}ms` } as CSSProperties
}
