export const formatoBrl = (valor: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};

// Valor arredondado, sem centavos ("R$ 3.284"), como nos cards e no resumo.
export const formatoBrlInteiro = (valor: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(valor);
};
