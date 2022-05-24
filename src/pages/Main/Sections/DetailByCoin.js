import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GoSearch } from 'react-icons/go';
import { FaRegListAlt } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import CSVDownload from 'react-json-to-csv';
import DetailCardByCoin from '../MainComponents/DetailCardByCoin';

function DetailByCoin({ coin }) {
  const [detailList, setDetailList] = useState([]);
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
  const shortStartDate = `${startDate.getFullYear()}/${
    startDate.getMonth() + 1
  }/${startDate.getDate()}`;
  const shortEndDate = `${endDate.getFullYear()}/${
    endDate.getMonth() + 1
  }/${endDate.getDate()}`;
  const [pickType, setPickType] = useState(['none', 'none', 'picked']);
  const [dealType, setDealType] = useState('');
  const [searchCondition, setSearchCondition] = useState([]);
  const [onGoing, setOnGoing] = useState('');
  const [forCSV, setForCSV] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    setSearchCondition([shortStartDate, shortEndDate, dealType]);
    fetch(
      `http://3.36.65.166:8000/details?coinId=${coin.coin_id}&blockchainTypeId=${coin.blockchain_type_id}&pageCount=1&startDate=${shortStartDate}&endDate=${shortEndDate}&detailType=${dealType}&status=${onGoing}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', access_token: token },
      }
    )
      .then(res => res.json())
      .then(res => {
        setDetailList(res.detailList);
      });
  }, [coin.blockchain_type_id, coin.coin_id, token]);

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

  const search = () => {
    setSearchCondition([shortStartDate, shortEndDate, dealType]);
    fetch(
      `http://3.36.65.166:8000/details?coinId=${coin.coin_id}&blockchainTypeId=${coin.blockchain_type_id}&pageCount=1&startDate=${shortStartDate}&endDate=${shortEndDate}&detailType=${dealType}&status=${onGoing}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', access_token: token },
      }
    )
      .then(res => res.json())
      .then(res => {
        setDetailList(res.detailList);
      });
  };

  const resetDetail = () => {
    setStartDate(new Date(`${year}/${month}/${date}`));
    setEndDate(
      new Date(
        `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
      )
    );
    setPickType(['none', 'none', 'picked']);
    setDealType('');
    setOnGoing('');
  };

  const sortOnGoingHandler = () => {
    onGoing === '진행' ? setOnGoing('') : setOnGoing('진행');
    onGoing === '진행' ? sortOnGoing('') : sortOnGoing('진행');
  };

  const sortOnGoing = check => {
    fetch(
      `http://3.36.65.166:8000/details?coinId=${coin.coin_id}&blockchainTypeId=${coin.blockchain_type_id}&pageCount=1&startDate=${searchCondition[0]}&endDate=${searchCondition[1]}&detailType=${searchCondition[2]}&status=${check}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', access_token: token },
      }
    )
      .then(res => res.json())
      .then(res => {
        setDetailList(res.detailList);
      });
  };

  const refresh = () => {
    fetch(
      `http://3.36.65.166:8000/details?coinId=${coin.coin_id}&blockchainTypeId=${coin.blockchain_type_id}&pageCount=1&startDate=${searchCondition[0]}&endDate=${searchCondition[1]}&detailType=${searchCondition[2]}&status=${onGoing}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', access_token: token },
      }
    )
      .then(res => res.json())
      .then(res => {
        setDetailList(res.detailList);
      });
  };

  useEffect(() => {
    fetch(
      `http://3.36.65.166:8000/details?coinId=${coin.coin_id}&blockchainTypeId=${coin.blockchain_type_id}&startDate=${searchCondition[0]}&endDate=${searchCondition[1]}&detailType=${searchCondition[2]}&status=${onGoing}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', access_token: token },
      }
    )
      .then(res => res.json())
      .then(res => {
        setForCSV(res.detailList);
      });
  }, [coin.blockchain_type_id, coin.coin_id, searchCondition, onGoing, token]);

  return (
    <DetailWrapper>
      <DetailContainer>
        <DetailSearch>
          <span>기간 검색</span>
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
            <div className="search" onClick={search}>
              <GoSearch />
            </div>
          </SearchByDealType>
          <Reset>
            <div className="box" onClick={resetDetail}>
              <p>초기화</p>
            </div>
          </Reset>
        </DetailSearch>
        <DetailCheck>
          <OnGoing>
            <div className={onGoing} onClick={sortOnGoingHandler} />
            <span>진행 항목만 보기</span>
          </OnGoing>
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
        </DetailCheck>
        <DetailTableHead>
          <div className="section" style={{ width: '10%' }}>
            구분
          </div>
          <div className="section" style={{ width: '19%' }}>
            수량
          </div>
          <div className="section" style={{ width: '20%' }}>
            평가금액
          </div>
          <div className="section" style={{ width: '9%' }}>
            상태
          </div>
          <div className="section" style={{ width: '42%' }}>
            <div className="part line" style={{ width: '100%' }}>
              일시
            </div>
            <div className="part" style={{ width: '100%' }}>
              주소
            </div>
          </div>
        </DetailTableHead>
        <DetailTableBody>
          {detailList.map(detail => (
            <DetailCardByCoin key={detail.row_id} detail={detail} />
          ))}
        </DetailTableBody>
      </DetailContainer>
    </DetailWrapper>
  );
}

