import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterOption } from "@/models/filter-option";

interface FilterSelectProps {
    value?: string | undefined
    options: FilterOption[] | undefined
    placeholder: string
    onChange: (value: string) => void
}

const FilterSelect = ({ value, options, placeholder, onChange }: FilterSelectProps) => (
    <Select value={value ?? ''} onValueChange={onChange}>
        <SelectTrigger>
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
            {options?.map((option, index) => (
                <SelectItem key={`${index}-${option.value}`} value={option.value}>
                    {option.label}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

export default FilterSelect