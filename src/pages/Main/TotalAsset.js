import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function TotalAsset({ list }) {
  const [totalAsset, setTotalAsset] = useState('');

  useEffect(() => {
    const newAsset = [];
    list.forEach(el => {
      newAsset.push(el.quantity * el.price);
    });
    const totalAsset = newAsset.reduce((prev, curr) => prev + curr, 0);
    const addComma = totalAsset.toLocaleString();
    setTotalAsset(addComma);
  }, [list]);

  return (
    <TotalAssetContainer>
      <h3>총 보유자산</h3>
      <div>
        <span>₩</span>
        <span>{totalAsset}</span>
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
  padding: 0px 15px;
  margin-bottom: 20px;
  border: 1px solid #c5c5c5;
  h3 {
    padding-top: 2px;
    font-size: 20px;
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
