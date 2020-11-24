import { useState, useLayoutEffect } from "react";
import { loadFromLocalStorage, getErrorMessage } from "./utils";

export function useInput() {
  // 初始化輸入框，如果 localStorage 內有資料就寫入
  const [inputValue, setInputValue] = useState(
    loadFromLocalStorage("inputValue")
  );
  const [inputErrorMessage, setInputErrorMessage] = useState({});

  // 載入暫存資料在初始化後先執行驗證，並於 paint 前顯示提示訊息
  useLayoutEffect(() => {
    for (const key in inputValue) {
      // 非空值再做驗證
      if (inputValue[key] !== "") {
        // 驗證，使用 functional update 確保按順序同步執行更新
        setInputErrorMessage((data) => ({
          ...data,
          [key]: getErrorMessage(key, inputValue[key]),
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    // 驗證
    setInputErrorMessage({
      ...inputErrorMessage,
      [name]: getErrorMessage(name, value),
    });
  };
  //回傳打包好的工具
  return {
    inputValue,
    setInputValue,
    handleInputChange,
    inputErrorMessage,
    setInputErrorMessage,
  };
}
