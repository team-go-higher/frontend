import { useState } from 'react';

export function useModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentModalProcess, setCurrentModalProcess] = useState('');

  const openModal = (processName: string) => {
    setCurrentModalProcess(processName);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setCurrentModalProcess('');
    setModalIsOpen(false);
  };

  // 모달 열기/닫기 상태와 함수를 반환
  return {
    modalIsOpen,
    openModal,
    closeModal,
    currentModalProcess,
  };
}
