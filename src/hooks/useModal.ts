import { useState } from 'react';
import { processType } from 'types/interfaces/KanbanProcess';

export type modalMode = 'simpleRegister' | 'simpleEdit' | 'updateCurrentProcess';

export function useModal() {
  const [mode, setMode] = useState<modalMode>('simpleRegister');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [applicationInfo, setApplicationInfo] = useState<any>({
    applicationId: 0,
    companyName: '',
    position: '',
    process: {
      id: 0,
      type: '',
      description: '',
      schedule: '',
    },
    specificPosition: null,
  });
  const [currentProcessType, setCurrentProcessType] = useState<processType | string>('');

  const openModal = (parameter: {
    mode: modalMode;
    processType?: string;
    applicationInfo?: any;
  }) => {
    const { mode, processType, applicationInfo } = parameter;

    setMode(mode);
    setModalIsOpen(true);
    if (processType) {
      setCurrentProcessType(processType);
    }

    if (applicationInfo) {
      setApplicationInfo(applicationInfo);
    }
  };

  const closeModal = () => {
    setCurrentProcessType('');
    setModalIsOpen(false);
    setApplicationInfo({});
  };

  // 모달 열기/닫기 상태와 함수를 반환
  return { openModal, closeModal, mode, modalIsOpen, applicationInfo, currentProcessType };
}
