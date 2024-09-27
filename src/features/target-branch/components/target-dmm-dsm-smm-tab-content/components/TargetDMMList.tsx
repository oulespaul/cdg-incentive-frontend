import { useFetchDepartment } from '@/features/department/api/use-fetch-department';
import { Department } from '@/features/department/models/department';
import { useFetchSubDepartment } from '@/features/sub-department/api/use-fetch-sub-department';
import { SubDepartment } from '@/features/sub-department/models/sub-department';
import { useTargetBranchStore } from '@/features/target-branch/api/use-target-branch-store';
import _ from 'lodash';
import { useState, useEffect, useCallback } from 'react';
import DepartmentDialog from '../../department-dialog';
import SubDepartmentDialog from '../../sub-department-dialog';
import { TargetBranchDataTable } from '../../target-branch-data-table';
import { TargetDMM, targetDMMColumns } from '../constants/target-dmm-columns';

const TargetDMMList = () => {
    const [dialogsOpen, setDialogsOpen] = useState({ department: false, subDepartment: false });
    const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);

    const { targetCommission, targetDMMList, setTargetDMMList } = useTargetBranchStore();
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

    const addRow = () => {
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
                data={
                    targetDMMList?.map((target, index) => ({
                        ...target,
                        id: index + 1,
                    })) ?? []
                }
                isCanAddRow={!_.isEmpty(targetCommission)}
                className="max-h-[300px]"
                meta={{
                    updateData,
                    addRowTitle: 'เพิ่มพนักงาน DMM',
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

export default TargetDMMList;
