export const formatCurrency = (value?: number) => {
  if (!value) return null;
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

// TODO: Função pode ser parametrizada para formatar em diversas moedas
