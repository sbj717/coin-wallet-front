import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <FooterWrapper>
      <FooterContainer>
        <span>© 2018-2021 PROBIT All Right Reserved</span>
      </FooterContainer>
    </FooterWrapper>
  );
}

export default Footer;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1280px;
  height: 24px;
  background-color: #333333;
  span {
    font-size: 14px;
    font-weight: 300;
    color: white;
  }
`;
