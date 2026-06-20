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
  // Image principale du kit dans /public/images/
  image: string;
  // Galerie : image de présentation + portée au poignet (optionnelles)
  presentation?: string;
  poignet?: string;
  // Petit nom d'édition (optionnel, pour le style "éditions")
  edition?: string;
}

export const KIT_COLORS: KitColor[] = [
  { name: "Bleu marine", slug: "bleu-marine", hex: "#1e2a52", image: "/images/kit-bleu-marine.webp", presentation: "/images/kit-bleu-marine-presentation.webp", poignet: "/images/kit-bleu-marine-poigner.webp", edition: "Marine" },
  { name: "Rose corail",  slug: "rose-corail",  hex: "#f08080", image: "/images/kit-rose-corail.webp",  presentation: "/images/kit-rose-corail-presentation.webp", poignet: "/images/kit-rose-corail-poigner.webp", edition: "Corail" },
  { name: "Rose pâle",    slug: "rose-pale",    hex: "#f4b5c1", image: "/images/kit-rose-pale.webp",    presentation: "/images/kit-rose-pale-presentation.webp", poignet: "/images/kit-rose-pale-poigner.webp", edition: "Rosé" },
  { name: "Vert",         slug: "vert",         hex: "#3a9d52", image: "/images/kit-vert.webp",         presentation: "/images/kit-vert-presentation.webp", poignet: "/images/kit-vert-poigner.webp", edition: "Émeraude" },
  { name: "Jaune",        slug: "jaune",        hex: "#f2d21b", image: "/images/kit-jaune.webp",        presentation: "/images/kit-jaune-presentation.webp", poignet: "/images/kit-jaune-poigner.webp", edition: "Soleil" },
  { name: "Noir",         slug: "noir",         hex: "#1a1a1a", image: "/images/kit-noir.webp",         presentation: "/images/kit-noir-presentation.webp", poignet: "/images/kit-noir-poigner.webp", edition: "Onyx" },
  { name: "Bleu nuit",    slug: "bleu-nuit",    hex: "#1a2540", image: "/images/kit-bleu-nuit.webp",    presentation: "/images/kit-bleu-nuit-presentation.webp", poignet: "/images/kit-bleu-nuit-poigner.webp", edition: "Nuit" },
  { name: "Blanc",        slug: "blanc",        hex: "#f5f5f5", image: "/images/kit-blanc.webp",        presentation: "/images/kit-blanc-presentation.webp", poignet: "/images/kit-blanc-poigner.webp", edition: "Ivoire" },
];

// Retourne la liste ordonnée des images d'un kit (principale, présentation, poignet)
export function getKitGallery(kit: KitColor): string[] {
  return [kit.image, kit.presentation, kit.poignet].filter(Boolean) as string[];
}

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
