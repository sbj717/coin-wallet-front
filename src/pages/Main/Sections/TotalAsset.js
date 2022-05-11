import React from 'react';
import styled from 'styled-components';

function TotalAsset() {
  return (
    <TotalAssetContainer>
      <h3>총 보유자산</h3>
      <div>
        <span>₩</span>
        <span>100,000,000</span>
      </div>
    </TotalAssetContainer>
  );
}

export default TotalAsset;

const TotalAssetContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  border: 1px solid #c5c5c5;
  padding: 0px 15px;
  margin-bottom: 20px;
  h3 {
    font-size: 20px;
    padding-top: 2px;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    padding-top: 2px;
    span {
      font-size: 18px;
    }
  }
`;
