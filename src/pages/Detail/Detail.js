import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DetailCard from './components/DetailCard';
import DetailSearch from './components/DetailSearch';

function Detail() {
  const [detailList, setDetailList] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [searchCondition, setSearchCondition] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('/data/deposit_withdraw_detail_data.json', {
      method: 'GET',
      Headers: { 'Content-Type': 'application/json', token: token },
    })
      .then(res => res.json())
      .then(res => {
        setDetailList(res);
      });
  }, [token]);

  const searchByCoinName = name => {
    setSearchWord(name);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: token },
      body: JSON.stringify({
        searchWord: name,
      }),
    })
      .then(res => res.json())
      .then(res => {
        setDetailList(res);
      });
  };

  const searchByCondition = conditions => {
    setSearchCondition(conditions);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: token },
      body: JSON.stringify({
        searchWord: searchWord,
        startDate: conditions[0],
        endDate: conditions[1],
        dealType: conditions[2],
      }),
    })
      .then(res => res.json())
      .then(res => {
        setDetailList(res);
      });
  };

  const refresh = () => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: token },
      body: JSON.stringify({
        searchWord: searchWord,
        startDate: searchCondition[0],
        endDate: searchCondition[1],
        dealType: searchCondition[2],
      }),
    })
      .then(res => res.json())
      .then(res => {
        setDetailList(res);
      });
  };

  return (
    <DetailWrapper>
      <DetailContainer>
        <DetailTitle>입출금 내역</DetailTitle>
        <DetailArticle>
          <DetailSearch
            searchByCoinName={searchByCoinName}
            searchByCondition={searchByCondition}
            refresh={refresh}
            searchWord={searchWord}
            searchCondition={searchCondition}
          />
          <DetailTable>
            <TableHead>
              <span style={{ width: '5%' }}>구분</span>
              <span style={{ width: '10%' }}>코인명</span>
              <span style={{ width: '10%' }}>블록체인 타입</span>
              <span style={{ width: '15%' }}>수량</span>
              <span style={{ width: '15%' }}>평가금액</span>
              <span style={{ width: '5%' }}>상태</span>
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
