import { useSearchParams } from 'react-router-dom';
import {
  ApplicationStatusContainer,
  ContentContainer,
  HeaderContainer,
  Wrapper,
} from './ApplicationStatusStyledComponents';
import SortIcon from '../../assets/applicationStatus/applicationStatus_sort.svg';
import ApplicationStatusCard from 'components/applicationStatus/ApplicationStatusCard';
import { useState } from 'react';
import FilterModal from 'components/applicationStatus/FilterModal';
import CloseIcon from 'assets/applicationStatus/applicationStatus_close.svg';
import {
  ApplicationProcess,
  ApplicationSort,
  ApplicationStatusCardData,
} from 'types/interfaces/Application';
import useInfiniteScroll from 'hooks/feature/useInfiniteScroll';
import useInfiniteApplications from 'hooks/application/useInfiniteApplications';

const ApplicationStatus = () => {
  const [searchParams] = useSearchParams();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [sort, setSort] = useState<ApplicationSort>(
    (searchParams.get('sort') as ApplicationSort) || null,
  );
  const [process, setProcess] = useState<ApplicationProcess>(
    (searchParams.get('process')?.split(',') as ApplicationProcess) || [],
  );
  const [complete, setComplete] = useState<boolean | null>(
    (searchParams.get('completed') === 'true' ? true : false) || null,
  );

  const {
    data: applicationStatusList,
    handlePage,
    canLoadMore,
    isLoading,
  } = useInfiniteApplications({
    companyName,
    sort,
    process,
    complete,
  });
  const targetRef = useInfiniteScroll(handlePage);

  const activeEnter = (e: { key: string }) => {
    if (e.key === 'Enter') {
      setCompanyName(searchValue);
    }
  };

  return (
    <Wrapper>
      <ApplicationStatusContainer>
        <div className='title'>지원 현황 모아보기</div>

        <HeaderContainer>
          <div className='sortContainer' onClick={() => setIsOpenModal(!isOpenModal)}>
            <div className='sortTitle'>정렬기준</div>
            <img src={SortIcon} alt='sortIcon' />
          </div>

          <div className='searchInputContainer'>
            <input
              className='searchInput'
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder='회사명을 입력하세요'
              onKeyDown={activeEnter}
            />
            <img
              src={CloseIcon}
              alt='closeIcon'
              className='closeIcon'
              onClick={() => {
                setSearchValue('');
                setCompanyName('');
              }}
            />
          </div>
        </HeaderContainer>

        <ContentContainer>
          {applicationStatusList?.map((item: ApplicationStatusCardData) => (
            <ApplicationStatusCard key={item.applicationId} data={item} />
          ))}
        </ContentContainer>
        {canLoadMore && <div ref={targetRef}>{isLoading && <div>로딩 중!</div>}</div>}
      </ApplicationStatusContainer>

      <FilterModal
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
        setSort={setSort}
        setProcess={setProcess}
        setComplete={setComplete}
      />
    </Wrapper>
  );
};

export default ApplicationStatus;
