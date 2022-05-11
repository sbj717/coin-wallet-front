import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import CoinCard from '../MainComponents/CoinCard';

function Asset({ list }) {
  const [isMine, setIsMine] = useState('none');
  const [coinId, setCoinId] = useState(0);
  const [clickValue, setClickValue] = useState(true);
  const [newList, setNewList] = useState([]);

  useEffect(() => {
    if (isMine === 'none') {
      list.forEach(el => {
        el.isSelected = false;
      });
      setNewList(list);
    } else if (isMine === 'mine') {
      const newList = list.filter(el => el.quantity !== 0);
      setNewList(newList);
    }
  }, [isMine, list]);

  const showMyCoin = () => {
    isMine === 'none' ? setIsMine('mine') : setIsMine('none');
  };

  const selectCoin = id => {
    const index = newList.findIndex(el => el.id === id);
    if (id !== coinId) {
      newList.forEach(el => {
        el.isSelected = false;
      });
      newList[index].isSelected = true;
      setCoinId(id);
      setClickValue(true);
    } else {
      setClickValue(!clickValue);
      newList[index].isSelected = !clickValue;
    }
  };

  return (
    <AssetWrapper>
      <AssetContainer>
        <SearchCoinBar>
          <span>코인 검색</span>
          <SearchInputBox>
            <input type="text" />
            <BsSearch />
          </SearchInputBox>
          <SearchCheckBox>
            <div className={isMine} onClick={showMyCoin} />
            <p>보유화폐만 보기</p>
          </SearchCheckBox>
        </SearchCoinBar>
        <ListWrapper>
          <ListHead>
            <div style={{ width: '20%' }}>
              <p>코인명</p>
            </div>
            <div style={{ width: '20%' }}>
              <p>블록체인 타입</p>
            </div>
            <div style={{ width: '30%' }}>
              <p>보유수량</p>
            </div>
            <div style={{ width: '30%' }}>
              <p>평가금액</p>
            </div>
          </ListHead>
          <ListBodyWrapper>
            {newList.map(coin => (
              <CoinCard key={coin.id} coin={coin} selectCoin={selectCoin} />
            ))}
          </ListBodyWrapper>
        </ListWrapper>
      </AssetContainer>
    </AssetWrapper>
  );
}

export default Asset;

const AssetWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const AssetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SearchCoinBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 27px;
  padding: 0px 20px 5px 20px;
  border-bottom: 3px solid #4231c8;
  span {
    width: 20%;
    font-size: 14px;
    padding-top: 2px;
  }
`;

const SearchInputBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 60%;
  input {
    font-size: 14px;
    width: 50%;
    border: 0px;
    border-bottom: 1px solid #c5c5c5;
    border-radius: 0px;
    margin-right: 5px;
  }
  input:focus {
    outline: none;
  }
`;

const SearchCheckBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 20%;
  div {
    width: 14px;
    height: 14px;
    background-color: #4231c8;
    margin-right: 5px;
  }
  .mine {
    border: 0px;
    background-color: #4231c8;
  }
  .none {
    border: 1px solid #c5c5c5;
    background-color: white;
  }
  p {
    font-size: 14px;
    padding-top: 2px;
  }
`;

const ListWrapper = styled.div`
  width: 100%;
`;

const ListHead = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  background-color: #f5f5f5;
  border-bottom: 1px dotted gray;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border-right: 2px solid white;
    p {
      font-size: 14px;
      font-weight: 700;
      text-align: center;
    }
  }
`;

const ListBodyWrapper = styled.div`
  width: 100%;
  height: 490px;
  overflow-y: auto;
`;
