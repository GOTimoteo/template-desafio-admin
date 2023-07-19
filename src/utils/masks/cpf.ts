export const formatCPF = (cpf?: number) => {
  if (!cpf) return null;
  const stringCPF = String(cpf);
  return `${stringCPF.slice(0, 3)}.${stringCPF.slice(3, 6)}.${stringCPF.slice(
    6,
    9
  )}-${stringCPF.slice(9)}`;
};
