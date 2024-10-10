import { useUser } from '@/app/contexts/user-context';
import { TargetBranchList } from '@/features/target-branch/target-branch-list';

export const TargetBranchPage = () => {
    const { user } = useUser();

    return (
        <div className="flex flex-col">
            <div className="flex justify-between text-start">
                <h1 className="text-2xl font-medium">จัดการเป้าสาขา</h1>
                {user?.branch && (
                    <h2 className="text-xl font-medium">
                        สาขา: {user?.branch?.branchNumber} - {user?.branch?.name}
                    </h2>
                )}
            </div>

            <TargetBranchList />
        </div>
    );
};
