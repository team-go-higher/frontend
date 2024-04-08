import {
  ApplicationStatusContainer,
  ContentContainer,
  HeaderContainer,
  Wrapper,
} from './ApplicationStatusStyledComponents';
import SortIcon from '../../assets/applicationStatus/applicationStatus_sort.svg';
import ApplicationStatusCard from 'components/applicationStatus/ApplicationStatusCard';
import { useState } from 'react';

export interface ApplicationStatusCardData {
  applicationId: number;
  companyName: string;
  position: string;
  specificPosition: string;
  process: {
    id: number;
    type: 'TO_APPLY' | 'DOCUMENT' | 'TEST' | 'INTERVIEW' | 'COMPLETE';
    description: string;
    schedule: string;
  };
}

const DUMMY_DATA: ApplicationStatusCardData[] = [
  {
    applicationId: 1,
    companyName: '카카오커머스1',
    position: '디자인1',
    specificPosition: 'UI 디자인1',
    process: {
      id: 1,
      type: 'TO_APPLY',
      description: '지원예정',
      schedule: '2023-08-15T23:59',
    },
  },
  {
    applicationId: 2,
    companyName: '카카오커머스2',
    position: '디자인2',
    specificPosition: 'UI 디자인2',
    process: {
      id: 2,
      type: 'TO_APPLY',
      description: '지원예정',
      schedule: '2023-08-15T23:59',
    },
  },
];

const ApplicationStatus = () => {
  const [searchValue, setSearhValue] = useState('');

  return (
    <Wrapper>
      <ApplicationStatusContainer>
        <div className='title'>지원 현황 모아보기</div>

        <HeaderContainer>
          <div className='sortContainer'>
            <div className='sortTitle'>정렬기준</div>
            <img src={SortIcon} alt='sortIcon' />
          </div>

          <input
            className='searchInput'
            value={searchValue}
            onChange={e => setSearhValue(e.target.value)}
          />
        </HeaderContainer>

        <ContentContainer>
          {DUMMY_DATA.map(item => {
            return <ApplicationStatusCard key={item.applicationId} data={item} />;
          })}
        </ContentContainer>
      </ApplicationStatusContainer>
    </Wrapper>
  );
};

export default ApplicationStatus;
