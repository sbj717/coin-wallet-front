import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [idState, setIdState] = useState('');
  const [pwState, setPwState] = useState('');
  const [isPossible, setIsPossible] = useState('disable');
  const [idCheck, setIdCheck] = useState('none');
  const [pwCheck, setPwCheck] = useState('none');

  const handleIdInput = e => {
    setIdState(e.target.value);
  };

  const handlePwInput = e => {
    setPwState(e.target.value);
  };

  useEffect(() => {
    idState.includes('@') && idState.includes('.')
      ? setIsPossible('active')
      : setIsPossible('disable');
  }, [idCheck, idState, pwState]);

  useEffect(() => {
    const reg =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,100}$/;
    reg.test(pwState) &&
    !/(\w)\1\1/.test(pwState) &&
    pwState.search(/\s/) === -1
      ? setIsPossible('active')
      : setIsPossible('disable');
  }, [idState, pwState]);

  useEffect(() => {
    if (idState.length > 0) {
      idState.includes('@') && idState.includes('.')
        ? setIdCheck('none')
        : setIdCheck('이메일 형식이 아닙니다.');
    } else {
      setIdCheck('none');
    }
  }, [idState]);

  useEffect(() => {
    if (pwState.length > 0) {
      const reg =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,100}$/;
      reg.test(pwState) &&
      !/(\w)\1\1/.test(pwState) &&
      pwState.search(/\s/) === -1
        ? setPwCheck('none')
        : setPwCheck('비밀번호가 형식에 맞지 않습니다.');
    } else {
      setPwCheck('none');
    }
  }, [pwState]);

  const handleLogin = () => {
    if (isPossible === 'active') {
      fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: idState,
          password: pwState,
        }),
      })
        .then(res => res.json())
        .then(res => {
          localStorage.setItem(res.token);
        });

      const token = localStorage.getItem('token');
      if (token !== null) {
        navigate('/main');
      } else {
        setIdCheck('none');
        setPwCheck('이메일 혹은 비밀번호가 잘못되었습니다.');
      }
    }
  };

  return (
    <LoginWrapper>
      <LoginContainer>
        <ToolName>
          <h2>개인 가상 자산 관리 툴</h2>
        </ToolName>
        <LoginBox>
          <h3>로그인</h3>
          <span>이메일</span>
          <input type="text" onChange={handleIdInput} value={idState} />
          {idCheck !== 'none' && <p>{idCheck}</p>}
          <span>비밀번호</span>
          <input type="password" onChange={handlePwInput} value={pwState} />
          {pwCheck !== 'none' && <p>{pwCheck}</p>}
          <button onClick={handleLogin}>로그인</button>
        </LoginBox>
      </LoginContainer>
    </LoginWrapper>
  );
}

export default Login;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 1280px;
  height: 700px;
`;

const ToolName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  background-color: #f5f5f5;
  margin: 70px 0px;
  h2 {
    font-size: 28px;
    font-weight: 700;
    color: #4231c8;
    padding-top: 2px;
  }
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 280px;
  margin-bottom: 70px;
  h3 {
    font-size: 24px;
    letter-spacing: 5px;
    color: #4231c8;
    margin-bottom: 30px;
  }
  span {
    font-size: 18px;
    font-weight: 400;
    width: 100%;
    padding-left: 5px;
    margin: 5px 0px;
  }
  input {
    font-size: 18px;
    width: 100%;
    height: 36px;
    padding: 0px 5px;
    margin-bottom: 5px;
    border: 1px solid black;
    border-radius: 0px;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    color: red;
    width: 100%;
    padding: 0px 5px;
    margin-bottom: 10px;
  }
  button {
    font-size: 14px;
    font-weight: 200;
    letter-spacing: 2px;
    color: white;
    width: 100%;
    height: 36px;
    margin-top: 28px;
    background-color: #4231c8;
    border: 0px;
    border-radius: 0px;
    cursor: pointer;
  }
`;
