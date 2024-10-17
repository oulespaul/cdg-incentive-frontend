import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterOption } from '@/models/filter-option';

interface SelectScrollableProps {
    onChange: (value: string) => void;
    value: string | number;
    options: FilterOption[];
}

export function SelectScrollable({ onChange, value, options }: SelectScrollableProps) {
    return (
        <Select onValueChange={onChange} defaultValue={value.toString()}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {options.map((option, index) => (
                    <SelectItem key={`${option.value} ${index}`} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
