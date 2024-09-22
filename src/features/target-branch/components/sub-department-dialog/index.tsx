import _ from 'lodash';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useCallback, useMemo, useState } from 'react';
import { SubDepartment } from '@/features/sub-department/models/sub-department';

interface SubSubDepartmentDialogProps {
    subSubDepartmentList: SubDepartment[] | undefined;
    onSelected?: (subDepartmentSelected: SubDepartment | undefined) => void;
    onCloseDialog: () => void;
}

const SubSubDepartmentDialog = ({ subSubDepartmentList, onSelected, onCloseDialog }: SubSubDepartmentDialogProps) => {
    const [subDepartmentSelected, setBrandSelected] = useState<SubDepartment>();
    const [subDepartmentOptionSearch, setBrandOptionSearch] = useState<string>('');

    const subDepartmentOptions = useMemo(() => {
        const subDepartmentUniqueNameList = _.unionBy(subSubDepartmentList, 'subDepartmentName');
        return _.sortBy(
            subDepartmentUniqueNameList?.filter(
                subDepartment =>
                    subDepartment.subDepartmentCode.includes(subDepartmentOptionSearch) ||
                    subDepartment.subDepartmentName.toLowerCase().includes(subDepartmentOptionSearch.toLowerCase()),
            ),
            'subDepartmentCode',
        );
    }, [subSubDepartmentList, subDepartmentOptionSearch]);

    const onSelectedHandler = (value: string) => {
        const subDepartmentSelectedValue = subSubDepartmentList?.find(
            subDepartment => subDepartment.id.toString() === value,
        );
        setBrandSelected(subDepartmentSelectedValue);
    };

    const onSubmitSelectedHandler = useCallback(() => {
        if (onSelected) {
            onSelected(subDepartmentSelected);
        }
    }, [onSelected, subDepartmentSelected]);

    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>เลือกข้อมูล Sub Department</DialogTitle>
                </DialogHeader>

                <Input placeholder="ค้นหา" onChange={event => setBrandOptionSearch(event.target.value)} />

                <RadioGroup
                    value={subDepartmentSelected?.id.toString()}
                    className="max-h-[400px] overflow-auto"
                    onValueChange={onSelectedHandler}
                >
                    {subDepartmentOptions?.map(subDepartment => (
                        <div className="flex items-center space-x-2" key={subDepartment.id}>
                            <RadioGroupItem value={subDepartment.id.toString()} id={subDepartment.id.toString()} />
                            <Label>
                                {subDepartment.subDepartmentCode} - {subDepartment.subDepartmentName}
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

export default SubSubDepartmentDialog;
