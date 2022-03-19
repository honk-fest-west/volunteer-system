export function shortTime(time: string): string {
  return new Date(timeToInt(time)).toLocaleTimeString('en-US', {
    timeStyle: 'short',
  });
}

export function timeToInt(time: string): number {
  return Date.parse('1970-01-01T' + time);
}

export function hoursToMilliseconds(hours: number = 1): number {
  return hours * 3600000;
}
