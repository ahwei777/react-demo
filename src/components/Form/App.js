import './App.css';
import useForm from './useForm';

function FormApp() {
  // 引入已打包好的 hooks
  const {
    inputValue,
    handleInputChange,
    inputErrorMessage,
    handleClickButtonSave,
    handleFormSubmit,
  } = useForm();
  // memo
  return (
    <>
      <div className='form__wrapper'>
        <form onSubmit={handleFormSubmit}>
          <div className='form__title'>新拖延運動報名表單</div>
          <div className='form__info'>
            <p>活動日期：2020/12/10 ~ 2020/12/11</p>
            <p>活動地點：台北市大安區新生南路二段1號</p>
          </div>
          <div className='form__notice'>*必填</div>
          <div className='input-block'>
            <div className='input-block__title'>暱稱</div>
            {/* input title */}
            <input
              onChange={handleInputChange}
              value={inputValue.title}
              className='placebar'
              name='title'
              placeholder='您的回答'
              type='text'
            />
            {/* input title error */}
            <div className='input-block__error' value='請輸入暱稱!'>
              {inputErrorMessage.title && inputErrorMessage.title}
            </div>
          </div>
          <div className='input-block'>
            <div className='input-block__title'>電子郵件</div>
            {/* input email */}
            <input
              onChange={handleInputChange}
              value={inputValue.email}
              className='placebar'
              name='email'
              placeholder='您的電子郵件'
              type='text'
            />
            {/* input email error */}
            <div className='input-block__error' value='請輸入電子郵件!'>
              {inputErrorMessage.email && inputErrorMessage.email}
            </div>
          </div>
          <div className='input-block'>
            <div className='input-block__title'>手機號碼</div>
            {/* input phone */}
            <input
              onChange={handleInputChange}
              value={inputValue.phone}
              className='placebar'
              name='phone'
              placeholder='您的手機號碼'
              type='text'
            />
            {/* input phone error */}
            <div className='input-block__error' value='請輸入手機號碼!'>
              {inputErrorMessage.phone && inputErrorMessage.phone}
            </div>
          </div>
          <div className='input-block'>
            <div className='input-block__title'>報名類型</div>
            <div>
              <label>
                {/* input option */}
                <input
                  onChange={handleInputChange}
                  type='radio'
                  name='option'
                  value='躺在床上用想像力實作'
                  checked={inputValue.option === '躺在床上用想像力實作'}
                />
                躺在床上用想像力實作
              </label>
              <label>
                {/* input option */}
                <input
                  onChange={handleInputChange}
                  type='radio'
                  name='option'
                  value='趴在地上滑手機找現成的'
                  checked={inputValue.option === '趴在地上滑手機找現成的'}
                />
                趴在地上滑手機找現成的
              </label>
            </div>
            {/* input option error */}
            <div className='input-block__error' value='請選擇報名類型!'>
              {inputErrorMessage.option && inputErrorMessage.option}
            </div>
          </div>
          <div className='input-block'>
            <div className='input-block__title'>怎麼知道這個活動的？</div>
            {/* input howToKnow */}
            <input
              onChange={handleInputChange}
              value={inputValue.howToKnow}
              className='placebar'
              placeholder='您的回答'
              name='howToKnow'
              type='text'
            />
            {/* input howToKnow error */}
            <div className='input-block__error answer__check' value='請勿留空!'>
              {inputErrorMessage.howToKnow && inputErrorMessage.howToKnow}
            </div>
          </div>
          <div className='input-block'>
            <div className='input-block__title'>其他</div>
            <div className='input-block__desc'>對活動的一些建議</div>
            {/* input suggest */}
            <input
              onChange={handleInputChange}
              value={inputValue.suggest}
              className='placebar'
              placeholder='您的回答'
              name='suggest'
              type='text'
            />
          </div>
          <div className='buttons__block'>
            {/* button save （react 表單內的 button 會自動綁定 submit ，取消需要更改 type） */}
            <button
              onClick={handleClickButtonSave}
              type='button'
              className='buttons__block-save'
            >
              暫存
            </button>
            {/* button submit */}
            <button className='buttons__block-summit'>送出</button>
          </div>
          <div className='form__info'>請勿透過表單送出您的密碼。</div>
        </form>
      </div>
      <div className='footer'>© 2020 © Copyright. All rights Reserved.</div>
    </>
  );
}

export default FormApp;
