import { Link } from "@tanstack/react-router";
import { getColorHex } from "@/lib/shopify";
import { shopifyImage, shopifySrcSet } from "@/lib/shopify-image";
import type { WatchModel } from "@/lib/models";

interface ModelCardProps {
  model: WatchModel;
  imageUrl: string | null;
  imageAlt: string | null;
}

export function ModelCard({ model, imageUrl, imageAlt }: ModelCardProps) {
  return (
    <Link
      to="/configurer/$slug"
      params={{ slug: model.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-background transition-all"
    >
      <div
        className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl"
        style={{ backgroundColor: `${getColorHex(model.color)}15` }}
      >
        {imageUrl ? (
          <img
            src={shopifyImage(imageUrl, 800)}
            srcSet={shopifySrcSet(imageUrl, [400, 600, 800, 1000])}
            sizes="(max-width: 768px) 50vw, 300px"
            alt={imageAlt ?? model.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="h-32 w-32 rounded-full border border-border"
            style={{ backgroundColor: getColorHex(model.color) }}
          />
        )}
      </div>

      <div className="px-1 pt-4">
        <h3 className="text-base font-semibold tracking-tight">{model.name}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">À partir de 60 €</p>
        <p className="mt-1 text-[11px] text-muted-foreground/80">
          Montre non incluse — cadran + bracelet uniquement
        </p>
      </div>
    </Link>
  );
}
