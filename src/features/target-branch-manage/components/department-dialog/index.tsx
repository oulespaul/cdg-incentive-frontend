import _ from 'lodash';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useCallback, useMemo, useState } from 'react';
import { Department } from '@/types/api';

interface DepartmentDialogProps {
    departmentList: Department[] | undefined;
    onSelected?: (departmentSelected: Department | undefined) => void;
    onCloseDialog: () => void;
}

const DepartmentDialog = ({ departmentList, onSelected, onCloseDialog }: DepartmentDialogProps) => {
    const [departmentSelected, setBrandSelected] = useState<Department>();
    const [departmentOptionSearch, setBrandOptionSearch] = useState<string>('');

    const departmentOptions = useMemo(() => {
        const departmentUniqueNameList = _.unionBy(departmentList, 'departmentName');
        return _.sortBy(
            departmentUniqueNameList?.filter(
                department =>
                    department.departmentCode.includes(departmentOptionSearch) ||
                    department.departmentName.toLowerCase().includes(departmentOptionSearch.toLowerCase()),
            ),
            'departmentCode',
        );
    }, [departmentList, departmentOptionSearch]);

    const onSelectedHandler = (value: string) => {
        const departmentSelectedValue = departmentList?.find(department => department.id.toString() === value);
        setBrandSelected(departmentSelectedValue);
    };

    const onSubmitSelectedHandler = useCallback(() => {
        if (onSelected) {
            onSelected(departmentSelected);
        }
    }, [onSelected, departmentSelected]);

    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>เลือกข้อมูล Department</DialogTitle>
                </DialogHeader>

                <Input placeholder="ค้นหา" onChange={event => setBrandOptionSearch(event.target.value)} />

                <RadioGroup
                    value={departmentSelected?.id.toString()}
                    className="max-h-[400px] overflow-auto"
                    onValueChange={onSelectedHandler}
                >
                    {departmentOptions?.map(department => (
                        <div className="flex items-center space-x-2" key={department.id}>
                            <RadioGroupItem value={department.id.toString()} id={department.id.toString()} />
                            <Label>
                                {department.departmentCode} - {department.departmentName}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onCloseDialog()}>
                        ยกเลิก
                    </Button>
                    <Button onClick={() => onSubmitSelectedHandler()}>ยืนยัน</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DepartmentDialog;
