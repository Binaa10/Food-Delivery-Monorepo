"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export type SharedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function SharedButton({ children, className = "", ...props }: SharedButtonProps) {
  return (
    <button
      type="button"
      className={[
        "relative inline-flex items-center justify-center rounded-xl px-6 py-3",
        "font-semibold text-white shadow-[0_6px_0_#1d4ed8,0_10px_24px_rgba(37,99,235,0.35)]",
        "bg-gradient-to-b from-sky-400 to-blue-600 ring-1 ring-white/25",
        "transition-transform active:translate-y-1 active:shadow-[0_3px_0_#1d4ed8,0_6px_16px_rgba(37,99,235,0.35)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      ].join(" ")}
      {...props}
    >
      <span className="absolute inset-x-3 top-1 h-px rounded-full bg-white/50" aria-hidden />
      {children}
    </button>
  );
}
