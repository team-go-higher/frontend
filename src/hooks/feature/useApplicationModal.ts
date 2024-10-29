import { initialApplicationInfo } from 'constants/application';
import { useState } from 'react';
import { ProcessType } from 'types/interfaces/Common';
import { IApplication } from 'types/interfaces/KanbanProcess';

export type modalModeType = 'simpleRegister' | 'simpleEdit' | 'updateCurrentProcess';

export interface OpenModalParameter {
  mode: modalModeType;
  processType?: ProcessType | undefined;
  applicationInfo: IApplication;
  schedule?: string;
}

export function useApplicationModal() {
  const [mode, setMode] = useState<modalModeType>('simpleRegister');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [applicationInfo, setApplicationInfo] = useState<any>(initialApplicationInfo);
  const [currentProcessType, setCurrentProcessType] = useState<ProcessType>('' as ProcessType);

  const openModal = (parameter: OpenModalParameter) => {
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
    setCurrentProcessType('' as ProcessType);
    setModalIsOpen(false);
    setApplicationInfo(initialApplicationInfo);
  };

  // 모달 열기/닫기 상태와 함수를 반환
  return { openModal, closeModal, mode, modalIsOpen, applicationInfo, currentProcessType };
}
