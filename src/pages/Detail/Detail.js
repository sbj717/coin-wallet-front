import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DetailCard from './components/DetailCard';
import DetailSearch from './components/DetailSearch';

function Detail() {
  const [detailList, setDetailList] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const today = new Date();
  let year =
    today.getMonth() > 1 ? today.getFullYear() : today.getFullYear() - 1;
  let month = today.getMonth() > 1 ? today.getMonth() : today.getMonth() + 11;
  let date = today.getDate();
  const [searchCondition, setSearchCondition] = useState([
    `${year}/${month}/${date}`,
    `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`,
    '',
  ]);
  const [refreshState, setRefreshState] = useState(0);
  const [onGoingCheck, setOnGoingCheck] = useState('');
  const [page, setPage] = useState(1);
  const [jsonForCSV, setJsonForCSV] = useState({});

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(
      `http://3.36.65.166:8000/details?search=${searchWord}&pageCount=1&startDate=${searchCondition[0]}&endDate=${searchCondition[1]}&detailType=${searchCondition[2]}&status=${onGoingCheck}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', access_token: token },
      }
    )
      .then(res => res.json())
      .then(res => {
        setDetailList(res.detailList);
      });
  }, []);

  const searchByCoinName = name => {
    setSearchWord(name);
    setSearchCondition([
      `${year}/${month}/${date}`,
      `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`,
      '',
    ]);
  };

  const searchByCondition = (conditions, searchWordInput) => {
    setSearchCondition(conditions);
    if (searchWordInput.length === 0) setSearchWord('');
  };

  const sortOnGoing = check => {
    setOnGoingCheck(check);
  };

  const refresh = () => {
    refreshState === 0 ? setRefreshState(1) : setRefreshState(0);
  };

  useEffect(() => {
    fetch(
      `http://3.36.65.166:8000/details?search=${searchWord}&pageCount=${page}&startDate=${searchCondition[0]}&endDate=${searchCondition[1]}&detailType=${searchCondition[2]}&status=${onGoingCheck}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', access_token: token },
      }
    )
      .then(res => res.json())
      .then(res => {
        setDetailList(res.detailList);
      });

    fetch(
      `http://3.36.65.166:8000/details?search=${searchWord}&startDate=${searchCondition[0]}&endDate=${searchCondition[1]}&detailType=${searchCondition[2]}&status=${onGoingCheck}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', access_token: token },
      }
    )
      .then(res => res.json())
      .then(res => {
        setJsonForCSV(res.detailList);
      });
  }, [onGoingCheck, searchCondition, searchWord, token, refreshState]);

  return (
    <DetailWrapper>
      <DetailContainer>
        <DetailTitle>입출금 내역</DetailTitle>
        <DetailArticle>
          <DetailSearch
            searchByCoinName={searchByCoinName}
            searchByCondition={searchByCondition}
            refresh={refresh}
            sortOnGoing={sortOnGoing}
            searchWord={searchWord}
            searchCondition={searchCondition}
            jsonForCSV={jsonForCSV}
          />
          <DetailTable>
            <TableHead>
              <span style={{ width: '5%' }}>구분</span>
              <span style={{ width: '10%' }}>코인명</span>
              <span style={{ width: '10%' }}>블록체인 타입</span>
              <span style={{ width: '12%' }}>수량</span>
              <span style={{ width: '13%' }}>평가금액</span>
              <span style={{ width: '10%' }}>상태</span>
              <span style={{ width: '25%' }}>주소</span>
              <span style={{ width: '15%' }}>일시</span>
            </TableHead>
            <TableBody>
              {detailList.map(detail => (
                <DetailCard key={detail.id} detail={detail} />
              ))}
            </TableBody>
          </DetailTable>
        </DetailArticle>
      </DetailContainer>
    </DetailWrapper>
  );
}

export default Detail;

const DetailWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1280px;
  height: 700px;
`;

const DetailTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #4231c8;
  padding: 20px;
`;

const DetailArticle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 0px 20px;
`;

const DetailTable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TableHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #f5f5f5;
  border-top: 2px solid #4231c8;
  border-bottom: 1px solid lightgray;
  span {
    font-size: 16px;
    font-weight: 600;
    padding-top: 2px;
    text-align: center;
  }
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 495px;
  overflow-y: auto;
`;
