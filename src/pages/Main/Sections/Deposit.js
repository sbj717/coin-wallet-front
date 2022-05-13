import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsCardChecklist } from 'react-icons/bs';
import QRCodeCard from '../MainComponents/QRCodeCard';

function Deposit({ coin }) {
  const [address, setAddress] = useState('');

  useEffect(() => {
    setAddress(coin.deposit_address);
  }, [coin.deposit_address]);

  const copyToClipBoard = async () => {
    await navigator.clipboard.writeText(address);
    alert('입금주소를 복사했습니다.');
  };

  return (
    <DepositWrapper>
      {coin.id !== undefined && (
        <DepositContainer>
          <BlockchainType>
            <span>블록체인 타입 선택</span>
            <span>{coin.blockchain_type}</span>
          </BlockchainType>
          <DepositAddress>
            <span>입금주소</span>
            <div>
              <p>{coin.deposit_address}</p>
              <button onClick={copyToClipBoard}>복사</button>
            </div>
          </DepositAddress>
          <QRCode>
            <p>QR CODE</p>
            <div>
              <QRCodeCard address={address} />
            </div>
          </QRCode>
        </DepositContainer>
      )}
      {coin.id === undefined && (
        <PickNothing>
          <BsCardChecklist />
          <p>왼쪽 표에서 코인을 선택하세요.</p>
        </PickNothing>
      )}
    </DepositWrapper>
  );
}

export default Deposit;

const DepositWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const DepositContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
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

const DepositAddress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0px 20px;
  margin-bottom: 30px;
  span {
    font-size: 16px;
    margin-bottom: 10px;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    p {
      font-size: 16px;
      padding: 7px 10px 5px 10px;
      width: 85%;
      height: 30px;
      border: 1px solid black;
      margin-right: 5px;
    }
    button {
      width: 15%;
      height: 30px;
      border: 0px;
      border-radius: 0px;
      background-color: #4231c8;
      color: white;
      font-size: 14px;
      text-align: center;
      padding-top: 2px;
      padding-left: 12px;
      letter-spacing: 5px;
      cursor: pointer;
    }
  }
`;

const QRCode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0px 20px;
  p {
    width: 100%;
    margin-bottom: 20px;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 180px;
    border: 1px solid #f5f5f5;
  }
`;

const PickNothing = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 220px;
  font-size: 24px;
  color: #4231c8;
  p {
    font-size: 18px;
    font-weight: 400;
    padding-top: 3px;
    padding-left: 10px;
  }
`;
