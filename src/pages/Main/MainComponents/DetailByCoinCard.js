import React from 'react';
import styled from 'styled-components';

function DetailByCoinCard({ detail }) {
  const totalPrice = '₩ ' + (detail.price * detail.quantity).toLocaleString();

  return (
    <DetailCardWrapper>
      <DetailCardContainer>
        <div className="section" style={{ width: '10%' }}>
          {detail.kind}
        </div>
        <div className="section align" style={{ width: '20%' }}>
          {detail.quantity}
        </div>
        <div className="section align" style={{ width: '20%' }}>
          {totalPrice}
        </div>
        <div className="section" style={{ width: '10%' }}>
          {detail.status}
        </div>
        <div className="section" style={{ width: '40%' }}>
          <div className="part line" style={{ width: '100%' }}>
            {detail.updated_at}
          </div>
          <div className="part" style={{ width: '100%' }}>
            {detail.address}
          </div>
        </div>
      </DetailCardContainer>
    </DetailCardWrapper>
  );
}

export default DetailByCoinCard;

const DetailCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const DetailCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #c5c5c5;
  .section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    padding-top: 2px;
    height: 40px;
    .part {
      text-align: center;
      font-size: 14px;
      padding-top: 3px;
      height: 20px;
    }
    .line {
      border-bottom: 1px dotted #c5c5c5;
    }
  }
  .align {
    text-align: end;
    padding-right: 10px;
  }
`;
