import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

import { ReactComponent as MoreIcon } from 'assets/main/main_kanban_card_more.svg';
import * as S from './KanbanCardStyledComponents';
import { IApplication } from 'types/interfaces/KanbanProcess';
import { fetchApplicationStagesByProcessType } from 'apis/kanban';
import { OpenModalParameter } from 'hooks/feature/useApplicationModal';
import { formatDataType } from 'utils/date';
import MoreMenuModal from 'components/default/modal/MoreMenuModal';
import ProcessEditModal from 'components/default/modal/ProcessEditModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatProcessToKor } from 'utils/process';
import { queryKeys } from 'apis/queryKeys';
import { ModalModel } from 'components/default';
import { useNavigate } from 'react-router-dom';
import { ProcessType } from 'types/interfaces/Common';

interface IProps {
  item: IApplication;
  currentProcessType: ProcessType;
  openModal: (parameter: OpenModalParameter) => void;
  setFetchedProcessData: React.Dispatch<React.SetStateAction<any>>;
}

export interface IProcessArray {
  description: string;
  id: number;
}
export interface IProcess {
  applicationId: number;
  processType: ProcessType;
  process: IProcessArray[];
}

const KanbanCard = ({ item, currentProcessType, openModal, setFetchedProcessData }: IProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [moreMenuShow, setMoreMenuShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processInfo, setProcessInfo] = useState<IProcess>({
    applicationId: 0,
    processType: '' as ProcessType,
    process: [],
  });

  const model = new ModalModel();

  const createProcessMutation = useMutation({
    mutationFn: model.createNewProcess,
    onSuccess: res => {
      updateApplicationProcessMutation.mutate({
        applicationId: item.applicationId,
        processId: res.data.id,
      });
    },
  });

  const updateApplicationProcessMutation = useMutation({
    mutationFn: model.updateProcess,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.KANBAN] });
    },
  });

  function handleMoreMenu() {
    setMoreMenuShow(!moreMenuShow);
  }

  function handleEditButton() {
    openModal({ mode: 'simpleEdit', applicationInfo: item });
    setMoreMenuShow(false);
  }

  const [{ isDragging }, ref] = useDrag({
    type: 'card',
    item: item,

    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),

    end: async (draggedItem, monitor) => {
      const dropResult: { dropEffect: string; processType: ProcessType } | null =
        monitor.getDropResult();

      if (dropResult) {
        //드랍한 곳이 시작점과 동일한 경우 리턴 처리
        if (dropResult.processType === currentProcessType) return;

        const response = await fetchApplicationStagesByProcessType(
          draggedItem.applicationId,
          dropResult.processType,
        );

        if (response.success) {
          const applicationInfo = {
            ...draggedItem,
            processDescription: response.data,
          };

          //삭제..?
          setFetchedProcessData(response.data);

          //지원예정, 서류전형의 경우 전형이동 모달 없이 이동처리
          if (dropResult.processType === 'TO_APPLY' || dropResult.processType === 'DOCUMENT') {
            //이전에 전형이 없는 경우 추가
            if (response.data.length === 0) {
              createProcessMutation.mutate({
                applicationId: applicationInfo.applicationId,
                newProcessData: {
                  description: formatProcessToKor(dropResult.processType),
                  type: dropResult.processType,
                },
              });
              return;
            }

            //이전에 전형이 존재하는 경우 수정
            updateApplicationProcessMutation.mutate({
              applicationId: applicationInfo.applicationId,
              processId: response.data[0].id,
            });
            return;
          }

          //모달에 전달해줄 processInfo
          setProcessInfo({
            applicationId: applicationInfo.applicationId,
            processType: dropResult.processType,
            process: response.data,
          });

          //전형이동 모달 open
          setIsModalOpen(true);
        }
      }
    },
  });

  return (
    <>
      {isModalOpen && (
        <ProcessEditModal
          modalIsOpen={isModalOpen}
          closeModal={() => {
            setIsModalOpen(false);
          }}
          process={processInfo}
        />
      )}
      <S.KanbanCardContainer
        onClick={() => navigate(`/application/detail/${item.applicationId}`)}
        ref={ref}
        $isDragging={isDragging}
        $currentProcessType={currentProcessType}>
        <S.DetailProcess $currentProcessType={currentProcessType}>
          {item.process.description}
        </S.DetailProcess>
        <S.CompanyName title={item.companyName}>{item.companyName}</S.CompanyName>
        <S.Job>{item.position}</S.Job>
        <S.Schedule>{formatDataType(item.process.schedule)}</S.Schedule>
        <S.MoreIconDiv>
          <MoreIcon
            width={16}
            height={16}
            fill={'rgb(var(--greyText2))'}
            onClick={handleMoreMenu}
          />
        </S.MoreIconDiv>
        {moreMenuShow && (
          <MoreMenuModal
            closeModal={() => setMoreMenuShow(false)}
            handleEditButton={handleEditButton}
            application={{
              applicationId: item.applicationId,
              currentProcessType: currentProcessType,
            }}
          />
        )}
      </S.KanbanCardContainer>
    </>
  );
};

export default KanbanCard;
