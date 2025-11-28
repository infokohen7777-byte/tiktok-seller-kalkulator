
export const formatRupiah = (value: number, withRpPrefix = true): string => {
  if (isNaN(value)) {
    return withRpPrefix ? 'Rp 0' : '0';
  }
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  let formatted = formatter.format(value);
  if (!withRpPrefix) {
    formatted = formatted.replace('Rp', '').trim();
  }
  return formatted;
};
