import { Card } from '@/components/ui/card';
import { TargetBranchDataTable } from '../target-branch-data-table';
import { useCallback, useState } from 'react';
import { TargetDept, targetDeptColumns } from './constants/target-dept-columns';
import _ from 'lodash';
import { useTargetBranchStore } from '../../api/use-target-branch-store';
import SubDepartmentDialog from '../sub-dept-dialog';
import { SubDepartment } from '@/features/sub-department/models/sub-department';
import { useFetchSubDepartment } from '@/features/sub-department/api/use-fetch-sub-department';

const TargetDeptTabContent = () => {
    const [subDepartmentDialogOpen, setSubDepartmentDialogOpen] = useState(false);
    const [currentRowIndex, setCurrentRowIndex] = useState<number | null>(null);

    const { targetCommission, targetDeptList, setTargetDeptList } = useTargetBranchStore();

    const { data: subDeparmentList } = useFetchSubDepartment();

    const handleSubDepartmentChecked = useCallback(
        (subDepartmentSelected: SubDepartment[] | undefined) => {
            if (!subDepartmentSelected || currentRowIndex === null) return;
            setTargetDeptList(old =>
                old.map((row, index) => {
                    if (index === currentRowIndex) {
                        return {
                            ...old[currentRowIndex]!,
                            subDepartmentPool: subDepartmentSelected,
                        };
                    }
                    return row;
                }),
            );
            setSubDepartmentDialogOpen(false); // Close the dialog
        },
        [currentRowIndex],
    );

    const openBrandDialog = useCallback((rowIndex: number) => {
        setCurrentRowIndex(rowIndex);
        setSubDepartmentDialogOpen(true); // Open the dialog
    }, []);

    return (
        <Card>
            <TargetBranchDataTable
                columns={targetDeptColumns}
                data={targetDeptList.map((target, index) => ({ ...target, id: index + 1 })) ?? []}
                isCanAddRow={!_.isEmpty(targetCommission)}
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
                    addRow: () => {
                        const newRow = {
                            id: undefined,
                            groupDept: '',
                            subDepartmentPool: [],
                            goalDept: undefined,
                            actualSalesIDLastYear: undefined,
                        };
                        setTargetDeptList((old: TargetDept[]) => [...old, newRow]);
                    },
                    removeRow: (rowIndex: number) => {
                        setTargetDeptList((old: TargetDept[]) =>
                            old.filter((_row: TargetDept, index: number) => index !== rowIndex),
                        );
                    },
                    selectedBrand: openBrandDialog,
                }}
            />

            {subDepartmentDialogOpen && (
                <SubDepartmentDialog
                    subDeparmentList={subDeparmentList}
                    onSubDepartmentChecked={handleSubDepartmentChecked}
                    onCloseDialog={() => setSubDepartmentDialogOpen(false)}
                    defaultValue={targetDeptList[currentRowIndex ?? 0]['subDepartmentPool'] ?? []}
                />
            )}
        </Card>
    );
};

export default TargetDeptTabContent;
