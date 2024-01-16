import { useCallback, useMemo, useState } from 'react';

export const usePagination = <T>(data: Array<T>, pageSize = 15) => {
  const [currentPage, setCurrentPage] = useState(0);
  const paginatedData = useMemo(() => data.slice(0, (currentPage + 1) * pageSize), [data, currentPage]);

  const nextPage = useCallback(() => {
    setCurrentPage(page => page + 1);
  }, []);

  const resetPage = useCallback(() => {
    setCurrentPage(0);
  }, []);

  return {
    paginatedData,
    nextPage,
    resetPage,
  };
};
