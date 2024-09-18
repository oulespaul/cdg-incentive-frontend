export const formatThaiCurrency = (amount: number, suffix: string = ''): string => {
    const formattedNumber = new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);

    return formattedNumber.replace('฿', '').trim() + suffix;
};
