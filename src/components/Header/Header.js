import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiPower } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [userInfo, setUserInfo] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://3.36.65.166:8000/users/info', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', access_token: token },
    })
      .then(res => res.json())
      .then(res => {
        setUserInfo(res);
      });
  }, [token]);

  const navigate = useNavigate();

  const goToFirst = () => {
    token ? navigate('/main') : navigate('/');
  };

  const goToMain = () => {
    navigate('/main');
  };

  const goToDetail = () => {
    navigate('/detail');
  };

  const logout = () => {
    setUserInfo('');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LeftSide>
          <img src="images/logo.svg" alt="" onClick={goToFirst} />
          {userInfo.status !== 401 && (
            <button onClick={goToMain}>입출금</button>
          )}
          {userInfo.status !== 401 && (
            <button onClick={goToDetail}>입출금 내역</button>
          )}
        </LeftSide>
        <RightSide>
          {userInfo.status !== 401 && <p>{userInfo.userEmail}</p>}
          {userInfo.status !== 401 && (
            <button onClick={logout}>
              <FiPower />
            </button>
          )}
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
