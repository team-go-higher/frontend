import { useMutation } from '@tanstack/react-query';
import { postLogout } from 'apis/auth';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  const handleLogoutMutation = useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userPositionInfo');
      navigate('/signin');
    },
    onError: () => alert('로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.'),
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '100px',
        gap: '50px',
      }}>
      <div>mypage</div>
      <div
        style={{
          cursor: 'pointer',
          fontSize: '20px',
        }}
        onClick={() => {
          handleLogoutMutation.mutate();
        }}>
        로그아웃
      </div>
    </div>
  );
};

export default MyPage;
