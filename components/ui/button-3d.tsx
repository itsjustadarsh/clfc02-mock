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
  primary: "btn-primary",
  success: "btn-success",
  danger: "btn-danger",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  xp: "btn-xp",
};

const sizeStyles: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-4 py-2 text-sm rounded-lg",
  lg: "px-5 py-2.5 text-sm rounded-xl",
  xl: "px-6 py-3 text-base rounded-xl",
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
        className={cn("btn", variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button3D.displayName = "Button3D";
