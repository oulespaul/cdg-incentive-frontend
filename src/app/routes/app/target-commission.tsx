import { TargetCommissionList } from '@/features/target-commission/components/target-commission-list';

export const TargetCommissionPage = () => {
    return (
        <div className="flex flex-col">
            <div className="flex text-start">
                <h1 className="text-2xl font-medium">นำเข้าเป้า commission (เป้าสาขา)</h1>
            </div>

            <TargetCommissionList />
        </div>
    );
};
