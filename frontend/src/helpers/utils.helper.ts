/**
 * Format currency
 * @param n
 * @param options
 * @returns
 */
export const formatCurrency = (
  n: number = 0,
  options?: Intl.NumberFormatOptions
) => new Intl.NumberFormat('en-us', options).format(n);
