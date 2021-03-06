import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [idState, setIdState] = useState('testUser001@gmail.com');
  const [pwState, setPwState] = useState('Probit123!@#');
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
    const reg =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,100}$/;
    idState.includes('@') &&
    idState.includes('.') &&
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
      fetch('http://3.36.65.166:8000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: idState,
          password: pwState,
        }),
      })
        .then(res => res.json())
        .then(res => {
          localStorage.setItem('token', res.access_token);
          if (res.access_token !== undefined) {
            navigate('/');
          } else {
            setIdCheck('none');
            setPwCheck('이메일 혹은 비밀번호가 잘못되었습니다.');
          }
        });
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
  margin: 70px 0px;
  background-color: #f5f5f5;
  h2 {
    padding-top: 2px;
    color: #4231c8;
    font-size: 28px;
    font-weight: 700;
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
    margin-bottom: 30px;
    color: #4231c8;
    font-size: 24px;
    letter-spacing: 5px;
  }
  span {
    width: 100%;
    padding-left: 5px;
    margin: 5px 0px;
    font-size: 18px;
    font-weight: 400;
  }
  input {
    width: 100%;
    height: 36px;
    padding: 2px 10px 0px;
    margin-bottom: 5px;
    border: 1px solid black;
    border-radius: 0px;
    font-size: 18px;
  }
  p {
    width: 100%;
    padding: 0px 5px;
    margin-bottom: 10px;
    color: red;
    font-size: 14px;
    font-weight: 400;
  }
  button {
    width: 100%;
    height: 36px;
    margin-top: 28px;
    border: 0px;
    border-radius: 0px;
    background-color: #4231c8;
    color: white;
    font-size: 14px;
    font-weight: 200;
    letter-spacing: 2px;
    cursor: pointer;
  }
`;
