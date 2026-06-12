import { useState, useEffect, useRef } from "react";

interface SmoothImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Affiche une image sans "flash" lors du changement de src.
 * L'ancienne image reste visible jusqu'à ce que la nouvelle soit
 * complètement chargée, puis un fondu doux est appliqué.
 */
export function SmoothImage({ src, alt, className = "" }: SmoothImageProps) {
  // image actuellement affichée (ne change qu'une fois la nouvelle chargée)
  const [displayed, setDisplayed] = useState(src);
  const [loading, setLoading] = useState(false);
  const lastSrc = useRef(src);

  useEffect(() => {
    if (src === lastSrc.current) return;
    lastSrc.current = src;
    setLoading(true);

    const img = new Image();
    img.src = src;
    const done = () => {
      setDisplayed(src);
      setLoading(false);
    };
    if (img.complete) {
      done();
    } else {
      img.onload = done;
      img.onerror = done; // en cas d'erreur, on bascule quand même
    }
  }, [src]);

  return (
    <img
      src={displayed}
      alt={alt}
      decoding="async"
      fetchPriority="high"
      className={`${className} transition-opacity duration-200 ${loading ? "opacity-70" : "opacity-100"}`}
    />
  );
}
