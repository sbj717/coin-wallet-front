import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GoSearch } from 'react-icons/go';
import { FaRegListAlt } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import CSVDownload from 'react-json-to-csv';

function DetailSearch({
  searchByCoinName,
  searchByCondition,
  refresh,
  searchWord,
  searchCondition,
  sortOnGoing,
  jsonForCSV,
}) {
  const [searchWordInput, setSearchWordInput] = useState('');
  const today = new Date();
  let year =
    today.getMonth() > 1 ? today.getFullYear() : today.getFullYear() - 1;
  let month = today.getMonth() > 1 ? today.getMonth() : today.getMonth() + 11;
  let date = today.getDate();
  const [startDate, setStartDate] = useState(
    new Date(`${year}/${month}/${date}`)
  );
  const [endDate, setEndDate] = useState(
    new Date(
      `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
    )
  );
  const [pickType, setPickType] = useState(['none', 'none', 'picked']);
  const [dealType, setDealType] = useState('');
  const [onGoing, setOnGoing] = useState('');

  const searchWordInputHandler = e => {
    setSearchWordInput(e.target.value);
  };

  const sendCoinName = () => {
    searchByCoinName(searchWordInput);
    setStartDate(new Date(`${year}/${month}/${date}`));
    setEndDate(
      new Date(
        `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
      )
    );
    setPickType(['none', 'none', 'picked']);
    setDealType('');
  };

  const sendCondition = () => {
    const newCondition = [
      `${startDate.getFullYear()}/${
        startDate.getMonth() + 1
      }/${startDate.getDate()}`,
      `${endDate.getFullYear()}/${endDate.getMonth() + 1}/${endDate.getDate()}`,
      dealType,
    ];
    searchByCondition(newCondition, searchWordInput);
  };

  const selectDeposit = () => {
    setPickType(['picked', 'none', 'none']);
    setDealType('입금');
  };

  const selectWithdraw = () => {
    setPickType(['none', 'picked', 'none']);
    setDealType('출금');
  };

  const selectAll = () => {
    setPickType(['none', 'none', 'picked']);
    setDealType('');
  };

  const resetDetail = () => {
    setSearchWordInput('');
    setStartDate(new Date(`${year}/${month}/${date}`));
    setEndDate(
      new Date(
        `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
      )
    );
    setPickType(['none', 'none', 'picked']);
    setDealType('');
  };

  const sortOnGoingHandler = () => {
    onGoing === '진행' ? setOnGoing('') : setOnGoing('진행');
    onGoing === '진행' ? sortOnGoing('') : sortOnGoing('진행');
  };

  return (
    <DetailSearchWrapper>
      <DetailSearchContainer>
        <SearchByName>
          <span>코인:</span>
          <input
            type="text"
            value={searchWordInput}
            onChange={searchWordInputHandler}
          />
          <div onClick={sendCoinName}>
            <GoSearch />
          </div>
        </SearchByName>
        <SearchByPeriod>
          <span>기간:</span>
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
        </SearchByPeriod>
        <SearchByDealType>
          <div>
            <div className={pickType[0]} onClick={selectDeposit} />
            <span>입금</span>
          </div>
          <div>
            <div className={pickType[1]} onClick={selectWithdraw} />
            <span>출금</span>
          </div>
          <div>
            <div className={pickType[2]} onClick={selectAll} />
            <span>전체</span>
          </div>
          <div className="search" onClick={sendCondition}>
            <GoSearch />
          </div>
        </SearchByDealType>
        <Reset>
          <div className="box" onClick={resetDetail}>
            <p>초기화</p>
          </div>
        </Reset>
        <Refresh>
          <div onClick={refresh}>
            <IoMdRefresh />
          </div>
          <span>새로고침</span>
        </Refresh>
        <Download>
          <CSVDownload className="icon" data={jsonForCSV}>
            <FaRegListAlt />
          </CSVDownload>
          <span>CSV 다운로드</span>
        </Download>
        <OnGoing>
          <div className={onGoing} onClick={sortOnGoingHandler} />
          <span>진행 항목만 보기</span>
        </OnGoing>
      </DetailSearchContainer>
    </DetailSearchWrapper>
  );
}

export default DetailSearch;

const DetailSearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const DetailSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-bottom: 5px;
`;

const SearchByName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  span {
    padding-top: 2px;
    margin-right: 10px;
    font-size: 16px;
    font-weight: 400;
  }
  input {
    width: 150px;
    padding: 4px 5px 2px 5px;
    border: 0px;
    border-bottom: 2px solid #4231c8;
    font-size: 16px;
  }
  input:focus {
    outline: 0px;
  }
  div {
    color: gray;
    position: absolute;
    top: 6px;
    right: 3px;
    cursor: pointer;
  }
`;

const SearchByPeriod = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  span {
    padding-top: 3px;
    font-size: 16px;
    font-weight: 400;
  }
`;

const PickDateWrapper = styled.div`
  display: flex;
  .custom {
    width: 90px;
    padding-top: 5px;
    margin: 0px 5px;
    border: 0px;
    border-bottom: 2px solid #4231c8;
    background-color: transparent;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  }
  .custom:focus {
    outline: 0px;
  }
  span {
    padding-top: 4px;
    color: #4231c8;
  }
`;

const SearchByDealType = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    div {
      width: 12px;
      height: 12px;
      margin-right: 5px;
      border: 1px solid black;
      border-radius: 6px;
      cursor: pointer;
    }
    .picked {
      border: 0px;
      background-color: #4231c8;
    }
    span {
      padding-top: 2px;
      margin-right: 10px;
      font-size: 16px;
      font-weight: 400;
    }
  }
  .search {
    padding-top: 2px;
    color: gray;
    cursor: pointer;
  }
`;

const Reset = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  span {
    padding-top: 2px;
    font-size: 16px;
    font-weight: 400;
  }
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 10px;
    background-color: #4231c8;
    cursor: pointer;
    p {
      padding-top: 2px;
      color: white;
      font-size: 14px;
      font-weight: 600;
    }
  }
`;

const Refresh = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 1px;
    margin-right: 5px;
    color: #4231c8;
    font-size: 18px;
    cursor: pointer;
  }
  span {
    padding-top: 2px;
    font-size: 16px;
    font-weight: 400;
  }
`;

const Download = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  span {
    padding-top: 2px;
    font-size: 16px;
    font-weight: 400;
  }
  .icon {
    padding: 4px 0px 0px 0px;
    margin-right: 7px;
    border: 1px;
    background-color: transparent;
    font-size: 18px;
    cursor: pointer;
  }
`;

const OnGoing = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 2px;
  div {
    width: 14px;
    height: 14px;
    margin-right: 5px;
    border: 1px solid black;
    cursor: pointer;
  }
  span {
    font-size: 16px;
    font-weight: 400;
  }
  .진행 {
    border: 0;
    background-color: #4231c8;
  }
`;
