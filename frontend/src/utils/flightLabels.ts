export function stopsLabel(stops: string[]) {
  if (stops.length === 0) return "Direto";
  const count = stops.length === 1 ? "1 parada" : `${stops.length} paradas`;
  return `${count} · ${stops.join(", ")}`;
}

// A Duffel devolve o nome comercial da cabine em inglês ("Economy", "Premium Economy"...).
export function cabinLabel(cabin: string | null) {
  if (!cabin) return null;
  if (/first/i.test(cabin)) return "Primeira classe";
  if (/business/i.test(cabin)) return "Executiva";
  if (/premium/i.test(cabin)) return "Econômica Premium";
  if (/economy/i.test(cabin)) return "Econômica";
  return cabin;
}

export function flightSubtitle(flightNumber: string, cabin: string | null) {
  return [flightNumber, cabinLabel(cabin)].filter(Boolean).join(" · ");
}
