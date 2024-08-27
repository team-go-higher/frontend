import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteApplication,
  editDetailApplication,
  registerDetailApplication,
} from 'apis/application';
import { queryKeys } from 'apis/queryKeys';
import { IApplication } from 'types/interfaces/Application';

interface UseMutateApplicationResult {
  handleRegisterApplication: (newApplicationData: IApplication) => void;
  handleDeleteApplication: (applicationId: number) => void;
  handleEditApplication: (applicationId: number, newApplicationData: IApplication) => void;
}

const useMutateCartItems = (): UseMutateApplicationResult => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [queryKeys.APPLICATION] });
  };

  const onError = (error: any) => {
    alert(error.response.data.error.message);
  };

  const registerMutation = useMutation({
    mutationFn: (newApplicationData: IApplication) => registerDetailApplication(newApplicationData),
    onSuccess,
    onError: error => onError(error),
  });

  const deleteMutation = useMutation({
    mutationFn: (applicationId: number) => deleteApplication(applicationId),
    onSuccess,
    onError: error => onError(error),
  });

  const editMutation = useMutation({
    mutationFn: ({
      applicationId,
      newApplicationData,
    }: {
      applicationId: number;
      newApplicationData: IApplication;
    }) => editDetailApplication(applicationId, newApplicationData),
    onSuccess,
    onError: error => onError(error),
  });

  const handleRegisterApplication = (newApplicationData: IApplication) => {
    registerMutation.mutate(newApplicationData);
  };

  const handleDeleteApplication = (applicationId: number) => {
    deleteMutation.mutate(applicationId);
  };

  const handleEditApplication = (applicationId: number, newApplicationData: IApplication) => {
    editMutation.mutate({ applicationId, newApplicationData });
  };

  return {
    handleRegisterApplication,
    handleDeleteApplication,
    handleEditApplication,
  };
};

export default useMutateCartItems;
