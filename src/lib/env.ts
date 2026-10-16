// True on local and Vercel preview builds, false on production builds.
// Used to show CONFIRM placeholders and unapproved review excerpts only where Matthew reviews them.
export const SHOW_PENDING = process.env.VERCEL_ENV !== 'production' && process.env.SHOW_PENDING !== '0';
