import { getKitImage } from "./kits";
// Auto-généré : images locales dans /public/images/
export interface WatchModel {
  slug: string;
  name: string;
  color: string;
  tagline: string;
  image?: string;
  allowedColors?: string[];
  combos?: Record<string, Record<string, string>>;
}

export const WATCH_MODELS: WatchModel[] = [
  {
    slug: "otto-rosso",
    name: "Otto Rosso",
    color: "Rose",
    tagline: "Huit en italien",
    image: "/images/Otto_Rosso_Pink_Pink.webp",
    allowedColors: ["Rose", "Rose foncé", "Blanc", "Noir"],
    combos: {
      Rose: {
        Rose: "/images/Otto_Rosso_Pink_Pink.webp",
        "Rose foncé": "/images/Otto_Rosso_Pink_Dark_Pink.webp",
        Blanc: "/images/Otto_Rosso_Pink_White.webp",
        Noir: "/images/Otto_Rosso_Pink_Black.webp",
      },
      "Rose foncé": {
        "Rose foncé": "/images/Otto_Rosso_Dark_Pink_.webp",
        Blanc: "/images/Otto_Rosso_Dark_Pink_White.webp",
        Noir: "/images/Otto_Rosso_Dark_Pink_Black.webp",
      },
      Blanc: {
        Rose: "/images/Otto_Rosso_White_Pink.webp",
        "Rose foncé": "/images/Otto_Rosso_White_Dark_Pink.webp",
        Blanc: "/images/Otto_Rosso_White_White.webp",
        Noir: "/images/Otto_Rosso_White_Black.webp",
      },
      Noir: {
        Rose: "/images/Otto_Rosso_Black_Pink.webp",
        "Rose foncé": "/images/Otto_Rosso_Black_Dark_Pink.webp",
        Blanc: "/images/Otto_Rosso_Black_White.webp",
        Noir: "/images/Otto_Rosso_Black_Black.webp",
      },
    },
  },
  {
    slug: "lan-ba",
    name: "Lán Ba",
    color: "Cyan",
    tagline: "Huit en mandarin",
    image: "/images/Lanbablueblue.webp",
    allowedColors: ["Cyan", "Bleu marine", "Blanc", "Noir"],
    combos: {
      Cyan: {
        Cyan: "/images/Lanbablueblue.webp",
        "Bleu marine": "/images/Lanbabluebluedark.webp",
        Blanc: "/images/Lanbabluebluewhite.webp",
        Noir: "/images/Lanbablueblueblack.webp",
      },
      "Bleu marine": {
        Cyan: "/images/Lanbabluedarkblue.webp",
        "Bleu marine": "/images/Lanbabluedarkbluedark.webp",
        Blanc: "/images/Lanbabluedarkwhite.webp",
        Noir: "/images/Lanbabluedarkblueblack.webp",
      },
      Blanc: {
        Cyan: "/images/Lanbawhiteblue.webp",
        "Bleu marine": "/images/Lanbawhitedarkblue.webp",
        Blanc: "/images/Lanbawhitewhite.webp",
        Noir: "/images/Lanbawhiteblack.webp",
      },
      Noir: {
        Cyan: "/images/Lanbablackblue.webp",
        "Bleu marine": "/images/Lan_Ba_Black_Lan_Ba_Dark_Blue.webp",
        Noir: "/images/Lan_Ba_Black_Black.webp",
      },
    },
  },
  {
    slug: "green-eight",
    name: "Green Eight",
    color: "Vert foncé",
    tagline: "Huit en anglais",
    image: "/images/Green_Eight_Green_Green.webp",
    allowedColors: ["Noir", "Vert foncé", "Blanc"],
    combos: {
      Noir: {
        Noir: "/images/Green_Eight_Black_Black.webp",
        "Vert foncé": "/images/Green_Eight_Black_Green.webp",
        Blanc: "/images/Green_Eight_Black_White.webp",
      },
      "Vert foncé": {
        Noir: "/images/Green_Eight_Green_Black.webp",
        "Vert foncé": "/images/Green_Eight_Green_Green.webp",
        Blanc: "/images/Green_Eight_Green_White.webp",
      },
      Blanc: {
        Noir: "/images/Green_Eight_White_Black.webp",
        "Vert foncé": "/images/Green_Eight_White_Green.webp",
        Blanc: "/images/Green_Eight_White_White.webp",
      },
    },
  },
  {
    slug: "ocho-negro",
    name: "Ocho Negro",
    color: "Noir",
    tagline: "Huit en espagnol",
    image: "/images/Ocho_Negro_Black_black.webp",
    allowedColors: ["Noir", "Blanc", "Bleu marine", "Bleu ciel", "Turquoise", "Vert foncé", "Vert pâle", "Rose", "Rose foncé", "Rouge"],
    combos: {
      Noir: {
        Noir: "/images/Ocho_Negro_Black_black.webp",
        Blanc: "/images/Ocho_Negro_Black_white.webp",
        "Bleu marine": "/images/Ocho_Negro_Black_blue.webp",
        "Bleu ciel": "/images/Ocho_Negro_Black_bluelight.webp",
        "Vert foncé": "/images/Ocho_Negro_Black_green.webp",
        "Vert pâle": "/images/Ocho_Negro_Black_mint.webp",
        Rose: "/images/Ocho_Negro_Black_rose.webp",
        Rouge: "/images/Ocho_Negro_Black_RED.webp",
      },
      Blanc: {
        Noir: "/images/Ocho_Negro_White_Black.webp",
        Blanc: "/images/Ocho_Negro_White_White.webp",
        "Bleu marine": "/images/Ocho_Negro_White_Navy_Blue.webp",
        "Bleu ciel": "/images/Ocho_Negro_White_Light_Blue.webp",
        Turquoise: "/images/Ocho_Negro_White_Turquoise.webp",
        "Vert foncé": "/images/Ocho_Negro_White_Green.webp",
        "Vert pâle": "/images/Ocho_Negro_White_Mint.webp",
        Rose: "/images/Ocho_Negro_White_Pink.webp",
        "Rose foncé": "/images/Ocho_Negro_White_Dark_Pink.webp",
      },
      "Bleu marine": {
        Noir: "/images/Ocho_Negro_Navy_Blue_Black.webp",
        Blanc: "/images/Ocho_Negro_Navy_Blue_white.webp",
        "Bleu marine": "/images/Ocho_Negro_Navy_Blue_Navy_Blue.webp",
      },
      "Bleu ciel": {
        Noir: "/images/Ocho_Negro_Light_Blue_Black.webp",
        Blanc: "/images/Ocho_Negro_Light_Blue_White.webp",
        "Bleu ciel": "/images/Ocho_Negro_Light_Blue_Light_Blue.webp",
      },
      "Vert foncé": {
        Noir: "/images/Ocho_Negro_Green_Black.webp",
        Blanc: "/images/Ocho_Negro_Green_White.webp",
        "Vert foncé": "/images/Ocho_Negro_Green_Green.webp",
      },
      "Vert pâle": {
        Noir: "/images/Ocho_Negro_Mint_Black.webp",
        Blanc: "/images/Ocho_Negro_Mint_White.webp",
        "Vert pâle": "/images/Ocho_Negro_Mint_Mint.webp",
      },
      Rose: {
        Noir: "/images/Ocho_Negro_Pink_Black.webp",
        Blanc: "/images/Ocho_Negro_Pink_White.webp",
        Rose: "/images/Ocho_Negro_Pink_Pink.webp",
      },
      "Rose foncé": {
        Noir: "/images/Ocho_Negro_Dark_Pink_Black.webp",
        Blanc: "/images/Ocho_Negro_Dark_Pink_White.webp",
        "Rose foncé": "/images/Ocho_Negro_Dark_Pink_Dark_Pink.webp",
      },
    },
  },
  {
    slug: "otg-roz",
    name: "OTG Roz",
    color: "Turquoise",
    tagline: "Huit en hébreu",
    image: "/images/OTG_Roz_Turquoise_Turquoise.webp",
    allowedColors: ["Turquoise", "Rose", "Blanc", "Noir", "Jaune"],
    combos: {
      Turquoise: {
        Turquoise: "/images/OTG_Roz_Turquoise_Turquoise.webp",
        Rose: "/images/OTG_Roz_Turquoise_OTG_Pink.webp",
        Blanc: "/images/OTG_Roz_Turquoise_White.webp",
        Noir: "/images/OTG_Roz_Turquoise_Black.webp",
        Jaune: "/images/OTG_Roz_Turquoise_Yellow.webp",
      },
      Rose: {
        Turquoise: "/images/OTG_Roz_OTG_Pink_Turquoise.webp",
        Rose: "/images/OTG_Roz_OTG_Pink_OTG_Pink.webp",
        Blanc: "/images/OTG_Roz_OTG_Pink_White.webp",
        Noir: "/images/OTG_Roz_OTG_Pink_Black.webp",
        Jaune: "/images/OTG_Roz_OTG_Pink_Yellow.webp",
      },
      Blanc: {
        Turquoise: "/images/OTG_Roz_White_Turquoise.webp",
        Rose: "/images/OTG_Roz_White_OTG_Pink.webp",
        Blanc: "/images/OTG_Roz_White_White.webp",
        Noir: "/images/OTG_Roz_White_Black.webp",
        Jaune: "/images/OTG_Roz_White_Yellow.webp",
      },
      Noir: {
        Turquoise: "/images/OTG_Roz_Black_Turquoise.webp",
        Rose: "/images/OTG_Roz_Black_OTG_Pink.webp",
        Blanc: "/images/OTG_Roz_Black_White.webp",
        Noir: "/images/OTG_Roz_Black_black.webp",
        Jaune: "/images/OTG_Roz_Black_yellow.webp",
      },
      Jaune: {
        Turquoise: "/images/OTG_Roz_Yellow_Turquoise.webp",
        Rose: "/images/OTG_Roz_Yellow_OTG_Pink.webp",
        Blanc: "/images/OTG_Roz_Yellow_White.webp",
        Noir: "/images/OTG_Roz_Yellow_black.webp",
        Jaune: "/images/OTG_Roz_Yellow_Yellow_2.webp",
      },
    },
  },
  {
    slug: "blaue-acht",
    name: "Blaue Acht",
    color: "Bleu ciel",
    tagline: "Huit en allemand",
    image: "/images/Blaue_Acht_Light_Blue_Light_Blue.webp",
    allowedColors: ["Bleu ciel", "Vert pâle", "Blanc", "Noir"],
    combos: {
      "Bleu ciel": {
        "Bleu ciel": "/images/Blaue_Acht_Light_Blue_Light_Blue.webp",
        "Vert pâle": "/images/Blaue_Acht_Light_Blue_Mint.webp",
        Blanc: "/images/Blaue_Acht_Light_Blue_White.webp",
        Noir: "/images/Blaue_Acht_Light_Blue_Black.webp",
      },
      "Vert pâle": {
        "Vert pâle": "/images/Blaue_Acht_Mint_Mint.webp",
        Blanc: "/images/Blaue_Acht_Mint_White.webp",
        Noir: "/images/Blaue_Acht_Mint_black.webp",
      },
      Blanc: {
        "Bleu ciel": "/images/Blaue_Acht_White_Light_Blue.webp",
        "Vert pâle": "/images/Blaue_Acht_White_Mint.webp",
        Blanc: "/images/Blaue_Acht_White_White (1).webp",
        Noir: "/images/Blaue_Acht_White_black.webp",
      },
      Noir: {
        "Bleu ciel": "/images/Blaue_Acht_Black_Light_Blue.webp",
        "Vert pâle": "/images/Blaue_Acht_Black_Mint.webp",
        Blanc: "/images/Blaue_Acht_Black_white.webp",
        Noir: "/images/Blaue_Acht_Black_Black.webp",
      },
    },
  },
  {
    slug: "orenji-hachi",
    name: "Orenji Hachi",
    color: "Bleu marine",
    tagline: "Huit en japonais",
    image: "/images/Orenji_Hachi_Navy_Blue_Navy_blue.webp",
    allowedColors: ["Noir", "Bleu marine", "Blanc"],
    combos: {
      Noir: {
        Noir: "/images/Orenji_Hachi_Black_Black.webp",
        "Bleu marine": "/images/Orenji_Hachi_Black_Navy_Blue.webp",
        Blanc: "/images/Orenji_Hachi_Black_White.webp",
      },
      "Bleu marine": {
        Noir: "/images/Orenji_Hachi_Navy_Blue_Black.webp",
        "Bleu marine": "/images/Orenji_Hachi_Navy_Blue_Navy_blue.webp",
        Blanc: "/images/Orenji_Hachi_Navy_Blue_White.webp",
      },
      Blanc: {
        Noir: "/images/Orenji_Hachi_White_Black.webp",
        "Bleu marine": "/images/Orenji_Hachi_White_Navy_Blue.webp",
        Blanc: "/images/Orenji_Hachi_White_White.webp",
      },
    },
  },
  {
    slug: "huit-blanc",
    name: "Huit Blanc",
    color: "Blanc",
    tagline: "Huit en français",
    image: "/images/Huit_Blanc_White_White.webp",
    allowedColors: ["Noir", "Rose foncé", "Vert foncé", "Bleu ciel", "Vert pâle", "Bleu marine", "Rose", "Blanc"],
    combos: {
      Noir: {
        Noir: "/images/Huit_Blanc_Black_Black.webp",
        "Rose foncé": "/images/Huit_Blanc_Black_Dark_Pink.webp",
        "Vert foncé": "/images/Huit_Blanc_Black_Green.webp",
        "Bleu ciel": "/images/Huit_Blanc_Black_Light_Blue.webp",
        "Vert pâle": "/images/Huit_Blanc_Black_Mint.webp",
        "Bleu marine": "/images/Huit_Blanc_Black_Navy_Blue.webp",
        Rose: "/images/Huit_Blanc_Black_Pink.webp",
        Blanc: "/images/Huit_Blanc_Black_White.webp",
      },
      "Rose foncé": {
        Noir: "/images/Huit_Blanc_Dark_Pink_Black.webp",
        "Rose foncé": "/images/Huit_Blanc_Dark_Pink_Dark_Pink.webp",
        Blanc: "/images/Huit_Blanc_Dark_Pink_White.webp",
      },
      "Vert foncé": {
        Noir: "/images/Huit_Blanc_Green_Black.webp",
        "Vert foncé": "/images/Huit_Blanc_Green_Green.webp",
        Blanc: "/images/Huit_Blanc_Green_White.webp",
      },
      "Bleu ciel": {
        Noir: "/images/Huit_Blanc_Light_Blue_Black.webp",
        Blanc: "/images/Huit_Blanc_Light_Blue_White.webp",
      },
      "Vert pâle": {
        Noir: "/images/Huit_Blanc_Mint_Black.webp",
        "Vert pâle": "/images/Huit_Blanc_Mint_Mint.webp",
        Blanc: "/images/Huit_Blanc_Mint_White.webp",
      },
      "Bleu marine": {
        Noir: "/images/Huit_Blanc_Navy_Blue_Black.webp",
        "Bleu marine": "/images/Huit_Blanc_Navy_Blue_Navy_Blue.webp",
        Blanc: "/images/Huit_Blanc_Navy_Blue_White.webp",
      },
      Rose: {
        Noir: "/images/Huit_Blanc_Pink_Black.webp",
        Rose: "/images/Huit_Blanc_Pink_Pink.webp",
        Blanc: "/images/Huit_Blanc_Pink_White.webp",
      },
      Blanc: {
        Noir: "/images/Huit_Blanc_White_Black.webp",
        "Rose foncé": "/images/Huit_Blanc_White_Dark_Pink.webp",
        "Vert foncé": "/images/Huit_Blanc_White_Green.webp",
        "Bleu ciel": "/images/Huit_Blanc_White_Light_blue.webp",
        "Bleu marine": "/images/Huit_Blanc_White_Navy_Blue.webp",
        Rose: "/images/Huit_Blanc_White_Pink.webp",
        Blanc: "/images/Huit_Blanc_White_White.webp",
      },
    },
  },
]

