import { useQuery } from '@tanstack/react-query';
import { fetchDetailApplication } from 'apis/application';
import { queryKeys } from 'apis/queryKeys';
import { IApplication } from 'types/interfaces/Application';

interface UseFetchApplicationResult {
  application: IApplication | undefined;
  status: 'error' | 'success' | 'pending';
}

const useFetchApplication = (applicationId: number): UseFetchApplicationResult => {
  const { data: application, status } = useQuery({
    queryKey: [queryKeys.APPLICATION, 'fetchDetailApplication', applicationId],
    queryFn: () => fetchDetailApplication(applicationId),
    enabled: !!applicationId,
  });

  return { application, status };
};

export default useFetchApplication;
