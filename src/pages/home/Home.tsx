import { useState } from 'react';
import styled from 'styled-components';
import Calendar from './calendar/Calendar';
import Kanban from './kanban/Kanban';
import calendarToggle from '../../assets/home/calendar_toggle.png';
import kanbanToggle from '../../assets/home/kanban_toggle.png';

const Home = () => {
  const [isHome, setHome] = useState(true);
  const toggleHandler = () => {
    setHome(!isHome);
  };

  return (
    <div>
      <ToggleContainer onClick={toggleHandler}>
        <div className={`toggle-container ${isHome ? '' : 'false'}`} />
        <div className={`toggle-circle ${isHome ? '' : 'false'}`}>
          <img src={isHome ? calendarToggle : kanbanToggle} alt='Image' />
        </div>
      </ToggleContainer>
      {isHome ? <Calendar></Calendar> : <Kanban></Kanban>}
    </div>
  );
};

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: 68px;
  height: 35px;
  left: 80%;
  .toggle-container {
    width: 68px;
    height: 35px;
    border-radius: 30px;
    background-color: rgba(50, 83, 255, 1);
  }
  .toggle-container.false {
    border: 1px rgba(50, 83, 255, 1) solid;
    background-color: white;
    transition: 0.3s;
  }

  .toggle-circle {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 31px;
    height: 31px;
    border-radius: 50%;
    background-color: white;
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .toggle-circle.false {
    left: 35px;
    transition: 0.3s;
    background-color: rgba(50, 83, 255, 1);
  }
`;

export default Home;
