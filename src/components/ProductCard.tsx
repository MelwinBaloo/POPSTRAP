import { Link } from "@tanstack/react-router";
import { getColorHex, formatPrice, type ShopifyProduct } from "@/lib/shopify";
import { shopifyImage, shopifySrcSet } from "@/lib/shopify-image";
import { CADRAN_IMAGES } from "@/lib/models";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const p = product.node;
  const colorOption = p.options.find((o) => o.name === "Couleur");
  const colors = colorOption?.values ?? [];
  const price = p.priceRange.minVariantPrice;
  const firstImage = p.images.edges[0]?.node;

  // Pour le produit Cadran, utiliser notre image de cadran isolé (fond blanc) comme vignette
  const normalize = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const isCadran = normalize(p.productType).includes("cadran");
  const customCadranThumb = isCadran
    ? CADRAN_IMAGES["Rose"]?.["12h"] ?? Object.values(CADRAN_IMAGES)[0]?.["12h"] ?? null
    : null;

  return (
    <Link
      to="/product/$handle"
      params={{ handle: p.handle }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        {customCadranThumb ? (
          <img
            src={customCadranThumb}
            alt={p.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : firstImage ? (
          <img
            src={shopifyImage(firstImage.url, 800, 600)}
            srcSet={shopifySrcSet(firstImage.url, [400, 600, 800, 1200], (w) => Math.round((w * 3) / 4))}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            width={800}
            height={600}
            alt={firstImage.altText ?? p.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="grid grid-cols-5 gap-2 p-8">
              {colors.slice(0, 10).map((c) => (
                <div
                  key={c}
                  className="h-6 w-6 rounded-full border border-border shadow-sm"
                  style={{ backgroundColor: getColorHex(c) }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{p.productType}</p>
            <h3 className="mt-1 text-lg font-semibold tracking-tight">{p.title}</h3>
          </div>
          <p className="text-lg font-semibold">{formatPrice(price.amount, price.currencyCode)}</p>
        </div>

        {colors.length > 0 && (
          <div className="flex items-center gap-1.5">
            {colors.slice(0, 8).map((c) => (
              <div
                key={c}
                className="h-3.5 w-3.5 rounded-full border border-border"
                style={{ backgroundColor: getColorHex(c) }}
                title={c}
              />
            ))}
            {colors.length > 8 && (
              <span className="ml-1 text-xs text-muted-foreground">+{colors.length - 8}</span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-2 text-sm font-medium text-foreground">
          Voir le produit
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
