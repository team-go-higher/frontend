import { useMutation, useQueryClient } from '@tanstack/react-query';

import ModalModel from './ModalModel';
import { modalModeType } from 'hooks/feature/useModal';
import { formatProcessToKor } from 'utils/process';
import { processType } from 'types/interfaces/KanbanProcess';
import { FieldValues } from 'react-hook-form';
interface IProps {
  mode: modalModeType;
  closeModal: () => void;
  currentProcessType: processType;
  fetchedProcessData?: any;
  applicationInfo: any;
}
export interface IFormValues {
  companyName: string;
  position: string;
  url: string;
  processType: processType;
  detailedProcessType: string;
  schedule: string;
}

export type handleApplicationSubmissionType = (formValues: FieldValues) => Promise<void>;

const ModalViewModel = ({
  mode,
  closeModal,
  currentProcessType,
  fetchedProcessData,
  applicationInfo,
}: IProps) => {
  const model = new ModalModel();
  const queryClient = useQueryClient();

  function invalidateKanbanListOnSuccess() {
    queryClient.invalidateQueries({ queryKey: ['fetchKanbanList'] });
  }

  const registerMutation = useMutation({
    mutationFn: model.registerApplication,
    onSuccess: invalidateKanbanListOnSuccess,
  });

  const editMutation = useMutation({
    mutationFn: model.editApplication,
    onSuccess: invalidateKanbanListOnSuccess,
  });

  const updateProcessMutation = useMutation({
    mutationFn: model.updateProcess,
    onSuccess: invalidateKanbanListOnSuccess,
  });

  const handleApplicationSubmission: handleApplicationSubmissionType = async formValues => {
    const { companyName, position, url, processType, detailedProcessType, schedule } = formValues;

    if (mode === 'simpleRegister') {
      const newApplicationData = {
        companyName,
        position,
        url,
        currentProcess: {
          type: processType,
          description:
            detailedProcessType === '' ? formatProcessToKor(processType) : detailedProcessType,
          schedule,
        },
      };
      registerMutation.mutate(newApplicationData);
    } else if (mode === 'simpleEdit') {
      const editApplicationData = {
        companyName,
        position,
        processId: applicationInfo.process.id,
        schedule,
        url,
      };
      editMutation.mutate({
        editApplicationData,
        applicationId: applicationInfo.applicationId,
      });
    } else if (mode === 'updateCurrentProcess') {
      const newProcessData = {
        type: processType,
        description: detailedProcessType === '' ? processType : detailedProcessType,
      };

      const data = await model.createNewProcess(applicationInfo.applicationId, newProcessData);
      if (data.success) {
        updateProcessMutation.mutate({
          applicationId: applicationInfo.applicationId,
          processId: data.data.id,
        });
      }
    }
    closeModal();
  };

  return {
    handleApplicationSubmission,
    mode,
    currentProcessType,
    fetchedProcessData,
    applicationInfo,
  };
};

export default ModalViewModel;
