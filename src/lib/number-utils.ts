export const formatThaiCurrency = (amount: number, suffix: string = ''): string => {
    const formattedNumber = new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);

    return formattedNumber.replace('฿', '').trim() + suffix;
};

export const sumAttribute = (list: any[], attributeKey: string) => {
    return list.reduce((total: number, item: any) => total + parseFloat(item[attributeKey] || '0'), 0);
};

export const sumNestedAttribute = (list: any[], nestedListKey: string, attributeKey: string) => {
    return list.reduce((total: any, item: { [x: string]: any[] }) => {
        return (
            total +
            item[nestedListKey].reduce(
                (subTotal: number, nestedItem: { [x: string]: any }) =>
                    subTotal + (parseFloat(nestedItem[attributeKey] || '0') || 0),
                0,
            )
        );
    }, 0);
};