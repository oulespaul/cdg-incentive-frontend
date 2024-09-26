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
import { TargetDSM } from '../constants/target-dsm-smm-columns';
import { targetDMMColumns } from '../constants/target-dmm-columns';

const TargetDMMList = () => {
    const [departmentDialogOpen, setDepartmentDialogOpen] = useState(false);
    const [subDepartmentDialogOpen, setSubDepartmentDialogOpen] = useState(false);
    const [smmId, setSMMId] = useState('');
    const [targetDSMList, setTargetDSMList] = useState<TargetDSM[]>([]);

    const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);

    const { targetCommission } = useTargetBranchStore();

    const { data: departmentList } = useFetchDepartment();
    const { data: subDepartmentList, refetch: refetchSubDepartmentList } = useFetchSubDepartment({
        departmentId: targetDSMList[currentRowIndex]?.department?.id,
    });

    useEffect(() => {
        refetchSubDepartmentList();
    }, [targetDSMList[currentRowIndex]?.department?.id]);

    const onDepartmentSelectedHandler = useCallback(
        (departmentSelected: Department | undefined) => {
            if (!departmentSelected || currentRowIndex === null) return;
            setTargetDSMList(prevTargetSMMDSMList => {
                return prevTargetSMMDSMList.map((row, index) => {
                    if (index === currentRowIndex) {
                        return {
                            ...prevTargetSMMDSMList[currentRowIndex]!,
                            department: departmentSelected,
                        };
                    }
                    return row;
                });
            });
            setDepartmentDialogOpen(false);
        },
        [currentRowIndex],
    );

    const onSubDepartmentSelectedHandler = useCallback(
        (subDepartmentSelected: SubDepartment | undefined) => {
            if (!subDepartmentSelected || currentRowIndex === null) return;
            setTargetDSMList(prevTargetSMMDSMList => {
                return prevTargetSMMDSMList.map((row, index) => {
                    if (index === currentRowIndex) {
                        return {
                            ...prevTargetSMMDSMList[currentRowIndex]!,
                            subDepartment: subDepartmentSelected,
                        };
                    }
                    return row;
                });
            });
            setSubDepartmentDialogOpen(false);
        },
        [currentRowIndex],
    );

    const openDepartmentDialog = useCallback((rowIndex: number) => {
        setCurrentRowIndex(rowIndex);
        setDepartmentDialogOpen(true);
    }, []);

    const openSubDepartmentDialog = useCallback((rowIndex: number) => {
        setCurrentRowIndex(rowIndex);
        setSubDepartmentDialogOpen(true);
    }, []);

    return (
        <>
            <TargetBranchDataTable
                columns={targetDMMColumns}
                data={targetDSMList.map((target, index) => ({ ...target, id: index + 1 })) ?? []}
                isCanAddRow={!_.isEmpty(targetCommission)}
                className="max-h-[300px]"
                meta={{
                    updateData: (rowIndex, columnId, value) => {
                        setTargetDSMList(old =>
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
                    addRowTitle: 'เพิ่มพนักงาน DMM',
                    addRow: () => {
                        const newRow = {
                            id: undefined,
                            dsmId: '',
                            department: undefined,
                            subDepartment: undefined,
                            goalDept: '',
                            actualSalesLastYear: '',
                            goalId: '',
                            actualSalesIDLastYear: '',
                        };
                        setTargetDSMList((old: TargetDSM[]) => [...old, newRow]);
                    },
                    removeRow: (rowIndex: number) => {
                        setTargetDSMList((old: TargetDSM[]) =>
                            old.filter((_row: TargetDSM, index: number) => index !== rowIndex),
                        );
                    },
                    selectedDepartment: openDepartmentDialog,
                    selectedSubDepartment: openSubDepartmentDialog,
                }}
            />

            {departmentDialogOpen && (
                <DepartmentDialog
                    departmentList={departmentList}
                    onSelected={onDepartmentSelectedHandler}
                    onCloseDialog={() => setDepartmentDialogOpen(false)}
                />
            )}

            {subDepartmentDialogOpen && (
                <SubDepartmentDialog
                    subSubDepartmentList={subDepartmentList}
                    onSelected={onSubDepartmentSelectedHandler}
                    onCloseDialog={() => setSubDepartmentDialogOpen(false)}
                />
            )}
        </>
    );
};

export default TargetDMMList;
