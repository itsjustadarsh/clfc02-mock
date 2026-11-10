"use client";

import { cn } from "@/lib/utils";
import { playClick } from "@/lib/sounds";
import { forwardRef } from "react";

type Variant = "primary" | "success" | "danger" | "secondary" | "ghost" | "xp";

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg" | "xl";
  sound?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground btn-shadow-primary",
  success: "bg-success text-white btn-shadow-success",
  danger: "bg-danger text-white btn-shadow-danger",
  secondary: "bg-muted text-foreground btn-shadow-secondary",
  ghost: "bg-transparent text-foreground border-2 border-border btn-shadow-ghost",
  xp: "bg-xp text-black btn-shadow-xp",
};

const sizeStyles: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs rounded-xl",
  md: "px-5 py-2.5 text-sm rounded-2xl",
  lg: "px-6 py-3 text-base rounded-2xl",
  xl: "px-8 py-4 text-lg rounded-2xl",
};

export const Button3D = forwardRef<HTMLButtonElement, Button3DProps>(
  ({ variant = "primary", size = "md", sound = true, className, onClick, children, disabled, ...props }, ref) => {
    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      if (sound && !disabled) playClick();
      onClick?.(e);
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "btn-3d font-bold select-none transition-all active:translate-y-[4px] active:shadow-none",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:shadow-[0_4px_0]",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button3D.displayName = "Button3D";
