import { getColorHex } from "@/lib/shopify";
import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  name: string;
  selected?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
}

export function ColorSwatch({ name, selected, size = "md", onClick, disabled }: ColorSwatchProps) {
  const hex = getColorHex(name);
  const sizeClass = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }[size];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={name}
      aria-label={name}
      aria-pressed={selected}
      className={cn(
        "relative rounded-full border transition-all",
        sizeClass,
        selected
          ? "border-foreground ring-2 ring-foreground ring-offset-2 ring-offset-background"
          : "border-border hover:scale-110",
        disabled && "cursor-not-allowed opacity-40",
      )}
      style={{ backgroundColor: hex }}
    >
      {name === "Blanc" && (
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-border" />
      )}
    </button>
  );
}
