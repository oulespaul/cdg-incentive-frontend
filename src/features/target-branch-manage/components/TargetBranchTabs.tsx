import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BriefcaseBusiness, ChartNoAxesColumnDecreasing, Home, Users } from 'lucide-react';
import TargetInHouseTabContent from './target-inhouse-tab-content';
import TargetDeptTabContent from './target-dept-tab-content';
import TargetDMMDSMSMMTabContent from './target-dmm-dsm-smm-tab-content';
import TargetBranchSummaryTabContent from './target-branch-summary';

interface TargetBranchTabsProps {
    isViewMode: boolean;
}

export const TargetBranchTabs: React.FC<TargetBranchTabsProps> = ({ isViewMode }) => {
    return (
        <Tabs defaultValue="target-in-house" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-secondary">
                <TabsTrigger value="target-in-house">
                    <Home className="mr-2 text-primaryLight" />
                    Target In-house
                </TabsTrigger>
                <TabsTrigger value="target-dept">
                    <BriefcaseBusiness className="mr-2 text-primaryLight" />
                    Target Dept
                </TabsTrigger>
                <TabsTrigger value="target-dmm-dsm-smm">
                    <Users className="mr-2 text-primaryLight" />
                    Target DMM,DSM,SMM
                </TabsTrigger>
                <TabsTrigger value="summary">
                    <ChartNoAxesColumnDecreasing className="mr-2 text-primaryLight" />
                    Summary
                </TabsTrigger>
            </TabsList>

            <TabsContent value="target-in-house">
                <TargetInHouseTabContent isViewMode={isViewMode} />
            </TabsContent>
            <TabsContent value="target-dept">
                <TargetDeptTabContent isViewMode={isViewMode} />
            </TabsContent>
            <TabsContent value="target-dmm-dsm-smm">
                <TargetDMMDSMSMMTabContent isViewMode={isViewMode} />
            </TabsContent>
            <TabsContent value="summary">
                <TargetBranchSummaryTabContent />
            </TabsContent>
        </Tabs>
    );
};
