import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import ModalModel from './ModalModel';
import { formatProcessToKor } from 'utils/process';

interface IProps {
  mode: string;
  modalIsOpen: boolean;
  closeModal: () => void;
  currentProcessType: string;
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
  const queryClient = useQueryClient();
  const model = new ModalModel();

  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [detailDropDownToggle, setDetailDropDownToggle] = useState(false);
  const [userInputToggle, setUserInputToggle] = useState(false);

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

  const detailedProcessType = watch('detailedProcessType');

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

  // 전형 or 세부단계 드롭박스 토글 함수
  function dropDownToggleHandler(dropDownId: string) {
    if (dropDownId === 'processType') {
      setDropDownToggle(!dropDownToggle);
      setDetailDropDownToggle(false);
    } else {
      setDetailDropDownToggle(!detailDropDownToggle);
    }
  }

  // 세부단계 유효성 검사 함수
  function validationProcess() {
    if (isDetailedProcessTypeRequired()) {
      if (!detailedProcessType) {
        setError('detailedProcessType', {
          type: 'required',
          message: '세부 단계를 선택하세요',
        });
      } else {
        clearErrors('detailedProcessType');
      }
    }
  }

  // 전형 or 세부 단계 선택시 실행 함수
  function dropDownItemHandler(dropDownId: string, process: string) {
    if (dropDownId === 'processType') {
      setValue('processType', process);
      setValue('detailedProcessType', '');
      setDropDownToggle(!dropDownToggle);
    } else {
      setValue('detailedProcessType', process);
      setDetailDropDownToggle(!detailDropDownToggle);
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

  function getResetValues() {
    if (!modalIsOpen) {
      return {
        companyName: '',
        processType: '',
        detailedProcessType: '',
        position: '',
        schedule: '',
        url: '',
      };
    }

    const processType = currentProcessType ? currentProcessType : applicationInfo.process.type;

    const detailedProcessType =
      mode === 'updateCurrentProcess'
        ? applicationInfo.processDescription.length > 0
          ? applicationInfo.processDescription[0].description
          : ''
        : applicationInfo.process.description;

    return {
      companyName: applicationInfo.companyName,
      processType,
      detailedProcessType,
      position: applicationInfo.position,
      schedule: applicationInfo.process.schedule,
      url: applicationInfo.url,
    };
  }

  function resetInputValues() {
    setValue('detailedProcessType', '');
  }

  useEffect(() => {
    if (userInputToggle) {
      resetInputValues();
    }
  }, [userInputToggle]);

  useEffect(() => {
    reset(getResetValues());

    setDropDownToggle(false);
    setDetailDropDownToggle(false);
    setUserInputToggle(false);
  }, [modalIsOpen, mode]);

  useEffect(() => {
    validationProcess();
  }, [getValues('detailedProcessType')]);

  return {
    register,
    handleSubmit,
    errors,
    dropDownToggle,
    detailDropDownToggle,
    dropDownToggleHandler,
    dropDownItemHandler,
    userInputToggle,
    setUserInputToggle,
    handleApplicationSubmission,
    isDetailedProcessTypeRequired,
    currentProcessType,
    fetchedProcessData,
    applicationInfo,
    mode,
    getValues,
    defaultValues,
    validationProcess,
  };
};

export default ModalViewModel;
