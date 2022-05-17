import React, { useEffect, useState } from 'react';
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
  const [dealType, setDealType] = useState('all');
  const [forCSV, setForCSV] = useState([]);
  const [onGoing, setOnGoing] = useState('none');
  const token = localStorage.getItem('token');

  const searchWordInputHandler = e => {
    setSearchWordInput(e.target.value);
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
    setDealType('deposit');
  };

  const selectWithdraw = () => {
    setPickType(['none', 'picked', 'none']);
    setDealType('withdraw');
  };

  const selectAll = () => {
    setPickType(['none', 'none', 'picked']);
    setDealType('all');
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
    setDealType('all');
    setOnGoing('none');
  };

  // useEffect(() => {
  //   const totalPage = 10; //detailList.page
  //   for (let i = 1; i <= totalPage; i++) {
  //     fetch(`/?page=${i}&pageSize=20`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json', token: token },
  //       body: JSON.stringify({
  //         searchWord: searchWord,
  //         startDate: searchCondition[0],
  //         endDate: searchCondition[1],
  //         dealType: searchCondition[2],
  //         status: onGoing,
  //       }),
  //     })
  //       .then(res => res.json)
  //       .then(res => {
  //         forCSV.concat(res);
  //         setForCSV(forCSV);
  //       });
  //   }
  // }, [forCSV, onGoing, searchCondition, searchWord, token]);

  const sortOnGoingHandler = () => {
    onGoing === 'checked' ? setOnGoing('none') : setOnGoing('checked');
    onGoing === 'checked' ? sortOnGoing('none') : sortOnGoing('checked');
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
          <div
            onClick={() => {
              searchByCoinName(searchWordInput);
            }}
          >
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
          <CSVDownload className="icon" data={forCSV}>
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
    font-size: 16px;
    font-weight: 400;
    padding-top: 2px;
    margin-right: 10px;
  }
  input {
    width: 150px;
    padding: 5px;
    border: 0px;
    border-bottom: 2px solid #4231c8;
  }
  input:focus {
    outline: 0px;
  }
  div {
    position: absolute;
    top: 6px;
    right: 3px;
    color: gray;
    cursor: pointer;
  }
`;

const SearchByPeriod = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  span {
    font-size: 16px;
    font-weight: 400;
    padding-top: 3px;
  }
`;

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
      border: 1px solid black;
      border-radius: 6px;
      margin-right: 5px;
      cursor: pointer;
    }
    .picked {
      border: 0px;
      background-color: #4231c8;
    }
    span {
      font-size: 16px;
      font-weight: 400;
      padding-top: 2px;
      margin-right: 10px;
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
    font-size: 16px;
    font-weight: 400;
    padding-top: 2px;
  }
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4231c8;
    padding: 3px 10px;
    cursor: pointer;
    p {
      font-size: 14px;
      font-weight: 600;
      color: white;
      padding-top: 2px;
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
    font-size: 18px;
    color: #4231c8;
    padding-bottom: 1px;
    margin-right: 5px;
    cursor: pointer;
  }
  span {
    font-size: 16px;
    font-weight: 400;
    padding-top: 2px;
  }
`;

const Download = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  span {
    font-size: 16px;
    font-weight: 400;
    padding-top: 2px;
  }
  .icon {
    font-size: 18px;
    padding-top: 3px;
    margin-right: 7px;
    border: 1px;
    background-color: transparent;
    padding: 4px 0px 0px 0px;
    cursor: pointer;
  }
`;

const OnGoing = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 2px;
  div {
    border: 1px solid black;
    width: 14px;
    height: 14px;
    margin-right: 5px;
    cursor: pointer;
  }
  span {
    font-size: 16px;
    font-weight: 400;
  }
  .checked {
    border: 0;
    background-color: #4231c8;
  }
`;
