//  提取已儲存 localStorage 資料
const oldElements = document.querySelectorAll('input[type = text]');
// eslint-disable-next-line
for (const element of oldElements) {
  const oldData = localStorage.getItem(element.name);
  document.querySelector(`input[name = ${element.name}]`).value = oldData;
}
//  點擊暫存後儲存輸入格式為文字的值
document.querySelector('.buttons__block-save').addEventListener('click', () => {
  const newElements = document.querySelectorAll('input[type = text]');
  // eslint-disable-next-line
  for (const element of newElements) {
    localStorage.setItem(element.name, element.value);
  }
});

const textBars = document.querySelectorAll('input[type = text]');
let nameIsValid = false;
let emailIsValid = false;
let phoneIsValid = false;
let answerIsValid = false;
const values = {};
// eslint-disable-next-line
for (const textBar of textBars) {
  // eslint-disable-next-line
  textBar.addEventListener('blur', () => {
    switch (textBar.name) {
      case 'title':
        if (!textBar.value) {
          textBar.nextElementSibling.innerText = '請輸入暱稱';
        } else if (!(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(textBar.value))) {
          textBar.nextElementSibling.innerText = '限使用中文/英文/數字/底線!';
          nameIsValid = false;
        } else {
          textBar.nextElementSibling.innerText = '';
          nameIsValid = true;
        }
        break;
      case 'email':
        if (!textBar.value) {
          textBar.nextElementSibling.innerText = '請輸入電子郵件';
        } else if (!(/^.+@.+\./.test(textBar.value))) {
          textBar.nextElementSibling.innerText = '電子郵件格式錯誤!';
          emailIsValid = false;
        } else {
          textBar.nextElementSibling.innerText = '';
          emailIsValid = true;
        }
        break;
      case 'phone':
        if (!textBar.value) {
          textBar.nextElementSibling.innerText = '請輸入手機號碼';
        } else if (!(/^09\d{8}$/.test(textBar.value))) {
          textBar.nextElementSibling.innerText = '手機號碼格式錯誤!';
          phoneIsValid = false;
        } else {
          textBar.nextElementSibling.innerText = '';
          phoneIsValid = true;
        }
        break;
      case 'answer':
        if (!textBar.value) {
          textBar.nextElementSibling.innerText = '請勿留空';
        } else if (!(/^[\u4e00-\u9fa5a-zA-Z]+$/.test(textBar.value))) {
          textBar.nextElementSibling.innerText = '限使用中文/英文!';
          answerIsValid = false;
        } else {
          textBar.nextElementSibling.innerText = '';
          answerIsValid = true;
        }
        break;
      default: break;
    }
  });
}

//  送出表單前的檢查
document.querySelector('form').addEventListener('submit', (e) => {
  let radioIsValid = false;
  let textIsValid = true;
  //  找出所有必填項目
  const elements = document.querySelectorAll('.required');
  // eslint-disable-next-line
  for (const element of elements) {
    const text = element.querySelector('input[type = text]');
    const radios = element.querySelectorAll('input[type = radio]');
    if (text) {
      if (!text.value) {
        textIsValid = false;
      }
      values[text.name] = text.value;
    } else if (radios.length) {
      //  如至少有一項 radio 為 checked 即為 true
      radioIsValid = [...radios].some(radio => radio.checked);
      if (radioIsValid) {
        //  取出被勾選選項的值
        const r = document.querySelector('input[type = radio]:checked');
        values[r.name] = r.parentNode.innerText;
        element.classList.add('hide-error');
      } else {
        element.classList.remove('hide-error');
      }
    } else {
      console.log(element);
      return;
    }
    //  未通過驗證時移除遮蔽屬性(顯示警告紅字)，並設定已產生錯誤
    //  如修改後通過驗證則再把警告紅字隱藏起來
  }
  //  若所有欄位皆未產生錯誤，跳出 alert 展示使用者填寫資料
  if (radioIsValid && textIsValid && nameIsValid && emailIsValid && phoneIsValid && answerIsValid) {
    //  以 template 呈現輸出格式
    // eslint-disable-next-line
    alert(` 
    以下為您所填寫的資料：
    您的暱稱：${values.title}
    您的電子郵件：${values.email}
    您的手機號碼：${values.phone}
    您的報名類型：${values.option}
    您怎麼知道這個活動的：${values.answer}
    其他：${document.querySelector('input[name=other]').value}
    `);
  } else {
    //  取消送出表單的預設動作
    e.preventDefault();
    // eslint-disable-next-line
    alert('資料輸入不完全，請再次檢查！');
  }
});
