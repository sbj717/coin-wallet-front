import React from 'react';
import styled from 'styled-components';

function DetailCard({ detail }) {
  const coinName = detail.coin_name.split(' ');
  const totalPrice = '₩ ' + (detail.price * detail.quantity).toLocaleString();

  return (
    <DetailCardWrapper>
      <DetailCardContainer>
        <div style={{ width: '5%' }}>{detail.kind}</div>
        <div style={{ width: '10%' }}>
          <span>{coinName[0]}</span>
          <span>{coinName[1]}</span>
        </div>
        <div style={{ width: '10%' }}>{detail.blockchain_type}</div>
        <div className="align" style={{ width: '15%' }}>
          {detail.quantity}
        </div>
        <div className="align" style={{ width: '15%' }}>
          {totalPrice}
        </div>
        <div style={{ width: '5%' }}>{detail.status}</div>
        <div style={{ width: '25%' }}>{detail.address}</div>
        <div style={{ width: '15%' }}>{detail.updated_at}</div>
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
    font-size: 15px;
    text-align: center;
  }
  .align {
    text-align: end;
    padding-right: 10px;
  }
`;
