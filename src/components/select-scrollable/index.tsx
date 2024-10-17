import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SelectScrollableProps {
    onChange: (value: string) => void;
    value: string | number;
    options: string[];
}

export function SelectScrollable({ onChange, value, options }: SelectScrollableProps) {
    return (
        <Select onValueChange={onChange} defaultValue={value.toString()}>
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="A - Permanent">A - Permanent</SelectItem>
                <SelectItem value="RBS">RBS</SelectItem>
                <SelectItem value="RBS.ZR.พนักงานขาย Pacific Union">RBS.ZR.พนักงานขาย Pacific Union</SelectItem>
                <SelectItem value="Inhouse">Inhouse</SelectItem>
            </SelectContent>
        </Select>
    );
}
