import { Separator } from '@/components/ui/separator';
import { formatThaiCurrency, handleFalsyOrInfinite } from '@/lib/number-utils';
import { useTargetBranchStore } from '../../api/use-target-branch-store';
import { Spinner } from '@/components/spinner';

export interface TargetBranchSummary {
    totalCommission: number;
    totalActualSalesLastYear: number;
    totalGoalID: number;
    totalGoalIDLastYear: number;
}

const TargetBranchSummaryTabContent = () => {
    const { totalCommission, totalActualSalesLastYear, totalGoalID, totalGoalIDLastYear } = useTargetBranchStore(
        state => state.targetSummary(),
    );

    const { isTargetBranchLoading } = useTargetBranchStore();

    const changeCommissionTotalPercentage =
        ((totalCommission - totalActualSalesLastYear) / totalActualSalesLastYear) * 100 || 0;

    const changeIDTotalPercentage = ((totalGoalID - totalGoalIDLastYear) / totalGoalIDLastYear) * 100 || 0;

    const targetBranchSummaryList = [
        {
            title: '1. เป้า commission (เป้าสาขา)',
            description: 'Commission Total',
            total: formatThaiCurrency(totalCommission, ' บาท'),
        },
        {
            title: '2. ยอดขายของปีที่แล้วในเดือนเดียวกัน',
            description: 'Actual Sales',
            total: formatThaiCurrency(totalActualSalesLastYear, ' บาท'),
        },
        {
            title: '3. เป้าหมายพนักงานห้าง',
            description: 'ID Total',
            total: formatThaiCurrency(totalGoalID, ' บาท'),
        },
        {
            title: '4. ยอดขายของพนักงานห้าง ของปีที่แล้วในเดือนเดียวกัน  ',
            description: 'Actual ID Total',
            total: formatThaiCurrency(totalGoalIDLastYear, ' บาท'),
        },
        {
            title: '5. อัตราการเติบโตของเป้า commission (เป้าสาขา)',
            description: '% Change Commission Total',
            total: (
                <p className={`${changeCommissionTotalPercentage < 0 ? 'text-red-500' : ''}`}>
                    {formatThaiCurrency(handleFalsyOrInfinite(changeCommissionTotalPercentage, 0), ' %')}
                </p>
            ),
        },
        {
            title: '6. อัตราการเติบโตของเป้าหมายพนักงานห้าง',
            description: '% Change ID Total',
            total: (
                <p className={`${changeIDTotalPercentage < 0 ? 'text-red-500' : ''}`}>
                    {formatThaiCurrency(handleFalsyOrInfinite(changeIDTotalPercentage, 0), ' %')}
                </p>
            ),
        },
    ];

    if (isTargetBranchLoading) {
        return (
            <div className="flex justify-center mt-32">
                <Spinner className="text-primaryLight" />
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-start p-4">
            {targetBranchSummaryList.map(targetBranchSummary => (
                <div key={targetBranchSummary.title}>
                    <div className="flex justify-between py-2">
                        <div>
                            {targetBranchSummary.title}
                            <span className="ml-2 text-sm text-gray-600">{targetBranchSummary.description}</span>
                        </div>
                        <div>{targetBranchSummary.total}</div>
                    </div>
                    <Separator />
                </div>
            ))}
        </div>
    );
};

export default TargetBranchSummaryTabContent;
