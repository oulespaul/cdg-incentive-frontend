import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { TargetCommissionFilterOption } from "../models/target-commission-filter-option";

const fetchTargetCommissionFilter = async (key: string) => {
  return await apiClient.get(`/target-commission/filter/${key}`);
};

export const useFetchTargetCommissionYearFilter = () => {
  return useQuery<TargetCommissionFilterOption[], unknown>({
    queryFn: async () => {
      const { data } = await fetchTargetCommissionFilter("year");
      return data;
    },
    queryKey: ["target-commission/filter/year"],
  });
};

export const useFetchTargetCommissionMonthFilter = () => {
  return useQuery<TargetCommissionFilterOption[], unknown>({
    queryFn: async () => {
      const { data } = await fetchTargetCommissionFilter("month");
      return data;
    },
    queryKey: ["target-commission/filter/month"],
  });
};

export const useFetchTargetCommissionBranchFilter = () => {
  return useQuery<TargetCommissionFilterOption[], unknown>({
    queryFn: async () => {
      const { data } = await fetchTargetCommissionFilter("branch");
      return data;
    },
    queryKey: ["target-commission/filter/branch"],
  });
};
