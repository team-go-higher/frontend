import { initialApplicationInfo } from 'constants/application';
import { useState } from 'react';
import { IApplication, processType } from 'types/interfaces/KanbanProcess';

export type modalModeType = 'simpleRegister' | 'simpleEdit' | 'updateCurrentProcess';

export function useModal() {
  const [mode, setMode] = useState<modalModeType>('simpleRegister');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [applicationInfo, setApplicationInfo] = useState<any>(initialApplicationInfo);
  const [currentProcessType, setCurrentProcessType] = useState<processType | string>('');

  const openModal = (parameter: {
    mode: modalModeType;
    processType?: string;
    applicationInfo: IApplication;
    schedule?: string;
  }) => {
    const { mode, processType, applicationInfo, schedule } = parameter;

    setMode(mode);
    setModalIsOpen(true);
    if (processType) {
      setCurrentProcessType(processType);
    }

    if (applicationInfo) {
      setApplicationInfo(applicationInfo);
    }

    if (schedule) {
      setApplicationInfo({
        ...applicationInfo,
        process: { ...applicationInfo.process, schedule: schedule },
      });
    }
  };

  const closeModal = () => {
    setCurrentProcessType('');
    setModalIsOpen(false);
    setApplicationInfo(initialApplicationInfo);
  };

  // 모달 열기/닫기 상태와 함수를 반환
  return { openModal, closeModal, mode, modalIsOpen, applicationInfo, currentProcessType };
}
