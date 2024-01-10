import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from 'components/default/header/Header';
import calendarToggle from 'assets/main/main_calendar_toggle.svg';
import kanbanToggle from 'assets/main/main_kanban_toggle.svg';

const Main = () => {
  const navigate = useNavigate();
  const [isCalendar, setCalendar] = useState(localStorage.getItem('isCalendar') === 'true');
  const userInfo = localStorage.getItem('userInfo');

  const toggleHandler = () => {
    const newIsCalendar = !isCalendar;
    setCalendar(newIsCalendar);
    localStorage.setItem('isCalendar', newIsCalendar.toString());
  };

  useEffect(() => {
    if (isCalendar) {
      navigate('/calendar');
    } else navigate('/kanban');
  }, [isCalendar]);

  return (
    <Root>
      {userInfo && <Header />}
      <ToggleContainer onClick={toggleHandler}>
        <div className={`toggle-circle ${isCalendar ? '' : 'false'}`}>
          <img src={isCalendar ? calendarToggle : kanbanToggle} alt='toggle' />
        </div>
      </ToggleContainer>
      <Outlet />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const ToggleContainer = styled.div`
  position: absolute;
  cursor: pointer;
  width: 52px;
  height: 25px;
  top: 77px;
  right: calc((100vw - 996px) / 2);
  border-radius: 17.5px;
  background: rgb(var(--border));

  .toggle-circle {
    position: absolute;
    top: -2px;
    left: 0px;
    width: 31px;
    height: 31px;
    border-radius: 50%;
    background-color: rgb(var(--main));
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .toggle-circle.false {
    left: 23px;
    transition: 0.3s;
  }
`;

export default Main;
