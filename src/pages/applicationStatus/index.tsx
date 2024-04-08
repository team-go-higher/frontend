import {
  ApplicationStatusContainer,
  ContentContainer,
  HeaderContainer,
  Wrapper,
} from './ApplicationStatusStyledComponents';
import SortIcon from '../../assets/applicationStatus/applicationStatus_sort.svg';
import ApplicationStatusCard from 'components/applicationStatus/ApplicationStatusCard';

const ApplicationStatus = () => {
  return (
    <Wrapper>
      <ApplicationStatusContainer>
        <div className='title'>지원 현황 모아보기</div>

        <HeaderContainer>
          <div className='sortContainer'>
            <div className='sortTitle'>정렬기준</div>
            <img src={SortIcon} alt='sortIcon' />
          </div>

          <input className='searchInput' />
        </HeaderContainer>

        <ContentContainer>
          <ApplicationStatusCard />
        </ContentContainer>
      </ApplicationStatusContainer>
    </Wrapper>
  );
};

export default ApplicationStatus;
