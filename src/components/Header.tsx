import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:h-16 sm:px-6">
        <Link to="/" className="group flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-foreground transition-transform group-hover:scale-110" />
          <span className="text-lg font-semibold tracking-tight">POPSTRAP</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            hash="produits"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Produits
          </Link>
          <Link
            to="/"
            hash="compatibilite"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Compatibilité
          </Link>
          <Link
            to="/"
            hash="faq"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
        </nav>

        <CartDrawer />
      </div>
    </header>
  );
}
