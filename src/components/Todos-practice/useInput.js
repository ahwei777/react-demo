import { useState } from "react";

export default function useInput() {
  // 初始化輸入框的值
  const [value, setValue] = useState("");
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };
  //回傳打包好的工具
  return {
    value,
    setValue,
    handleInputChange,
  };
}
