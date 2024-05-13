import { useState } from 'react';
import {
  ContentContainer,
  ToggleContainer,
  UtilContainer,
  Wrapper,
} from './ApplicationStatusStyledComponents';
import CloseIcon from 'assets/applicationStatus/applicationStatus_close.svg';
import { format } from 'date-fns';
import { Label } from 'components/default/label/Label';
import { ApplicationStatusCardData } from 'pages/applicationStatus';

interface ApplicationStatusCardProps {
  data: ApplicationStatusCardData;
}

const ApplicationStatusCard = ({ data }: ApplicationStatusCardProps) => {
  const [isView, setIsView] = useState(true);
  const { companyName, position, specificPosition } = data;
  const { type, schedule } = data.process;

  return (
    <Wrapper isView={isView}>
      <Label process={type} />

      <ContentContainer>
        <div className='companyName'>{companyName}</div>
        <div className='contentBox'>
          {/* 해당하는 내용 포지션? 세부 포지션? 확인 필요 */}
          <div className='content'>
            {position}/{specificPosition}
          </div>
        </div>
      </ContentContainer>

      <UtilContainer>
        <div className='deadline'>{format(new Date(schedule), 'yy년 M월 dd일 HH:mm')}</div>
        <ToggleContainer onClick={() => setIsView(!isView)}>
          <div className={`toggleCircle ${isView ? '' : 'false'}`} />
        </ToggleContainer>
        <img src={CloseIcon} className='closeIcon' alt='closeIcon' />
      </UtilContainer>
    </Wrapper>
  );
};

export default ApplicationStatusCard;
