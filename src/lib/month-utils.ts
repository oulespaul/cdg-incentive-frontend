const monthMap: Record<string, string> = {
    '01': 'มกราคม',
    '02': 'กุมภาพันธ์',
    '03': 'มีนาคม',
    '04': 'เมษายน',
    '05': 'พฤษภาคม',
    '06': 'มิถุนายน',
    '07': 'กรกฎาคม',
    '08': 'สิงหาคม',
    '09': 'กันยายน',
    '10': 'ตุลาคม',
    '11': 'พฤศจิกายน',
    '12': 'ธันวาคม',
};

export const getThaiMonthName = (month: string) => {
    return monthMap[month] || month;
};
