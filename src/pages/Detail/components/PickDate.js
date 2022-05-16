import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function PickDate() {
  const [startDate, setStartDate] = useState(new Date('2022/01/01'));
  const [endDate, setEndDate] = useState(new Date('2022/01/01'));

  return (
    <PickDateWrapper>
      <DatePicker
        className="custom"
        selected={startDate}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="yyyy-MM-dd"
      />
      <span>ㅡ</span>
      <DatePicker
        className="custom"
        selected={endDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat="yyyy-MM-dd"
      />
    </PickDateWrapper>
  );
}

export default PickDate;

const PickDateWrapper = styled.div`
  display: flex;
  .custom {
    font-size: 16px;
    font-weight: 400;
    width: 90px;
    text-align: center;
    border: 0px;
    background-color: transparent;
    padding-top: 5px;
    border-bottom: 2px solid #4231c8;
    margin: 0px 5px;
  }
  .custom:focus {
    outline: 0px;
  }
  span {
    padding-top: 4px;
    color: #4231c8;
  }
`;
