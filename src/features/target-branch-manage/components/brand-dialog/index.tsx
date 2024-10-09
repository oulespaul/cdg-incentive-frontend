import _ from 'lodash';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useCallback, useMemo, useState } from 'react';
import { Brand } from '@/features/brand/models/brand';

interface BrandDialogProps {
    brandList: Brand[] | undefined;
    onBandSelected?: (brandSelected: Brand | undefined) => void;
    onCloseDialog: () => void;
}

const BrandDialog = ({ brandList, onBandSelected, onCloseDialog }: BrandDialogProps) => {
    const [brandSelected, setBrandSelected] = useState<Brand>();
    const [brandOptionSearch, setBrandOptionSearch] = useState<string>('');

    const brandOptions = useMemo(() => {
        const brandUniqueNameList = _.unionBy(brandList, 'brandName');
        return brandUniqueNameList?.filter(brand =>
            brand.brandName.toLowerCase().includes(brandOptionSearch.toLowerCase()),
        );
    }, [brandList, brandOptionSearch]);

    const onSelectedHandler = (value: string) => {
        const brandSelectedValue = brandList?.find(brand => brand.id.toString() === value);
        setBrandSelected(brandSelectedValue);
    };

    const onSubmitSelectedHandler = useCallback(() => {
        if (onBandSelected) {
            onBandSelected(brandSelected);
        }
    }, [onBandSelected, brandSelected]);

    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>เลือกข้อมูล Brand</DialogTitle>
                </DialogHeader>

                <Input placeholder="ค้นหา" onChange={event => setBrandOptionSearch(event.target.value)} />

                <RadioGroup
                    value={brandSelected?.id.toString()}
                    className="max-h-[400px] overflow-auto"
                    onValueChange={onSelectedHandler}
                >
                    {brandOptions?.map(brand => (
                        <div className="flex items-center space-x-2" key={brand.id}>
                            <RadioGroupItem value={brand.id.toString()} id={brand.id.toString()} />
                            <Label>{brand.brandName}</Label>
                        </div>
                    ))}
                </RadioGroup>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onCloseDialog()}>
                        ยกเลิก
                    </Button>
                    <Button onClick={() => onSubmitSelectedHandler()}>ยืนยัน</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BrandDialog;
