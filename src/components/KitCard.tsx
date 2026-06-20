import { Link } from "@tanstack/react-router";
import type { KitColor } from "@/lib/kits";

interface KitCardProps {
  kit: KitColor;
}

export function KitCard({ kit }: KitCardProps) {
  return (
    <Link
      to="/configurer/$slug"
      params={{ slug: kit.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-background transition-all"
    >
      <div
        className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-white"
      >
        <img
          src={kit.image}
          alt={`Kit ${kit.name}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="px-1 pt-4">
        <div className="flex items-center gap-2">
          <span
            className="h-4 w-4 rounded-full border border-border"
            style={{ backgroundColor: kit.hex }}
          />
          <h3 className="text-base font-semibold tracking-tight">{kit.name}</h3>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">49,90 €</p>
        <p className="mt-1 text-[11px] text-muted-foreground/80">
          Kit complet — coque + bracelet
        </p>
      </div>
    </Link>
  );
}
