import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';

function Paging({ count, sendCurrentPage, firstPage }) {
  const [page, setPage] = useState(1);
  const handlePageChange = page => {
    setPage(page);
    sendCurrentPage(page);
  };

  useEffect(() => {
    setPage(firstPage);
  }, [firstPage]);

  return (
    <PaginationWrapper>
      <Pagination
        activePage={page}
        itemsCountPerPage={20}
        totalItemsCount={Number(count)}
        pageRangeDisplayed={5}
        firstPageText="First"
        prevPageText="Prev"
        nextPageText="Next"
        lastPageText="Last"
        onChange={handlePageChange}
      />
    </PaginationWrapper>
  );
}

export default Paging;

const PaginationWrapper = styled.div`
  margin-bottom: 30px;
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 10px;
    font-size: 16px;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: black;
    font-size: 16px;
    font-weight: 400;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    border-radius: 50%;
    padding-top: 2px;
    background-color: #4231c8;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    font-size: 16px;
  }
  .page-selection {
    width: 48px;
    height: 30px;
    color: #4231c8;
  }
`;
