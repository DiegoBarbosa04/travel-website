export function isTimeInRange(time: string, start: string, end: string) {
  return time >= start && time <= end;
}
