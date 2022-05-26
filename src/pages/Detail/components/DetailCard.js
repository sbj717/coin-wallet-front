import React from 'react';
import styled from 'styled-components';

function DetailCard({ detail }) {
  const coinName = detail.coin_name.split(' ');
  const coinQuantity = detail.quantity
    .toLocaleString('en', { maximumSignificantDigits: 15 })
    .slice(0, 15);
  const totalPrice =
    '₩ ' +
    (detail.price * detail.quantity)
      .toLocaleString('en', { maximumSignificantDigits: 15 })
      .slice(0, 15);

  return (
    <DetailCardWrapper>
      <DetailCardContainer>
        <div style={{ width: '5%' }}>{detail.detail_type}</div>
        <div style={{ width: '10%' }}>
          <span>{coinName[0]}</span>
          <span>{coinName[1]}</span>
        </div>
        <div style={{ width: '10%' }}>{detail.type_name}</div>
        <div className="align" style={{ width: '12%' }}>
          {coinQuantity}
        </div>
        <div className="align" style={{ width: '13%' }}>
          {totalPrice}
        </div>
        <div className="center" style={{ width: '10%' }}>
          <span>{detail.status}</span>
          {(detail.status === '대기' || detail.status === '진행') && (
            <span className="cancel">취소</span>
          )}
        </div>
        <div style={{ width: '25%' }}>
          <div className="part" style={{ width: '100%' }}>
            <p className="hidden">{detail.address}</p>
          </div>
        </div>
        <div style={{ width: '15%' }}>{detail.update_at}</div>
      </DetailCardContainer>
    </DetailCardWrapper>
  );
}

export default DetailCard;

const DetailCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const DetailCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45px;
  border-bottom: 1px solid lightgray;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 15px;
    text-align: center;
    padding-top: 2px;
    overflow: hidden;
    .part {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      padding-left: 20px;
      height: 20px;
      .hidden {
        width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .cancel {
      width: 30px;
      height: 16px;
      font-size: 12px;
      font-weight: 600;
      color: white;
      background-color: red;
      padding-top: 3px;
      cursor: pointer;
    }
  }
  .align {
    text-align: end;
    padding-right: 10px;
  }
  .center {
    align-items: center;
  }
`;
