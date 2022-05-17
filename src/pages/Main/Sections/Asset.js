import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import CoinCard from '../MainComponents/CoinCard';

function Asset({ list, sendId }) {
  const [isMine, setIsMine] = useState('none');
  const [coinId, setCoinId] = useState(0);
  const [clickValue, setClickValue] = useState(true);
  const [searchWord, setSearchWord] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [newList, setNewList] = useState([]);

  const showMyCoin = () => {
    isMine === 'none' ? setIsMine('mine') : setIsMine('none');
  };

  useEffect(() => {
    if (searchWord.length === 0) {
      setSearchList(list);
    }
    if (isMine === 'none') {
      const hideIndex = searchList.findIndex(
        el => el.isSelected === true && el.quantity === 0
      );
      const pickIndex = searchList.findIndex(
        el => el.isSelected === true && el.quantity !== 0
      );
      if (
        hideIndex > -1 &&
        pickIndex > -1 &&
        searchList[hideIndex].isSelected &&
        searchList[pickIndex].isSelected
      ) {
        searchList[hideIndex].isSelected = false;
      }
      setNewList(searchList);
    } else if (isMine === 'mine') {
      const newList = searchList.filter(el => el.quantity !== 0);
      setNewList(newList);
    }
  }, [isMine, list, searchList]);

  const swInputHandler = e => {
    setSearchWord(e.target.value);
  };

  const searchCoin = () => {
    if (searchWord.length !== '') {
      const searchedCoin = list.filter(el =>
        el.coin_name.includes(`${searchWord.toUpperCase()}`)
      );
      setSearchList(searchedCoin);
    } else {
      setSearchList(list);
    }
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
      sendId(id, true);
    } else {
      setClickValue(!clickValue);
      newList[index].isSelected = !clickValue;
      !clickValue ? sendId(id, true) : sendId(id, false);
    }
  };

  return (
    <AssetWrapper>
      <AssetContainer>
        <SearchCoinBar>
          <span>코인 검색</span>
          <SearchInputBox>
            <input type="text" value={searchWord} onChange={swInputHandler} />
            <BsSearch style={{ cursor: 'pointer' }} onClick={searchCoin} />
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
  height: 45px;
  background-color: #f5f5f5;
  border-bottom: 1px dotted gray;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 42px;
    border-right: 2px solid white;
    p {
      font-size: 14px;
      font-weight: 700;
      text-align: center;
      padding-top: 3px;
    }
  }
`;

const ListBodyWrapper = styled.div`
  width: 100%;
  height: 460px;
  overflow-y: auto;
`;
