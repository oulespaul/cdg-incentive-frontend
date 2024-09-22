import { Card } from '@/components/ui/card';
import { TargetBranchDataTable } from '../target-branch-data-table';
import { useCallback, useState } from 'react';
import { TargetInHouse, targetInHouseColumns } from './constants/target-in-house-columns';
import BrandDialog from '../brand-dialog';
import { Brand } from '@/features/brand/models/brand';
import { useTargetBranchStore } from '../../api/use-target-branch-store';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useFetchBrand } from '@/features/brand/api/use-fetch-branch';

const TargetInHouseTabContent = () => {
    const [brandDialogOpen, setBrandDialogOpen] = useState(false);
    const [currentRowIndex, setCurrentRowIndex] = useState<number | null>(null);

    const { targetCommission, targetInHouseList, setTargetInHouseList } = useTargetBranchStore();

    const { data: brandList } = useFetchBrand();

    const handleBrandSelected = useCallback(
        (brandSelected: Brand | undefined) => {
            if (!brandSelected || currentRowIndex === null) return;
            if (targetInHouseList.some(target => target.brandId === brandSelected.id)) {
                toast.error(
                    <div className="flex flex-col text-start">
                        <p className="text-sm font-bold text-ref-400">แบรนด์นี้มีข้อมูลอยูู่แล้ว</p>
                        <p className="mt-2 text-xs">ไม่สามารถเพิ่มแบรนด์ได้ กรุณาลองใหม่อีกครั้ง</p>
                    </div>,
                    { position: 'bottom-right' },
                );
                return;
            }

            setTargetInHouseList(prevTargetInHouseList => {
                return prevTargetInHouseList.map((row, index) => {
                    if (index === currentRowIndex) {
                        return {
                            ...prevTargetInHouseList[currentRowIndex]!,
                            departmentCode: brandSelected.departmentCode,
                            departmentName: brandSelected.departmentName,
                            subDepartmentCode: brandSelected.subDepartmentCode,
                            subDepartmentName: brandSelected.subDepartmentName,
                            brandId: brandSelected.id,
                            brandName: brandSelected.brandName,
                        };
                    }
                    return row;
                });
            });
            setBrandDialogOpen(false);
        },
        [currentRowIndex, JSON.stringify(targetInHouseList)],
    );

    const openBrandDialog = useCallback((rowIndex: number) => {
        setCurrentRowIndex(rowIndex);
        setBrandDialogOpen(true);
    }, []);

    return (
        <Card>
            <TargetBranchDataTable
                columns={targetInHouseColumns}
                data={targetInHouseList.map((target, index) => ({ ...target, id: index + 1 })) ?? []}
                isCanAddRow={!_.isEmpty(targetCommission)}
                meta={{
                    updateData: (rowIndex, columnId, value) => {
                        setTargetInHouseList(old =>
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
                    addRowTitle: 'เพิ่ม Group',
                    addRow: () => {
                        const newRow: TargetInHouse = {
                            id: undefined,
                            departmentCode: '',
                            departmentName: '',
                            subDepartmentCode: '',
                            subDepartmentName: '',
                            brandId: undefined,
                            brandName: '',
                            groupBrand: '',
                            goalBrand: undefined,
                            actualSalesIDLastYear: undefined,
                        };
                        setTargetInHouseList((old: TargetInHouse[]) => [...old, newRow]);
                    },
                    removeRow: (rowIndex: number) => {
                        setTargetInHouseList((old: TargetInHouse[]) =>
                            old.filter((_row: TargetInHouse, index: number) => index !== rowIndex),
                        );
                    },
                    selectedBrand: openBrandDialog,
                }}
            />

            {brandDialogOpen && (
                <BrandDialog
                    brandList={brandList}
                    onBandSelected={handleBrandSelected}
                    onCloseDialog={() => setBrandDialogOpen(false)}
                />
            )}
        </Card>
    );
};

export default TargetInHouseTabContent;
