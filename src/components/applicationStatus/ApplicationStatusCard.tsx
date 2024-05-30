import { ToggleContainer, UtilContainer, Wrapper } from './ApplicationStatusStyledComponents';
import CloseIcon from 'assets/applicationStatus/applicationStatus_close.svg';
import { format } from 'date-fns';
import { Label } from 'components/default/label/Label';
import { ApplicationStatusCardData, patchApplicationsFinished } from 'apis/applications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'apis/queryKeys';

interface ApplicationStatusCardProps {
  data: ApplicationStatusCardData;
}

const ApplicationStatusCard = ({ data }: ApplicationStatusCardProps) => {
  const queryClient = useQueryClient();
  const { companyName, position, specificPosition, isCompleted } = data;
  const { type, schedule } = data.process;

  const applicationFinishedMutation = useMutation({
    mutationFn: () => patchApplicationsFinished(data.applicationId, !isCompleted),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.APPLICATIONS] });
    },
  });

  return (
    <Wrapper $isView={isCompleted}>
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
        <img src={CloseIcon} className='closeIcon' alt='closeIcon' />
      </UtilContainer>
    </Wrapper>
  );
};

export default ApplicationStatusCard;
