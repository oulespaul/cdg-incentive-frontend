import { TargetCommission } from '@/features/target-commission/models/target-commission-response';
import { create } from 'zustand';
import { TargetInHouse } from '../components/target-inhouse-tab-content/constants/target-in-house-columns';
import { TargetDept } from '../components/target-dept-tab-content/constants/target-dept-columns';
import { TargetSMMDSM } from '../components/target-dmm-dsm-smm-tab-content/constants/target-dsm-smm-columns';
import { TargetDMM } from '../components/target-dmm-dsm-smm-tab-content/constants/target-dmm-columns';
import { TargetBranchSummary } from '../components/target-branch-summary';
import { sumAttribute, sumNestedAttribute } from '@/lib/number-utils';

interface TargetBranchState {
    currentBranchId: number | undefined;
    targetCommission: TargetCommission | undefined;
    targetInHouseList: TargetInHouse[];
    targetDeptList: TargetDept[];
    targetSMMDSMList: TargetSMMDSM[];
    targetDMMList: TargetDMM[];
    targetSummary: () => TargetBranchSummary;
    setCurrentBranchId: (branchId: number) => void;
    setTargetCommission: (commission?: TargetCommission) => void;
    setTargetInHouseList: (updateFn: (prevState: TargetInHouse[]) => TargetInHouse[]) => void;
    setTargetDeptList: (updateFn: (prevState: TargetDept[]) => TargetDept[]) => void;
    setTargetSMMDSMList: (updateFn: (prevState: TargetSMMDSM[]) => TargetSMMDSM[]) => void;
    setTargetDMMList: (updateFn: (prevState: TargetDMM[]) => TargetDMM[]) => void;
}

export const useTargetBranchStore = create<TargetBranchState>((set, get) => ({
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
    targetDMMList: [],
    targetSummary: () => {
        const state = get();

        const totalActualSalesLastYearDSM = sumNestedAttribute(
            state.targetSMMDSMList,
            'targetDSMList',
            'actualSalesLastYear',
        );
        const totalActualSalesLastYearDMM = sumAttribute(state.targetDMMList, 'actualSalesLastYear');

        const totalGoalIDDSM = sumNestedAttribute(state.targetSMMDSMList, 'targetDSMList', 'goalId');
        const totalGoalIDDMM = sumAttribute(state.targetDMMList, 'goalId');

        const totalGoalIDLastYearInhouse = state.targetInHouseList.reduce(
            (total, inhouse) => total + (inhouse.actualSalesIDLastYear || 0),
            0,
        );
        const totalGoalIDLastYearDept = sumAttribute(state.targetDeptList, 'actualSalesIDLastYear');

        return {
            totalCommission: state.targetCommission?.targetCommission || 0,
            totalActualSalesLastYear: totalActualSalesLastYearDSM + totalActualSalesLastYearDMM,
            totalGoalID: totalGoalIDDSM + totalGoalIDDMM,
            totalGoalIDLastYear: totalGoalIDLastYearInhouse + totalGoalIDLastYearDept,
        };
    },

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
    setTargetDMMList: (updateFn: (prevState: TargetDMM[]) => TargetDMM[]) => {
        return set(state => {
            return { targetDMMList: updateFn(state.targetDMMList) };
        });
    },
}));
