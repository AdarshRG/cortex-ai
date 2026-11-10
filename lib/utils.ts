import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ==============================================================================
// PROJECT: CORTEX AI STUDIO
// FILE: lib/utils.ts
// ROLE: Tailwind Class Merging & Formatting Helpers
// ==============================================================================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  if (amount < 0.0001 && amount > 0) {
    return `< $0.0001`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(amount);
}

export function formatNumber(val: number): string {
  return new Intl.NumberFormat("en-US").format(val);
}
