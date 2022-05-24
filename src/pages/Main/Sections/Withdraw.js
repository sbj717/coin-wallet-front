import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Withdraw({ coin }) {
  const [wdAddress, setWdAddress] = useState('');
  const [wdQuantity, setWdQuantity] = useState('');
  const [evaluatedPrice, setEvaluatedPrice] = useState('');
  const token = localStorage.getItem('token');

  const addressInputHandler = e => {
    setWdAddress(e.target.value);
  };

  const quantityInputHandler = e => {
    e.target.value.length === 0
      ? setWdQuantity(e.target.value)
      : setWdQuantity(Math.abs(e.target.value));
  };

  useEffect(() => {
    const newPrice = '₩ ' + (coin.price * wdQuantity).toLocaleString();
    setEvaluatedPrice(newPrice);
  }, [coin.price, wdQuantity]);

  const withdrawCoin = () => {
    if (
      wdAddress.length !== 0 &&
      wdQuantity.length !== 0 &&
      wdQuantity !== 0 &&
      wdQuantity <= coin.quantity
    ) {
      fetch('http://3.36.65.166:8000/withdrawals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', access_token: token },
        body: JSON.stringify({
          assetId: coin.asset_id,
          blockchainTypeId: coin.blockchain_type_id,
          quantity: wdQuantity,
          withdrawalAddress: wdAddress,
        }),
      }).then(res => res.json());
      alert(`${wdQuantity}${coinUnit} 출금되었습니다.`);
    }
  };

  const coinUnit = coin.coin_name.split(' ')[0];

  return (
    <WithdrawWrapper>
      <WithdrawContainer>
        <BlockchainType>
          <span>블록체인 타입 선택</span>
          <span>{coin.blockchain_type}</span>
        </BlockchainType>
        <WithdrawAddress>
          <p>출금주소</p>
          <input type="text" value={wdAddress} onChange={addressInputHandler} />
        </WithdrawAddress>
        <WithdrawQuantity>
          <p>출금수량</p>
          <input
            type="number"
            value={wdQuantity}
            onChange={quantityInputHandler}
          />
          <span>{coinUnit}</span>
        </WithdrawQuantity>
        <EvaluatedPrice>
          <div>
            <p>평가금액</p>
            <span>{evaluatedPrice}</span>
          </div>
        </EvaluatedPrice>
        <WithdrawButton onClick={withdrawCoin}>{coinUnit} 출금</WithdrawButton>
      </WithdrawContainer>
    </WithdrawWrapper>
  );
}

export default Withdraw;

const WithdrawWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const WithdrawContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 15px;
`;

const BlockchainType = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 30px;
  span {
    font-size: 16px;
    margin-left: 20px;
    margin-right: 50px;
  }
`;

const WithdrawAddress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0px 20px;
  margin-bottom: 30px;
  p {
    font-size: 16px;
    margin-bottom: 10px;
  }
  input {
    font-size: 16px;
    padding: 7px 10px 5px 10px;
    width: 100%;
    height: 30px;
    border: 1px solid black;
    margin-right: 5px;
  }
`;

const WithdrawQuantity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0px 20px;
  margin-bottom: 10px;
  position: relative;
  p {
    font-size: 16px;
    margin-bottom: 10px;
  }
  input {
    font-size: 16px;
    padding: 7px 10px 5px 10px;
    width: 100%;
    height: 30px;
    border: 1px solid black;
    margin-right: 5px;
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
  span {
    position: absolute;
    top: 34px;
    right: 30px;
    font-size: 16px;
    font-weight: 700;
    color: #4231c8;
    text-align: right;
  }
`;

const EvaluatedPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 0px 20px;
  margin-bottom: 195px;
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 55%;
    background-color: #f5f5f5;
    padding: 10px;
    font-size: 16px;
    font-weight: 500;
    color: #4231c8;
    p {
      margin-bottom: 5px;
    }
  }
`;

const WithdrawButton = styled.button`
  width: 180px;
  height: 30px;
  font-size: 16px;
  font-family: 700;
  color: white;
  background-color: #4231c8;
  border: 0px;
  border-radius: 0px;
  cursor: pointer;
`;
