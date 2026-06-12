import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ArrowLeft, Check, Loader2, Minus, Plus } from "lucide-react";
import { fetchProductByHandle, formatPrice, getColorHex } from "@/lib/shopify";
import { shopifyImage, shopifySrcSet } from "@/lib/shopify-image";
import { getCadranImages, CADRAN_IMAGES } from "@/lib/models";
import { SmoothImage } from "@/components/SmoothImage";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ColorSwatch } from "@/components/ColorSwatch";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g, " ")} — POPSTRAP` },
      {
        name: "description",
        content: "Personnalisez votre Swatch × AP avec un produit PopStrap.",
      },
    ],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <p>Produit introuvable</p>
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

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [crown, setCrown] = useState<"12h" | "15h">("12h");
  const addItem = useCartStore((s) => s.addItem);
  const isCartLoading = useCartStore((s) => s.isLoading);
  const [added, setAdded] = useState(false);

  // Précharge toutes les images de cadran pour des changements de couleur instantanés
  useEffect(() => {
    const productType = product?.productType ?? "";
    const isCadranProduct = productType
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .includes("cadran");
    if (!isCadranProduct) return;
    const imgs: HTMLImageElement[] = [];
    for (const crowns of Object.values(CADRAN_IMAGES)) {
      for (const url of Object.values(crowns)) {
        if (url) {
          const img = new Image();
          img.src = url;
          imgs.push(img);
        }
      }
    }
    return () => {
      imgs.forEach((img) => (img.src = ""));
    };
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="aspect-square animate-pulse rounded-2xl bg-surface" />
            <div className="space-y-4">
              <div className="h-8 w-2/3 animate-pulse rounded bg-surface" />
              <div className="h-4 w-full animate-pulse rounded bg-surface" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <p className="text-muted-foreground">Produit introuvable.</p>
          <Link to="/" className="mt-4 inline-block text-sm underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const colorOption = product.options.find((o) => o.name === "Couleur");
  const colors = colorOption?.values ?? [];
  const selectedVariant = product.variants.edges.find(
    (v) => v.node.selectedOptions.find((o) => o.name === "Couleur")?.value === selectedColor,
  )?.node;
  const displayPrice = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const normalize = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Est-ce un produit Cadran ? (pour utiliser nos images isolées + sélecteur couronne)
  const isCadran = normalize(product.productType).includes("cadran");
  const cadranImages = isCadran && selectedColor ? getCadranImages(selectedColor) : null;
  const availableCrowns = cadranImages
    ? (["12h", "15h"] as const).filter((c) => cadranImages[c])
    : [];
  // Notre image de cadran (selon couronne choisie, avec fallback)
  // Si aucune couleur choisie, on affiche le cadran rose par défaut
  const defaultCadranImage = isCadran
    ? CADRAN_IMAGES["Rose"]?.["12h"] ?? Object.values(CADRAN_IMAGES)[0]?.["12h"] ?? null
    : null;
  const customCadranImage = cadranImages
    ? cadranImages[crown] ?? cadranImages["12h"] ?? cadranImages["15h"] ?? null
    : defaultCadranImage;

  const colorImage = selectedColor
    ? product.images.edges.find(
        (e) => e.node.altText && normalize(e.node.altText).includes(normalize(selectedColor)),
      )?.node
    : null;
  const displayImage = colorImage ?? product.images.edges[0]?.node ?? null;

  const handleAdd = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Retour
        </Link>

        <div className="mt-8 grid gap-12 md:grid-cols-2 md:items-start">
          {/* Visual */}
          <div className="md:sticky md:top-24">
            <div className="aspect-square overflow-hidden rounded-[2rem] bg-white">
              {customCadranImage ? (
                <SmoothImage
                  src={customCadranImage}
                  alt={`Cadran ${selectedColor ?? ""}`}
                  className="h-full w-full object-contain p-6"
                />
              ) : displayImage ? (
                <img
                  src={shopifyImage(displayImage.url, 1200)}
                  srcSet={shopifySrcSet(displayImage.url, [600, 800, 1200, 1600])}
                  sizes="(max-width: 768px) 100vw, 600px"
                  alt={displayImage.altText ?? product.title}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-contain p-6"
                />
              ) : selectedColor ? (
                <div
                  className="flex h-full w-full items-center justify-center transition-colors duration-300"
                  style={{ backgroundColor: getColorHex(selectedColor) }}
                >
                  <div className="rounded-full bg-background/90 px-4 py-2 text-sm font-medium backdrop-blur">
                    {selectedColor}
                  </div>
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="grid grid-cols-5 gap-4 p-12">
                    {colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className="h-12 w-12 rounded-full border border-border shadow-sm transition-transform hover:scale-110"
                        style={{ backgroundColor: getColorHex(c) }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {product.productType}
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                {product.title}
              </h1>
              <p className="mt-3 text-2xl font-semibold">
                {formatPrice(displayPrice.amount, displayPrice.currencyCode)}
              </p>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            {/* Color picker */}
            {colors.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Couleur</p>
                  {selectedColor && (
                    <p className="text-sm text-muted-foreground">{selectedColor}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {colors.map((c) => (
                    <ColorSwatch
                      key={c}
                      name={c}
                      selected={selectedColor === c}
                      size="lg"
                      onClick={() => setSelectedColor(c)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sélecteur de position de couronne (cadran avec 2 versions) */}
            {availableCrowns.length > 1 && (
              <div className="space-y-3 pt-2">
                <p className="text-sm font-medium">Position de la couronne</p>
                <div className="flex gap-2">
                  {availableCrowns.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCrown(c)}
                      className={`flex-1 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                        crown === c
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background text-foreground hover:border-foreground/40"
                      }`}
                    >
                      {c === "12h" ? "Couronne à 12h" : "Couronne à 15h"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Quantité</p>
              <div className="inline-flex items-center rounded-full border border-border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center hover:bg-surface"
                  aria-label="Diminuer"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-10 w-10 items-center justify-center hover:bg-surface"
                  aria-label="Augmenter"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* CTA */}
            <Button
              size="lg"
              onClick={handleAdd}
              disabled={!selectedColor || isCartLoading}
              className="h-12 w-full rounded-full text-sm font-semibold"
            >
              {isCartLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : added ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Ajouté au panier
                </>
              ) : !selectedColor ? (
                "Choisir une couleur"
              ) : (
                "Ajouter au panier"
              )}
            </Button>

            <div className="space-y-2 rounded-2xl border border-border bg-surface p-4 text-sm">
              <p className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" /> Compatible Swatch × Audemars Piguet uniquement
              </p>
              <p className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" /> Expédition sous 48h
              </p>
              <p className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" /> Retours acceptés sous 14 jours
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
