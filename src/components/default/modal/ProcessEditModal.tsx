import Modal from 'react-modal';
import * as S from './ModalStyledComponents';
import { formatProcessToKor } from 'utils/process';
import { IProcess } from 'components/kanban/KanbanCard/KanbanCard';
import { useState } from 'react';
import SelectArrowIcon from 'assets/main/main_modal_select_arrow.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'apis/queryKeys';
import ModalModel from './ModalModel';
import { processTypeInfo } from 'constants/process';
import { ProcessType } from 'types/interfaces/Application';

interface ProcessEditModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  process: IProcess;
}

const ProcessEditModal = ({ process, modalIsOpen, closeModal }: ProcessEditModalProps) => {
  const queryClient = useQueryClient();
  const [detailProcess, setDetailProcess] = useState('');

  const model = new ModalModel();

  const createProcessMutation = useMutation({
    mutationFn: model.createNewProcess,
    onSuccess: res => {
      updateApplicationProcessMutation.mutate({
        applicationId: process.applicationId,
        processId: res.data.id,
      });
    },
  });

  const updateApplicationProcessMutation = useMutation({
    mutationFn: model.updateProcess,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.KANBAN] });
      closeModal();
    },
  });

  const handleEditProcess = () => {
    const exist = process.process.filter(e => e.description === detailProcess);

    if (process.process.length === 0 || exist.length === 0) {
      createProcessMutation.mutate({
        applicationId: process.applicationId,
        newProcessData: {
          description: detailProcess,
          type: process.processType,
        },
      });
      return;
    }

    updateApplicationProcessMutation.mutate({
      applicationId: process.applicationId,
      processId: exist[0].id,
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
            itemList={processTypeInfo[process.processType as ProcessType]?.detailed}
            setDetailProcess={setDetailProcess}
            detailProcess={detailProcess}
          />
        </S.ModalInputWrapper>

        <S.ModalButtonWrapper>
          <S.InModalButton mode='cancel' onClick={closeModal}>
            이동취소
          </S.InModalButton>
          <S.InModalButton mode='simple' onClick={handleEditProcess} type='button'>
            이동하기
          </S.InModalButton>
        </S.ModalButtonWrapper>
      </S.ModalForm>
    </Modal>
  );
};

export default ProcessEditModal;

interface IProps {
  itemList: string[] | null | undefined;
  setDetailProcess: any;
  detailProcess: string;
}

const ModalDropDown = ({ itemList, setDetailProcess, detailProcess }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.ModalDropdownBox
      type='button'
      $showItem={isOpen}
      onClick={() => {
        setIsOpen(!isOpen);
      }}>
      <S.PlaceHolder $color={detailProcess !== ''} $error={false}>
        {detailProcess === '' ? '세부전형을 선택해주세요' : detailProcess}
      </S.PlaceHolder>
      <S.ArrowIcon src={SelectArrowIcon} />
      {isOpen && (
        <S.ModalDropdownItemBox>
          {itemList?.map((item, idx) => {
            return (
              <S.DropdownItem
                key={idx}
                onClick={() => {
                  setDetailProcess(item);
                }}>
                {item}
              </S.DropdownItem>
            );
          })}
        </S.ModalDropdownItemBox>
      )}
    </S.ModalDropdownBox>
  );
};
