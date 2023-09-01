import { styled } from 'styled-components';
import KakaoImg from '../../assets/login/img_login_kakao.png';
import GoogleImg from '../../assets/login/img_login_google.png';

const Login = () => {
  return (
    <Main>
      <Wrapper>
        <div className='loginTitle'>쉬운 관리의 시작, 고하이어</div>
        <div className='loginBtnContainer'>
          <div className='btnContainer' id='kakao'>
            <img src={KakaoImg} className='btnImg' alt='kakao' />
            <div className='btnTitle'>카카오로 로그인</div>
          </div>
          <div className='btnContainer' id='google'>
            <img src={GoogleImg} className='btnImg' alt='google' />
            <div className='btnTitle'>구글로 로그인</div>
          </div>
        </div>
      </Wrapper>
    </Main>
  );
};

export default Login;

export const Main = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 676px;
  justify-content: center;
  align-items: center;
  margin-top: 135px;
  .loginTitle {
    color: #3253ff;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    line-height: 56px;
    letter-spacing: -0.6px;
    margin-bottom: 38px;
  }
  .loginBtnContainer {
    display: flex;
    flex-direction: column;
    margin-bottom: 27px;
    .btnContainer {
      cursor: pointer;
      display: flex;
      border-radius: 30px;
      width: 400px;
      align-items: center;
      justify-content: center;
      height: 56px;
      .btnTitle {
        color: #333;
        font-size: 20px;
        font-weight: 500;
        line-height: 26px;
      }
    }
    #kakao {
      background: #ffeb37;
      .btnImg {
        width: 25px;
        height: 23px;
        margin-right: 11px;
      }
    }
    #google {
      margin-top: 11px;
      border: 0.5px solid #8c8c8c;
      .btnImg {
        width: 33px;
        height: 33px;
        margin-right: 4px;
      }
    }
  }
`;
