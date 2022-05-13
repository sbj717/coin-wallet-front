import React from 'react';
import styled from 'styled-components';

function Detail() {
  return (
    <ListWrapper>
      <ListContainer>
        <h2>Detail</h2>
      </ListContainer>
    </ListWrapper>
  );
}

export default Detail;

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1280px;
  height: 700px;
`;
