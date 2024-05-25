import Modal from 'react-modal';
import * as S from './ModalStyledComponents';
import { formatProcessToKor } from 'utils/process';
import { IProcess, IProcessArray } from 'components/kanban/KanbanCard/KanbanCard';
import { useState } from 'react';
import SelectArrowIcon from 'assets/main/main_modal_select_arrow.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'apis/queryKeys';
import { createNewProcess, updateApplicationProcess } from 'apis/kanban';
import { INewProcessRes } from 'types/interfaces/KanbanProcess';

interface ProcessEditModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  process: IProcess;
}

const ProcessEditModal = ({ process, modalIsOpen, closeModal }: ProcessEditModalProps) => {
  const queryClient = useQueryClient();
  const [detailProcess, setDetailProcess] = useState<IProcessArray>({ id: 0, description: '' });
  const [isUserInput, setIsUserInput] = useState(false);
  // 직접입력
  const [userInput, setUserInput] = useState('');

  const createProcessMutation = useMutation({
    mutationFn: ({
      applicationId,
      newProcessData,
    }: {
      applicationId: number;
      newProcessData: INewProcessRes;
    }) => createNewProcess(applicationId, newProcessData),
    onSuccess: res => {
      updateApplicationProcessMutation.mutate({
        applicationId: process.applicationId,
        processId: res.data.id,
      });
    },
  });

  const updateApplicationProcessMutation = useMutation({
    mutationFn: ({ applicationId, processId }: { applicationId: number; processId: number }) =>
      updateApplicationProcess(applicationId, processId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.KANBAN] });
      closeModal();
    },
  });

  const handleEditProcess = () => {
    if (detailProcess.description === '') return;

    if (detailProcess.description === '직접입력') {
      createProcessMutation.mutate({
        applicationId: process.applicationId,
        newProcessData: {
          description: userInput,
          type: process.processType,
        },
      });
      return;
    }

    updateApplicationProcessMutation.mutate({
      applicationId: process.applicationId,
      processId: detailProcess.id,
    });
  };

  return (
    <Modal
      id='editModal'
      style={S.editModalStyles}
      contentLabel='전형이동'
      isOpen={modalIsOpen}
      ariaHideApp={false}
      onRequestClose={closeModal}>
      <S.ModalForm>
        <S.ModalTitle>전형이동</S.ModalTitle>

        <S.ModalInputWrapper>
          <S.ModalInputBox>
            <S.ModalInput type='text' value={formatProcessToKor(process.processType)} readOnly />
          </S.ModalInputBox>

          <ModalDropDown
            itemList={process.process}
            setDetailProcess={setDetailProcess}
            detailProcess={detailProcess}
            setIsUserInput={setIsUserInput}
          />

          {isUserInput && (
            <S.ModalInputBox>
              <S.ModalInput
                type='text'
                $error={false}
                placeholder='세부 단계 입력'
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
              />
            </S.ModalInputBox>
          )}
        </S.ModalInputWrapper>

        <S.ModalButtonWrapper>
          <S.InModalButton mode='cancel' onClick={closeModal}>
            이동취소
          </S.InModalButton>
          <S.InModalButton mode='simple' onClick={handleEditProcess}>
            이동하기
          </S.InModalButton>
        </S.ModalButtonWrapper>
      </S.ModalForm>
    </Modal>
  );
};

export default ProcessEditModal;

interface IProps {
  itemList: IProcessArray[];
  setDetailProcess: any;
  detailProcess: IProcessArray;
  setIsUserInput: any;
}

const ModalDropDown = ({ itemList, setDetailProcess, detailProcess, setIsUserInput }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.ModalDropdownBox
      type='button'
      $showItem={isOpen}
      onClick={() => {
        setIsOpen(!isOpen);
      }}>
      <S.PlaceHolder $color={detailProcess.description !== ''} $error={false}>
        {detailProcess.description === '' ? '세부전형을 선택해주세요' : detailProcess.description}
      </S.PlaceHolder>
      <S.ArrowIcon src={SelectArrowIcon} />
      {isOpen && (
        <S.ModalDropdownItemBox>
          {itemList?.map((item: IProcessArray) => {
            return (
              <S.DropdownItem
                key={item.id}
                onClick={() => {
                  setDetailProcess(item);
                  setIsUserInput(false);
                }}>
                {item.description}
              </S.DropdownItem>
            );
          })}
          <S.DropdownItem
            onClick={() => {
              setDetailProcess({
                id: -1,
                description: '직접입력',
              });
              setIsUserInput(true);
            }}>
            직접입력
          </S.DropdownItem>
        </S.ModalDropdownItemBox>
      )}
    </S.ModalDropdownBox>
  );
};
