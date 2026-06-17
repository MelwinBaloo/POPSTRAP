import { useEffect, useState } from "react";
import { Loader2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice, getColorHex } from "@/lib/shopify";
import { shopifyImage } from "@/lib/shopify-image";
import { getCartImage } from "@/lib/models";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } =
    useCartStore();

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "EUR";

  useEffect(() => {
    if (open) syncCart();
  }, [open, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-surface"
          aria-label="Panier"
        >
          <ShoppingBag className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Votre panier</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Votre panier est vide</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-4">
                {items.map((item) => {
                  const color = item.selectedOptions.find((o) => o.name === "Couleur")?.value;
                  const productType = item.product.node.productType ?? "";
                  // Notre image (cadran/bracelet/set) selon le type + couleur
                  const customImg = color ? getCartImage(productType, color) : null;
                  const shopifyImg = item.product.node.images.edges[0]?.node;
                  return (
                    <li
                      key={item.variantId}
                      className="flex gap-3 rounded-xl border border-border bg-card p-3"
                    >
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-white">
                        {customImg ? (
                          <img
                            src={customImg}
                            width={80}
                            height={80}
                            loading="lazy"
                            decoding="async"
                            alt={item.product.node.title}
                            className="h-full w-full object-contain"
                          />
                        ) : shopifyImg ? (
                          <img
                            src={shopifyImage(shopifyImg.url, 160, 160)}
                            width={80}
                            height={80}
                            loading="lazy"
                            decoding="async"
                            alt={shopifyImg.altText ?? item.product.node.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          color && (
                            <div
                              className="h-full w-full"
                              style={{ backgroundColor: getColorHex(color) }}
                            />
                          )
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-semibold leading-tight">
                              {item.product.node.title}
                            </h4>
                            {color && (
                              <p className="mt-0.5 text-xs text-muted-foreground">{color}</p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="text-muted-foreground hover:text-destructive"
                            aria-label="Retirer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center rounded-full border border-border">
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="flex h-7 w-7 items-center justify-center hover:bg-surface"
                              aria-label="Diminuer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="flex h-7 w-7 items-center justify-center hover:bg-surface"
                              aria-label="Augmenter"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm font-semibold">
                            {formatPrice(parseFloat(item.price.amount) * item.quantity, item.price.currencyCode)}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sous-total</span>
                <span className="text-xl font-semibold">{formatPrice(totalPrice, currency)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Livraison et taxes calculées au paiement.
              </p>
              <Button
                onClick={handleCheckout}
                disabled={isLoading || isSyncing}
                size="lg"
                className="mt-4 h-12 w-full rounded-full text-sm font-semibold"
              >
                {isLoading || isSyncing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Passer au paiement"
                )}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
