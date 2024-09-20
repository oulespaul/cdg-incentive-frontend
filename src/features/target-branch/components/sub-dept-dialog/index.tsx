import _ from 'lodash';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCallback, useMemo, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';
import { SubDepartment } from '@/features/sub-department/models/sub-department';

interface SubDepartmentDialogProps {
    subDeparmentList: SubDepartment[] | undefined;
    onSubDepartmentChecked?: (subDepartmentSelected: SubDepartment[] | undefined) => void;
    onCloseDialog: () => void;
    defaultValue: SubDepartment[];
}

const SubDepartmentDialog = ({
    subDeparmentList,
    onSubDepartmentChecked,
    onCloseDialog,
    defaultValue,
}: SubDepartmentDialogProps) => {
    const [subDepartmentSelected, setSubDepartmentSelected] = useState<SubDepartment[]>(defaultValue);
    const [subDepartmentOptionSearch, setsubDepartmentOptionSearch] = useState<string>('');

    const subDepartmentOptions = useMemo(() => {
        const subDepartmentUniqueNameList = _.unionBy(subDeparmentList, 'subDepartmentCode');
        return _.sortBy(
            subDepartmentUniqueNameList?.filter(
                subDepartment =>
                    subDepartment.subDepartmentCode.includes(subDepartmentOptionSearch) ||
                    subDepartment.subDepartmentName.toLowerCase().includes(subDepartmentOptionSearch.toLowerCase()),
            ),
            'subDepartmentCode',
        );
    }, [subDeparmentList, subDepartmentOptionSearch]);

    const onCheckHandler = (checked: CheckedState, value: string) => {
        const subDepartmentSelectedValue = subDeparmentList?.find(
            subDepartment => subDepartment.subDepartmentCode === value,
        );
        if (subDepartmentSelectedValue) {
            if (checked) {
                setSubDepartmentSelected(prev => [...prev, subDepartmentSelectedValue]);
            } else {
                setSubDepartmentSelected(prev => {
                    return prev?.filter(value => value.id !== subDepartmentSelectedValue.id);
                });
            }
        }
    };

    const onSubmitCheckedHandler = useCallback(() => {
        if (onSubDepartmentChecked) {
            onSubDepartmentChecked(subDepartmentSelected);
        }
    }, [onSubDepartmentChecked, subDepartmentSelected]);

    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>เลือกข้อมูล Sub Department</DialogTitle>
                </DialogHeader>
                <Input placeholder="ค้นหา" onChange={event => setsubDepartmentOptionSearch(event.target.value)} />

                <div className="max-h-[400px] overflow-auto">
                    {subDepartmentOptions.map(item => (
                        <div className="flex items-center" key={item.id}>
                            <Checkbox
                                checked={subDepartmentSelected?.some(
                                    selected => selected.subDepartmentCode === item.subDepartmentCode,
                                )}
                                onCheckedChange={checked => onCheckHandler(checked, item.subDepartmentCode)}
                            />
                            <p className="ml-2">
                                {item.subDepartmentCode} - {item.subDepartmentName}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onCloseDialog()}>
                        ยกเลิก
                    </Button>
                    <Button onClick={() => onSubmitCheckedHandler()}>ยืนยัน</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SubDepartmentDialog;
