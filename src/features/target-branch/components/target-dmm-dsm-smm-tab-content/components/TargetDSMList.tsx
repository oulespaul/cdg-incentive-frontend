import { Input } from '@/components/ui/input';
import { useFetchDepartment } from '@/features/department/api/use-fetch-department';
import { Department } from '@/features/department/models/department';
import { useFetchSubDepartment } from '@/features/sub-department/api/use-fetch-sub-department';
import { SubDepartment } from '@/features/sub-department/models/sub-department';
import { useTargetBranchStore } from '@/features/target-branch/api/use-target-branch-store';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import DepartmentDialog from '../../department-dialog';
import SubDepartmentDialog from '../../sub-department-dialog';
import { TargetBranchDataTable } from '../../target-branch-data-table';
import { TargetDSM, targetDSMSMMColumns } from '../constants/target-dsm-smm-columns';

interface TargetDSMSMMListProps {
    smmRowIndex: number;
}

const TargetDSMSMMList: React.FC<TargetDSMSMMListProps> = ({ smmRowIndex }) => {
    const [dialogsOpen, setDialogsOpen] = useState({ department: false, subDepartment: false });
    const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);

    const { targetCommission, targetSMMDSMList, setTargetSMMDSMList } = useTargetBranchStore();
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

    const addRow = () => {
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
                index === smmRowIndex ? { ...row, targetDSMList: [...row.targetDSMList, newRow] } : row,
            ),
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
                    <Label>รหัสพนักงาน SMM</Label>
                    <Input id="smm_id" onChange={handleSMMIdChange} />
                </div>
            </div>

            <TargetBranchDataTable
                columns={targetDSMSMMColumns}
                data={
                    targetSMMDSMList[smmRowIndex]?.targetDSMList?.map((target, index) => ({
                        ...target,
                        id: index + 1,
                    })) ?? []
                }
                isCanAddRow={!_.isEmpty(targetCommission)}
                className="max-h-[300px]"
                meta={{
                    updateData,
                    addRowTitle: 'เพิ่มพนักงาน DSM',
                    addRow,
                    removeRow,
                    selectedDepartment: rowIndex => openDialog('department', rowIndex),
                    selectedSubDepartment: rowIndex => openDialog('subDepartment', rowIndex),
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
