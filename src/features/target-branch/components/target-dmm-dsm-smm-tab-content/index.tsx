import { Card } from '@/components/ui/card';
import { TargetBranchDataTable } from '../target-branch-data-table';
import { useCallback, useState } from 'react';
import _ from 'lodash';
import { useTargetBranchStore } from '../../api/use-target-branch-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { targetDMMDSMSMMColumns, TargetSMMDSM } from './constants/target-dmm-dsm-smm-columns';
import { useFetchDepartment } from '@/features/department/api/use-fetch-department';
import DepartmentDialog from '../department-dialog';
import { Department } from '@/features/department/models/department';

const TargetDMMDSMSMMTabContent = () => {
    const [departmentDialogOpen, setDepartmentDialogOpen] = useState(false);
    const [currentRowIndex, setCurrentRowIndex] = useState<number | null>(null);

    const { targetCommission, targetDeptList, setTargetDeptList } = useTargetBranchStore();

    const { data: departmentList } = useFetchDepartment();

    const onDepartmentSelectedHandler = useCallback(
        (brandSelected: Department | undefined) => {
            if (!brandSelected || currentRowIndex === null) return;
            // setTargetInHouseList(prevTargetInHouseList => {
            //     return prevTargetInHouseList.map((row, index) => {
            //         if (index === currentRowIndex) {
            //             return {
            //                 ...prevTargetInHouseList[currentRowIndex]!,
            //                 departmentCode: brandSelected.departmentCode,
            //                 departmentName: brandSelected.departmentName,
            //                 subDepartmentCode: brandSelected.subDepartmentCode,
            //                 subDepartmentName: brandSelected.subDepartmentName,
            //                 brandId: brandSelected.id,
            //                 brandName: brandSelected.brandName,
            //             };
            //         }
            //         return row;
            //     });
            // });
            setDepartmentDialogOpen(false);
        },
        [currentRowIndex],
    );

    const openBrandDialog = useCallback((rowIndex: number) => {
        setCurrentRowIndex(rowIndex);
        setDepartmentDialogOpen(true);
    }, []);

    return (
        <Card className="p-4">
            <div className="flex text-start mb-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="smm_id">รหัสพนักงาน SMM</Label>
                    <Input id="smm_id" value="" onChange={e => {}} />
                </div>
            </div>

            <TargetBranchDataTable
                columns={targetDMMDSMSMMColumns}
                data={targetDeptList.map((target, index) => ({ ...target, id: index + 1 })) ?? []}
                isCanAddRow={!_.isEmpty(targetCommission)}
                className="max-h-[300px]"
                meta={{
                    updateData: (rowIndex, columnId, value) => {
                        setTargetDeptList(old =>
                            old.map((row, index) => {
                                if (index === rowIndex) {
                                    return {
                                        ...old[rowIndex]!,
                                        [columnId]: value,
                                    };
                                }
                                return row;
                            }),
                        );
                    },
                    addRowTitle: 'เพิ่มพนักงาน DSM',
                    addRow: () => {
                        const newRow = {
                            id: undefined,
                            groupDept: '',
                            subDepartmentPool: [],
                            goalDept: undefined,
                            actualSalesIDLastYear: undefined,
                        };
                        setTargetDeptList((old: TargetSMMDSM[]) => [...old, newRow]);
                    },
                    removeRow: (rowIndex: number) => {
                        setTargetDeptList((old: TargetSMMDSM[]) =>
                            old.filter((_row: TargetSMMDSM, index: number) => index !== rowIndex),
                        );
                    },
                    selectedBrand: openBrandDialog,
                }}
            />

            {departmentDialogOpen && (
                <DepartmentDialog
                    departmentList={departmentList}
                    onSelected={onDepartmentSelectedHandler}
                    onCloseDialog={() => setDepartmentDialogOpen(false)}
                />
            )}
        </Card>
    );
};

export default TargetDMMDSMSMMTabContent;
