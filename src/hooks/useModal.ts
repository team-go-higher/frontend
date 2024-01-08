import { useState } from 'react';

export type modalMode = 'add' | 'edit' | 'move';

export function useModal() {
  const [mode, setMode] = useState<modalMode>('add');
  const [applicationInfo, setApplicationInfo] = useState<any>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentModalProcessName, setCurrentModalProcess] = useState('');

  const openModal = (parameter: {
    mode: modalMode;
    processName?: string;
    applicationInfo?: any;
  }) => {
    const { mode, processName, applicationInfo } = parameter;
    setMode(mode);
    setModalIsOpen(true);

    if (processName) {
      setCurrentModalProcess(processName);
    }

    if (applicationInfo) {
      setApplicationInfo(applicationInfo);
    }
  };

  const closeModal = () => {
    setCurrentModalProcess('');
    setModalIsOpen(false);
    setApplicationInfo({});
  };

  // 모달 열기/닫기 상태와 함수를 반환
  return { modalIsOpen, openModal, closeModal, mode, applicationInfo, currentModalProcessName };
}
