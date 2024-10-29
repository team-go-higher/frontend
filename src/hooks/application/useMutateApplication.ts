import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteApplication,
  editApplicationSpecific,
  createNewApplicationSpecific,
  patchApplicationsFinished,
} from 'apis/applications';
import { queryKeys } from 'apis/queryKeys';
import { IApplicationSpecific } from 'types/interfaces/Application';

const useMutateApplication = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [queryKeys.APPLICATIONS] });
  };

  const onError = (error: any) => {
    alert(error.response.data.error.message);
  };

  const registerApplicationMutation = useMutation({
    mutationFn: (newApplicationData: IApplicationSpecific) =>
      createNewApplicationSpecific(newApplicationData),
    onSuccess,
    onError,
  });

  const deleteApplicationMutation = useMutation({
    mutationFn: (applicationId: number) => deleteApplication(applicationId),
    onSuccess,
    onError,
  });

  const editApplicationMutation = useMutation({
    mutationFn: ({
      applicationId,
      newApplicationData,
    }: {
      applicationId: number;
      newApplicationData: IApplicationSpecific;
    }) => editApplicationSpecific(applicationId, newApplicationData),
    onSuccess,
    onError,
  });

  const applicationFinishedMutation = useMutation({
    mutationFn: ({ applicationId, isCompleted }: { applicationId: number; isCompleted: boolean }) =>
      patchApplicationsFinished(applicationId, isCompleted),
    onSuccess,
    onError,
  });

  return {
    registerApplicationMutation,
    deleteApplicationMutation,
    editApplicationMutation,
    applicationFinishedMutation,
  };
};

export default useMutateApplication;
