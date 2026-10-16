// SINGLE SOURCE OF TRUTH for opening hours.
// Every hours string on the site (hero strip, footer, /location table, ES pages,
// meta descriptions, JSON-LD openingHoursSpecification and the "open today" script)
// is generated from WEEK below. Change hours here and nowhere else.
// Confirmed by Matthew, matches the Google Business Profile (Oct 2026).

export type Day = {
  key: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  en: string; enShort: string; es: string;
  open: string | null;  // 24h "HH:MM", null = closed
  close: string | null;
};

export const TIMEZONE = 'America/New_York';

export const WEEK: Day[] = [
  { key: 'Monday',    en: 'Monday',    enShort: 'Mon', es: 'Lunes',     open: null,    close: null },
  { key: 'Tuesday',   en: 'Tuesday',   enShort: 'Tue', es: 'Martes',    open: '11:00', close: '20:00' },
  { key: 'Wednesday', en: 'Wednesday', enShort: 'Wed', es: 'Miércoles', open: '11:00', close: '20:00' },
  { key: 'Thursday',  en: 'Thursday',  enShort: 'Thu', es: 'Jueves',    open: '11:00', close: '20:00' },
  { key: 'Friday',    en: 'Friday',    enShort: 'Fri', es: 'Viernes',   open: '11:00', close: '21:00' },
  { key: 'Saturday',  en: 'Saturday',  enShort: 'Sat', es: 'Sábado',    open: '10:00', close: '21:00' },
  { key: 'Sunday',    en: 'Sunday',    enShort: 'Sun', es: 'Domingo',   open: '10:00', close: '20:00' },
];

type Lang = 'en' | 'es';

/** "20:00" -> "8:00 PM" (full) or "8 PM" (compact) */
export function fmtTime(hhmm: string, compact = false): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  if (compact && m === 0) return `${h12} ${suffix}`;
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}

const closedWord = { en: 'Closed', es: 'Cerrado' };
const toWord = { en: 'to', es: 'a' };

/** Rows for the full table on /location. */
export function hoursTable(lang: Lang) {
  return WEEK.map((d) => ({
    key: d.key,
    day: lang === 'es' ? d.es : d.en,
    closed: !d.open,
    text: d.open && d.close ? `${fmtTime(d.open)} ${toWord[lang]} ${fmtTime(d.close)}` : closedWord[lang],
  }));
}

/** Short form for hero strip fallback and footer. */
export const SHORT = {
  en: 'Tue to Sun · Closed Mondays',
  es: 'Martes a domingo · Cerrado los lunes',
};

/** Consecutive days with identical hours, in week order. */
function groups() {
  const out: { days: Day[]; open: string | null; close: string | null }[] = [];
  for (const d of WEEK) {
    const last = out[out.length - 1];
    if (last && last.open === d.open && last.close === d.close) last.days.push(d);
    else out.push({ days: [d], open: d.open, close: d.close });
  }
  return out;
}

/**
 * One-line summary.
 * es: "Lunes cerrado · Martes a jueves 11:00 AM a 8:00 PM · Viernes 11:00 AM a 9:00 PM · ..."
 * en: "Closed Monday · Tuesday to Thursday 11:00 AM to 8:00 PM · Friday 11:00 AM to 9:00 PM · ..."
 */
export function hoursLine(lang: Lang): string {
  return groups().map((g) => {
    const first = g.days[0]; const last = g.days[g.days.length - 1];
    const name = (d: Day, cap: boolean) => {
      const n = lang === 'es' ? d.es : d.en;
      return cap ? n : (lang === 'es' ? n.toLowerCase() : n);
    };
    const span = g.days.length > 1 ? `${name(first, true)} ${toWord[lang]} ${name(last, false)}` : name(first, true);
    if (!g.open || !g.close) return lang === 'es' ? `${span} cerrado` : `Closed ${span}`;
    return `${span} ${fmtTime(g.open)} ${toWord[lang]} ${fmtTime(g.close)}`;
  }).join(' · ');
}

/** schema.org openingHoursSpecification. Closed days are omitted (not 00:00-00:00). */
export function openingHoursSpecification() {
  const byTime = new Map<string, string[]>();
  for (const d of WEEK) {
    if (!d.open || !d.close) continue;
    const k = `${d.open}|${d.close}`;
    byTime.set(k, [...(byTime.get(k) || []), d.key]);
  }
  return [...byTime.entries()].map(([k, days]) => {
    const [opens, closes] = k.split('|');
    return { '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens, closes };
  });
}

/** Compact data shipped to the browser for the "open today" strip. Index 0 = Sunday (JS getDay). */
export function clientWeek() {
  const order = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return order.map((k) => {
    const d = WEEK.find((x) => x.key === k)!;
    return { en: d.en, es: d.es, open: d.open, close: d.close };
  });
}
