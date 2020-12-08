/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { memo } from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationWrapper = ({ postsCount, currentPage }) => {
  const postsPerPage = 5;
  const totalPage = Math.ceil(postsCount / postsPerPage);
  const items = [];
  for (let number = 1; number <= totalPage; number += 1) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === Number(currentPage)}
        href={`#/BlogAppRedux/pagination/${number}`}
      >
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <Pagination className="d-flex justify-content-center" size="lg">
      {items}
    </Pagination>
  );
};

export default memo(PaginationWrapper);
