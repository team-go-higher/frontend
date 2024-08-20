import {
  ApplicationStatusContainer,
  ContentContainer,
  HeaderContainer,
  Wrapper,
} from './ApplicationStatusStyledComponents';
import SortIcon from '../../assets/applicationStatus/applicationStatus_sort.svg';
import ApplicationStatusCard from 'components/applicationStatus/ApplicationStatusCard';
import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from 'apis/queryKeys';
import {
  ApplicationProcess,
  ApplicationSort,
  ApplicationStatusCardData,
  getApplications,
} from 'apis/applications';
import useInfiniteScroll from 'hooks/feature/useInfiniteScroll';
import FilterModal from 'components/applicationStatus/FilterModal';
import { useSearchParams } from 'react-router-dom';

const ApplicationStatus = () => {
  const [searchValue, setSearhValue] = useState('');
  const [companyName, setCompanyName] = useState('');

  const [searchParams] = useSearchParams();

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

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

  const { isVisible, targetRef } = useInfiniteScroll();

  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: [queryKeys.APPLICATIONS, companyName, sort, process, complete],
    queryFn: async ({ pageParam }) => {
      const res = await getApplications(pageParam, companyName, sort, process, complete);

      setPage(pageParam);

      return res;
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.data.hasNext) {
        return page + 1;
      }
      return null;
    },
  });

  const applicationData = data?.pages.flatMap(page => page.data.content);

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible]);

  return (
    <Wrapper>
      <ApplicationStatusContainer>
        <div className='title'>지원 현황 모아보기</div>

        <HeaderContainer>
          <div className='sortContainer' onClick={() => setIsOpenModal(!isOpenModal)}>
            <div className='sortTitle'>정렬기준</div>
            <img src={SortIcon} alt='sortIcon' />
          </div>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}>
            <input
              className='searchInput'
              value={searchValue}
              onChange={e => setSearhValue(e.target.value)}
              placeholder='회사명을 입력하세요'
            />
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setCompanyName(searchValue);
              }}>
              검색
            </div>
          </div>
        </HeaderContainer>

        <ContentContainer>
          {!isFetching &&
            applicationData?.map((item: ApplicationStatusCardData) => {
              return <ApplicationStatusCard key={item.applicationId} data={item} />;
            })}
        </ContentContainer>
        <div ref={targetRef} style={{ height: '20px', width: '100%' }}></div>
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
