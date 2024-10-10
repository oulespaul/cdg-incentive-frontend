import {
    TargetInhouseRequest,
    TargetDeptRequest,
    TargetSMMDSMRequest,
    TargetDMMRequest,
} from '../api/use-create-target-branch';
import { TargetDept } from '../components/target-dept-tab-content/constants/target-dept-columns';
import { TargetDMM } from '../components/target-dmm-dsm-smm-tab-content/constants/target-dmm-columns';
import { TargetSMMDSM } from '../components/target-dmm-dsm-smm-tab-content/constants/target-dsm-smm-columns';
import { TargetInHouse } from '../components/target-inhouse-tab-content/constants/target-in-house-columns';

export const mapToInhouseRequest = (targetInhouse: TargetInHouse): TargetInhouseRequest => ({
    brandId: targetInhouse.brandId,
    groupBrand: targetInhouse.groupBrand,
    goalBrand: targetInhouse.goalBrand,
    actualSalesIDLastYear: targetInhouse.actualSalesIDLastYear,
});

export const mapToTargetDeptRequest = (targetDept: TargetDept): TargetDeptRequest => ({
    groupDept: targetDept.groupDept,
    goalDept: targetDept.goalDept,
    actualSalesIDLastYear: targetDept.actualSalesIDLastYear,
    subDepartmentPool: targetDept?.subDepartmentPool?.map(sub => sub.id) ?? [],
});

export const mapToTargetSMMDSMRequest = (targetSMMDSM: TargetSMMDSM): TargetSMMDSMRequest => ({
    smmId: targetSMMDSM.smmId,
    targetDSMList: targetSMMDSM.targetDSMList.map(targetDSM => ({
        dsmId: targetDSM.dsmId,
        departmentId: targetDSM.department?.id,
        subDepartmentId: targetDSM.subDepartment?.id,
        goalDept: targetDSM.goalDept,
        actualSalesLastYear: targetDSM.actualSalesLastYear,
        goalId: targetDSM.goalId,
        actualSalesIDLastYear: targetDSM.actualSalesIDLastYear,
    })),
});

export const mapToTargetDMMRequest = (targetDMM: TargetDMM): TargetDMMRequest => ({
    dmmId: targetDMM.dmmId,
    departmentId: targetDMM.department?.id,
    subDepartmentId: targetDMM.subDepartment?.id,
    goalDept: targetDMM.goalDept,
    actualSalesLastYear: targetDMM.actualSalesLastYear,
    goalId: targetDMM.goalId,
    actualSalesIDLastYear: targetDMM.actualSalesIDLastYear,
});
