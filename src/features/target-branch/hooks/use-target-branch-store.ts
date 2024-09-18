import { TargetCommission } from '@/features/target-commission/models/target-commission-response';
import { create } from 'zustand';
import { TargetInHouse } from '../components/target-inhouse-tab-content/constants/target-in-house-columns';

interface TargetBranchState {
    currentBranchId: number | undefined;
    targetCommission: TargetCommission | undefined;
    targetInHouseList: TargetInHouse[];
    setCurrentBranchId: (branchId: number) => void;
    setTargetCommission: (commission?: TargetCommission) => void;
    setTargetInHouseList: (updateFn: (prevState: TargetInHouse[]) => TargetInHouse[]) => void;
}

export const useTargetBranchStore = create<TargetBranchState>(set => ({
    currentBranchId: 1,
    targetCommission: undefined,
    targetInHouseList: [],
    setCurrentBranchId: (branchId: number) => set({ currentBranchId: branchId }),
    setTargetCommission: (targetCommission?: TargetCommission) => set({ targetCommission }),
    setTargetInHouseList: (updateFn: (prevState: TargetInHouse[]) => TargetInHouse[]) => {
        return set(state => {
            return { targetInHouseList: updateFn(state.targetInHouseList) };
        });
    },
}));
