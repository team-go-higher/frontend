import { useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getPositions, postPositions } from 'apis/auth';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from 'apis/queryKeys';
import { IPosition } from 'types/interfaces/Auth';
import { updateUserInfo } from 'utils/localStorage';

const DesiredPosition = () => {
  const navigate = useNavigate();

  const [position, setPosition] = useState<number[]>([]);

  const { data: positionList, isError } = useQuery({
    queryKey: [queryKeys.AUTH, 'getPositions'],
    queryFn: () => getPositions(),
  });

  const postPositionsMutation = useMutation({
    mutationFn: () => postPositions(position),
    onSuccess: () => {
      updateUserInfo({ role: 'USER' });
      navigate('/');
    },
    onError: (error: any) => {
      const errorCode = error.response.data.error.code;
      if (errorCode === 'USER_002') {
        alert('게스트가 아닙니다. 로그인해주세요.');
        navigate('/signIn');
      } else {
        alert('문제가 발생했습니다. 다시 선택해주세요.');
      }
    },
  });

  const handleSelect = (id: number) => {
    if (position.includes(id)) {
      const newPositionArr = position.filter(number => {
        return number !== id;
      });
      setPosition(newPositionArr);
    } else {
      setPosition([...position, id]);
    }
  };

  const handlePosition = () => {
    if (position.length > 0) {
      postPositionsMutation.mutate();
    }
  };

  if (isError) return null;

  return (
    <Main>
      <Wrapper>
        <div className='mainTitle'>희망 직무를 선택하세요</div>

        <PositionContainer>
          {positionList && positionList.data.length > 1 && (
            <>
              {positionList.data.map((item: IPosition) => {
                return (
                  <PositionCardContainer
                    active={position.includes(item.id)}
                    first={position[0] === item.id}
                    key={item.id}
                    onClick={() => {
                      handleSelect(item.id);
                    }}>
                    {item.position}
                  </PositionCardContainer>
                );
              })}
            </>
          )}
        </PositionContainer>

        <div className='requestPosition'>
          나의 직무가 없나요? <span>요청하기</span>
        </div>

        <DefaultBtn
          first={false}
          active={position.length > 0}
          onClick={() => {
            if (position.length > 0) {
              handlePosition();
            }
          }}>
          고하이어 시작하기
        </DefaultBtn>
      </Wrapper>
    </Main>
  );
};

export default DesiredPosition;

const Main = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 135px;
  .mainTitle {
    color: #3253ff;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: -0.6px;
  }
  .requestPosition {
    margin-bottom: 38px;
    color: #969696;
    text-align: center;
    font-size: 17px;
    font-weight: 500;
    line-height: 24px;
    span {
      color: #3253ff;
      cursor: pointer;
    }
  }
`;

const PositionContainer = styled.div`
  display: grid;
  margin: 38px 0 23px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 56px 1fr;
  gap: 12px;
`;

const PositionCardContainer = styled.div<{ active: boolean; first: boolean }>`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 0.5px solid #d9d9d9;
  background: ${props => (props.active ? (props.first ? '#333333' : '#DFDFDF') : '#fff')};
  width: 239px;
  height: 56px;
  color: ${props => (props.first ? '#fff' : '#333')};
  text-align: center;
  font-size: 20px;
  font-weight: 500;
`;

const DefaultBtn = styled(PositionCardContainer)<{ active: boolean }>`
  color: ${props => (props.active ? '#fff' : '#d9d9d9')};
  width: 296px;
  cursor: ${props => (props.active ? 'pointer' : 'default')};
  background: ${props => (props.active ? '#3253FF' : '#fff')};
`;
