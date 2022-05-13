import React from 'react';
import styled from 'styled-components';

function CoinCard({ coin, selectCoin }) {
  const coinName = coin.coin_name.split(' ');
  const totalPrice = '₩ ' + (coin.price * coin.quantity).toLocaleString();

  return (
    <CoinCardWrapper>
      <CoinCardContainer
        className={`${coin.isSelected ? 'selected' : 'none'}`}
        onClick={() => selectCoin(coin.id)}
      >
        <div style={{ width: '20%' }}>
          <span>{coinName[0]}</span>
          <span>{coinName[1]}</span>
        </div>
        <div style={{ width: '20%' }}>
          <span>{coin.blockchain_type}</span>
        </div>
        <div className="number" style={{ width: '30%' }}>
          <span>{coin.quantity}</span>
        </div>
        <div className="number" style={{ width: '30%' }}>
          <span>{totalPrice}</span>
        </div>
      </CoinCardContainer>
    </CoinCardWrapper>
  );
}

export default CoinCard;

const CoinCardWrapper = styled.div`
  display: flex;
  .selected {
    background-color: #d0ccf0;
  }
  .none {
    background-color: transparent;
  }
`;

const CoinCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 42px;
    border-bottom: 1px dotted gray;
    span {
      font-size: 14px;
      padding-top: 2px;
    }
  }
  .number {
    align-items: flex-end;
    padding-right: 10px;
  }
`;
