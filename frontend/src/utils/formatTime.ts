export function formatDateTime(date: string) {
  return new Date(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDuration(duration: string) {
  const hours = duration.match(/(\d+)H/)?.[1];
  const minutes = duration.match(/(\d+)M/)?.[1];

  if (hours && minutes) {
    return `${hours}h ${minutes}min`;
  }

  if (hours) {
    return `${hours}h`;
  }

  return `${minutes}min`;
}
