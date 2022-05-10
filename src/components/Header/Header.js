import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPowerOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    fetch('/data/user_data.json', {
      method: 'GET',
      Headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(res => setUserInfo(res));
  }, []);

  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/main');
  };

  const goToList = () => {
    navigate('/list');
  };

  const logout = () => {
    setUserInfo('');
    navigate('/login');
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LeftSide>
          <img src="images/logo.svg" alt="" onClick={goToMain} />
          <button onClick={goToMain}>입출금</button>
          <button onClick={goToList}>입출금 내역</button>
        </LeftSide>
        <RightSide>
          <p>{userInfo.email}</p>
          <button onClick={logout}>
            <FaPowerOff />
          </button>
        </RightSide>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1280px;
  height: 50px;
  border-bottom: 1px solid #f5f5f5;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  img {
    margin-left: 20px;
    cursor: pointer;
  }
  button {
    background-color: transparent;
    border: 0px;
    font-size: 16px;
    font-weight: 500;
    padding-top: 2px;
    cursor: pointer;
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 20%;
  p {
    font-size: 16px;
    font-weight: 400;
    color: #4231c8;
    padding-top: 2px;
  }
  button {
    background-color: transparent;
    border: 0px;
    font-size: 24px;
    color: #4231c8;
    padding-top: 8px;
    margin-right: 20px;
    cursor: pointer;
  }
`;
