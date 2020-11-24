import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import React, {
  memo,
  useMemo,
} from "react";

const InfoAndFilterBar = memo(({
  todos,
  todosFilter,
  setTodosFilter,
  handleClearDoneTodos,
}) => {
  // 未完成數量：只在 todos 有變化時才計算
  const countResult = useMemo(() => {
    console.log('calculating!')
    let count = 0;
    todos.forEach((todo) => {
      if (!todo.isDone) {
        count = count + 1;
      }
    });
    return count;
  }, [todos])

  return (
    <>
      {/* 資訊及篩選列 */}
      <div className="d-flex justify-content-between my-3 px-3">
        <h3>
          <span>{countResult}</span> 個未完成
        </h3>
        <div className="options">
          <Button
            variant="info"
            onClick={() => {
              setTodosFilter(null);
            }}
            className={todosFilter === null && "active"}
          >
            All
          </Button>{" "}
          <Button
            variant="info"
            onClick={() => {
              setTodosFilter("active");
            }}
            className={todosFilter === "active" && "active"}
          >
            Active
          </Button>{" "}
          <Button
            variant="info"
            onClick={() => {
              setTodosFilter("completed");
            }}
            className={todosFilter === "completed" && "active"}
          >
            Completed
          </Button>{" "}
        </div>
        <Button variant="warning" onClick={handleClearDoneTodos}>
          Clear completed
        </Button>
      </div>
    </>
  );
});

export default InfoAndFilterBar;

InfoAndFilterBar.propTypes = {
  todos: PropTypes.array,
  todosFilter: PropTypes.string,
  setTodosFilter: PropTypes.func,
  handleClearDoneTodos: PropTypes.func
}