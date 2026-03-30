# ghost-theme-sofcloud

Thème Ghost 5 dark custom pour [sofcloud.org](https://sofcloud.org).

## Stack

- **Ghost 5** (Alpine)
- **DM Sans** (texte) + **DM Mono** (mono/code)
- CSS custom via variables `:root` par page
- Vanilla JS — aucune dépendance externe

## Couleurs par page

| Page | Couleur |
|------|---------|
| Home | Vert `#34d399` |
| Expériences | Bleu `#60a5fa` |
| Compétences | Violet `#a78bfa` |
| Projets | Ambre `#fbbf24` |
| Veille | Orange `#fb923c` |
| À propos | Cyan `#22d3ee` |

## Fonctionnalités

- Thème entièrement sombre
- Couleur d'accent différente par page
- Widget statut infrastructure (Uptime Kuma via SQLite → JSON)
- Veille sécurité (flux RSS agrégés : CERT-FR, Zataz, FrenchBreaches, Undernews)
- Bouton retour en haut
- Consentement cookies RGPD — Google Tag Manager chargé conditionnellement
- Navigation responsive avec hover coloré par page
- Carte hero avec stats dynamiques

## Installation

```bash
# Générer le zip
bash build.sh

# Uploader via Ghost Admin
# Settings → Design → Change theme → Upload ZIP
```

## Configuration requise

Dans `partials/footer.hbs`, remplacer `GTM-XXXXXXX` par votre ID Google Tag Manager.

Dans `default.hbs`, faire de même pour la balise noscript GTM.

## Scripts associés

| Script | Rôle |
|--------|------|
| `fetch-rss.py` | Agrège les flux RSS sécurité → `security-feed.json` |
| `fetch-kuma.py` | Lit la DB Uptime Kuma → `kuma-status.json` |

Crons recommandés :
```
0 * * * *    python3 fetch-rss.py    # veille RSS toutes les heures
*/5 * * * *  python3 fetch-kuma.py   # statut infra toutes les 5 min
```

## Auteur

Soufiane H. — [sofcloud.org](https://sofcloud.org)
