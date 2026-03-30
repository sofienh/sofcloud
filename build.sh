#!/bin/bash
# build.sh — Build Ghost theme zip
# Usage: bash build.sh
# Génère: ghost-theme-sofcloud.zip (dans le dossier parent ou courant)

set -e
THEME_DIR="$(cd "$(dirname "$0")" && pwd)"
OUTPUT="$THEME_DIR/ghost-theme-sofcloud.zip"

echo "📦 Build thème Ghost sofcloud..."

cd "$THEME_DIR"

# Nettoyer l'ancien zip s'il existe
rm -f "$OUTPUT"

# Créer le zip (exclure les fichiers de build et système)
zip -r "$OUTPUT" . \
  --exclude="*.sh" \
  --exclude="*.zip" \
  --exclude=".git/*" \
  --exclude=".DS_Store" \
  --exclude="node_modules/*" \
  --exclude="*.log"

echo "✅ Thème généré : $OUTPUT"
echo ""
echo "📋 Upload via Ghost Admin :"
echo "   http://<ghost-host>:2368/ghost → Design → Change theme → Upload theme"
echo "   Ou : Settings → Design → Upload ZIP"
