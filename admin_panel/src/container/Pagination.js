import React from "react";
import Pagination from "react-bootstrap/Pagination";
export const Pageniation = ({
  totalRecord,
  currentPage,
  perPage,
  pageHandler,
}) => {
  let pages = Math.ceil(totalRecord / perPage);
  let items = [];
  let start = currentPage - 4 > 0 ? currentPage - 4 : 0;
  let end = pages < start + 9 ? pages : start + 9;
  for (let i = 0; i < end - start; i++) {
    items.push(
      <Pagination.Item
        key={i}
        onClick={() => {
          pageHandler(start + i);
        }}
        active={start + i === currentPage}
      >
        {start + i + 1}
      </Pagination.Item>
    );
  }
  let lastPage = pages - 1;
  return (
    <Pagination size="md">
      {currentPage > 0 && (
        <Pagination.First
          onClick={() => {
            pageHandler(0);
          }}
        />
      )}
      {currentPage > 0 && (
        <Pagination.Prev
          onClick={() => {
            pageHandler(currentPage - 1);
          }}
        />
      )}
      {items}
      {lastPage > currentPage && (
        <Pagination.Next
          onClick={() => {
            pageHandler(currentPage + 1);
          }}
        />
      )}
      {lastPage > currentPage && (
        <Pagination.Last
          onClick={() => {
            pageHandler(lastPage);
          }}
        />
      )}
    </Pagination>
  );
};
