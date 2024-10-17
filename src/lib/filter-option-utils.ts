import { FilterOption } from '@/models/filter-option';
import _ from 'lodash';

export const toFilterOption = (data: any[], labelKey: string, valueKey: string): FilterOption[] => {
    return data.map(item => ({
        label: _.get(item, labelKey),
        value: _.get(item, valueKey),
    }));
};
