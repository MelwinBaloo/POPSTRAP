import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { fetchAllProducts, formatPrice, getColorHex, type ShopifyProductNode } from "@/lib/shopify";
import { shopifyImage, shopifySrcSet } from "@/lib/shopify-image";
import { getModelBySlug, findImageForColor, getModelByColor, WATCH_MODELS } from "@/lib/models";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ColorSwatch } from "@/components/ColorSwatch";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";

export const Route = createFileRoute("/configurer/$slug")({
  head: ({ params }) => {
    const model = getModelBySlug(params.slug);
    const title = model ? `${model.name} — Configurateur POPSTRAP` : "Configurateur POPSTRAP";
    const desc = model
      ? `Composez votre ${model.name} : choisissez la couleur du cadran et du bracelet pour Swatch × Audemars Piguet.`
      : "Configurez votre Swatch × AP avec POPSTRAP.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ConfiguratorPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <p>Modèle introuvable</p>
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

const DEFAULT_COLORS = [
  "Rose",
  "Rouge",
  "Cyan",
  "Vert pâle",
  "Vert foncé",
  "Turquoise",
  "Noir",
  "Bleu marine",
  "Bleu ciel",
  "Blanc",
];

const PREVIEW_BACKGROUND = "#ffffff";

type PartKey = "cadran" | "bracelet";

interface PartState {
  include: boolean;
  color: string;
}

function findVariant(product: ShopifyProductNode | undefined, color: string) {
  if (!product) return undefined;
  return product.variants.edges.find(
    (v) => v.node.selectedOptions.find((o) => o.name === "Couleur")?.value === color,
  )?.node;
}

function ConfiguratorPage() {
  const { slug } = Route.useParams();
  const model = getModelBySlug(slug);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  const addItem = useCartStore((s) => s.addItem);
  const isCartLoading = useCartStore((s) => s.isLoading);
  const [added, setAdded] = useState(false);

  const allowedColors = model?.allowedColors ?? DEFAULT_COLORS;
  const initialColor = model?.color ?? allowedColors[0];
  const [cadran, setCadran] = useState<PartState>({ include: true, color: initialColor });
  const [bracelet, setBracelet] = useState<PartState>({ include: true, color: initialColor });

  const byType = useMemo(() => {
    const map: Record<PartKey, ShopifyProductNode | undefined> = {
      cadran: undefined,
      bracelet: undefined,
    };
    for (const edge of products) {
      const t = edge.node.productType.toLowerCase();
      if (t.includes("cadran")) map.cadran = edge.node;
      else if (t.includes("bracelet")) map.bracelet = edge.node;
    }
    return map;
  }, [products]);

  if (!model) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-muted-foreground">Modèle introuvable.</p>
          <Link to="/" className="mt-4 inline-block text-sm underline">
            Retour à l'accueil
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const cadranVariant = findVariant(byType.cadran, cadran.color);
  const braceletVariant = findVariant(byType.bracelet, bracelet.color);

  const cadranImage = byType.cadran
    ? findImageForColor(byType.cadran.images.edges.map((e) => e.node), cadran.color)
    : null;
  const braceletImage = byType.bracelet
    ? findImageForColor(byType.bracelet.images.edges.map((e) => e.node), bracelet.color)
    : null;

  const cadranPrice = cadranVariant ? parseFloat(cadranVariant.price.amount) : 0;
  const braceletPrice = braceletVariant ? parseFloat(braceletVariant.price.amount) : 0;
  const currency = cadranVariant?.price.currencyCode ?? braceletVariant?.price.currencyCode ?? "EUR";

  const total =
    (cadran.include ? cadranPrice : 0) + (bracelet.include ? braceletPrice : 0);
  const nothingSelected = !cadran.include && !bracelet.include;
  const canCheckout = !nothingSelected && (cadran.include ? !!cadranVariant : true) && (bracelet.include ? !!braceletVariant : true);

  const handleAdd = async () => {
    const tasks: Array<Promise<unknown>> = [];
    if (cadran.include && byType.cadran && cadranVariant) {
      tasks.push(
        addItem({
          product: { node: byType.cadran },
          variantId: cadranVariant.id,
          variantTitle: cadranVariant.title,
          price: cadranVariant.price,
          quantity: 1,
          selectedOptions: cadranVariant.selectedOptions,
        }),
      );
    }
    if (bracelet.include && byType.bracelet && braceletVariant) {
      tasks.push(
        addItem({
          product: { node: byType.bracelet },
          variantId: braceletVariant.id,
          variantTitle: braceletVariant.title,
          price: braceletVariant.price,
          quantity: 1,
          selectedOptions: braceletVariant.selectedOptions,
        }),
      );
    }
    if (tasks.length === 0) return;
    await Promise.all(tasks);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const parts: Array<{
    key: PartKey;
    label: string;
    sub: string;
    state: PartState;
    setState: (s: PartState) => void;
    variant: ReturnType<typeof findVariant>;
    product: ShopifyProductNode | undefined;
  }> = [
    {
      key: "cadran",
      label: "Cadran",
      sub: "Bezel et fond assortis",
      state: cadran,
      setState: setCadran,
      variant: cadranVariant,
      product: byType.cadran,
    },
    {
      key: "bracelet",
      label: "Bracelet",
      sub: "Silicone premium",
      state: bracelet,
      setState: setBracelet,
      variant: braceletVariant,
      product: byType.bracelet,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 md:py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Tous les modèles
        </Link>

        <div className="mt-6 grid gap-8 md:mt-8 md:grid-cols-[1.1fr_1fr] md:items-start md:gap-12">
          {/* Preview */}
          <div className="md:sticky md:top-24">
            <ConfiguratorPreview
              isLoading={isLoading}
              model={model}
              cadran={cadran}
              bracelet={bracelet}
              cadranImage={cadranImage}
              braceletImage={braceletImage}
            />
          </div>

          {/* Configuration */}
          <div className="space-y-6">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                {model.tagline}
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                {model.name}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Composez votre set : cadran, bracelet, ou les deux — chacun dans la couleur de votre choix.
              </p>
            </div>

            {parts.map((part) => {
              let partColors = allowedColors;
              if (model.combos) {
                if (part.key === "cadran") {
                  const comboKeys = Object.keys(model.combos);
                  partColors = allowedColors.filter((c) => comboKeys.includes(c));
                } else {
                  const braceletKeys = Object.keys(model.combos[cadran.color] ?? {});
                  partColors = allowedColors.filter((c) => braceletKeys.includes(c));
                }
                if (partColors.length === 0) partColors = allowedColors;
              }
              return (
                <PartCard
                  key={part.key}
                  label={part.label}
                  sub={part.sub}
                  state={part.state}
                  onChange={part.setState}
                  price={part.variant?.price}
                  disabled={!part.product}
                  colors={partColors}
                />
              );
            })}

            <div className="space-y-4 rounded-2xl border border-border bg-surface p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-2xl font-semibold tracking-tight">
                  {total > 0 ? formatPrice(total, currency) : "—"}
                </span>
              </div>
              <Button
                size="lg"
                onClick={handleAdd}
                disabled={!canCheckout || isCartLoading}
                className="h-12 w-full rounded-full text-sm font-semibold"
              >
                {isCartLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : added ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Ajouté au panier
                  </>
                ) : nothingSelected ? (
                  "Sélectionnez au moins une pièce"
                ) : (
                  "Ajouter au panier"
                )}
              </Button>
            </div>

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

function PartPreview({
  image,
  fallbackColor,
  label,
  dim,
  align,
}: {
  image: { url: string; altText: string | null } | null;
  fallbackColor: string;
  label: string;
  dim: boolean;
  align: "top" | "bottom";
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden transition-opacity duration-300 ${
        dim ? "opacity-25 grayscale" : "opacity-100"
      }`}
      style={{ backgroundColor: PREVIEW_BACKGROUND }}
    >
      {image ? (
        <img
          key={image.url}
          src={shopifyImage(image.url, 900)}
          srcSet={shopifySrcSet(image.url, [400, 600, 900, 1200])}
          sizes="(max-width: 768px) 100vw, 600px"
          alt={image.altText ?? label}
          decoding="async"
          className={`h-full w-full object-contain ${align === "bottom" ? "object-bottom" : "object-top"}`}
        />
      ) : (
        <div
          className="h-24 w-24 rounded-full border border-border"
          style={{ backgroundColor: getColorHex(fallbackColor) }}
        />
      )}
      <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-foreground backdrop-blur">
        {label}
      </span>
    </div>
  );
}

function PartCard({
  label,
  sub,
  state,
  onChange,
  price,
  disabled,
  colors,
}: {
  label: string;
  sub: string;
  state: PartState;
  onChange: (s: PartState) => void;
  price?: { amount: string; currencyCode: string };
  disabled?: boolean;
  colors: string[];
}) {
  return (
    <div
      className={`rounded-2xl border p-4 transition-colors ${
        state.include ? "border-foreground/30 bg-foreground/[0.02]" : "border-border"
      } ${disabled ? "opacity-50" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange({ ...state, include: !state.include })}
          className="flex flex-1 cursor-pointer items-start gap-3 text-left disabled:cursor-not-allowed"
        >
          <span
            className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-colors ${
              state.include
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background"
            }`}
          >
            {state.include && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
          </span>
          <span>
            <span className="block text-sm font-semibold">{label}</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">{sub}</span>
          </span>
        </button>
        <p className="whitespace-nowrap text-sm font-semibold">
          {price ? formatPrice(price.amount, price.currencyCode) : "—"}
        </p>
      </div>

      <div
        className={`mt-4 transition-opacity ${state.include ? "opacity-100" : "pointer-events-none opacity-40"}`}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Couleur</span>
          <span className="text-xs font-medium">{state.color}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <ColorSwatch
              key={c}
              name={c}
              size="md"
              selected={state.color === c}
              disabled={disabled || !state.include}
              onClick={() => onChange({ ...state, color: c })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ConfiguratorPreview({
  isLoading,
  model,
  cadran,
  bracelet,
  cadranImage,
  braceletImage,
}: {
  isLoading: boolean;
  model: { slug?: string; combos?: Record<string, Record<string, string>> };
  cadran: PartState;
  bracelet: PartState;
  cadranImage: { url: string; altText: string | null } | null;
  braceletImage: { url: string; altText: string | null } | null;
}) {
  // 1) Combo set image (cadran + bracelet both selected) from per-model map
  let composedImage: string | undefined;
  let composedAlt = "Aperçu de la montre";
  if (cadran.include && bracelet.include && model.combos) {
    composedImage = model.combos[cadran.color]?.[bracelet.color];
    composedAlt = `Cadran ${cadran.color} / Bracelet ${bracelet.color}`;
  }

  // 2) Only one part selected → show just that part's image (Shopify)
  const onlyCadran = cadran.include && !bracelet.include;
  const onlyBracelet = !cadran.include && bracelet.include;
  if (!composedImage && onlyCadran && cadranImage) {
    composedImage = cadranImage.url;
    composedAlt = cadranImage.altText ?? `Cadran ${cadran.color}`;
  }
  if (!composedImage && onlyBracelet && braceletImage) {
    composedImage = braceletImage.url;
    composedAlt = braceletImage.altText ?? `Bracelet ${bracelet.color}`;
  }

  // 3) Fallback: both selected same color → matching model photo
  if (!composedImage && cadran.include && bracelet.include && cadran.color === bracelet.color) {
    const fallbackModel = getModelByColor(cadran.color);
    if (fallbackModel) {
      composedImage = fallbackModel.image;
      composedAlt = fallbackModel.name;
    }
  }

  return (
    <div className="aspect-square overflow-hidden rounded-3xl" style={{ backgroundColor: PREVIEW_BACKGROUND }}>
      {isLoading ? (
        <div className="h-full w-full animate-pulse bg-muted" />
      ) : composedImage ? (
        <img
          key={composedImage}
          src={composedImage}
          alt={composedAlt}
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-contain"
        />
      ) : (
        <div className="grid h-full grid-rows-2">
          <PartPreview
            image={cadranImage}
            fallbackColor={cadran.color}
            label="Cadran"
            dim={!cadran.include}
            align="bottom"
          />
          <PartPreview
            image={braceletImage}
            fallbackColor={bracelet.color}
            label="Bracelet"
            dim={!bracelet.include}
            align="top"
          />
        </div>
      )}
    </div>
  );
}
