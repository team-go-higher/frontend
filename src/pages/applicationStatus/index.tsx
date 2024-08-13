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
import { ApplicationSort, ApplicationStatusCardData, getApplications } from 'apis/applications';
import useInfiniteScroll from 'hooks/feature/useInfiniteScroll';

const ApplicationStatus = () => {
  const [searchValue, setSearhValue] = useState('');
  const [companyName, setCompanyName] = useState('');

  const [page, setPage] = useState(1);

  const [sort, setSort] = useState<ApplicationSort>(null);

  const { isVisible, targetRef } = useInfiniteScroll();

  const { data, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: [queryKeys.APPLICATIONS, companyName, sort],
    queryFn: async ({ pageParam }) => {
      const res = await getApplications(pageParam, companyName, sort);

      setPage(page);

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

        <div style={{ display: 'flex', gap: '3rem' }}>
          <div onClick={() => setSort('processType')}>전형순</div>
          <div onClick={() => setSort('reverseProcessType')}>전형역순</div>
          <div onClick={() => setSort('closing')}>마감임박순</div>
        </div>

        <HeaderContainer>
          <div className='sortContainer'>
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
    </Wrapper>
  );
};

export default ApplicationStatus;
