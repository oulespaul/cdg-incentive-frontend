import CreateIncentiveScheme from '@/features/incentive-scheme-management/components/create-incentive-scheme';
import { IncentiveManageMode, IncentiveManageModeTitleMapping } from '@/features/incentive-scheme-management/constants/incentive-manage-mode-title-mapping';
import { useParams } from 'react-router-dom';

export const IncentiveSchemeManagementManagePage = () => {
    const { mode } = useParams<{ mode: IncentiveManageMode }>();

    if (mode == null) return

    return (
        <div className="flex flex-col">
            <div className="flex text-start">
                <h1 className="text-2xl font-medium">{IncentiveManageModeTitleMapping[mode]}</h1>
            </div>

            {mode === "create" && <CreateIncentiveScheme />}
        </div>
    );
};
