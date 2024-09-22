import { TargetCommission } from '@/features/target-commission/models/target-commission-response';
import { create } from 'zustand';
import { TargetInHouse } from '../components/target-inhouse-tab-content/constants/target-in-house-columns';
import { TargetDept } from '../components/target-dept-tab-content/constants/target-dept-columns';

interface TargetBranchState {
    currentBranchId: number | undefined;
    targetCommission: TargetCommission | undefined;
    targetInHouseList: TargetInHouse[];
    targetDeptList: TargetDept[];
    setCurrentBranchId: (branchId: number) => void;
    setTargetCommission: (commission?: TargetCommission) => void;
    setTargetInHouseList: (updateFn: (prevState: TargetInHouse[]) => TargetInHouse[]) => void;
    setTargetDeptList: (updateFn: (prevState: TargetDept[]) => TargetDept[]) => void;
}

export const useTargetBranchStore = create<TargetBranchState>(set => ({
    currentBranchId: 1,
    targetCommission: undefined,
    targetInHouseList: [],
    targetDeptList: [],
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
}));
