import { useQuery } from '@tanstack/react-query';
import { getApplicationSpecific } from 'apis/applications';
import { queryKeys } from 'apis/queryKeys';

const useFetchApplication = (applicationId: number) => {
  return useQuery({
    queryKey: [queryKeys.APPLICATIONS, applicationId],
    queryFn: () => getApplicationSpecific(applicationId),
    enabled: !!applicationId,
  });
};

export default useFetchApplication;
