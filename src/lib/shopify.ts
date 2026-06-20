export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "popstrap-10.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "a59b99696960a6d399cbaa64b0c8a2ee";

export interface ShopifyProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  productType: string;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  images: {
    edges: Array<{ node: { url: string; altText: string | null } }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        availableForSale: boolean;
        selectedOptions: Array<{ name: string; value: string }>;
      };
    }>;
  };
  options: Array<{ name: string; values: string[] }>;
}

export interface ShopifyProduct {
  node: ShopifyProductNode;
}

export const PRODUCT_FRAGMENT = `
  id
  title
  description
  handle
  productType
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 10) { edges { node { url altText } } }
  variants(first: 20) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        availableForSale
        selectedOptions { name value }
      }
    }
  }
  options { name values }
`;

export const STOREFRONT_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges { node { ${PRODUCT_FRAGMENT} } }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FRAGMENT} }
  }
`;

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    console.error("Shopify billing required");
    return null;
  }
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  if (data.errors) throw new Error(`Shopify error: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`);
  return data;
}

export async function fetchAllProducts(): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
  return data?.data?.products?.edges ?? [];
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProductNode | null> {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data?.data?.product ?? null;
}

/* ---------- Cart mutations ---------- */

const CART_QUERY = `query cart($id: ID!) { cart(id: $id) { id totalQuantity } }`;

const CART_CREATE = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

function isCartNotFoundError(userErrors: Array<{ field: string[] | null; message: string }>): boolean {
  return userErrors.some(
    (e) =>
      e.message.toLowerCase().includes("cart not found") ||
      e.message.toLowerCase().includes("does not exist"),
  );
}

export interface CartLineCreate {
  variantId: string;
  quantity: number;
}

export async function createShopifyCart(item: CartLineCreate) {
  const data = await storefrontApiRequest(CART_CREATE, {
    input: { lines: [{ quantity: item.quantity, merchandiseId: item.variantId }] },
  });
  const errors = data?.data?.cartCreate?.userErrors ?? [];
  if (errors.length) {
    console.error("Cart create failed:", errors);
    return null;
  }
  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) return null;
  const lineId = cart.lines.edges[0]?.node?.id;
  if (!lineId) return null;
  return { cartId: cart.id, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId };
}

export async function addLineToShopifyCart(cartId: string, item: CartLineCreate) {
  const data = await storefrontApiRequest(CART_LINES_ADD, {
    cartId,
    lines: [{ quantity: item.quantity, merchandiseId: item.variantId }],
  });
  const errors = data?.data?.cartLinesAdd?.userErrors ?? [];
  if (isCartNotFoundError(errors)) return { success: false, cartNotFound: true };
  if (errors.length) return { success: false };
  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges ?? [];
  const newLine = lines.find(
    (l: { node: { id: string; merchandise: { id: string } } }) =>
      l.node.merchandise.id === item.variantId,
  );
  return { success: true, lineId: newLine?.node?.id as string | undefined };
}

export async function updateShopifyCartLine(cartId: string, lineId: string, quantity: number) {
  const data = await storefrontApiRequest(CART_LINES_UPDATE, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  const errors = data?.data?.cartLinesUpdate?.userErrors ?? [];
  if (isCartNotFoundError(errors)) return { success: false, cartNotFound: true };
  if (errors.length) return { success: false };
  return { success: true };
}

export async function removeLineFromShopifyCart(cartId: string, lineId: string) {
  const data = await storefrontApiRequest(CART_LINES_REMOVE, { cartId, lineIds: [lineId] });
  const errors = data?.data?.cartLinesRemove?.userErrors ?? [];
  if (isCartNotFoundError(errors)) return { success: false, cartNotFound: true };
  if (errors.length) return { success: false };
  return { success: true };
}

export async function syncCartQuery(cartId: string) {
  return storefrontApiRequest(CART_QUERY, { id: cartId });
}

/* ---------- Color helpers ---------- */

export const COLOR_MAP: Record<string, string> = {
  Rose: "#f4b5c1",
  "Rose foncé": "#b8344f",
  "Rose corail": "#f08080",
  "Rose pâle": "#f4b5c1",
  Rouge: "#a02633",
  Cyan: "#7fb9d8",
  "Vert pâle": "#c8d99a",
  "Vert foncé": "#2d5a3d",
  Vert: "#3a9d52",
  Turquoise: "#22cfd1",
  Noir: "#1a1a1a",
  "Bleu marine": "#1e2a52",
  "Bleu nuit": "#1a2540",
  "Bleu ciel": "#a8c8e0",
  Blanc: "#f5f5f5",
  Jaune: "#f2d21b",
};

export function getColorHex(name: string): string {
  return COLOR_MAP[name] ?? "#cccccc";
}

export function formatPrice(amount: string | number, currencyCode = "EUR"): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}
