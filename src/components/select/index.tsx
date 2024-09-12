import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TargetCommissionFilterOption } from "../../features/target-commission/models/target-commission-filter-option";

interface FilterSelectProps {
    value?: string | undefined
    options: TargetCommissionFilterOption[] | undefined
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