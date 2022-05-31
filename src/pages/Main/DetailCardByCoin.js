import React from 'react';
import styled from 'styled-components';

function DetailCardByCoin({ detail }) {
  const coinQuantity = detail.quantity
    .toLocaleString('en', { maximumSignificantDigits: 15 })
    .slice(0, 12);
  const totalPrice =
    '₩ ' +
    (detail.price * detail.quantity)
      .toLocaleString('en', { maximumSignificantDigits: 15 })
      .slice(0, 12);

  return (
    <DetailCardWrapper>
      <DetailCardContainer>
        <div className="section" style={{ width: '10%' }}>
          {detail.detail_type}
        </div>
        <div className="section align" style={{ width: '20%' }}>
          {coinQuantity}
        </div>
        <div className="section align" style={{ width: '20%' }}>
          {totalPrice}
        </div>
        <div className="section center" style={{ width: '10%' }}>
          <span>{detail.status}</span>
          {(detail.status === '대기' || detail.status === '진행') && (
            <span className="cancel">취소</span>
          )}
        </div>
        <div className="section" style={{ width: '40%' }}>
          <div className="part line" style={{ width: '100%' }}>
            {detail.update_at}
          </div>
          <div className="part" style={{ width: '100%' }}>
            <div className="hidden">{detail.address}</div>
          </div>
        </div>
      </DetailCardContainer>
    </DetailCardWrapper>
  );
}

export default DetailCardByCoin;

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
    width: 100%;
    height: 40px;
    padding-top: 2px;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    .part {
      display: flex;
      justify-content: center;
      height: 20px;
      padding: 3px 3px 0px 3px;
      font-size: 14px;
      overflow: hidden;
      .hidden {
        width: 220px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .line {
      border-bottom: 1px dotted #c5c5c5;
    }
    .cancel {
      width: 24px;
      height: 15px;
      padding-top: 3px;
      background-color: red;
      color: white;
      font-size: 11px;
      font-weight: 400;
      cursor: pointer;
    }
  }
  .align {
    padding-right: 10px;
    text-align: end;
  }
  .center {
    align-items: center;
  }
`;
