export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
              <span className="text-lg font-semibold tracking-tight">ROYALPOPS</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Kits complets (coque + bracelet) en silicone premium pour la Swatch × Audemars Piguet.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Boutique</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="/#modeles" className="hover:text-foreground">Nos coloris</a></li>
              <li><a href="/#modeles" className="hover:text-foreground">Kit complet</a></li>
              <li><a href="/#compatibilite" className="hover:text-foreground">Compatibilité</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Aide</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="/#compatibilite" className="hover:text-foreground">Compatibilité</a></li>
              <li><a href="/#faq" className="hover:text-foreground">FAQ</a></li>
              <li><a href="mailto:contact@royalpops.shop" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} ROYALPOPS. Tous droits réservés.</p>
          <p>Produit non affilié à Swatch ni Audemars Piguet.</p>
        </div>
      </div>
    </footer>
  );
}
