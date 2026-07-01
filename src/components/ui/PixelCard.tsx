import React from "react";

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: "default" | "pink" | "purple";
}

export function PixelCard({
    children,
    className = "",
    variant = "default",
    ...props
}: PixelCardProps) {
    const borderColor = variant === "pink" ? "border-retro-pink" :
        variant === "purple" ? "border-retro-purple" :
            "border-white/20";

    const bgColor = variant === "pink" ? "bg-retro-pink/10" :
        variant === "purple" ? "bg-retro-purple/10" :
            "bg-black/40";

    return (
        <div
            className={`
        relative p-4 border-4 ${borderColor} ${bgColor}
        shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]
        backdrop-blur-sm
        ${className}
      `}
            {...props}
        >
            {/* Corner decorations for extra retro feel */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-current opacity-50" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-current opacity-50" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-current opacity-50" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-current opacity-50" />

            {children}
        </div>
    );
}
