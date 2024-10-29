import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  width: 1000px;
  overflow: hidden;
`;

export const ApplicationStatusContainer = styled.div`
  display: flex;
  width: 1000px;
  align-items: center;
  flex-direction: column;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin: 20px auto;
    color: rgb(var(--title));
    font-size: 22px;
    font-weight: 700;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;

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
    }
  }

  .searchInputContainer {
    position: relative;

    .closeIcon {
      width: 0.5rem;
      height: 0.5rem;
      position: absolute;
      cursor: pointer;
      top: 50%;
      right: 0.8rem;
      transform: translate(0%, -50%);
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

  .searchInput::placeholder {
    color: #8f8f8f;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: -0.48px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 40px auto;
`;
