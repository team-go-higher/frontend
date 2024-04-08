import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 73px auto;
`;

export const ApplicationStatusContainer = styled.div`
  display: flex;
  width: 1000px;
  align-items: center;
  flex-direction: column;

  .title {
    color: #333;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 41px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 21.5px;

  .sortContainer {
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .sortTitle {
      color: #676767;
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      letter-spacing: -0.8px;
      margin-top: 5px;
    }
  }

  .searchInput {
    border-radius: 16px;
    border: 0.5px solid #616161;
    width: 235px;
    box-sizing: border-box;
    height: 33px;
    padding: 5px 15px;
    font-size: 12px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
