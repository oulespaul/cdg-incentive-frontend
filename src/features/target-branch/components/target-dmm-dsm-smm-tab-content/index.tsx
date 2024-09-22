import { Card } from '@/components/ui/card';
import { TargetBranchDataTable } from '../target-branch-data-table';
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { useTargetBranchStore } from '../../api/use-target-branch-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { targetDMMDSMSMMColumns, TargetSMMDSM } from './constants/target-dmm-dsm-smm-columns';
import { useFetchDepartment } from '@/features/department/api/use-fetch-department';
import DepartmentDialog from '../department-dialog';
import { Department } from '@/features/department/models/department';
import SubDepartmentDialog from '../sub-department-dialog';
import { useFetchSubDepartment } from '@/features/sub-department/api/use-fetch-sub-department';
import { SubDepartment } from '@/features/sub-department/models/sub-department';

const TargetDMMDSMSMMTabContent = () => {
    const [departmentDialogOpen, setDepartmentDialogOpen] = useState(false);
    const [subDepartmentDialogOpen, setSubDepartmentDialogOpen] = useState(false);

    const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);

    const { targetCommission, targetSMMDSMList, setTargetSMMDSMList } = useTargetBranchStore();

    const { data: departmentList } = useFetchDepartment();
    const { data: subDepartmentList, refetch: refetchSubDepartmentList } = useFetchSubDepartment({
        departmentId: targetSMMDSMList[currentRowIndex]?.department?.id,
    });

    useEffect(() => {
        refetchSubDepartmentList();
    }, [targetSMMDSMList[currentRowIndex]?.department?.id]);

    const onDepartmentSelectedHandler = useCallback(
        (departmentSelected: Department | undefined) => {
            if (!departmentSelected || currentRowIndex === null) return;
            setTargetSMMDSMList(prevTargetSMMDSMList => {
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
            setTargetSMMDSMList(prevTargetSMMDSMList => {
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
        <Card className="p-4">
            <div className="flex text-start mb-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="smm_id">รหัสพนักงาน SMM</Label>
                    <Input id="smm_id" value="" onChange={e => {}} />
                </div>
            </div>

            <TargetBranchDataTable
                columns={targetDMMDSMSMMColumns}
                data={targetSMMDSMList.map((target, index) => ({ ...target, id: index + 1 })) ?? []}
                isCanAddRow={!_.isEmpty(targetCommission)}
                className="max-h-[300px]"
                meta={{
                    updateData: (rowIndex, columnId, value) => {
                        setTargetSMMDSMList(old =>
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
                            smmId: '',
                            department: undefined,
                            subDepartment: undefined,
                            goalDept: '',
                            actualSalesLastYear: '',
                            goalId: '',
                            actualSalesIDLastYear: '',
                        };
                        setTargetSMMDSMList((old: TargetSMMDSM[]) => [...old, newRow]);
                    },
                    removeRow: (rowIndex: number) => {
                        setTargetSMMDSMList((old: TargetSMMDSM[]) =>
                            old.filter((_row: TargetSMMDSM, index: number) => index !== rowIndex),
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
        </Card>
    );
};

export default TargetDMMDSMSMMTabContent;
