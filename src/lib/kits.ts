// ============================================================
// POPSTRAP — Kits complets (coque + bracelet)
// Un seul produit Shopify "Kit Complet", 8 couleurs
// ============================================================

export interface KitColor {
  // Nom EXACT de la couleur côté Shopify (variante)
  name: string;
  // Slug pour l'URL (/configurer/<slug>)
  slug: string;
  // Code hex pour la pastille de couleur
  hex: string;
  // Image du kit dans /public/images/
  image: string;
  // Petit nom d'édition (optionnel, pour le style "éditions")
  edition?: string;
}

export const KIT_COLORS: KitColor[] = [
  { name: "Bleu marine", slug: "bleu-marine", hex: "#1e2a52", image: "/images/kit-bleu-marine.webp", edition: "Marine" },
  { name: "Rose corail",  slug: "rose-corail",  hex: "#f08080", image: "/images/kit-rose-corail.webp",  edition: "Corail" },
  { name: "Rose pâle",    slug: "rose-pale",    hex: "#f4b5c1", image: "/images/kit-rose-pale.webp",    edition: "Rosé" },
  { name: "Vert",         slug: "vert",         hex: "#3a9d52", image: "/images/kit-vert.webp",         edition: "Émeraude" },
  { name: "Jaune",        slug: "jaune",        hex: "#f2d21b", image: "/images/kit-jaune.webp",        edition: "Soleil" },
  { name: "Noir",         slug: "noir",         hex: "#1a1a1a", image: "/images/kit-noir.webp",         edition: "Onyx" },
  { name: "Bleu nuit",    slug: "bleu-nuit",    hex: "#1a2540", image: "/images/kit-bleu-nuit.webp",    edition: "Nuit" },
  { name: "Blanc",        slug: "blanc",        hex: "#f5f5f5", image: "/images/kit-blanc.webp",        edition: "Ivoire" },
];

export function getKitBySlug(slug: string): KitColor | undefined {
  return KIT_COLORS.find((k) => k.slug === slug);
}

export function getKitByColor(name: string): KitColor | undefined {
  return KIT_COLORS.find((k) => k.name === name);
}

export function getKitImage(name: string): string | null {
  return getKitByColor(name)?.image ?? null;
}

// Le handle du produit Kit dans Shopify
export const KIT_PRODUCT_HANDLE = "kit-complet-pour-swatch-x-ap";
