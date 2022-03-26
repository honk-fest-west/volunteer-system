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