export function getModelBySlug(slug: string): WatchModel | undefined {
  return WATCH_MODELS.find((m) => m.slug === slug);
}

export function getModelByColor(color: string): WatchModel | undefined {
  return WATCH_MODELS.find((m) => m.color === color);
}

export function findImageForColor(
  images: Array<{ url: string; altText: string | null }>,
  color: string,
): { url: string; altText: string | null } | null {
  const normalize = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const target = normalize(color);
  return (
    images.find((img) => img.altText && normalize(img.altText).includes(target)) ??
    images[0] ??
    null
  );
}

// ============================================================
// Images de CADRAN par COULEUR (page produit Cadran)
// Chaque couleur peut avoir une version couronne 12h et/ou 15h
// ============================================================
export interface CrownImages {
  "12h"?: string;
  "15h"?: string;
}

// Couleur FR (Shopify) -> versions de couronne
export const CADRAN_IMAGES: Record<string, CrownImages> = {
  "Rose": { "12h": "/images/otto-rosso-pink.webp" },
  "Rouge": { "12h": "/images/otto-rosso-darkpink.webp" },
  "Cyan": { "15h": "/images/lan-ba-blue.webp" },
  "Vert pâle": { "12h": "/images/blaue-acht-mint.webp" },
  "Vert foncé": { "12h": "/images/green-eight.webp" },
  "Turquoise": { "15h": "/images/otg-roz-bezel-turquoise.webp" },
  "Noir": { "12h": "/images/ocho-negro-black.webp", "15h": "/images/ocho-black-crown-3.webp" },
  "Bleu marine": { "12h": "/images/orenji-hachi-navyblue.webp", "15h": "/images/lan-ba-darkblue.webp" },
  "Bleu ciel": { "12h": "/images/blaue-acht-lightblue.webp" },
  "Blanc": { "12h": "/images/huit-blanc-white.webp", "15h": "/images/huit-blanc-white--crown-3.webp" },
};

