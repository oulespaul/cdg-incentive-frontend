import { TargetCommission } from '@/features/target-commission/models/target-commission-response';
import { create } from 'zustand';
import { TargetInHouse } from '../components/target-inhouse-tab-content/constants/target-in-house-columns';
import { TargetDept } from '../components/target-dept-tab-content/constants/target-dept-columns';
import { TargetSMMDSM } from '../components/target-dmm-dsm-smm-tab-content/constants/target-dsm-smm-columns';
import { TargetDMM } from '../components/target-dmm-dsm-smm-tab-content/constants/target-dmm-columns';
import { TargetBranchSummary } from '../components/target-branch-summary';
import { sumAttribute, sumNestedAttribute } from '@/lib/number-utils';
import { Status } from '@/lib/status-color-utils';

export interface TargetBranchWorkflow {
    id: number | undefined;
    status: Status | undefined;
    requestedAt: Date | undefined;
    requestedBy: string | undefined;
    approvedAt: Date | undefined;
    approvedBy: string | undefined;
    rejectedAt: Date | undefined;
    rejectedBy: string | undefined;
    rejectedReason: string | undefined;
    calculatedAt: Date | undefined;
    calculatedBy: string | undefined;
    createdAt: Date | undefined;
    createdBy: string | undefined;
}
interface TargetBranchState {
    currentBranchId: number | undefined;
    targetWorkflow: TargetBranchWorkflow | undefined;
    targetCommission: TargetCommission | undefined;
    targetInHouseList: TargetInHouse[];
    targetDeptList: TargetDept[];
    targetSMMDSMList: TargetSMMDSM[];
    targetDMMList: TargetDMM[];
    targetSummary: () => TargetBranchSummary;
    isTargetBranchLoading: boolean;
    setCurrentBranchId: (branchId: number) => void;
    setTargetCommission: (commission?: TargetCommission) => void;
    setTargetInHouseList: (updateFn: (prevState: TargetInHouse[]) => TargetInHouse[]) => void;
    setTargetDeptList: (updateFn: (prevState: TargetDept[]) => TargetDept[]) => void;
    setTargetSMMDSMList: (updateFn: (prevState: TargetSMMDSM[]) => TargetSMMDSM[]) => void;
    setTargetDMMList: (updateFn: (prevState: TargetDMM[]) => TargetDMM[]) => void;
    setTargetWorkflow: (targetWorkflow?: TargetBranchWorkflow) => void;
    resetState: () => void;
    setIsTargetBranchLoading: (isLoading: boolean) => void;
}

export const useTargetBranchStore = create<TargetBranchState>((set, get) => ({
    currentBranchId: 1,
    targetWorkflow: {
        id: undefined,
        status: undefined,
        requestedAt: undefined,
        requestedBy: undefined,
        approvedAt: undefined,
        approvedBy: undefined,
        rejectedAt: undefined,
        rejectedBy: undefined,
        rejectedReason: undefined,
        calculatedAt: undefined,
        calculatedBy: undefined,
        createdAt: undefined,
        createdBy: undefined,
    },
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
    isTargetBranchLoading: false,
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
    setTargetWorkflow: (targetWorkflow?: TargetBranchWorkflow) => set({ targetWorkflow }),
    resetState: () => {
        return set(() => {
            return {
                targetWorkflow: {
                    id: undefined,
                    status: undefined,
                    requestedAt: undefined,
                    requestedBy: undefined,
                    approvedAt: undefined,
                    approvedBy: undefined,
                    rejectedAt: undefined,
                    rejectedBy: undefined,
                    rejectedReason: undefined,
                    calculatedAt: undefined,
                    calculatedBy: undefined,
                    createdAt: undefined,
                    createdBy: undefined,
                },
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
            };
        });
    },
    setIsTargetBranchLoading: (isTargetBranchLoading: boolean) => set({ isTargetBranchLoading }),
}));
