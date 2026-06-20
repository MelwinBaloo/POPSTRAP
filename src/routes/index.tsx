import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Palette, Wrench, ShieldCheck } from "lucide-react";
import { getColorHex } from "@/lib/shopify";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KitCard } from "@/components/KitCard";
import { KIT_COLORS } from "@/lib/kits";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "POPSTRAP — Cadrans & bracelets pour Swatch × Audemars Piguet" },
      {
        name: "description",
        content:
          "Personnalisez votre Swatch × AP avec nos cadrans et bracelets premium. 10 modèles disponibles, installation simple, livraison rapide.",
      },
      { property: "og:title", content: "POPSTRAP — Personnalisez votre Swatch × AP" },
      {
        property: "og:description",
        content:
          "Cadrans et bracelets premium pour Swatch × Audemars Piguet. 10 modèles au choix.",
      },
    ],
  }),
  component: Index,
});

const COLORS = KIT_COLORS.map((k) => k.name);

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-2 md:items-center md:gap-12 md:py-28">
          <div className="space-y-5 md:space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium text-muted-foreground sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Conçu pour la Swatch × Audemars Piguet
            </span>
            <h1 className="text-balance text-[2rem] font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-6xl">
              Votre Swatch × AP, à votre image.
            </h1>
            <p className="max-w-md text-balance text-[15px] text-muted-foreground sm:text-base md:text-lg">
              Cadrans et bracelets en silicone premium, déclinés en {COLORS.length} coloris.
              Installation simple, ajustement parfait.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 md:gap-3 md:pt-2">
              <Button asChild size="lg" className="h-12 rounded-full px-5 text-sm font-semibold md:px-6">
                <a href="#produits">
                  Découvrir les produits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg" className="h-12 rounded-full px-4 text-sm md:px-6">
                <a href="#compatibilite">Voir la compatibilité</a>
              </Button>
            </div>
          </div>

          {/* Visual: stack of color swatches */}
          <div className="relative">
            <div className="rounded-3xl border border-border bg-surface p-5 shadow-soft sm:p-8 md:p-12">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                {COLORS.length} coloris disponibles
              </p>
              <div className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-5 sm:gap-4 md:gap-5">
                {COLORS.map((c) => (
                  <div key={c} className="flex flex-col items-center gap-2">
                    <div
                      className="h-11 w-11 rounded-full border border-border shadow-sm sm:h-12 sm:w-12 md:h-14 md:w-14"
                      style={{ backgroundColor: getColorHex(c) }}
                    />
                    <span className="text-center text-[10px] leading-tight text-muted-foreground">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 sm:px-6 sm:gap-8 md:grid-cols-3 md:py-16">
          {[
            { icon: Palette, title: `${COLORS.length} coloris`, text: "Pastels doux, tons profonds — assortissez ou contrastez." },
            { icon: Wrench, title: "Installation simple", text: "Aucun outil nécessaire, montage en moins d'une minute." },
            { icon: ShieldCheck, title: "Ajustement parfait", text: "Conçu sur-mesure pour la Swatch × Audemars Piguet." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODÈLES */}
      <section id="modeles" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20">
          <div className="mb-8 md:mb-10">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground sm:text-xs">Nos coloris</p>
            <h2 className="mt-2 text-[1.6rem] font-semibold tracking-tight sm:text-3xl md:text-4xl">
              8 éditions, une pour chaque style.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              Chaque kit comprend la coque et le bracelet assortis. Cliquez sur un coloris pour le découvrir.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {KIT_COLORS.map((kit) => (
              <KitCard key={kit.slug} kit={kit} />
            ))}
          </div>
        </div>
      </section>



      {/* COMPATIBILITE */}
      <section id="compatibilite" className="scroll-mt-20 border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20">
          <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground sm:text-xs">Compatibilité</p>
              <h2 className="mt-2 text-[1.6rem] font-semibold tracking-tight sm:text-3xl md:text-4xl">
                Uniquement pour la Swatch × Audemars Piguet.
              </h2>
              <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                Nos cadrans et bracelets sont spécifiquement conçus pour s'adapter à la
                collaboration Swatch × Audemars Piguet. Aucun autre modèle de montre n'est compatible.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Ajustement précis sur le boîtier",
                  "Sangles en silicone souple et résistant",
                  "Boucle ardillon en acier inoxydable",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-background p-6 text-center sm:p-8">
              <p className="text-sm text-muted-foreground">Compatible avec</p>
              <p className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">Swatch × Audemars Piguet</p>
              <p className="mt-1 text-sm text-muted-foreground">Toutes éditions</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 md:py-20">
          <h2 className="text-center text-[1.6rem] font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Questions fréquentes
          </h2>
          <div className="mt-8 divide-y divide-border md:mt-10">
            {[
              {
                q: "L'installation est-elle complexe ?",
                a: "Non. Aucun outil n'est nécessaire — le cadran se clipse et le bracelet se fixe en quelques secondes.",
              },
              {
                q: "Mes cadrans et bracelets sont-ils interchangeables ?",
                a: "Oui, vous pouvez combiner n'importe quel cadran avec n'importe quel bracelet.",
              },
              {
                q: "Quels sont les délais de livraison ?",
                a: "Les commandes sont préparées sous 24-48h. Comptez 10 à 20 jours ouvrés pour la livraison.",
              },
              {
                q: "Puis-je retourner mon achat ?",
                a: "Oui, vous disposez de 14 jours pour retourner un produit non utilisé.",
              },
            ].map((item) => (
              <details key={item.q} className="group py-4 sm:py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium sm:text-base">
                  <span>{item.q}</span>
                  <span className="text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
