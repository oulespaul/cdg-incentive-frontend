import { Input } from '@/components/ui/input';
import { useFetchDepartment } from '@/features/department/api/use-fetch-department';
import { Department } from '@/features/department/models/department';
import { useFetchSubDepartment } from '@/features/sub-department/api/use-fetch-sub-department';
import { SubDepartment } from '@/features/sub-department/models/sub-department';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import DepartmentDialog from '../../department-dialog';
import SubDepartmentDialog from '../../sub-department-dialog';
import { TargetBranchDataTable } from '../../target-branch-data-table';
import { TargetDSM, targetDSMSMMColumns } from '../constants/target-dsm-smm-columns';
import { useTargetBranchStore } from '@/features/target-branch-manage/hooks/use-target-branch-store';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TargetDSMSMMListProps {
    smmRowIndex: number;
    isViewMode: boolean;
}

const TargetDSMSMMList: React.FC<TargetDSMSMMListProps> = ({ smmRowIndex, isViewMode }) => {
    const [dialogsOpen, setDialogsOpen] = useState({ department: false, subDepartment: false });
    const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);

    const { targetCommission, targetSMMDSMList, setTargetSMMDSMList, isTargetBranchLoading } = useTargetBranchStore();
    const currentDepartmentId = targetSMMDSMList[smmRowIndex]?.targetDSMList[currentRowIndex]?.department?.id;
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

    const handleSMMIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTargetSMMDSMList(prevList =>
            prevList.map((row, index) => (index === smmRowIndex ? { ...row, smmId: e.target.value } : row)),
        );
    };

    const updateData = (rowIndex: number, columnId: string, value: any) => {
        setTargetSMMDSMList(prevList =>
            prevList.map((row, index) => {
                if (index === smmRowIndex) {
                    return {
                        ...row,
                        targetDSMList: row.targetDSMList.map((target, targetIndex) =>
                            targetIndex === rowIndex ? { ...target, [columnId]: value } : target,
                        ),
                    };
                }
                return row;
            }),
        );
    };

    const removeRow = (rowIndex: number) => {
        setTargetSMMDSMList(prevList =>
            prevList.map((row, index) => {
                if (index === smmRowIndex) {
                    return {
                        ...row,
                        targetDSMList: row.targetDSMList.filter((_, targetIndex) => targetIndex !== rowIndex),
                    };
                }
                return row;
            }),
        );
    };

    return (
        <>
            <div className="flex text-start mb-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-gray-500">รหัสพนักงาน SMM</Label>
                    {isViewMode ? (
                        targetSMMDSMList[smmRowIndex].smmId
                    ) : (
                        <Input id="smm_id" onChange={handleSMMIdChange} value={targetSMMDSMList[smmRowIndex].smmId} />
                    )}
                </div>
            </div>

            <TargetBranchDataTable
                columns={targetDSMSMMColumns}
                data={targetSMMDSMList[smmRowIndex]?.targetDSMList ?? []}
                isCanAddRow={!_.isEmpty(targetCommission) && !isViewMode}
                className="max-h-[300px]"
                isLoading={isTargetBranchLoading}
                columnVisibility={{ action: !isViewMode }}
                meta={{
                    updateData,
                    addRowButton: () => {
                        const addRowHandler = () => {
                            const newRow: TargetDSM = {
                                id: undefined,
                                dsmId: '',
                                department: undefined,
                                subDepartment: undefined,
                                goalDept: '',
                                actualSalesLastYear: '',
                                goalId: '',
                                actualSalesIDLastYear: '',
                            };
                            setTargetSMMDSMList(prevList =>
                                prevList.map((row, index) =>
                                    index === smmRowIndex
                                        ? { ...row, targetDSMList: [...row.targetDSMList, newRow] }
                                        : row,
                                ),
                            );
                        };

                        return (
                            <Button onClick={addRowHandler} variant="outlineSuccess">
                                <Plus className="mr-2" /> เพิ่มพนักงาน DSM
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

export default TargetDSMSMMList;