export function getCadranImages(color: string): CrownImages | null {
  return CADRAN_IMAGES[color] ?? null;
}

// ============================================================
// Images de BRACELET par COULEUR (page produit Bracelet)
// Pas de notion de couronne pour les bracelets
// ============================================================
export const BRACELET_IMAGES: Record<string, string> = {
  "Rose": "/images/Bracelet/otto-rosso-light-strap-pink.webp",
  "Rouge": "/images/Bracelet/otto-rosso-strap-darkpink.webp",
  "Cyan": "/images/Bracelet/lan-ba-strap-drakblue.webp",
  "Vert pâle": "/images/Bracelet/blaue-acht-strap-mint.webp",
  "Vert foncé": "/images/Bracelet/green-eight-strap.webp",
  "Turquoise": "/images/Bracelet/otg-roz-turquoise-strap.webp",
  "Noir": "/images/Bracelet/ocho-negro-strap-black.webp",
  "Bleu marine": "/images/Bracelet/orenji-hachi-strap-navyblue.webp",
  "Bleu ciel": "/images/Bracelet/lan-ba-blue-strap.webp",
  "Blanc": "/images/Bracelet/huit-blanc-strap-white.webp",
};

export function getBraceletImage(color: string): string | null {
  return BRACELET_IMAGES[color] ?? null;
}

// ============================================================
// Image pour le PANIER selon le type de produit + couleur
// ============================================================

export function getCartImage(productType: string, color: string): string | null {
  const t = productType.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // Nouveau modèle : Kit Complet
  if (t.includes("kit")) {
    return getKitImage(color);
  }
  if (t.includes("cadran")) {
    const c = getCadranImages(color);
    return c?.["12h"] ?? c?.["15h"] ?? null;
  }
  if (t.includes("bracelet")) {
    return getBraceletImage(color);
  }
  if (t.includes("set")) {
    for (const model of WATCH_MODELS) {
      const img = model.combos?.[color]?.[color];
      if (img) return img;
    }
    for (const model of WATCH_MODELS) {
      const inner = model.combos?.[color];
      if (inner) {
        const first = Object.values(inner)[0];
        if (first) return first;
      }
    }
    return null;
  }
  return null;
}
