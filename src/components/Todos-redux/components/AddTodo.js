/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-duplicates */
import React, { useState, memo } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

// dumb component 不知道 redux 的存在，只負責 UI 顯示， redux 提供的函式透過 props 傳入
const AddTodo = memo(({ handleAddTodo, handleSetFilter }) => {
  const [value, setValue] = useState('');
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="請輸入待辦事項"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <InputGroup.Append>
        <Button
          onClick={() => {
            // 空值處理
            if (!value) {
              return;
            }
            handleAddTodo(value);
            setValue('');
            handleSetFilter('all');
          }}
        >
          送出
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
});

export default AddTodo;

AddTodo.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
  handleSetFilter: PropTypes.func.isRequired,
};
