import { relativeDateFormat } from '@/lib/helpers/dates';

// Helper to create a date relative to "now"
function minutesAgo(n: number): Date {
  const d = new Date();
  d.setMinutes(d.getMinutes() - n);
  return d;
}

function hoursAgo(n: number): Date {
  const d = new Date();
  d.setHours(d.getHours() - n);
  return d;
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

describe('relativeDateFormat', () => {
  it('formats "только что" for dates less than 1 minute ago', () => {
    const result = relativeDateFormat(new Date());
    expect(result).toBe('только что');
  });

  it('formats "1 минуту назад" for 1 minute ago', () => {
    const result = relativeDateFormat(minutesAgo(1));
    expect(result).toBe('1 минуту назад');
  });

  it('formats "3 минуты назад" for 3 minutes ago', () => {
    const result = relativeDateFormat(minutesAgo(3));
    expect(result).toBe('3 минуты назад');
  });

  it('formats "10 минут назад" for 10 minutes ago', () => {
    const result = relativeDateFormat(minutesAgo(10));
    expect(result).toBe('10 минут назад');
  });

  it('formats "1 час назад" for 1 hour ago', () => {
    const result = relativeDateFormat(hoursAgo(1));
    expect(result).toBe('1 час назад');
  });

  it('formats "2 часа назад" for 2 hours ago', () => {
    const result = relativeDateFormat(hoursAgo(2));
    expect(result).toBe('2 часа назад');
  });

  it('formats "5 часов назад" for 5 hours ago', () => {
    const result = relativeDateFormat(hoursAgo(5));
    expect(result).toBe('5 часов назад');
  });

  it('formats "1 день назад" for 1 day ago', () => {
    const result = relativeDateFormat(daysAgo(1));
    expect(result).toBe('1 день назад');
  });

  it('formats "2 дня назад" for 2 days ago', () => {
    const result = relativeDateFormat(daysAgo(2));
    expect(result).toBe('2 дня назад');
  });

  it('formats "5 дней назад" for 5 days ago', () => {
    const result = relativeDateFormat(daysAgo(5));
    expect(result).toBe('5 дней назад');
  });

  it('formats absolute date for dates older than 30 days', () => {
    const d = daysAgo(31);
    // Intl.DateTimeFormat('ru-RU') formats as "22 апреля 2026 г."
    const expected = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(d);
    const result = relativeDateFormat(d);
    expect(result).toBe(expected);
  });
});
