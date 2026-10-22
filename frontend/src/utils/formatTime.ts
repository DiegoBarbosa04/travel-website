// Os horários da Duffel vêm no fuso local do aeroporto, sem offset ("2026-12-12T21:40:00").
// Lemos os campos direto da string para não converter para o fuso do navegador.
const parseLocal = (date: string) => {
  const [day, time = "00:00"] = date.split("T");
  const [year, month, dayOfMonth] = day.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  return new Date(year, month - 1, dayOfMonth, hours, minutes);
};

export function formatDateTime(date: string) {
  return parseLocal(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTime(date: string) {
  return date.slice(11, 16);
}

// "sáb, 12 dez" — com o ano quando pedido ("sáb, 12 dez 2026").
export function formatShortDate(date: string | Date, withYear = false) {
  const value = typeof date === "string" ? parseLocal(date) : date;
  const weekday = value
    .toLocaleDateString("pt-BR", { weekday: "short" })
    .replace(".", "");
  const month = value
    .toLocaleDateString("pt-BR", { month: "short" })
    .replace(".", "");
  const year = withYear ? ` ${value.getFullYear()}` : "";
  return `${weekday}, ${value.getDate()} ${month}${year}`;
}

// Quantos dias depois da partida o voo chega (para o "+1").
export function dayOffset(departure: string, arrival: string) {
  const start = parseLocal(departure.slice(0, 10));
  const end = parseLocal(arrival.slice(0, 10));
  return Math.round((end.getTime() - start.getTime()) / 86_400_000);
}

export function durationInMinutes(duration: string | null) {
  if (!duration) return 0;
  const days = Number(duration.match(/(\d+)D/)?.[1] ?? 0);
  const hours = Number(duration.match(/(\d+)H/)?.[1] ?? 0);
  const minutes = Number(duration.match(/(\d+)M/)?.[1] ?? 0);
  return days * 24 * 60 + hours * 60 + minutes;
}

export function formatDuration(duration: string | null) {
  const total = durationInMinutes(duration);
  const hours = Math.floor(total / 60);
  const minutes = total % 60;

  if (hours && minutes) {
    return `${hours}h ${String(minutes).padStart(2, "0")}min`;
  }

  if (hours) {
    return `${hours}h`;
  }

  return `${minutes}min`;
}
