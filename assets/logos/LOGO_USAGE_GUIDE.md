# Guide d'utilisation des logos Forfeo

## Vue d'ensemble

Ce dossier contient tous les fichiers de logo nécessaires pour l'identité visuelle de Forfeo. Le logo principal représente une boîte cadeau entourée d'un réseau de connexions, symbolisant la générosité collective et l'impact communautaire.

## Fichiers disponibles

### Logos principaux

#### 1. **forfeo_logo_horizontal.png** (Format paysage)
- **Usage** : Logo principal pour le header du site, signatures d'emails, documents
- **Dimensions** : Format horizontal avec icône à gauche et texte "FORFEO" à droite
- **Couleurs** : Cyan/turquoise (#22d3ee) et or (#fbbf24)
- **Fond** : Transparent
- **Quand l'utiliser** : Sur fonds clairs ou blancs, dans le header du site, sur les documents officiels

#### 2. **forfeo_logo_vertical.png** (Format carré)
- **Usage** : Réseaux sociaux, avatars, applications mobiles
- **Dimensions** : Format carré avec texte "FORFEO" sous l'icône
- **Couleurs** : Cyan/turquoise et or
- **Fond** : Transparent
- **Quand l'utiliser** : Photos de profil, posts Instagram, applications

#### 3. **forfeo_logo_white_version.png** (Version blanche)
- **Usage** : Logo pour fonds sombres (notamment le fond bleu marine du site)
- **Dimensions** : Format horizontal
- **Couleurs** : Blanc pur (#ffffff)
- **Fond** : Transparent
- **Quand l'utiliser** : Sur le fond bleu marine du site, sur des photos sombres, en overlay sur vidéos

#### 4. **forfeo_logo_icon_only.png** (Icône seule)
- **Usage** : Favicon, icône d'application, watermark
- **Dimensions** : Format carré, icône uniquement sans texte
- **Couleurs** : Cyan/turquoise et or
- **Fond** : Transparent
- **Quand l'utiliser** : Petits formats, favicon, icône d'app, watermark discret

### Favicons

#### 5. **favicon.ico** (Multi-résolution)
- **Usage** : Favicon standard pour navigateurs
- **Formats inclus** : 16x16, 32x32, 48x48, 64x64, 128x128, 256x256 pixels
- **Intégration** : `<link rel="icon" type="image/x-icon" href="/assets/logos/favicon.ico">`

#### 6. **favicon-192x192.png**
- **Usage** : Favicon haute résolution pour navigateurs modernes
- **Dimensions** : 192x192 pixels
- **Intégration** : `<link rel="icon" type="image/png" sizes="192x192" href="/assets/logos/favicon-192x192.png">`

#### 7. **favicon-256x256.png**
- **Usage** : Favicon très haute résolution
- **Dimensions** : 256x256 pixels
- **Intégration** : `<link rel="icon" type="image/png" sizes="256x256" href="/assets/logos/favicon-256x256.png">`

#### 8. **apple-touch-icon.png**
- **Usage** : Icône pour appareils Apple (iPhone, iPad)
- **Dimensions** : 180x180 pixels
- **Intégration** : `<link rel="apple-touch-icon" href="/assets/logos/apple-touch-icon.png">`

## Palette de couleurs

### Couleurs principales du logo

| Couleur | Code HEX | Usage |
|---------|----------|-------|
| Cyan/Turquoise | `#22d3ee` | Boîte cadeau, lignes de réseau cyan |
| Or/Jaune | `#fbbf24` | Ruban du cadeau, nœuds du réseau or, texte FORFEO |
| Blanc | `#ffffff` | Version monochrome pour fonds sombres |

### Couleurs du site (pour référence)

| Couleur | Code HEX | Usage sur le site |
|---------|----------|-------------------|
| Bleu marine foncé | `#0f172a` | Fond principal du site |
| Bleu ardoise | `#1e293b` | Fond secondaire |
| Cyan | `#06b6d4` | Accents, liens |
| Turquoise | `#22d3ee` | Titres, éléments importants |
| Or | `#fbbf24` | Accents secondaires, CTA |
| Blanc | `#ffffff` | Texte principal |

## Règles d'utilisation

### Espace de sécurité

Maintenez toujours un espace vide autour du logo équivalent à la hauteur de la lettre "F" dans "FORFEO". Cet espace garantit que le logo respire et reste lisible.

### Taille minimale

**Logo horizontal** : Ne jamais afficher en dessous de 120px de largeur  
**Logo vertical** : Ne jamais afficher en dessous de 80px de largeur  
**Icône seule** : Ne jamais afficher en dessous de 24px de largeur

### Fonds recommandés

**Logo couleur (cyan/or)** :
- ✅ Fonds blancs ou très clairs
- ✅ Fonds gris clair (#f1f5f9, #e2e8f0)
- ❌ Fonds sombres (utiliser la version blanche)
- ❌ Fonds colorés qui entrent en conflit avec le cyan ou l'or

**Logo blanc** :
- ✅ Fond bleu marine du site (#0f172a)
- ✅ Fonds sombres (noir, gris foncé)
- ✅ Photos sombres, vidéos
- ❌ Fonds clairs (utiliser la version couleur)

### À ne pas faire

❌ Ne pas modifier les couleurs du logo  
❌ Ne pas déformer ou étirer le logo  
❌ Ne pas ajouter d'effets (ombres, contours, 3D)  
❌ Ne pas séparer l'icône et le texte dans les versions horizontale/verticale  
❌ Ne pas placer le logo sur des fonds qui réduisent sa lisibilité  
❌ Ne pas recréer ou redessiner le logo  
❌ Ne pas utiliser d'anciennes versions du logo

## Intégration dans le site web

### Dans le HTML

```html
<!-- Header avec logo horizontal sur fond sombre -->
<header style="background-color: #0f172a;">
  <img src="/assets/logos/forfeo_logo_white_version.png" 
       alt="Forfeo" 
       class="forfeo-logo" />
</header>

<!-- Header avec logo horizontal sur fond clair -->
<header style="background-color: #ffffff;">
  <img src="/assets/logos/forfeo_logo_horizontal.png" 
       alt="Forfeo" 
       class="forfeo-logo" />
</header>
```

### Dans le CSS

```css
.forfeo-logo {
  height: 48px;
  width: auto;
  display: block;
}

@media (max-width: 768px) {
  .forfeo-logo {
    height: 36px;
  }
}
```

### Dans React

```jsx
// Composant Header
import logoWhite from '/assets/logos/forfeo_logo_white_version.png';
import logoColor from '/assets/logos/forfeo_logo_horizontal.png';

function Header({ darkBackground = true }) {
  return (
    <header>
      <img 
        src={darkBackground ? logoWhite : logoColor}
        alt="Forfeo - Communauté & Concours"
        className="forfeo-logo"
      />
    </header>
  );
}
```

## Cas d'usage spécifiques

### 1. Header du site web
**Logo recommandé** : `forfeo_logo_white_version.png`  
**Raison** : Le site utilise un fond bleu marine foncé, la version blanche offre le meilleur contraste

### 2. Footer du site web
**Logo recommandé** : `forfeo_logo_white_version.png` ou `forfeo_logo_icon_only.png`  
**Raison** : Footer également sur fond sombre, version icône acceptable pour économiser l'espace

### 3. Emails et newsletters
**Logo recommandé** : `forfeo_logo_horizontal.png`  
**Raison** : Fond généralement clair dans les emails, version couleur plus impactante

### 4. Réseaux sociaux

**Photo de profil** : `forfeo_logo_icon_only.png` ou `forfeo_logo_vertical.png`  
**Posts/Publications** : `forfeo_logo_horizontal.png` ou `forfeo_logo_white_version.png` selon le fond

**Dimensions recommandées par plateforme** :
- Facebook : 180x180 px (profil), 820x312 px (couverture)
- Instagram : 110x110 px (profil), 1080x1080 px (posts)
- Twitter/X : 400x400 px (profil), 1500x500 px (bannière)
- LinkedIn : 300x300 px (profil), 1584x396 px (bannière)

### 5. Documents imprimés
**Logo recommandé** : `forfeo_logo_horizontal.png`  
**Format** : Exporter en haute résolution (300 DPI minimum) pour l'impression

### 6. Présentations PowerPoint/Keynote
**Logo recommandé** : `forfeo_logo_horizontal.png` (fond clair) ou `forfeo_logo_white_version.png` (fond sombre)  
**Placement** : Coin supérieur gauche ou droit, ou centré sur la page de titre

### 7. Signatures d'email
**Logo recommandé** : `forfeo_logo_horizontal.png`  
**Dimensions** : 150-200px de largeur maximum

### 8. Merchandising (t-shirts, mugs, etc.)
**Logo recommandé** : `forfeo_logo_white_version.png` (sur tissus foncés) ou `forfeo_logo_horizontal.png` (sur tissus clairs)  
**Format** : Demander un fichier vectoriel (SVG) pour une qualité optimale à toutes les tailles

## Formats de fichiers

### PNG (fournis)
- **Avantages** : Transparence, bonne qualité, compatible partout
- **Usage** : Web, présentations, documents numériques
- **Limitation** : Fichiers plus lourds, perte de qualité si agrandis

### ICO (fourni pour favicon)
- **Avantages** : Multi-résolution, standard pour navigateurs
- **Usage** : Favicon uniquement

### Formats recommandés pour d'autres usages

**SVG (vectoriel)** : Pour l'impression professionnelle et le merchandising, demander une version SVG qui peut être redimensionnée à l'infini sans perte de qualité

**PDF (vectoriel)** : Pour l'impression et le partage avec des imprimeurs

**EPS (vectoriel)** : Pour les logiciels de design professionnel (Adobe Illustrator, etc.)

## Contact et questions

Pour toute question sur l'utilisation des logos, demandes de formats supplémentaires, ou clarifications sur les règles d'utilisation, veuillez contacter l'équipe Forfeo.

---

**Version du guide** : 1.0  
**Date de création** : 14 décembre 2025  
**Dernière mise à jour** : 14 décembre 2025
