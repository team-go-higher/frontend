import styled from 'styled-components';
import Modal, { Styles } from 'react-modal';
import { Dispatch, SetStateAction, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ApplicationProcess,
  ApplicationProcessType,
  ApplicationSort,
} from 'types/interfaces/Application';

interface FilterModalProp {
  isOpen: boolean;
  closeModal: () => void;
  setSort: Dispatch<SetStateAction<ApplicationSort>>;
  setProcess: Dispatch<SetStateAction<ApplicationProcess>>;
  setComplete: Dispatch<SetStateAction<boolean | null>>;
}

interface FilterItemType {
  sort: ApplicationSort;
  process: ApplicationProcess;
  complete: 'true' | 'false' | null;
}

const FILTER_OPTIONS = {
  sort: [
    {
      label: '전형순',
      value: 'processType',
    },
    {
      label: '전형역순',
      value: 'reverseProcessType',
    },
    {
      label: '마감임박순',
      value: 'closing',
    },
  ],
  process: [
    {
      label: '지원예정',
      value: 'TO_APPLY',
    },
    {
      label: '서류전형',
      value: 'DOCUMENT',
    },
    {
      label: '과제전형',
      value: 'TEST',
    },
    {
      label: '면접전형',
      value: 'INTERVIEW',
    },
    {
      label: '최종발표',
      value: 'COMPLETE',
    },
  ],
  complete: [
    {
      label: '숨긴 전형만',
      value: 'true',
    },
    {
      label: '안숨긴 전형만',
      value: 'false',
    },
  ],
};

const FilterModal = ({ isOpen, closeModal, setSort, setProcess, setComplete }: FilterModalProp) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterItem, setFilterItem] = useState<FilterItemType>({
    sort: (searchParams.get('sort') as ApplicationSort) || null,
    process: (searchParams.get('process')?.split(',') as ApplicationProcess) || [],
    complete: (searchParams.get('completed') as 'true' | 'false') || null,
  });
  const handleSort = (value: ApplicationSort) => {
    setFilterItem({ ...filterItem, sort: filterItem.sort === value ? null : value });
  };

  const handleProcess = (value: ApplicationProcessType) => {
    setFilterItem({
      ...filterItem,
      process:
        filterItem.process !== null
          ? filterItem.process.includes(value)
            ? filterItem.process.filter(e => e !== value)
            : [...filterItem.process, value]
          : [value],
    });
  };

  const handleComplete = (value: 'true' | 'false' | null) => {
    setFilterItem({ ...filterItem, complete: filterItem.complete === value ? null : value });
  };

  const handleFilter = () => {
    setSort(filterItem.sort);
    setProcess(filterItem.process);
    setComplete(
      filterItem.complete !== null ? (filterItem.complete === 'true' ? true : false) : null,
    );

    if (filterItem.sort === null) searchParams.delete('sort');
    else searchParams.set('sort', filterItem.sort);

    if (!filterItem.process || filterItem.process.length === 0) searchParams.delete('process');
    else searchParams.set('process', filterItem.process.join(','));

    if (filterItem.complete === null) searchParams.delete('completed');
    else searchParams.set('completed', filterItem.complete);

    setSearchParams(searchParams);
    closeModal();
  };

  const handleReset = () => {
    setFilterItem({
      sort: null,
      process: [],
      complete: null,
    });
  };

  const handleClose = () => {
    setFilterItem({
      sort: (searchParams.get('sort') as ApplicationSort) || null,
      process: (searchParams.get('process')?.split(',') as ApplicationProcess) || [],
      complete: (searchParams.get('completed') as 'true' | 'false') || null,
    });

    closeModal();
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={filterModalStyles}>
      <FilterModalContainer>
        <div className='titleContainer'>
          <div className='title'>정렬 및 필터</div>
          <div className='closeButton' onClick={handleClose}>
            닫기
          </div>
        </div>

        <div className='line' />

        <div className='filterContentWrapper'>
          <FilterContentContainer>
            <div className='contentContainer'>
              <div className='contentTitle'>정렬기준</div>

              <div className='contentItemContainer'>
                {FILTER_OPTIONS.sort.map((e, idx) => (
                  <FilterItem
                    item={e}
                    key={idx}
                    isActive={filterItem.sort && filterItem.sort === e.value ? true : false}
                    handleFilter={handleSort}
                  />
                ))}
              </div>
            </div>
          </FilterContentContainer>

          <FilterContentContainer>
            <div className='contentContainer'>
              <div className='contentTitle'>
                전형별 <span>복수선택 가능</span>
              </div>

              <div className='contentItemContainer'>
                {FILTER_OPTIONS.process.map((e, idx) => (
                  <FilterItem
                    item={e}
                    key={idx}
                    isActive={
                      filterItem.process &&
                      filterItem.process.includes(e.value as ApplicationProcessType)
                        ? true
                        : false
                    }
                    handleFilter={handleProcess}
                  />
                ))}
              </div>
            </div>

            <div className='contentContainer'>
              <div className='contentTitle'>활성화 여부</div>
              <div className='contentItemContainer'>
                {FILTER_OPTIONS.complete.map((e, idx) => (
                  <FilterItem
                    item={e}
                    key={idx}
                    isActive={filterItem.complete && filterItem.complete === e.value ? true : false}
                    handleFilter={handleComplete}
                  />
                ))}
              </div>
            </div>
          </FilterContentContainer>
        </div>

        <div className='buttonContainer'>
          <button className='resetButton' onClick={handleReset}>
            초기화
          </button>
          <button className='settingButton' onClick={handleFilter}>
            적용하기
          </button>
        </div>
      </FilterModalContainer>
    </Modal>
  );
};

