import { useInfiniteQuery } from '@tanstack/react-query';
import { getApplications } from 'apis/applications';
import { queryKeys } from 'apis/queryKeys';
import { ApplicationProcess, ApplicationSort } from 'types/interfaces/Application';

interface useInfiniteApplicationsProps {
  companyName: string;
  sort: ApplicationSort;
  process: ApplicationProcess;
  complete: boolean | null;
}

const useInfiniteApplications = ({
  companyName,
  sort,
  process,
  complete,
}: useInfiniteApplicationsProps) => {
  const { data, status, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [queryKeys.APPLICATIONS, companyName, sort, process, complete],
      queryFn: async ({ pageParam = 1 }) =>
        getApplications(pageParam, companyName, sort, process, complete),
      initialPageParam: 1,
      getNextPageParam: lastPage => (lastPage.data.hasNext ? lastPage.data.pageNumber + 1 : null),
      select: data => data.pages.flatMap(page => page.data.content),
    });

  const handlePage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const canLoadMore = status !== 'error' && hasNextPage;

  const isLoading = isFetching || isFetchingNextPage;

  return {
    data,
    handlePage,
    canLoadMore,
    isLoading,
  };
};

export default useInfiniteApplications;
