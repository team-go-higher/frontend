import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteApplication,
  editApplicationSpecific,
  createNewApplicationSpecific,
} from 'apis/applications';
import { queryKeys } from 'apis/queryKeys';
import { useNavigate } from 'react-router-dom';
import { IApplicationSpecific } from 'types/interfaces/Application';

const useMutateApplication = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [queryKeys.APPLICATIONS] });
  };

  const onError = (error: any) => {
    alert(error.response.data.error.message);
  };

  const registerApplicationMutation = useMutation({
    mutationFn: (newApplicationData: IApplicationSpecific) =>
      createNewApplicationSpecific(newApplicationData),
    onSuccess: () => {
      onSuccess();
      navigate('/applicationStatus');
    },
    onError: error => onError(error),
  });

  const deleteApplicationMutation = useMutation({
    mutationFn: (applicationId: number) => deleteApplication(applicationId),
    onSuccess: () => {
      onSuccess();
      navigate('/applicationStatus');
    },
    onError: error => onError(error),
  });

  const editApplicationMutation = useMutation({
    mutationFn: ({
      applicationId,
      newApplicationData,
    }: {
      applicationId: number;
      newApplicationData: IApplicationSpecific;
    }) => editApplicationSpecific(applicationId, newApplicationData),
    onSuccess: applicationId => {
      onSuccess();
      navigate(`/application/${applicationId}`);
    },
    onError: error => onError(error),
  });

  return {
    registerApplicationMutation,
    deleteApplicationMutation,
    editApplicationMutation,
  };
};

export default useMutateApplication;
