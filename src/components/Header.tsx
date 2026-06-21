import { Link } from "@tanstack/react-router";
import { User } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:h-16 sm:px-6">
        <Link to="/" className="group flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-foreground transition-transform group-hover:scale-110" />
          <span className="text-lg font-semibold tracking-tight">ROYALPOPS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            hash="modeles"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Coloris
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

        <div className="flex items-center gap-2">
          <a
            href="https://checkout.royalpops.shop/account"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-surface"
            aria-label="Mon compte"
            title="Mon compte"
          >
            <User className="h-4 w-4" />
          </a>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
