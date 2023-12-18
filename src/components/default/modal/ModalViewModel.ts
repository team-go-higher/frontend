import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import ModalModel from './ModalModel';
import { modalModeType } from 'hooks/useModal';
import { formatProcessToKor } from 'utils/process';
import { processType } from 'types/interfaces/KanbanProcess';
interface IProps {
  mode: modalModeType;
  modalIsOpen: boolean;
  closeModal: () => void;
  currentProcessType: processType;
  fetchedProcessData: any;
  applicationInfo: any;
}

const ModalViewModel = ({
  mode,
  modalIsOpen,
  closeModal,
  currentProcessType,
  fetchedProcessData,
  applicationInfo,
}: IProps) => {
  const model = new ModalModel();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    setError,
    clearErrors,
    watch,
    formState: { errors, defaultValues },
  } = useForm({
    mode: 'onSubmit',
  });

  function invalidateKanbanListOnSuccess() {
    queryClient.invalidateQueries('fetchKanbanList');
  }

  const registerMutation = useMutation(model.registerApplication, {
    onSuccess() {
      invalidateKanbanListOnSuccess();
    },
  });

  const editMutation = useMutation(model.editApplication, {
    onSuccess() {
      invalidateKanbanListOnSuccess();
    },
  });

  const updateProcessMutation = useMutation(model.updateProcess, {
    onSuccess() {
      invalidateKanbanListOnSuccess();
      closeModal();
    },
  });

  function isDetailedProcessTypeRequired() {
    if (getValues('processType') === 'TO_APPLY' || getValues('processType') === 'DOCUMENT') {
      return false;
    } else {
      return true;
    }
  }

  async function handleApplicationSubmission() {
    if (mode === 'simpleRegister') {
      const newApplicationData = {
        companyName: getValues('companyName'),
        position: getValues('position'),
        url: getValues('url'),
        currentProcess: {
          type: getValues('processType'),
          description:
            getValues('detailedProcessType') === ''
              ? formatProcessToKor(getValues('processType'))
              : getValues('detailedProcessType'),
          schedule: getValues('schedule'),
        },
      };

      registerMutation.mutate(newApplicationData);
    } else if (mode === 'simpleEdit') {
      const editApplicationData = {
        companyName: getValues('companyName'),
        position: getValues('position'),
        processId: applicationInfo.process.id,
        schedule: getValues('schedule'),
        url: getValues('url'),
      };

      editMutation.mutate({
        editApplicationData,
        applicationId: applicationInfo.applicationId,
      });
    } else if (mode === 'updateCurrentProcess') {
      const newProcessData = {
        type: getValues('processType'),
        description:
          getValues('detailedProcessType') === ''
            ? getValues('processType')
            : getValues('detailedProcessType'),
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
  }

  return {
    register,
    handleSubmit,
    setValue,
    getValues,
    defaultValues,
    errors,
    setError,
    clearErrors,
    reset,
    watch,
    handleApplicationSubmission,
    isDetailedProcessTypeRequired,
    mode,
    currentProcessType,
    fetchedProcessData,
    applicationInfo,
  };
};

export default ModalViewModel;
