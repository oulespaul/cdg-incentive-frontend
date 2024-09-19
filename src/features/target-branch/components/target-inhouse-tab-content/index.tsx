import { Card } from '@/components/ui/card';
import { TargetBranchDataTable } from '../target-branch-data-table';
import { useCallback, useState } from 'react';
import { TargetInHouse, targetInHouseColumns } from './constants/target-in-house-columns';
import BrandDialog from '../brand-dialog';
import { Brand } from '@/features/brand/models/brand';
import { useFetchBrand } from '@/features/brand/hooks/use-fetch-branch';
import { useTargetBranchStore } from '../../hooks/use-target-branch-store';
import _ from 'lodash';

const TargetInHouseTabContent = () => {
    const [brandDialogOpen, setBrandDialogOpen] = useState(false);
    const [currentRowIndex, setCurrentRowIndex] = useState<number | null>(null);

    const { targetCommission, targetInHouseList, setTargetInHouseList } = useTargetBranchStore();

    const { data: brandList } = useFetchBrand();

    const handleBrandSelected = useCallback(
        (brandSelected: Brand | undefined) => {
            if (!brandSelected || currentRowIndex === null) return;
            setTargetInHouseList(old =>
                old.map((row, index) => {
                    if (index === currentRowIndex) {
                        return {
                            ...old[currentRowIndex]!,
                            departmentCode: brandSelected.departmentCode,
                            departmentName: brandSelected.departmentName,
                            subDepartmentCode: brandSelected.subDepartmentCode,
                            subDepartmentName: brandSelected.subDepartmentName,
                            brandId: brandSelected.id,
                            brandName: brandSelected.brandName,
                        };
                    }
                    return row;
                }),
            );
            setBrandDialogOpen(false); // Close the dialog
        },
        [currentRowIndex],
    );

    const openBrandDialog = useCallback((rowIndex: number) => {
        setCurrentRowIndex(rowIndex);
        setBrandDialogOpen(true); // Open the dialog
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
                            actualSalesIdLastYear: undefined,
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
