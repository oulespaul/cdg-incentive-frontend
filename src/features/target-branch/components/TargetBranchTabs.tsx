import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BriefcaseBusiness, ChartNoAxesColumnDecreasing, Home, Users } from 'lucide-react';
import TargetInHouseTabContent from './target-inhouse-tab-content';
import TargetDeptTabContent from './target-dept-tab-content';

export const TargetBranchTabs = () => {
    return (
        <Tabs defaultValue="target-in-house" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-secondary">
                <TabsTrigger value="target-in-house" className="text-primary">
                    <Home className="mr-2" />
                    Target In-house
                </TabsTrigger>
                <TabsTrigger value="target-dept" className="text-primary">
                    <BriefcaseBusiness className="mr-2" />
                    Target Dept
                </TabsTrigger>
                <TabsTrigger value="target-dmm-dsm-smm" className="text-primary">
                    <Users className="mr-2" />
                    Target DMM,DSM,SMM
                </TabsTrigger>
                <TabsTrigger value="summary" className="text-primary">
                    <ChartNoAxesColumnDecreasing className="mr-2" />
                    Summary
                </TabsTrigger>
            </TabsList>
            <TabsContent value="target-in-house">
                <TargetInHouseTabContent />
            </TabsContent>
            <TabsContent value="target-dept">
                <TargetDeptTabContent />
            </TabsContent>
            <TabsContent value="target-dmm-dsm-smm" className="pt-60">
                <h1>Target DMM,DSM,SMM Content</h1>
            </TabsContent>
            <TabsContent value="summary" className="pt-60">
                Summary
            </TabsContent>
        </Tabs>
    );
};
