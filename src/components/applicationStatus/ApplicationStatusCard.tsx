import { ToggleContainer, UtilContainer, Wrapper } from './ApplicationStatusStyledComponents';
import CloseIcon from 'assets/applicationStatus/applicationStatus_close.svg';
import { format } from 'date-fns';
import { Label } from 'components/default/label/Label';
import { useNavigate } from 'react-router-dom';
import useMutateApplication from 'hooks/application/useMutateApplication';
import React from 'react';
import { ApplicationStatusCardData } from 'types/interfaces/Application';

interface ApplicationStatusCardProps {
  data: ApplicationStatusCardData;
}

const ApplicationStatusCard = ({ data }: ApplicationStatusCardProps) => {
  const navigate = useNavigate();
  const { deleteApplicationMutation, applicationFinishedMutation } = useMutateApplication();
  const { applicationId, companyName, position, specificPosition, isCompleted } = data;
  const { type, schedule } = data.process;

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`/application/detail/${applicationId}`);
  };

  return (
    <Wrapper $isView={isCompleted} onClick={handleCardClick}>
      <div className='labelContainer'>
        <Label process={type} />
      </div>

      <div className='companyName'>{companyName}</div>
      <div className='contentBox'>
        <div className='content'>
          {position}
          {specificPosition && `/${specificPosition}`}
        </div>
      </div>

      <UtilContainer>
        <div className='deadline'>
          {schedule
            ? format(new Date(schedule), 'yyyy년 M월 dd일 HH:mm')
            : '전형일을 기다리고 있어요'}
        </div>

        <ToggleContainer
          onClick={e => {
            e.stopPropagation();
            applicationFinishedMutation.mutate({
              applicationId,
              isCompleted: !isCompleted,
            });
          }}>
          <div className={`toggleCircle ${!isCompleted ? '' : 'false'}`} />
        </ToggleContainer>

        <img
          src={CloseIcon}
          className='closeIcon'
          alt='closeIcon'
          onClick={e => {
            e.stopPropagation();
            deleteApplicationMutation.mutate(applicationId);
          }}
        />
      </UtilContainer>
    </Wrapper>
  );
};

export default ApplicationStatusCard;
