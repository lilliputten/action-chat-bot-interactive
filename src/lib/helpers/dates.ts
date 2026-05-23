export type TDateTicks = number;
export type TDateLike = Date | string | TDateTicks;

/** Workaround for cases when date has been passed as an ISO string or en empty value (now) */
export function ensureDate(date?: TDateLike): Date {
  if (!date) {
    return new Date();
  }
  if (typeof date === 'string' || typeof date === 'number') {
    return new Date(date);
  }
  return date;
}

// Helper to create a relative date
export function minutesAgo(n: number, d?: TDateLike): Date {
  d = ensureDate(d);
  d.setMinutes(d.getMinutes() - n);
  return d;
}

export function hoursAgo(n: number, d?: TDateLike): Date {
  d = ensureDate(d);
  d.setHours(d.getHours() - n);
  return d;
}

export function daysAgo(n: number, d?: TDateLike): Date {
  d = ensureDate(d);
  d.setDate(d.getDate() - n);
  return d;
}

/**
 * Return proper Russian plural form for a given number.
 */
function ruPlural(n: number, forms: [string, string, string]): string {
  const absN = Math.abs(n);
  const lastDigit = absN % 10;
  const lastTwo = absN % 100;
  if (lastTwo >= 11 && lastTwo <= 19) {
    return forms[2];
  }
  if (lastDigit === 1) {
    return forms[0];
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return forms[1];
  }
  return forms[2];
}

export function relativeDateFormat(date: TDateLike) {
  date = ensureDate(date);
  const now = Date.now();
  const diffMs = now - date.getTime();

  // Less than 1 minute
  if (diffMs < 60_000) {
    return 'только что';
  }

  const diffMinutes = Math.floor(diffMs / 60_000);

  // Less than 1 hour
  if (diffMinutes < 60) {
    const form = ruPlural(diffMinutes, ['минуту', 'минуты', 'минут']);
    return `${diffMinutes} ${form} назад`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  // Less than 24 hours
  if (diffHours < 24) {
    const form = ruPlural(diffHours, ['час', 'часа', 'часов']);
    return `${diffHours} ${form} назад`;
  }

  const diffDays = Math.floor(diffHours / 24);

  // Less than 30 days
  if (diffDays < 30) {
    const form = ruPlural(diffDays, ['день', 'дня', 'дней']);
    return `${diffDays} ${form} назад`;
  }

  // Older — absolute date
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
