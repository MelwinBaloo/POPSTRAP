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
    image: "/images/Otto_Rosso_Pink_Pink.png",
    allowedColors: ["Rose", "Rose foncé", "Blanc", "Noir"],
    combos: {
      Rose: {
        Rose: "/images/Otto_Rosso_Pink_Pink.png",
        "Rose foncé": "/images/Otto_Rosso_Pink_Dark_Pink.png",
        Blanc: "/images/Otto_Rosso_Pink_White.png",
        Noir: "/images/Otto_Rosso_Pink_Black.png",
      },
      "Rose foncé": {
        "Rose foncé": "/images/Otto_Rosso_Dark_Pink_Dark_Pink.png",
        Blanc: "/images/Otto_Rosso_Dark_Pink_White.png",
        Noir: "/images/Otto_Rosso_Dark_Pink_Black.png",
      },
      Blanc: {
        Rose: "/images/Otto_Rosso_White_Pink.png",
        "Rose foncé": "/images/Otto_Rosso_White_Dark_Pink.png",
        Blanc: "/images/Otto_Rosso_White_White.png",
        Noir: "/images/Otto_Rosso_White_Black.png",
      },
      Noir: {
        Rose: "/images/Otto_Rosso_Black_Pink.png",
        "Rose foncé": "/images/Otto_Rosso_Black_Dark_Pink.png",
        Blanc: "/images/Otto_Rosso_Black_White.png",
        Noir: "/images/Otto_Rosso_Black_Black.png",
      },
    },
  },
  {
    slug: "lan-ba",
    name: "Lán Ba",
    color: "Cyan",
    tagline: "Huit en mandarin",
    image: "/images/Lanbablueblue.png",
    allowedColors: ["Cyan", "Bleu marine", "Blanc", "Noir"],
    combos: {
      Cyan: {
        Cyan: "/images/Lanbablueblue.png",
        "Bleu marine": "/images/Lanbabluebluedark.png",
        Blanc: "/images/Lanbabluebluewhite.png",
        Noir: "/images/Lanbablueblueblack.png",
      },
      "Bleu marine": {
        Cyan: "/images/Lanbabluedarkblue.png",
        "Bleu marine": "/images/Lanbabluedarkbluedark.png",
        Blanc: "/images/Lanbabluedarkwhite.png",
        Noir: "/images/Lanbabluedarkblueblack.png",
      },
      Blanc: {
        Cyan: "/images/Lanbawhiteblue.png",
        "Bleu marine": "/images/Lanbawhitedarkblue.png",
        Blanc: "/images/Lanbawhitewhite.png",
        Noir: "/images/Lanbawhiteblack.png",
      },
      Noir: {
        Cyan: "/images/Lanbablackblue.png",
        "Bleu marine": "/images/Lan_Ba_Black_Lan_Ba_Dark_Blue.png",
        Noir: "/images/Lan_Ba_Black_Black.png",
      },
    },
  },
  {
    slug: "green-eight",
    name: "Green Eight",
    color: "Vert foncé",
    tagline: "Huit en anglais",
    image: "/images/Green_Eight_Green_Green.png",
    allowedColors: ["Noir", "Vert foncé", "Blanc"],
    combos: {
      Noir: {
        Noir: "/images/Green_Eight_Black_Black.png",
        "Vert foncé": "/images/Green_Eight_Black_Green.png",
        Blanc: "/images/Green_Eight_Black_White.png",
      },
      "Vert foncé": {
        Noir: "/images/Green_Eight_Green_Black.png",
        "Vert foncé": "/images/Green_Eight_Green_Green.png",
        Blanc: "/images/Green_Eight_Green_White.png",
      },
      Blanc: {
        Noir: "/images/Green_Eight_White_Black.png",
        "Vert foncé": "/images/Green_Eight_White_Green.png",
        Blanc: "/images/Green_Eight_White_White.png",
      },
    },
  },
  {
    slug: "ocho-negro",
    name: "Ocho Negro",
    color: "Noir",
    tagline: "Huit en espagnol",
    image: "/images/Ocho_Negro_Black_black.png",
    allowedColors: ["Noir", "Blanc", "Bleu marine", "Bleu ciel", "Turquoise", "Vert", "Vert pâle", "Rose", "Rose foncé", "Rouge"],
    combos: {
      Noir: {
        Noir: "/images/Ocho_Negro_Black_black.png",
        Blanc: "/images/Ocho_Negro_Black_white.png",
        "Bleu marine": "/images/Ocho_Negro_Black_blue.png",
        "Bleu ciel": "/images/Ocho_Negro_Black_bluelight.png",
        Vert: "/images/Ocho_Negro_Black_green.png",
        "Vert pâle": "/images/Ocho_Negro_Black_mint.png",
        Rose: "/images/Ocho_Negro_Black_rose.png",
        Rouge: "/images/Ocho_Negro_Black_RED.png",
      },
      Blanc: {
        Noir: "/images/Ocho_Negro_White_Black.png",
        Blanc: "/images/Ocho_Negro_White_White.png",
        "Bleu marine": "/images/Ocho_Negro_White_Navy_Blue.png",
        "Bleu ciel": "/images/Ocho_Negro_White_Light_Blue.png",
        Turquoise: "/images/Ocho_Negro_White_Turquoise.png",
        Vert: "/images/Ocho_Negro_White_Green.png",
        "Vert pâle": "/images/Ocho_Negro_White_Mint.png",
        Rose: "/images/Ocho_Negro_White_Pink.png",
        "Rose foncé": "/images/Ocho_Negro_White_Dark_Pink.png",
      },
      "Bleu marine": {
        Noir: "/images/Ocho_Negro_Navy_Blue_Black.png",
        Blanc: "/images/Ocho_Negro_Navy_Blue_white.png",
        "Bleu marine": "/images/Ocho_Negro_Navy_Blue_Navy_Blue.png",
      },
      "Bleu ciel": {
        Noir: "/images/Ocho_Negro_Light_Blue_Black.png",
        Blanc: "/images/Ocho_Negro_Light_Blue_White.png",
        "Bleu ciel": "/images/Ocho_Negro_Light_Blue_Light_Blue.png",
      },
      Vert: {
        Noir: "/images/Ocho_Negro_Green_Black.png",
        Blanc: "/images/Ocho_Negro_Green_White.png",
        Vert: "/images/Ocho_Negro_Green_Green.png",
      },
      "Vert pâle": {
        Noir: "/images/Ocho_Negro_Mint_Black.png",
        Blanc: "/images/Ocho_Negro_Mint_White.png",
        "Vert pâle": "/images/Ocho_Negro_Mint_Mint.png",
      },
      Rose: {
        Noir: "/images/Ocho_Negro_Pink_Black.png",
        Blanc: "/images/Ocho_Negro_Pink_White.png",
        Rose: "/images/Ocho_Negro_Pink_Pink.png",
      },
      "Rose foncé": {
        Noir: "/images/Ocho_Negro_Dark_Pink_Black.png",
        Blanc: "/images/Ocho_Negro_Dark_Pink_White.png",
        "Rose foncé": "/images/Ocho_Negro_Dark_Pink_Dark_Pink.png",
      },
    },
  },
  {
    slug: "otg-roz",
    name: "OTG Roz",
    color: "Turquoise",
    tagline: "Huit en hébreu",
    image: "/images/OTG_Roz_Turquoise_Turquoise.png",
    allowedColors: ["Turquoise", "Rose", "Blanc", "Noir", "Jaune"],
    combos: {
      Turquoise: {
        Turquoise: "/images/OTG_Roz_Turquoise_Turquoise.png",
        Rose: "/images/OTG_Roz_Turquoise_OTG_Pink.png",
        Blanc: "/images/OTG_Roz_Turquoise_White.png",
        Noir: "/images/OTG_Roz_Turquoise_Black.png",
        Jaune: "/images/OTG_Roz_Turquoise_Yellow.png",
      },
      Rose: {
        Turquoise: "/images/OTG_Roz_OTG_Pink_Turquoise.png",
        Rose: "/images/OTG_Roz_OTG_Pink_OTG_Pink.png",
        Blanc: "/images/OTG_Roz_OTG_Pink_White.png",
        Noir: "/images/OTG_Roz_OTG_Pink_Black.png",
        Jaune: "/images/OTG_Roz_OTG_Pink_Yellow.png",
      },
      Blanc: {
        Turquoise: "/images/OTG_Roz_White_Turquoise.png",
        Rose: "/images/OTG_Roz_White_OTG_Pink.png",
        Blanc: "/images/OTG_Roz_White_White.png",
        Noir: "/images/OTG_Roz_White_Black.png",
        Jaune: "/images/OTG_Roz_White_Yellow.png",
      },
      Noir: {
        Turquoise: "/images/OTG_Roz_Black_Turquoise.png",
        Rose: "/images/OTG_Roz_Black_OTG_Pink.png",
        Blanc: "/images/OTG_Roz_Black_White.png",
        Noir: "/images/OTG_Roz_Black_black.png",
        Jaune: "/images/OTG_Roz_Black_yellow.png",
      },
      Jaune: {
        Turquoise: "/images/OTG_Roz_Yellow_Turquoise.png",
        Rose: "/images/OTG_Roz_Yellow_OTG_Pink.png",
        Blanc: "/images/OTG_Roz_Yellow_White.png",
        Noir: "/images/OTG_Roz_Yellow_black.png",
        Jaune: "/images/OTG_Roz_Yellow_Yellow_2.png",
      },
    },
  },
  {
    slug: "blaue-acht",
    name: "Blaue Acht",
    color: "Bleu ciel",
    tagline: "Huit en allemand",
    image: "/images/Blaue_Acht_Light_Blue_Light_Blue.png",
    allowedColors: ["Bleu ciel", "Vert pâle", "Blanc", "Noir"],
    combos: {
      "Bleu ciel": {
        "Bleu ciel": "/images/Blaue_Acht_Light_Blue_Light_Blue.png",
        "Vert pâle": "/images/Blaue_Acht_Light_Blue_Mint.png",
        Blanc: "/images/Blaue_Acht_Light_Blue_White.png",
        Noir: "/images/Blaue_Acht_Light_Blue_Black.png",
      },
      "Vert pâle": {
        "Vert pâle": "/images/Blaue_Acht_Mint_Mint.png",
        Blanc: "/images/Blaue_Acht_Mint_White.png",
        Noir: "/images/Blaue_Acht_Mint_black.png",
      },
      Blanc: {
        "Bleu ciel": "/images/Blaue_Acht_White_Light_Blue.png",
        "Vert pâle": "/images/Blaue_Acht_White_Mint.png",
        Blanc: "/images/Blaue_Acht_White_White (1).png",
        Noir: "/images/Blaue_Acht_White_black.png",
      },
      Noir: {
        "Bleu ciel": "/images/Blaue_Acht_Black_Light_Blue.png",
        "Vert pâle": "/images/Blaue_Acht_Black_Mint.png",
        Blanc: "/images/Blaue_Acht_Black_white.png",
        Noir: "/images/Blaue_Acht_Black_Black.png",
      },
    },
  },
  {
    slug: "orenji-hachi",
    name: "Orenji Hachi",
    color: "Orange",
    tagline: "Huit en japonais",
    allowedColors: ["Orange"],
  },
  {
    slug: "huit-blanc",
    name: "Huit Blanc",
    color: "Blanc",
    tagline: "Huit en français",
    allowedColors: ["Blanc"],
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
