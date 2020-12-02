/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import React, { memo, useMemo } from 'react';

const FilterBar = memo(
  ({
    todos, filter, handleSetFilter, handleClearDoneTodos,
  }) => {
    // 未完成數量：只在 todos 有變化時才計算
    const countUndone = useMemo(() => {
      let count = 0;
      todos.forEach((todo) => {
        if (!todo.isDone) {
          count += 1;
        }
      });
      return count;
    }, [todos]);

    return (
      <>
        <div className="d-flex justify-content-between align-items-center my-3 px-3">
          <div>
            <strong>{countUndone}</strong>
            {' '}
            個未完成
          </div>
          <div className="options">
            <Button
              variant="info"
              onClick={() => handleSetFilter('all')}
              className={filter === 'all' && 'active'}
            >
              All
            </Button>
            {' '}
            <Button
              variant="info"
              onClick={() => handleSetFilter('active')}
              className={filter === 'active' && 'active'}
            >
              Active
            </Button>
            {' '}
            <Button
              variant="info"
              onClick={() => handleSetFilter('completed')}
              className={filter === 'completed' && 'active'}
            >
              Completed
            </Button>
          </div>
          <Button variant="warning" onClick={handleClearDoneTodos}>
            Clear completed
          </Button>
        </div>
      </>
    );
  },
);

export default FilterBar;

FilterBar.propTypes = {
  todos: PropTypes.arrayOf(Object).isRequired,
  filter: PropTypes.string.isRequired,
  handleSetFilter: PropTypes.func.isRequired,
  handleClearDoneTodos: PropTypes.func.isRequired,
};