export default DetailByCoin;

const DetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
`;

const DetailSearch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  font-size: 14px;
`;

const PickDateWrapper = styled.div`
  display: flex;
  .custom {
    font-size: 14px;
    font-weight: 400;
    width: 80px;
    text-align: center;
    border: 0px;
    background-color: transparent;
    padding-top: 3px;
    border-bottom: 2px solid #4231c8;
    margin: 0px 5px;
  }
  .custom:focus {
    outline: 0px;
  }
  span {
    padding-top: 2px;
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
      width: 10px;
      height: 10px;
      border: 1px solid black;
      border-radius: 5px;
      margin-right: 3px;
      cursor: pointer;
    }
    .picked {
      border: 0px;
      background-color: #4231c8;
    }
    span {
      font-size: 14px;
      font-weight: 400;
      padding-top: 2px;
      margin-right: 10px;
    }
  }
  .search {
    padding-top: 2px;
    color: gray;
    cursor: pointer;
    margin-right: 5px;
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
      font-size: 12px;
      font-weight: 600;
      color: white;
      padding-top: 2px;
    }
  }
`;

const DetailCheck = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 30px;
`;

const OnGoing = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 2px;
  margin-right: 20px;
  div {
    border: 1px solid black;
    width: 12px;
    height: 12px;
    margin-right: 5px;
    cursor: pointer;
  }
  span {
    font-size: 14px;
    font-weight: 400;
  }
  .진행 {
    border: 0;
    background-color: #4231c8;
  }
`;

const Refresh = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-right: 25px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #4231c8;
    padding-bottom: 1px;
    margin-right: 5px;
    cursor: pointer;
  }
  span {
    font-size: 14px;
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
    font-size: 14px;
    font-weight: 400;
    padding-top: 2px;
  }
  .icon {
    font-size: 16px;
    padding-top: 3px;
    margin-right: 7px;
    border: 1px;
    background-color: transparent;
    padding: 4px 0px 0px 0px;
    cursor: pointer;
  }
`;

const DetailTableHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #4231c8;
  border-bottom: 1px solid #c5c5c5;
  .section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: white;
    padding-top: 2px;
    height: 40px;
    .part {
      text-align: center;
      font-size: 14px;
      color: white;
      padding-top: 3px;
      height: 20px;
    }
    .line {
      border-bottom: 1px dotted #c5c5c5;
    }
  }
`;

const DetailTableBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 395px;
  overflow-y: auto;
`;
