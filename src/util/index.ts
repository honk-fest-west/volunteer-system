export function shortTime(time: string): string {
  const date = new Date(timeToInt(time));
  return date.toLocaleTimeString('en-US', {
    // timeStyle: 'short',
    hour: 'numeric',
    minute: 'numeric',
  });
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
