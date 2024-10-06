import { ToggleContainer, UtilContainer, Wrapper } from './ApplicationStatusStyledComponents';
import CloseIcon from 'assets/applicationStatus/applicationStatus_close.svg';
import { format } from 'date-fns';
import { Label } from 'components/default/label/Label';
import {
  ApplicationStatusCardData,
  deleteApplication,
  patchApplicationsFinished,
} from 'apis/applications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'apis/queryKeys';
import { useNavigate } from 'react-router-dom';

interface ApplicationStatusCardProps {
  data: ApplicationStatusCardData;
}

const ApplicationStatusCard = ({ data }: ApplicationStatusCardProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { applicationId, companyName, position, specificPosition, isCompleted } = data;
  const { type, schedule } = data.process;

  const inValidateApplications = () => {
    queryClient.invalidateQueries({ queryKey: [queryKeys.APPLICATIONS] });
  };

  const applicationFinishedMutation = useMutation({
    mutationFn: () => patchApplicationsFinished(data.applicationId, !isCompleted),
    onSuccess: inValidateApplications,
  });

  const deleteApplicationMutation = useMutation({
    mutationFn: () => deleteApplication(data.applicationId),
    onSuccess: () => {
      inValidateApplications();
      navigate('/applicationStatus');
    },
  });

  return (
    <Wrapper $isView={isCompleted} onClick={() => navigate(`/application/detail/${applicationId}`)}>
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
        <ToggleContainer onClick={() => applicationFinishedMutation.mutate()}>
          <div className={`toggleCircle ${!isCompleted ? '' : 'false'}`} />
        </ToggleContainer>
        <img
          src={CloseIcon}
          className='closeIcon'
          alt='closeIcon'
          onClick={() => deleteApplicationMutation.mutate()}
        />
      </UtilContainer>
    </Wrapper>
  );
};

export default ApplicationStatusCard;
