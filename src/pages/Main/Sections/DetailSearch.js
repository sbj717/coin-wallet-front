import React from 'react';
import styled from 'styled-components';
import { GoSearch } from 'react-icons/go';

function DetailSearch() {
  return (
    <DetailSearchWrapper>
      <DetailSearchContainer>
        <SearchByName>
          <span>코인:</span>
          <input />
          <GoSearch />
        </SearchByName>
        <SearchByPeriod>
          <span>기간:</span>
        </SearchByPeriod>
        <SearchByDealType>
          <input />
          <GoSearch />
        </SearchByDealType>
        <Reset>
          <img alt="" />
          <span>새로고침</span>
        </Reset>
        <CSVDownload>
          <img alt="" />
          <span>CSV 다운로드</span>
        </CSVDownload>
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
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0px 20px;
  margin-bottom: 20px;
  border: 1px solid blue;
`;

const SearchByName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const SearchByPeriod = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const SearchByDealType = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Reset = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const CSVDownload = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
