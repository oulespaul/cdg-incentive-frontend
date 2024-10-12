import { useFetchDepartment } from '@/features/department/api/use-fetch-department';
import { Department } from '@/features/department/models/department';
import { useFetchSubDepartment } from '@/features/sub-department/api/use-fetch-sub-department';
import { SubDepartment } from '@/features/sub-department/models/sub-department';
import _ from 'lodash';
import { useState, useEffect, useCallback } from 'react';
import DepartmentDialog from '../../department-dialog';
import SubDepartmentDialog from '../../sub-department-dialog';
import { TargetBranchDataTable } from '../../target-branch-data-table';
import { TargetDMM, targetDMMColumns } from '../constants/target-dmm-columns';
import { useTargetBranchStore } from '@/features/target-branch-manage/hooks/use-target-branch-store';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TargetDMMListProps {
    isViewMode: boolean;
}

const TargetDMMList: React.FC<TargetDMMListProps> = ({ isViewMode }) => {
    const [dialogsOpen, setDialogsOpen] = useState({ department: false, subDepartment: false });
    const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);

    const { targetCommission, targetDMMList, setTargetDMMList, isTargetBranchLoading } = useTargetBranchStore();
    const currentDepartmentId = targetDMMList[currentRowIndex]?.department?.id;
    const { data: departmentList } = useFetchDepartment();
    const { data: subDepartmentList, refetch: refetchSubDepartmentList } = useFetchSubDepartment({
        departmentId: currentDepartmentId,
    });

    useEffect(() => {
        if (currentDepartmentId) {
            refetchSubDepartmentList();
        }
    }, [currentDepartmentId, refetchSubDepartmentList]);

    const onDepartmentSelected = useCallback(
        (departmentSelected: Department | undefined) => {
            if (departmentSelected) {
                updateData(currentRowIndex, 'department', departmentSelected);
                setDialogsOpen(prev => ({ ...prev, department: false }));
            }
        },
        [currentRowIndex],
    );

    const onSubDepartmentSelected = useCallback(
        (subDepartmentSelected: SubDepartment | undefined) => {
            if (subDepartmentSelected) {
                updateData(currentRowIndex, 'subDepartment', subDepartmentSelected);
                setDialogsOpen(prev => ({ ...prev, subDepartment: false }));
            }
        },
        [currentRowIndex],
    );

    const openDialog = useCallback((dialogType: 'department' | 'subDepartment', rowIndex: number) => {
        setCurrentRowIndex(rowIndex);
        setDialogsOpen(prev => ({ ...prev, [dialogType]: true }));
    }, []);

    const updateData = (rowIndex: number, columnId: string, value: any) => {
        setTargetDMMList(old =>
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
    };

    const removeRow = (rowIndex: number) => {
        setTargetDMMList((old: TargetDMM[]) => old.filter((_row: TargetDMM, index: number) => index !== rowIndex));
    };

    return (
        <>
            <TargetBranchDataTable
                columns={targetDMMColumns}
                data={targetDMMList ?? []}
                isCanAddRow={!_.isEmpty(targetCommission) && !isViewMode}
                isLoading={isTargetBranchLoading}
                columnVisibility={{ action: !isViewMode }}
                className="max-h-[300px]"
                meta={{
                    updateData,
                    addRowButton: () => {
                        const addRowHandler = () => {
                            const newRow = {
                                id: undefined,
                                dmmId: '',
                                department: undefined,
                                subDepartment: undefined,
                                goalDept: '',
                                actualSalesLastYear: '',
                                goalId: '',
                                actualSalesIDLastYear: '',
                            };
                            setTargetDMMList((old: TargetDMM[]) => [...old, newRow]);
                        };

                        return (
                            <Button onClick={addRowHandler} variant="outlineSuccess">
                                <Plus className="mr-2" /> เพิ่มพนักงาน DMM
                            </Button>
                        );
                    },
                    removeRow,
                    selectedDepartment: rowIndex => openDialog('department', rowIndex),
                    selectedSubDepartment: rowIndex => openDialog('subDepartment', rowIndex),
                    isViewMode,
                }}
            />

            {dialogsOpen.department && (
                <DepartmentDialog
                    departmentList={departmentList}
                    onSelected={onDepartmentSelected}
                    onCloseDialog={() => setDialogsOpen(prev => ({ ...prev, department: false }))}
                />
            )}

            {dialogsOpen.subDepartment && (
                <SubDepartmentDialog
                    subSubDepartmentList={subDepartmentList}
                    onSelected={onSubDepartmentSelected}
                    onCloseDialog={() => setDialogsOpen(prev => ({ ...prev, subDepartment: false }))}
                />
            )}
        </>
    );
};

export default TargetDMMList;
