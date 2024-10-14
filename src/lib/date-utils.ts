import dayjs from 'dayjs';

export const DD_MM_YYYY_HH_MM = 'DD/MM/YYYY HH:mm';
export const DD_MM_YYYY = 'DD/MM/YYYY';

export const formatDate = (date: string | Date | undefined = new Date(), format: string) => {
    return dayjs(date).format(format);
};
