import { Card } from '@/components/ui/card';
import { TargetBranchDataTable } from '../target-branch-data-table';
import { useCallback, useState } from 'react';
import { TargetDept, targetDeptColumns } from './constants/target-dept-columns';
import _ from 'lodash';
import { useTargetBranchStore } from '../../hooks/use-target-branch-store';
import SubDepartmentPoolDialog from '../sub-dept-pool-dialog';
import { SubDepartment } from '@/features/sub-department/models/sub-department';
import { useFetchSubDepartment } from '@/features/sub-department/api/use-fetch-sub-department';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TargetDeptTabContentProps {
    isViewMode: boolean;
}

const TargetDeptTabContent: React.FC<TargetDeptTabContentProps> = ({ isViewMode }) => {
    const [subDepartmentDialogOpen, setSubDepartmentDialogOpen] = useState(false);
    const [currentRowIndex, setCurrentRowIndex] = useState<number | null>(null);

    const { targetCommission, targetDeptList, setTargetDeptList, isTargetBranchLoading } = useTargetBranchStore();

    const { data: subDeparmentList } = useFetchSubDepartment({});

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
            setSubDepartmentDialogOpen(false);
        },
        [currentRowIndex],
    );

    const openSubDepartmentDialog = useCallback((rowIndex: number) => {
        setCurrentRowIndex(rowIndex);
        setSubDepartmentDialogOpen(true);
    }, []);

    return (
        <Card>
            <TargetBranchDataTable
                columns={targetDeptColumns}
                data={targetDeptList ?? []}
                isCanAddRow={!_.isEmpty(targetCommission) && !isViewMode}
                isLoading={isTargetBranchLoading}
                columnVisibility={{ action: !isViewMode }}
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
                    addRowButton: () => {
                        const addRowHandler = () => {
                            const newRow = {
                                id: undefined,
                                groupDept: '',
                                subDepartmentPool: [],
                                goalDept: undefined,
                                actualSalesIDLastYear: undefined,
                            };
                            setTargetDeptList((old: TargetDept[]) => [...old, newRow]);
                        };

                        return (
                            <Button onClick={addRowHandler} variant="success">
                                <Plus className="mr-2" /> เพิ่ม Group
                            </Button>
                        );
                    },
                    removeRow: (rowIndex: number) => {
                        setTargetDeptList((old: TargetDept[]) =>
                            old.filter((_row: TargetDept, index: number) => index !== rowIndex),
                        );
                    },
                    selectedSubDepartmentPool: openSubDepartmentDialog,
                    isViewMode,
                }}
            />

            {subDepartmentDialogOpen && (
                <SubDepartmentPoolDialog
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
