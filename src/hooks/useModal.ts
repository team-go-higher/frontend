import { useState } from 'react';

export function useModal() {
  const [mode, setMode] = useState('normal');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentModalProcessName, setCurrentModalProcess] = useState('');

  const openModal = (processName: string, mode: string) => {
    setCurrentModalProcess(processName);
    setMode(mode);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setCurrentModalProcess('');
    setModalIsOpen(false);
  };

  // 모달 열기/닫기 상태와 함수를 반환
  return { modalIsOpen, openModal, closeModal, mode, currentModalProcessName };
}
