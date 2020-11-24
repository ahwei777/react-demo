import { useInput } from "./useInput";
import { getErrorMessage } from "./utils";

export default function useForm() {
  // 引入已打包好的 hooks
  const {
    inputValue,
    setInputValue,
    handleInputChange,
    inputErrorMessage,
    setInputErrorMessage,
  } = useInput();

  // 暫存按鈕
  const handleClickButtonSave = () => {
    localStorage.setItem("inputValue", JSON.stringify(inputValue));
  };

  // 送出表單前驗證
  const handleFormSubmit = (e) => {
    // 取消送出表單動作
    e.preventDefault();
    let hasRequiredInputEmpty = false;

    // 先驗證後更新錯誤訊息
    for (const key in inputValue) {
      // 空值判斷，排除非必要項目
      if (inputValue[key] === "" && key !== "suggest") {
        hasRequiredInputEmpty = true;
      }
      // radio 未勾選判斷
      if (key === "options" && inputValue[key] === "") {
        setInputErrorMessage((inputErrorMessage) => ({
          ...inputErrorMessage,
          [key]: getErrorMessage(key, inputValue[key]),
        }));
      }
      // 使用 functional update 確保按順序同步更新
      setInputErrorMessage((inputErrorMessage) => ({
        ...inputErrorMessage,
        [key]: getErrorMessage(key, inputValue[key]),
      }));
    }

    // 如 input 的 state 有空值則提前 return （因為前面驗證後的錯誤訊息還在更新中）
    if (hasRequiredInputEmpty) {
      alert("資料輸入不完全");
      return;
    }

    // 從是否有錯誤訊息判斷是否全數通過驗證
    for (const key in inputErrorMessage) {
      if (inputErrorMessage[key] !== "") {
        // eslint-disable-next-line
        alert("資料輸入不完全");
        return;
      }
    }
    // 全數通過驗證，顯示輸入資料
    // eslint-disable-next-line
    alert(` 
      以下為您所填寫的資料：
      您的暱稱：${inputValue.title}
      您的電子郵件：${inputValue.email}
      您的手機號碼：${inputValue.phone}
      您的報名類型：${inputValue.option}
      您怎麼知道這個活動的：${inputValue.howToKnow}
      其他：${inputValue.suggest}
    `);
  };

  //回傳打包好的函式與需要變數
  return {
    inputValue,
    setInputValue,
    handleInputChange,
    inputErrorMessage,
    handleClickButtonSave,
    handleFormSubmit,
  };
}
