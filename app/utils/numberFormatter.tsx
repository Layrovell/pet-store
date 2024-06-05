export const twoDecimals = (num: number): string => {
  if (!num) return '';
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
