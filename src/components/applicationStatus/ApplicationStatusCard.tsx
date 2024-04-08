import { useState } from 'react';
import {
  ContentContainer,
  ToggleContainer,
  UtilContainer,
  Wrapper,
} from './ApplicationStatusStyledComponents';
import CloseIcon from 'assets/applicationStatus/applicationStatus_close.svg';

const ApplicationStatusCard = () => {
  const [isView, setIsView] = useState(true);
  return (
    <Wrapper>
      <div className='label'>서류전형</div>

      <ContentContainer>
        <div className='title'>CJ ENM</div>
        <div className='contentBox'>
          <div className='content'>브랜드디자인</div>
          <div className='memo'>공고 메모 : 입사시 주의 사항을 기록하세요</div>
        </div>
      </ContentContainer>

      <UtilContainer>
        <div className='deadline'>8월 15일 23:59</div>
        <ToggleContainer onClick={() => setIsView(!isView)}>
          <div className={`toggleCircle ${isView ? '' : 'false'}`} />
        </ToggleContainer>
        <img src={CloseIcon} className='closeIcon' alt='closeIcon' />
      </UtilContainer>
    </Wrapper>
  );
};

export default ApplicationStatusCard;
