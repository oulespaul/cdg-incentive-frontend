export const reOrderList = (list: any[] | undefined, fieldName: string) => {
    if (!list) return [];
    if (list.length === 0) return [];

    return list.map((l, index) => ({ ...l, [fieldName]: index + 1 }));
};
