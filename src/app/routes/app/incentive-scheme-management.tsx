import { IncentiveSchemeList } from '@/features/incentive-scheme-management/components/incentive-scheme-list';

export const IncentiveSchemeManagementPage = () => {
    return (
        <div className="flex flex-col">
            <div className="flex text-start">
                <h1 className="text-2xl font-medium">จัดการ Incentive Scheme</h1>
            </div>

            <IncentiveSchemeList />
        </div>
    );
};
