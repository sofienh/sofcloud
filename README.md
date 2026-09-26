# ghost-theme-sofcloud

Thème Ghost sombre, écrit sur mesure pour [sofcloud.org](https://sofcloud.org).

## Stack

- **Ghost 6** (compatible `>=5.0.0 <7.0.0`), gabarits Handlebars
- **DM Sans** (texte) + **DM Mono** (code, étiquettes), auto-hébergées dans `assets/fonts/`
- CSS vanilla dans `assets/css/style.css`, variables `:root` surchargées par page
- JavaScript vanilla, sans framework. Seules dépendances externes : le widget SofBot (`flowise-embed`, jsDelivr) et Google Tag Manager, chargé uniquement après consentement

## Couleurs par page

| Page | Couleur |
|------|---------|
| Accueil, articles | Vert `#34d399` |
| Expériences | Bleu `#60a5fa` |
| Compétences | Violet `#a78bfa` |
| Projets | Ambre `#fbbf24` |
| Veille | Orange `#fb923c` |
| À propos | Cyan `#22d3ee` |
| Lab Notes | Rose `#fb7185` |

## Fonctionnalités

- **Pages dédiées** : `page-<slug>.hbs` (à propos, compétences, expériences, projets, veille…), choisi automatiquement par Ghost d'après l'adresse de la page
- **Statut de l'infrastructure** sur l'accueil : `kuma-status.json` (généré depuis Uptime Kuma), rechargé sans cache
- **Veille sécurité** : flux RSS de 6 sources (LeMondeInformatique, IT-Connect, Zataz, CERT-FR, Undernews, Korben), filtrables par source. Les contenus externes sont échappés (`esc()`) et les liens validés (`safeUrl()`)
- **Lab Notes** : route `/lab-notes/` (gabarit `tag-lab-notes.hbs`, 16 par page)
  - titre `Lab Notes #NN — Sujet` affiché en deux lignes (numéro au-dessus), sur l'article et les cartes
  - mise en page aérée réservée aux articles tagués `lab-notes` (colonne centrée de 820 px)
  - blocs de lecture pour non-spécialistes, à utiliser dans le contenu HTML des articles :

    ```html
    <div class="ln-bref"><span class="ln-label">En bref</span><p>…</p></div>
    <dl class="ln-termes"><dt>Terme</dt><dd>Définition</dd></dl>
    <div class="ln-note">Aparté ou mise à jour</div>
    <div class="ln-retenir"><span class="ln-label">À retenir</span><ul><li>…</li></ul></div>
    ```
- **SofBot** : chatbot chargé en différé (premier clic ou touche, sinon après 4 s), couleur selon la page
- **Consentement RGPD** : aucun script Google ni cookie avant un clic sur « Accepter » ; « Refuser » révoque le consentement et supprime les cookies `_ga*`
- Temps de lecture en français, bouton retour en haut, navigation responsive

## Déploiement

Le thème est déployé en copiant les fichiers modifiés dans le conteneur Ghost :

```bash
bash build.sh                                   # génère aussi ghost-theme-sofcloud.zip
docker cp <fichier> ghost:/var/lib/ghost/content/themes/ghost-theme-sofcloud/<fichier>
docker restart ghost
```

Le zip peut aussi être importé depuis Ghost Admin : Réglages → Design → Change theme → Upload.

## Configuration

- **Google Tag Manager** : l'identifiant (`GTM-…`) est dans la fonction `sofLoadAnalytics()` de `partials/footer.hbs`. Ne pas remettre GTM dans l'injection de code de Ghost : il se chargerait avant le consentement.
- **SofBot** : `assets/js/sofbot.js` (identifiant du chatflow, hôte de l'API, couleurs). La version de `flowise-embed` est figée dans l'URL d'import ; pour en changer, modifier `@3.1.6`.
- **Route Lab Notes** : `content/settings/routes.yaml` de Ghost (`filter: tag:lab-notes`, `template: tag-lab-notes`, `limit: 16`).

## Chatbot IA — SofBot

Widget chatbot intégré via [Flowise](https://flowiseai.com) :

- **LLM** : `openai/gpt-oss-120b` via l'API Groq (Llama 3.3 70B jusqu'en avril 2026)
- **RAG** : base vectorielle Faiss + embeddings HuggingFace (`paraphrase-multilingual-MiniLM-L12-v2`)
- **Sources** : pages du portfolio, récupérées avec Cheerio
- **Hébergement** : conteneur Docker `flowise` (image construite localement), exposé sur `bot.sofcloud.org`

## Scripts associés

Hors du thème, dans `/stockage/scripts/` sur le serveur :

| Script | Rôle | Cron |
|--------|------|------|
| `fetch-rss.py` | Agrège les flux RSS → `content/files/security-feed.json` | `0 6,18 * * *` |
| `fetch-kuma.py` | Lit la base d'Uptime Kuma → `content/files/kuma-status.json` | `*/5 * * * *` |

La veille n'est collectée que deux fois par jour : depuis l'adresse d'un centre de données, des requêtes trop fréquentes déclenchent les protections anti-robots des sites sources.

## Auteur

Soufiane H. — [sofcloud.org](https://sofcloud.org)
