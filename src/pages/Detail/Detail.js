import React from 'react';
import styled from 'styled-components';

function Detail() {
  return (
    <DetailWrapper>
      <DetailContainer>
        <DetailTitle>입출금 내역</DetailTitle>
        <DetailArticle>
          <DetailSearchBar>
            <div />
          </DetailSearchBar>
          <DetailTable>
            <TableHead>
              <div />
            </TableHead>
            <TableBody>
              <div />
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
  border: 1px solid red;
`;

const DetailSearchBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0px 20px;
  margin-bottom: 20px;
  border: 1px solid blue;
`;
const DetailTable = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid green;
`;

const TableHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 1px solid violet;
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid violet;
`;
