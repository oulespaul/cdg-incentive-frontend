import { apiClient } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { Employee } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const createIncentiveSchemeInputSchema = z.object({
    schemeName: z.string().min(1, 'กรุณาระบุชื่อ Scheme'),
    schemeKey: z.string().min(1, 'กรุณาระบุชื่อ Key'),
    targetUsing: z.string().min(1, 'กรุณาระบุชื่อ Target ที่ใช้'),
    segmentIdList: z.array(z.number()).refine((value) => value.some((item) => item), {
        message: "กรุณาเลือก Segment ที่ใช้คำนวณ อย่างน้อย 1 segment",
    }),
    departmentIdList: z.array(z.number()).refine((value) => value.some((item) => item), {
        message: "กรุณาเลือก Department ที่ใช้คำนวณ อย่างน้อย 1 department",
    }),
    stepCalculationList: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "กรุณาเลือก Step การคำนวณ อย่างน้อย 1 step",
    }),
    isCalculateShrinkgate: z.string().min(1, 'กรุณาเลือกความต้องการคำนวณค่าสินค้าสูญหาย'),
    isRequireBrandData: z.string().min(1, 'กรุณาเลือกความต้องการข้อมูล Brand ในการคำนวณ'),
    majorCalculationUnit: z.string().min(1, 'กรุณาเลือกหน่วยคำนวณ'),
    minorCalculationUnit: z.string().optional(),
    specialRewardCalculationUnit: z.string().optional(),
    specialRewardCalculationMethod: z.string().optional(),
    majorGroupCalculationList: z.array(z.object({
        groupName: z.string().min(1, 'กรุณาระบุชื่อ Group'),
        minTargetPerHead: z.number().optional(),
        maxTargetPerHead: z.number().optional(),
        majorCalculationList: z.array(z.object({
            incentive: z.number().optional(),
        })),
        minorCalculationList: z.array(z.object({
            incentive: z.number().optional(),
        }))
    })),
    majorCalculationRangeList: z.array(z.object({
        minIncentive: z.number().optional(),
        maxIncentive: z.number().optional(),
    })),
    specialRewardCalculationList: z.array(z.object({
        minSale: z.number().optional(),
        maxSale: z.number().optional(),
        totalReward: z.number().optional(),
    }))
});

export type CreateIncentiveSchemeInput = z.infer<typeof createIncentiveSchemeInputSchema>;

const createIncentiveScheme = ({ data }: { data: CreateIncentiveSchemeInput }): Promise<Employee> => {
    return apiClient.post("/incentive-scheme", data);
};

export const useCreateIncentiveScheme = (mutationConfig: MutationConfig<typeof createIncentiveScheme>) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        mutationFn: createIncentiveScheme,
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: ['incentive-scheme'],
            });
            onSuccess?.(...args);
        },
        ...restConfig,
    });
};
