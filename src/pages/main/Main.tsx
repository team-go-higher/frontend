import { useState } from 'react';
import styled from 'styled-components';
import Calendar from './calendar/Calendar';
import Kanban from './kanban/Kanban';
import calendarToggle from 'assets/main/main_calendar_toggle.svg';
import kanbanToggle from 'assets/main/main_kanban_toggle.svg';

const Main = () => {
  const [isCalendar, setCalendar] = useState(true);
  const toggleHandler = () => {
    setCalendar(!isCalendar);
  };

  return (
    <div>
      <ToggleContainer onClick={toggleHandler}>
        <div className={`toggle-circle ${isCalendar ? '' : 'false'}`}>
          <img src={isCalendar ? calendarToggle : kanbanToggle} alt='toggle' />
        </div>
      </ToggleContainer>
      {isCalendar ? <Calendar></Calendar> : <Kanban></Kanban>}
    </div>
  );
};

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
