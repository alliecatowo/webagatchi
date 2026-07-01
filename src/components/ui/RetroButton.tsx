import React from "react";

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger";
}

export function RetroButton({
    children,
    className = "",
    variant = "primary",
    ...props
}: RetroButtonProps) {
    const baseStyles = "px-6 py-3 font-pixel text-xs uppercase tracking-widest transition-all active:translate-y-1 active:shadow-none border-2";

    const variants = {
        primary: "bg-retro-pink text-retro-bg border-retro-pink shadow-[4px_4px_0px_0px_rgba(255,158,205,0.5)] hover:bg-retro-pink/90",
        secondary: "bg-retro-cyan text-retro-bg border-retro-cyan shadow-[4px_4px_0px_0px_rgba(128,222,234,0.5)] hover:bg-retro-cyan/90",
        danger: "bg-red-500 text-white border-red-500 shadow-[4px_4px_0px_0px_rgba(239,68,68,0.5)] hover:bg-red-600"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
