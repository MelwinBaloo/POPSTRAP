import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { fetchProductByHandle, formatPrice } from "@/lib/shopify";
import { SmoothImage } from "@/components/SmoothImage";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { KIT_COLORS, getKitBySlug, getKitGallery, KIT_PRODUCT_HANDLE } from "@/lib/kits";

export const Route = createFileRoute("/configurer/$slug")({
  head: ({ params }) => {
    const kit = getKitBySlug(params.slug);
    const title = kit ? `Kit ${kit.name} — POPSTRAP` : "Kit Complet — POPSTRAP";
    const desc = kit
      ? `Kit complet ${kit.name} (coque + bracelet) pour Swatch × Audemars Piguet.`
      : "Le kit complet pour Swatch × AP avec POPSTRAP.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: KitPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <p>Couleur introuvable</p>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    console.error(error);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p>Erreur de chargement.</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="mt-3 text-sm underline"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  },
});

const PREVIEW_BACKGROUND = "#ffffff";

function KitPage() {
  const { slug } = Route.useParams();
  const initialKit = getKitBySlug(slug) ?? KIT_COLORS[0];

  const [selectedColor, setSelectedColor] = useState(initialKit.name);
  const [activeImage, setActiveImage] = useState(initialKit.image);
  const [added, setAdded] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const isCartLoading = useCartStore((s) => s.isLoading);

  // Le produit Kit depuis Shopify (pour les variantes / prix / checkout)
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", KIT_PRODUCT_HANDLE],
    queryFn: () => fetchProductByHandle(KIT_PRODUCT_HANDLE),
  });

  // Précharge toutes les images de kit (galerie complète) pour des changements instantanés
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (const k of KIT_COLORS) {
      for (const url of getKitGallery(k)) {
        const img = new Image();
        img.src = url;
        imgs.push(img);
      }
    }
    return () => {
      imgs.forEach((img) => (img.src = ""));
    };
  }, []);

  const currentKit = KIT_COLORS.find((k) => k.name === selectedColor) ?? initialKit;
  const gallery = getKitGallery(currentKit);

  // Quand on change de couleur, revenir à l'image principale
  useEffect(() => {
    setActiveImage(currentKit.image);
  }, [currentKit.image]);

  const variant = product?.variants.edges.find(
    (v) => v.node.selectedOptions.find((o) => o.name === "Couleur")?.value === selectedColor,
  )?.node;

  const price = variant?.price ?? product?.priceRange.minVariantPrice;

  const handleAdd = async () => {
    if (!product || !variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Tous les coloris
        </Link>

        <div className="mt-6 grid gap-8 md:mt-8 md:grid-cols-[1.1fr_1fr] md:items-start md:gap-12">
          {/* Galerie du kit */}
          <div className="md:sticky md:top-24">
            <div
              className="aspect-square overflow-hidden rounded-[2rem]"
              style={{ backgroundColor: PREVIEW_BACKGROUND }}
            >
              <button
                type="button"
                onClick={() => setLightbox(true)}
                className="group h-full w-full cursor-zoom-in border-0 bg-transparent p-0"
                aria-label="Agrandir l'image"
              >
                <SmoothImage
                  src={activeImage}
                  alt={`Kit ${currentKit.name}`}
                  className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            </div>

            {/* Miniatures */}
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-3">
                {gallery.map((img) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`h-20 w-20 overflow-hidden rounded-xl border bg-white transition-all ${
                      activeImage === img
                        ? "border-foreground ring-1 ring-foreground"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain p-1.5"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Configuration */}
          <div className="space-y-6">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                Édition {currentKit.edition ?? currentKit.name}
              </p>
              <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">Kit Complet</h1>
              <p className="mt-3 text-muted-foreground">
                Coque + bracelet en silicone assortis pour transformer votre Swatch × Audemars Piguet.
              </p>
              {price && (
                <p className="mt-4 text-2xl font-semibold">
                  {formatPrice(price.amount, price.currencyCode)}
                </p>
              )}
            </div>

            {/* Sélecteur de couleur */}
            <div className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Couleur</span>
                <span className="text-sm text-muted-foreground">{currentKit.name}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {KIT_COLORS.map((k) => (
                  <button
                    key={k.slug}
                    type="button"
                    onClick={() => setSelectedColor(k.name)}
                    aria-label={k.name}
                    className={`relative h-10 w-10 rounded-full border shadow-sm transition-transform hover:scale-110 ${
                      selectedColor === k.name
                        ? "ring-2 ring-foreground ring-offset-2 ring-offset-surface"
                        : "border-border"
                    }`}
                    style={{ backgroundColor: k.hex }}
                  >
                    {selectedColor === k.name && (
                      <Check
                        className="absolute inset-0 m-auto h-4 w-4"
                        style={{ color: k.hex === "#f5f5f5" || k.hex === "#f2d21b" ? "#1a1a1a" : "#ffffff" }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Bouton ajouter */}
            <Button
              onClick={handleAdd}
              disabled={isLoading || isCartLoading || !variant}
              className="h-14 w-full rounded-full text-base"
            >
              {isCartLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : added ? (
                <span className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4" /> Ajouté au panier
                </span>
              ) : isLoading ? (
                "Chargement…"
              ) : !variant ? (
                "Indisponible"
              ) : (
                "Ajouter au panier — Kit Complet"
              )}
            </Button>

            {/* Réassurance */}
            <div className="space-y-2 rounded-2xl border border-border bg-surface p-4 text-sm">
              <p className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Compatible Swatch × Audemars Piguet uniquement
              </p>
              <p className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Coque + bracelet inclus
              </p>
              <p className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Retours acceptés sous 14 jours
              </p>
            </div>
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
            aria-label="Fermer"
          >
            ×
          </button>
          <img
            src={activeImage}
            alt={`Kit ${currentKit.name}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
