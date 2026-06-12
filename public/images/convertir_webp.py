#!/usr/bin/env python3
# ============================================================
# Script de conversion PNG -> WebP pour POPSTRAP
# ============================================================
# COMMENT L'UTILISER :
# 1. Place ce fichier dans ton dossier POPSTRAP\public\images\
# 2. Ouvre un terminal dans ce dossier
# 3. Lance : python convertir_webp.py
#
# Le script convertit tous les .png en .webp (beaucoup plus légers)
# Les .png originaux sont conservés (rien n'est supprimé)
# ============================================================

import os
import sys

try:
    from PIL import Image
except ImportError:
    print("Pillow n'est pas installé. Installation en cours...")
    os.system(f'"{sys.executable}" -m pip install Pillow')
    from PIL import Image

# Configuration
MAX_SIZE = 1200        # taille max en pixels (largeur ou hauteur)
QUALITY = 85           # qualité WebP (85 = excellent compromis)
DOSSIER = "."          # dossier courant

def convertir():
    fichiers = [f for f in os.listdir(DOSSIER) if f.lower().endswith(".png")]
    if not fichiers:
        print("Aucun fichier PNG trouvé dans ce dossier.")
        print(f"Dossier actuel : {os.path.abspath(DOSSIER)}")
        return

    print(f"{len(fichiers)} fichiers PNG trouvés. Conversion en WebP...\n")
    total_avant = 0
    total_apres = 0
    convertis = 0

    for nom in fichiers:
        chemin_png = os.path.join(DOSSIER, nom)
        nom_webp = os.path.splitext(nom)[0] + ".webp"
        chemin_webp = os.path.join(DOSSIER, nom_webp)

        try:
            img = Image.open(chemin_png)
            taille_avant = os.path.getsize(chemin_png)

            # Redimensionner si trop grand (garde les proportions)
            img.thumbnail((MAX_SIZE, MAX_SIZE), Image.LANCZOS)

            # Sauvegarder en WebP
            img.save(chemin_webp, "WEBP", quality=QUALITY, method=6)
            taille_apres = os.path.getsize(chemin_webp)

            total_avant += taille_avant
            total_apres += taille_apres
            convertis += 1

            reduction = 100 * (1 - taille_apres / taille_avant)
            print(f"  {nom}  ->  {nom_webp}  "
                  f"({taille_avant/1024:.0f} Ko -> {taille_apres/1024:.0f} Ko, -{reduction:.0f}%)")
        except Exception as e:
            print(f"  ERREUR sur {nom}: {e}")

    print(f"\n{'='*50}")
    print(f"Terminé ! {convertis} images converties.")
    if total_avant > 0:
        print(f"Poids total : {total_avant/1024/1024:.1f} Mo  ->  {total_apres/1024/1024:.1f} Mo")
        print(f"Réduction globale : -{100*(1-total_apres/total_avant):.0f}%")
    print(f"{'='*50}")
    print("\nLes fichiers .webp sont créés à côté des .png.")
    print("Les .png originaux sont conservés (tu peux les garder ou les supprimer).")

if __name__ == "__main__":
    convertir()
