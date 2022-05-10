import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Main() {
  return (
    <div>
      <Header />
      <MainWrapper />
      <Footer />
    </div>
  );
}

export default Main;

const MainWrapper = styled.div`
  height: 640px;
`;
