import { Card } from '@/components/ui/card';
import _ from 'lodash';
import { useTargetBranchStore } from '../../api/use-target-branch-store';
import TargetDSMSMMList from './components/TargetDSMList';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TargetSMMDSM } from './constants/target-dsm-smm-columns';
import { Separator } from '@/components/ui/separator';
import TargetDMMList from './components/TargetDMMList';

const TargetDMMDSMSMMTabContent = () => {
    const { targetCommission, targetSMMDSMList, setTargetSMMDSMList } = useTargetBranchStore();
    console.log("🚀 ~ TargetDMMDSMSMMTabContent ~ targetSMMDSMList:", targetSMMDSMList)

    return (
        <Card className="p-4">
            {targetSMMDSMList.map((targetSMMDSM, index) => (
                <div className="mb-2" key={`${targetSMMDSM.id}-${index}`}>
                    <TargetDSMSMMList smmRowIndex={index} />

                    {!_.isEmpty(targetCommission) && index === targetSMMDSMList.length - 1 && (
                        <div className="flex mt-2">
                            <Button
                                onClick={() => {
                                    const newRow = {
                                        id: undefined,
                                        smmId: '',
                                        targetDSMList: [],
                                    };
                                    setTargetSMMDSMList((old: TargetSMMDSM[]) => [...old, newRow]);
                                }}
                                variant="outline"
                            >
                                <Plus className="mr-2" /> เพิ่มพนักงาน SMM
                            </Button>
                        </div>
                    )}
                    <Separator className="mt-4" />
                </div>
            ))}

            <div className="mt-2">
                <TargetDMMList />
            </div>
        </Card>
    );
};

export default TargetDMMDSMSMMTabContent;
