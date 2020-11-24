// 讀取 local 暫存資料，沒有就回傳空值作為初始化資料
export function loadFromLocalStorage(name) {
  let data = window.localStorage.getItem(name);
  // 初始空值錯誤處理(null)
  if (!data) {
    return {
      title: "",
      email: "",
      phone: "",
      option: "",
      howToKnow: "",
      suggest: "",
    };
  }
  return JSON.parse(data);
}
// 依據 html 中設定的 name 做分類，並依據空值及格式做驗證，回傳錯誤訊息
export function getErrorMessage(inputName, inputValue) {
  switch (inputName) {
    case "title":
      if (!inputValue) {
        return "請輸入暱稱";
      } else if (!/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(inputValue)) {
        return "限使用中文/英文/數字/底線";
      } else {
        return "";
      }
    case "email":
      if (!inputValue) {
        return "請輸入電子郵件";
      } else if (
        !/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(
          inputValue
        )
      ) {
        return "電子郵件格式錯誤";
      } else {
        return "";
      }
    case "phone":
      if (!inputValue) {
        return "請輸入手機號碼";
      } else if (!/^09\d{8}$/.test(inputValue)) {
        return "手機號碼格式錯誤";
      } else {
        return "";
      }
    case "option":
      if (!inputValue) {
        return "請勾選報名類型";
      } else {
        return "";
      }
    case "howToKnow":
      if (!inputValue) {
        return "請勿留空";
      } else if (!/^[\u4e00-\u9fa5a-zA-Z]+$/.test(inputValue)) {
        return "限使用中文/英文";
      } else {
        return "";
      }
    default:
      return "";
  }
}
