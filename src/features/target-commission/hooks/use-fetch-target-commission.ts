import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { Page } from "@/models/pagination-response";
import { TargetCommission } from "../../../components/data-table/columns";
import { FilterParams } from "../models/target-commission-filter-params";

const fetchTargetCommission = async (
  filterParams: FilterParams & PaginationState
) => {
  const params = new URLSearchParams({
    page: filterParams.pageIndex.toString(),
    pageSize: filterParams.pageSize.toString(),
    ...(filterParams.month && { month: filterParams.month }),
    ...(filterParams.year && { year: filterParams.year }),
    ...(filterParams.storeNumber && { storeNumber: filterParams.storeNumber }),
    ...(filterParams.storeBU && { storeBU: filterParams.storeBU }),
    ...(filterParams.storeCode && { storeCode: filterParams.storeCode }),
  });

  return await apiClient.get(`/target-commission?${params}`);
};

export const useFetchTargetCommission = (
  filterParams: FilterParams & PaginationState
) => {
  return useQuery<Page<TargetCommission>, unknown>({
    queryFn: async () => {
      const { data } = await fetchTargetCommission(filterParams);
      return data;
    },
    queryKey: ["target-commission"],
  });
};
