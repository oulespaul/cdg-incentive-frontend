import { useState } from "react";

const initialPagination = {
  pageSize: 10,
  pageIndex: 0,
}

export const usePagination = () => {
  const [pagination, setPagination] = useState(initialPagination);

  const resetPaginationState = () => {
    setPagination(initialPagination)
  }

  return {
    onPaginationChange: setPagination,
    resetPaginationState,
    pagination,
  };
};
