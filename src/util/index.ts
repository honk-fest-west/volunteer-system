import type { Timestamp } from "firebase/firestore";

export function shortTime(time: string): string {
  const date = new Date(timeToInt(time));

  if (date.getMinutes() > 0) {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
  } else {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
    });
  }
}

export function timeToInt(time: string): number {
  return Date.parse('1970-01-01T' + time);
}

export function hoursToMilliseconds(hours: number = 1): number {
  return hours * 3600000;
}

export function formatPhoneNumber(phoneNumberString) {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = match[1] ? '+1 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return phoneNumberString;
}

export function formatDate(date: string): string {
  return new Date(date + ' PDT').toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function timestampToDateString(value: Timestamp): string {
  try {
    const date = value.toDate();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }
  catch (err) {
    return '--/--/----';
  }
}