export default FilterModal;

const FilterItem = ({
  item,
  isActive,
  handleFilter,
}: {
  item: { label: string; value: string };
  isActive: boolean;
  handleFilter: (v: any) => void;
}) => {
  return (
    <FilterItemContainer $isActive={isActive} onClick={() => handleFilter(item.value)}>
      {item.label}
    </FilterItemContainer>
  );
};

const filterModalStyles: Styles = {
  overlay: {
    backgroundColor: 'rgba(var(--greyText), 0.8)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '636px',
    height: 'fit-content',
    padding: '35px 42px 26px',
    borderRadius: '10px',
    border: '1px #D3D3D3',
  },
};

const FilterModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  & > .titleContainer {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    & > .title {
      color: #000;
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.8px;
    }

    & > .closeButton {
      color: #333;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
    }
  }

  & > .line {
    width: 100%;
    height: 1px;
    background-color: #d3d3d3;
    margin-bottom: 5px;
  }

  & > .filterContentWrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  & > .buttonContainer {
    display: flex;
    justify-content: space-between;

    & > button {
      width: 94px;
      border-radius: 30px;
      height: 34px;
      align-items: center;
      color: #333;
      font-size: 14px;
      font-weight: 500;
    }

    & > .resetButton {
      border: 0.5px solid #d9d9d9;
      background: #fff;
    }

    & > .settingButton {
      border: 0.5px solid #3253ff;
      background: #3253ff;
      color: #fff;
    }
  }
`;

const FilterContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 13px 25px;
  border-radius: 8px;
  background: #f6f6f6;
  gap: 33px;

  & > .contentContainer {
    display: flex;
    flex-direction: column;
    gap: 11px;

    & > .contentTitle {
      color: #3253ff;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: -0.64px;

      span {
        color: #ff5555;
        font-size: 0.8rem;
        font-weight: 500;
        line-height: 1.2rem;
      }
    }

    & > .contentItemContainer {
      display: flex;
      gap: 12px;
    }
  }
`;

const FilterItemContainer = styled.div<{ $isActive: boolean }>`
  display: flex;
  border: ${({ $isActive }) => ($isActive ? '2px solid #3253FF' : '1px solid #676767')};
  border-radius: 30px;
  background: ${({ $isActive }) => ($isActive ? 'rgba(255, 255, 255, 0.00)' : '#fff')};

  width: 95px;
  height: 34px;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
