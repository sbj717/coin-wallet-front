import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TotalAsset from './TotalAsset';
import Asset from './Asset';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import DetailByCoin from './DetailByCoin';

function Main() {
  const [isPicked, setIsPicked] = useState(['picked', 'none', 'none']);
  const [coinList, setCoinList] = useState([]);
  const [coinName, setCoinName] = useState('');
  const [selectedCoin, setSelectedCoin] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://3.36.65.166:8000/assets', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', access_token: token },
    })
      .then(res => res.json())
      .then(res => {
        res.assetList.forEach(el => (el.isSelected = false));
        setCoinList(res.assetList);
      });
  }, []);

  const goToDeposit = () => {
    setIsPicked(['picked', 'none', 'none']);
  };

  const goToWithdraw = () => {
    setIsPicked(['none', 'picked', 'none']);
  };

  const goToDetail = () => {
    setIsPicked(['none', 'none', 'picked']);
  };
  const setCoin = (id, check) => {
    const coinName = coinList.filter(
      el => el.coins_blockchain_types_id === id
    )[0].coin_name;
    check ? setCoinName(coinName) : setCoinName('');
    const coin = coinList.filter(el => el.coins_blockchain_types_id === id)[0];
    check ? setSelectedCoin(coin) : setSelectedCoin({});
  };

  const resetSelectedCoin = () => {
    setCoinName('');
    setSelectedCoin({});
  };

  return (
    <MainWrapper>
      <MainContainer>
        <MainTitle>입출금</MainTitle>
        <MainArticle>
          <LeftSection>
            <TotalAsset list={coinList} />
            <Asset
              list={coinList}
              sendId={setCoin}
              resetSelectedCoin={resetSelectedCoin}
            />
          </LeftSection>
          <RightSection>
            <SelectedCoin>{coinName}</SelectedCoin>
            <RightSectionNav>
              <span className={isPicked[0]} onClick={goToDeposit}>
                입금
              </span>
              <span className={isPicked[1]} onClick={goToWithdraw}>
                출금
              </span>
              <span className={isPicked[2]} onClick={goToDetail}>
                입출금 내역
              </span>
            </RightSectionNav>
            {(isPicked[0] === 'picked' || coinName === '') && (
              <Deposit coin={selectedCoin} />
            )}
            {isPicked[1] === 'picked' && coinName !== '' && (
              <Withdraw coin={selectedCoin} />
            )}
            {isPicked[2] === 'picked' && coinName !== '' && (
              <DetailByCoin coin={selectedCoin} />
            )}
          </RightSection>
        </MainArticle>
      </MainContainer>
    </MainWrapper>
  );
}

export default Main;

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1280px;
  height: 700px;
`;

const MainTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #4231c8;
  padding: 20px;
`;

const MainArticle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0px 15px 15px 15px;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: 5px;
  margin-right: 5px;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: 5px;
`;

const SelectedCoin = styled.div`
  font-size: 20px;
  font-weight: 700;
  width: 100%;
  height: 50px;
  padding: 15px;
  border: 1px solid #c5c5c5;
  margin-bottom: 20px;
`;

const RightSectionNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  margin-bottom: 5px;
  span {
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    padding-bottom: 5px;
    width: 33.33%;
    cursor: pointer;
  }
  .picked {
    font-weight: 700;
    color: #4231c8;
    border-bottom: 3px solid #4231c8;
  }
  .none {
    color: black;
    border-bottom: 3px solid #c5c5c5;
  }
`;
