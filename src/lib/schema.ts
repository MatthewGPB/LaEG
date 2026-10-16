import site from '../data/site.json';
import pending from '../data/pending.json';
import { openingHoursSpecification } from '../data/hours';

const D = site.domain; // non-www, canonical
export const RESTAURANT_ID = D + '/#restaurant';

/** The one Restaurant entity. Hours come from src/data/hours.ts. */
export function restaurantSchema(opts: { lang?: 'en' | 'es'; description?: string; url?: string } = {}) {
  const { lang = 'en', description, url } = opts;
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': RESTAURANT_ID,
    name: site.name,
    ...(description ? { description } : {}),
    url: url || D + '/',
    telephone: site.phoneSchema,
    image: D + '/LAEG/hero-mural.jpeg',
    logo: D + '/LAEG/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.address.lat, longitude: site.address.lng },
    openingHoursSpecification: openingHoursSpecification(),
    servesCuisine: ['Guatemalan', 'Latin American'],
    priceRange: '$',
    hasMenu: D + (lang === 'es' ? '/es/menu' : '/menu'),
    acceptsReservations: pending.acceptsReservations, // CONFIRM (default false)
    sameAs: [site.social.instagram, site.social.facebook, site.delivery.doordash, site.delivery.uberEats],
    founder: { '@type': 'Person', name: site.founder },
    foundingDate: site.founded,
  };
}

const LABELS: Record<string, { en: string; es: string }> = {
  menu: { en: 'Menu', es: 'Menú' },
  about: { en: 'Our Story', es: 'Nuestra Historia' },
  catering: { en: 'Catering', es: 'Catering' },
  'food-truck': { en: 'Food Truck', es: 'Food Truck' },
  location: { en: 'Location & Hours', es: 'Ubicación y Horario' },
  contact: { en: 'Contact', es: 'Contacto' },
};

/** BreadcrumbList for inner pages, e.g. /menu or /es/menu. Returns null for home pages. */
export function breadcrumbSchema(path: string) {
  const isEs = path.startsWith('/es');
  const slug = path.replace(/^\/es/, '').replace(/^\/|\/$/g, '');
  if (!slug || !LABELS[slug]) return null;
  const lang = isEs ? 'es' : 'en';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEs ? 'Inicio' : 'Home', item: D + (isEs ? '/es/' : '/') },
      { '@type': 'ListItem', position: 2, name: LABELS[slug][lang], item: D + path.replace(/\/$/, '') },
    ],
  };
}

/** Catering / food truck service. Provider points at the one Restaurant entity. */
export function serviceSchema(o: { name: string; serviceType: string; description: string; url: string; lang?: 'en' | 'es'; image?: string; sameAs?: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: o.name,
    serviceType: o.serviceType,
    description: o.description,
    url: o.url,
    ...(o.image ? { image: D + o.image } : {}),
    ...(o.sameAs ? { sameAs: o.sameAs } : {}),
    provider: {
      '@type': 'Restaurant', '@id': RESTAURANT_ID, name: site.name, telephone: site.phoneSchema, url: D + '/',
      image: D + '/LAEG/hero-mural.jpeg', priceRange: '$',
      address: { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: site.address.city, addressRegion: site.address.region, postalCode: site.address.postalCode, addressCountry: site.address.country },
    },
    areaServed: site.areaServed.map((a) => ({ '@type': a.includes('County') ? 'AdministrativeArea' : 'City', name: a })),
  };
}

/** Menu schema generated from the same menu.json that renders /menu. */
export function menuSchema(menu: any, opts: { lang?: 'en' | 'es'; t?: { name: (n: string) => string; itemDesc: (catId: string, item: any) => string; catDesc: (cat: any) => string; specialsName: string; specialName: (n: string) => string; specialDesc: (s: any) => string } } = {}) {
  const lang = opts.lang || 'en';
  const t = opts.t;
  const num = (p?: string) => (p ? (p.match(/[0-9]+(\.[0-9]+)?/) || [])[0] : undefined);
  const offer = (price: string, name?: string) => ({ '@type': 'Offer', price: num(price), priceCurrency: 'USD', ...(name ? { name } : {}) });
  const offersFor = (item: any) => {
    if (item.priceSplit) {
      const [a, b] = item.priceSplit.left.split('/').map((s: string) => s.trim());
      return [offer(a, 'Individual'), offer(b, 'Familiar')];
    }
    return item.price && num(item.price) ? offer(item.price) : undefined;
  };
  const url = D + (lang === 'es' ? '/es/menu' : '/menu');
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': url + '#menu',
    name: lang === 'es' ? `Menú de ${site.name}` : `${site.name} Menu`,
    url,
    ...(lang === 'es' ? { inLanguage: 'es' } : {}),
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: t ? t.specialsName : `${menu.specialsPrice} Weekly Specials`,
        hasMenuItem: menu.weeklySpecials.map((s: any) => ({
          '@type': 'MenuItem',
          name: t ? t.specialName(s.name) : s.name,
          description: t ? t.specialDesc(s) : s.description,
          image: D + s.image,
          offers: offer(s.price),
        })),
      },
      ...menu.categories.map((cat: any) => ({
        '@type': 'MenuSection',
        name: cat.name,
        description: t ? t.catDesc(cat) : cat.subtitle,
        hasMenuItem: cat.items.map((item: any) => {
          const desc = t ? t.itemDesc(cat.id, item) : item.description;
          const offers = offersFor(item);
          return {
            '@type': 'MenuItem',
            name: item.name,
            ...(desc ? { description: desc } : {}),
            ...(offers ? { offers } : {}),
          };
        }),
      })),
    ],
  };
}
