import { Separator } from '@/components/ui/separator';
import { formatThaiCurrency } from '@/lib/number-utils';

const TargetBranchSummaryTabContent = () => {
    const targetBranchSummaryList = [
        {
            title: '1. เป้า commission (เป้าสาขา)',
            description: 'Commission Total',
            total: formatThaiCurrency(65000000, ' บาท'),
        },
        {
            title: '2. ยอดขายของปีที่แล้วในเดือนเดียวกัน',
            description: 'Actual Sales',
            total: formatThaiCurrency(73000000, ' บาท'),
        },
        {
            title: '3. เป้าหมายพนักงานห้าง',
            description: 'ID Total',
            total: formatThaiCurrency(500000, ' บาท'),
        },
        {
            title: '4. ยอดขายของพนักงานห้าง ของปีที่แล้วในเดือนเดียวกัน  ',
            description: 'Actual ID Total',
            total: formatThaiCurrency(680000, ' บาท'),
        },
        {
            title: '5. อัตราการเติบโตของเป้า commission (เป้าสาขา)',
            description: '% Change Commission Total',
            total: formatThaiCurrency(3, ' %'),
        },
        {
            title: '6. อัตราการเติบโตของเป้าหมายพนักงานห้าง',
            description: '% Change ID Total',
            total: formatThaiCurrency(-2.3, ' %'),
        },
    ];
    return (
        <div className="flex flex-col justify-start p-4">
            {targetBranchSummaryList.map(targetBranchSummary => (
                <>
                    {' '}
                    <div className="flex justify-between py-2">
                        <div>
                            {targetBranchSummary.title}
                            <span className="ml-2 text-sm text-gray-600">{targetBranchSummary.description}</span>
                        </div>
                        <div>{targetBranchSummary.total}</div>
                    </div>
                    <Separator />
                </>
            ))}
        </div>
    );
};

export default TargetBranchSummaryTabContent;
