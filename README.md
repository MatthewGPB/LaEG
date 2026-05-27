# La Esquina Guatemalteca

The official website for [La Esquina Guatemalteca](https://laesquinaguatemalteca.com) — a family-run Guatemalan restaurant in Jupiter, FL.

**Stack:** Astro 5 · Tailwind v3 · Vercel (static) · GitHub · Formspree · GA4

---

## 🚀 Quick start (5 minutes to launch)

### 1. Install & run locally

```bash
npm install
npm run dev
```

The site will open at `http://localhost:4321`. Edit files in `src/` and the page hot-reloads.

To preview a production build:
```bash
npm run build
npm run preview
```

### 2. Drop your photos into `public/LAEG/`

All site images go in `public/LAEG/`. Filenames are **case-sensitive** and must be **lowercase with hyphens**. See [`Image checklist`](#-image-checklist) below for the full list.

Missing images don't break the site — they fall back to a styled "La Esquina Guatemalteca" placeholder.

### 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Astro rebuild"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/laesquinaguatemalteca.git
git push -u origin main
```

### 4. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repo
3. Vercel detects Astro automatically — click **Deploy**
4. Get a preview URL like `laesquinaguatemalteca.vercel.app` in ~60 seconds

### 5. Set up Formspree (one-time, ~5 min)

The site has 4 forms. Each needs its own free Formspree endpoint:

1. Sign up at [formspree.io](https://formspree.io) (free tier = 50 submissions/mo)
2. Create **4 new forms**, naming them:
   - `Contact`
   - `Catering`
   - `Food Truck`
   - `Newsletter`
3. For each, set the submission email to `hola@laesquinaguatemalteca.com` (or whatever you prefer)
4. Copy each form's endpoint (looks like `https://formspree.io/f/xyzabc123`)
5. Open `src/data/site.json` and replace the four placeholder IDs:

```json
"formspree": {
  "contact":   "https://formspree.io/f/YOUR_CONTACT_ID",
  "catering":  "https://formspree.io/f/YOUR_CATERING_ID",
  "foodTruck": "https://formspree.io/f/YOUR_FOODTRUCK_ID",
  "newsletter":"https://formspree.io/f/YOUR_NEWSLETTER_ID"
}
```

6. Commit, push — Vercel auto-deploys. Forms work.

### 6. Repoint your domain

In Vercel → Project Settings → Domains:
1. Add `laesquinaguatemalteca.com` and `www.laesquinaguatemalteca.com`
2. Vercel will show you the DNS records to set at your registrar (Hover, GoDaddy, Namecheap, etc.)
3. Update the records — propagation usually takes 5–60 minutes
4. Vercel auto-issues an SSL cert (HTTPS) once DNS resolves

**That's it. You're live.**

---

## 📁 Project structure

```
laesquinaguatemalteca/
├── public/
│   ├── LAEG/                 ← All your photos go here
│   └── robots.txt
├── src/
│   ├── data/                 ← ✏️ Edit these JSON files to update content
│   │   ├── site.json         ← Phone, address, hours, social, Formspree, GA4
│   │   ├── menu.json         ← Full menu, signature carousel, weekly specials
│   │   ├── weekly-special.json ← This week's popup content
│   │   └── events.json       ← Food truck event calendar
│   ├── components/           ← Reusable UI (header, footer, forms, popup, etc.)
│   ├── layouts/
│   │   └── BaseLayout.astro  ← Shared shell every page uses
│   ├── pages/                ← One file = one URL
│   │   ├── index.astro       → /
│   │   ├── menu.astro        → /menu
│   │   ├── about.astro       → /about
│   │   ├── catering.astro    → /catering
│   │   ├── food-truck.astro  → /food-truck
│   │   ├── location.astro    → /location
│   │   ├── contact.astro     → /contact
│   │   ├── thank-you.astro   → /thank-you (post-form success)
│   │   └── 404.astro         → custom not-found page
│   └── styles/
│       └── global.css        ← Tailwind layers + brand tokens
├── astro.config.mjs
├── tailwind.config.mjs       ← Brand colors & fonts
└── package.json
```

---

## ✏️ How to update content

**Workflow for every change:** edit file → commit → push → Vercel auto-rebuilds in ~30 seconds.

### Change the weekly special (popup)

Edit `src/data/weekly-special.json`:

```json
{
  "enabled": true,
  "name": "Birria Tacos!",
  "description": "Slow-braised beef birria...",
  "price": "$15",
  "dates": "June 2 – June 8",
  "image": "/LAEG/birria-tacos.jpeg"
}
```

Set `"enabled": false` to hide the popup entirely.

### Add / remove / re-price menu items

Edit `src/data/menu.json`. Each item looks like:

```json
{
  "name": "Pollo Asado",
  "image": "/LAEG/pollo-asado.jpeg",
  "description": "6 oz. in-house cut chicken breast marinated in citrus herb blend.",
  "price": "$20"
}
```

To add a new item:
1. Drop the photo in `public/LAEG/` (lowercase, hyphens, `.jpeg`)
2. Add an item entry in the right category
3. Commit & push

### Update phone, hours, address, social

Edit `src/data/site.json`. Every page pulls from here automatically — change once, updates everywhere.

### Add food truck events

Edit `src/data/events.json`. Empty array = no events section shown.

### Swap a photo

Just replace the file in `public/LAEG/` with the same filename. Commit & push. Done.

---

## 📷 Image checklist

All images go in `public/LAEG/` — lowercase, hyphens, `.jpeg` (unless noted).

**Brand & hero:**
- `logo.png`, `favicon.png`, `og-default.jpeg`
- `hero-mural.jpeg`, `family.jpeg`, `restaurant-exterior.jpeg`
- `catering-hero.jpeg`, `food-truck-hero.jpeg`

**Menu dishes (33):** `guacamole-chips.jpeg`, `pico-chips.jpeg`, `bean-dip-chips.jpeg`, `queso-dip.jpeg`, `enchilada.jpeg`, `loaded-nachos.jpeg`, `tamales.jpeg`, `enchiladas.jpeg`, `huevos-rancheros.jpeg`, `huevos-revueltos.jpeg`, `huevos-con-chorizo.jpeg`, `huevos-con-salchicha.jpeg`, `huevos-entomatados.jpeg`, `tacos.jpeg`, `burrito-bowls.jpeg`, `quesadillas.jpeg`, `sincos.jpeg`, `burrito.jpeg`, `tortas.jpeg`, `birria-tacos.jpeg`, `birria-pizza.jpeg`, `caldo-de-res.jpeg`, `caldo-de-pollo.jpeg`, `chaomin-de-pollo.jpeg`, `pepian-de-pollo.jpeg`, `guisado-de-res.jpeg`, `pollo-dorado.jpeg`, `mojarra-frita.jpeg`, `pollo-asado.jpeg`, `carne-asada.jpeg`, `costilla-de-res.jpeg`, `la-parrillada.jpeg`, `costilla-de-carnero.jpeg`, `shuco.jpeg`

**Weekly specials (4):** `taco-tuesday.jpeg`, `empanada-wednesday.jpeg`, `taquito-thursday.jpeg`, `garnacha-friday.jpeg`

**Catering trust logos (PNG with transparency):** `frenchmans-reserve.png`, `jupiter-hills.png`, `avenir.png`, `mirasol.png`, `breakers-west.png`

> Missing image? The site shows a styled placeholder. Site never breaks.

---

## 🔧 What's already wired up

- ✅ **GA4 analytics** (ID `G-4D9S6PF7M4` — already loaded in `site.json`)
- ✅ **SEO meta + OpenGraph + JSON-LD** on every page (Restaurant, Menu, FoodService schemas)
- ✅ **Auto-generated sitemap** at `/sitemap-index.xml`
- ✅ **robots.txt** pointing search engines at the sitemap
- ✅ **Mobile-first responsive design** — tested on iPhone, Android, tablet, desktop
- ✅ **Sticky mobile-friendly nav** with hamburger drawer
- ✅ **Weekly special popup** with 3-day dismiss memory (localStorage)
- ✅ **Honeypot spam protection** on all forms
- ✅ **Form submit tracking** auto-fires `form_submit` GA4 event with `form_name`
- ✅ **Smart image fallback** — branded placeholder when image is missing
- ✅ **Accessible** — skip-to-content link, ARIA labels, keyboard nav, focus rings
- ✅ **Vercel-optimized** — static export, image optimization, edge-cached

---

## 📞 Forms — what each one does

| Page | Form | Goes to Formspree key | When triggered |
|---|---|---|---|
| `/contact` | General contact | `contact` | Customer message |
| `/catering` | Catering inquiry | `catering` | Event quote request |
| `/food-truck` | Food truck booking | `foodTruck` | Guatamigos event booking |
| Popup + `/menu` | Newsletter signup | `newsletter` | Email subscribe |

All forms POST to Formspree via fetch (no page reload), show inline success, and track in GA4.

---

## 🎨 Design tokens

Edit `tailwind.config.mjs` to tweak brand colors. The current palette:

| Token | Hex | Use |
|---|---|---|
| `navy` (700, brand primary) | `#1e3a5f` | Headers, buttons, links |
| `cream` (default) | `#fdf8f0` | Page background |
| `spice` (terracotta) | `#c5532a` | Eyebrows, accent CTAs |
| `marigold` | `#e8a52a` | Highlights on dark backgrounds |
| `price` (red) | `#c0392b` | Menu prices |

Typography: **Fraunces** (display serif) + **DM Sans** (body). Loaded from Google Fonts in `src/styles/global.css`.

---

## 🛠 Troubleshooting

**The site won't build.**
Run `npm install` again. If still broken, delete `node_modules/` and `package-lock.json`, then `npm install`.

**Forms aren't sending.**
Make sure you replaced all 4 `REPLACE_*_ID` placeholders in `src/data/site.json` with real Formspree endpoint IDs. Test by submitting once — Formspree sends you a confirmation email the first time.

**An image isn't showing.**
1. Check filename is **exactly** lowercase with hyphens (`la-parrillada.jpeg`, not `La Parrillada.JPEG`)
2. Confirm it's in `public/LAEG/`
3. Hard-refresh the browser (Cmd+Shift+R / Ctrl+F5)

**Popup keeps showing even after closing.**
The 3-day dismiss is stored in browser localStorage. Open DevTools → Application → Local Storage and clear `laEsquinaWeeklyPopupDismissed` to reset.

**Want to disable the popup entirely?**
Set `"enabled": false` in `src/data/weekly-special.json`.

**SkyTab ordering link changed?**
Update `orderUrl` in `src/data/site.json`. Every "Order Online" button across the site uses that value.

---

## 📊 Free tier limits

- **Vercel:** 100 GB bandwidth/mo — way more than a restaurant site needs
- **Formspree:** 50 submissions/mo total across all 4 forms — upgrade ($10/mo) if you hit it
- **GA4:** Unlimited

---

## 💡 What's NOT included (and where to go)

- **No CMS UI** — content lives in JSON files. If you want a visual editor later, the easiest add-on is [Decap CMS](https://decapcms.org) (free, GitHub-backed).
- **No online ordering built-in** — we link out to your existing SkyTab. Change the link in `site.json` if you switch providers.
- **No blog** — easy to add later via Astro Content Collections if you want recipes/news.

---

Made with ❤️ for La Esquina Guatemalteca.
