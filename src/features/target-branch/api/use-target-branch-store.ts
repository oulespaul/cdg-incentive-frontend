import { TargetCommission } from '@/features/target-commission/models/target-commission-response';
import { create } from 'zustand';
import { TargetInHouse } from '../components/target-inhouse-tab-content/constants/target-in-house-columns';
import { TargetDept } from '../components/target-dept-tab-content/constants/target-dept-columns';
import { TargetSMMDSM } from '../components/target-dmm-dsm-smm-tab-content/constants/target-dsm-smm-columns';

interface TargetBranchState {
    currentBranchId: number | undefined;
    targetCommission: TargetCommission | undefined;
    targetInHouseList: TargetInHouse[];
    targetDeptList: TargetDept[];
    targetSMMDSMList: TargetSMMDSM[];
    setCurrentBranchId: (branchId: number) => void;
    setTargetCommission: (commission?: TargetCommission) => void;
    setTargetInHouseList: (updateFn: (prevState: TargetInHouse[]) => TargetInHouse[]) => void;
    setTargetDeptList: (updateFn: (prevState: TargetDept[]) => TargetDept[]) => void;
    setTargetSMMDSMList: (updateFn: (prevState: TargetSMMDSM[]) => TargetSMMDSM[]) => void;
}

export const useTargetBranchStore = create<TargetBranchState>(set => ({
    currentBranchId: 1,
    targetCommission: undefined,
    targetInHouseList: [],
    targetDeptList: [],
    targetSMMDSMList: [
        {
            id: undefined,
            smmId: '',
            targetDSMList: [],
        },
    ],
    setCurrentBranchId: (branchId: number) => set({ currentBranchId: branchId }),
    setTargetCommission: (targetCommission?: TargetCommission) => set({ targetCommission }),
    setTargetInHouseList: (updateFn: (prevState: TargetInHouse[]) => TargetInHouse[]) => {
        return set(state => {
            return { targetInHouseList: updateFn(state.targetInHouseList) };
        });
    },
    setTargetDeptList: (updateFn: (prevState: TargetDept[]) => TargetDept[]) => {
        return set(state => {
            return { targetDeptList: updateFn(state.targetDeptList) };
        });
    },
    setTargetSMMDSMList: (updateFn: (prevState: TargetSMMDSM[]) => TargetSMMDSM[]) => {
        return set(state => {
            return { targetSMMDSMList: updateFn(state.targetSMMDSMList) };
        });
    },
}));
