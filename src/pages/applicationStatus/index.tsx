import {
  ApplicationStatusContainer,
  ContentContainer,
  HeaderContainer,
  Wrapper,
} from './ApplicationStatusStyledComponents';
import SortIcon from '../../assets/applicationStatus/applicationStatus_sort.svg';
import ApplicationStatusCard from 'components/applicationStatus/ApplicationStatusCard';
import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from 'apis/queryKeys';
import { getApplications } from 'apis/applications';
import useInfiniteScroll from 'hooks/feature/useInfiniteScroll';
import FilterModal from 'components/applicationStatus/FilterModal';
import { useSearchParams } from 'react-router-dom';
import CloseIcon from 'assets/applicationStatus/applicationStatus_close.svg';
import {
  ApplicationProcess,
  ApplicationSort,
  ApplicationStatusCardData,
} from 'types/interfaces/Application';

const ApplicationStatus = () => {
  const [searchValue, setSearchValue] = useState('');
  const [companyName, setCompanyName] = useState('');

  const [searchParams] = useSearchParams();

  const [sort, setSort] = useState<ApplicationSort>(
    (searchParams.get('sort') as ApplicationSort) || null,
  );
  const [process, setProcess] = useState<ApplicationProcess>(
    (searchParams.get('process')?.split(',') as ApplicationProcess) || [],
  );
  const [complete, setComplete] = useState<boolean | null>(
    (searchParams.get('completed') === 'true' ? true : false) || null,
  );

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data, status, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [queryKeys.APPLICATIONS, companyName, sort, process, complete],
      queryFn: async ({ pageParam }) =>
        getApplications(pageParam, companyName, sort, process, complete),
      initialPageParam: 1,
      getNextPageParam: lastPage => (lastPage.data.hasNext ? lastPage.data.pageNumber + 1 : null),
    });

  const applicationStatusList = data?.pages.flatMap(page => page.data.content) || [];

  const handlePage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const targetRef = useInfiniteScroll(handlePage);

  const isAddPageAble = status !== 'error' && hasNextPage;

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
          {applicationStatusList.map((item: ApplicationStatusCardData) => (
            <ApplicationStatusCard key={item.applicationId} data={item} />
          ))}
        </ContentContainer>
        {isAddPageAble && (
          <div ref={targetRef}>{(isFetching || isFetchingNextPage) && <div>로딩 중!</div>}</div>
        )}
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
