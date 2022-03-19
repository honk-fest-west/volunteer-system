export function shortTime(time: string): string {
  return new Date('2000-01-01T' + time).toLocaleTimeString('en-US', {
    timeStyle: 'short',
  });
}
