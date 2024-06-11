import React, { useState, KeyboardEvent, useRef, ChangeEvent, Key } from 'react'
import './style.css'
import { idText } from 'typescript'
import InputBox from 'components/InputBox';
import { SignInRequestDto } from 'apis/request/auth';
import { signInRequest } from 'apis';
import { SignInResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';
import { keyboardKey } from '@testing-library/user-event';
//          component : 인증 화면 컴포넌트          //
export default function Authentication() {

//          state : 화면 상태                  　　//
const [view, setView] = useState< 'sign-in' | 'sign-up' >('sign-in');    
  
//         state :   쿠키 상태           　　　　　　//
const [cookies, setCookie] = useCookies();

//          function : 네비게이터        　　　　　　　//
const navigator = useNavigate();
//          component : sign in card 컴포넌트     //
const SignInCard = () => {
//          state : 이메일 요소 참조 상태                  //
const emailRef = useRef<HTMLInputElement | null>(null);
//          state : 이메일 상태                  //
const passwordRef = useRef<HTMLInputElement | null>(null);
//          state : 이메일 상태                  //
const [email, setEmail] = useState<string>('');

//          state : 패스워드 상태                  //
const [password, setPassword] = useState<string>('');

//          state : 패스워드 타입 상태                  //
const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');

//          state : 패스워드 버튼 아이콘 상태                  //
const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');


//          state : 에러 상태                  //
const [error, setError] = useState<boolean>(false);

//          function : sign in response 처리 함수      //
const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
  if(! responseBody){
    alert('네트워크 이상입니다.');
    return;
  }//if
  const {code} = responseBody;
  if (code === 'DBE') alert('데이터 베이스 오류 입니다.');
  if (code === 'SF' || code === 'VF') setError(true);
  if (code !== 'SU') return;
  
  const {token, expirationTime} = responseBody as SignInResponseDto;
  const now = new Date().getTime();
  const expires = new Date(now + expirationTime * 1000);

  setCookie('accessToken', token, {expires, path : MAIN_PATH()});
  navigator(MAIN_PATH());


}//signInResponse

//          event handler : 이메일 변경 이벤트 처리             //
const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  setError(false);
  const {value} = event.target;
  setEmail(value);
}
//          event handler : 이메일 변경 이벤트 처리             //
const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  setError(false);
  const {value} = event.target;
  setPassword(value);
}
//          event handler : 로그인 버튼 클릭 이벤트 처리          //
const onSignInButtonClickHandler = () => {

  const requestBody: SignInRequestDto = { email, password }
  signInRequest(requestBody).then(signInResponse);

}
//          event handler : 패스워드 버튼 클릭 이벤트 처리          //
const onSignOnButtonClickHandler = () => {
  setView('sign-up')
}
//          event handler : 패스워드 버튼 클릭 이벤트 처리          //
const onPasswordButtonClickHandler = () => {
  if(passwordType === 'text'){
    setPasswordType('password');
    setPasswordButtonIcon('eye-light-off-icon');
  }else{
    setPasswordType('text');
    setPasswordButtonIcon('eye-light-on-icon');
  }//else
} // onPasswordButtonClickHandler
//          event handler : 이메일 인풋 키 다운 이벤트 처리          //
const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
if (event.key !== 'Enter') return;
if (!passwordRef.current) return;
passwordRef.current.focus();
}//onEmailKeyDownHandler
//          event handler :         //
const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
  if (event.key !== 'Enter')return;
}


//          render : sign in 컴포넌트 렌더링       //  
return (
  <div id="auth-card">
    <div className="auth-card-box">
      <div className="auth-card-top">
        <div className="auth-card-title-box">
          <div className="auth-card-title">{'Login'}</div>
        </div>
        <InputBox ref={emailRef} label='Email' type='text' placeholer='メールアドレスを入力してください。'　error={error} value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler} />
        <InputBox ref={passwordRef} label='Password' type={passwordType} placeholer='パスワードを入力してください。'　error={error} value={password} onChange={onPasswordChangeHandler} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
      </div>
      <div className="auth-card-bottom">
        { error && 
        <div className="auth-signin-error-box">
          <div className="auth-signin-error-message">
            {'IDとパスワードが間違っています\n再入力お願いします。'}
            </div>
        </div>
        }
        <div className="black-large-full-button" onClick={onSignInButtonClickHandler}>{'Login'}</div>
        <div className="auth-description-box">
          <div className="auth-description">{'新規登録ですか？'}
          <span className='auth-description-link' onClick={onSignOnButtonClickHandler}>{'SignUp'}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
//          component : sign up card 컴포넌트     //
const SignUpCard = () => {


//          state : 이메일 요소 참조 상태            //
const emailRef = useRef<HTMLInputElement | null>(null);  
//          state : 패스워드 요소 참조 상태           //
const passwordRef = useRef<HTMLInputElement | null>(null);  
//          state : 패스워드 확인 요소 참조 상태       //
const passwordCheckRef = useRef<HTMLInputElement | null>(null);
//          state : 닉네임 요소 참조 상태       //
const nicknameRef = useRef<HTMLInputElement | null>(null);
//          state : 휴대 전화번호 요소 참조 상태       //
const telNumberRef = useRef<HTMLInputElement | null>(null);
//          state : 주소 요소 참조 상태       //
const addressRef = useRef<HTMLInputElement | null>(null);
//          state : 주소 상세 요소 참조 상태       //
const addressDetailRef = useRef<HTMLInputElement | null>(null);
//          state : 패스워드 타입 상태             　//
const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
//          state : 패스워드 check 타입 상태        //
const [passwordCheckType, setPasswordCheckType] = useState<'text' | 'password'>('password');
//          state : 페이지 번호 상태               //
const [page, setPage] = useState<1|2>(2);
//          state : 회원가입 이메일 상태            //
const [email, setEmail] = useState<string>('');
//          state : 회원가입 Password 상태        //
const [password, setPassword] = useState<string>('');
//          state : 회원가입 Password Check 상태  //
const [passwordCheck, setPasswordCheck] = useState<string>('');
//          state : email error 상태            //
const [isEmailError, setEmailError] = useState<boolean> (false);
//          state : password error 상태         //
const [isPasswordError, setPasswordError] = useState<boolean> (false);
//          state : password check error 상태   //
const [isPasswordCheckError, setPasswordCheckError] = useState<boolean> (false);
//          state : nickname error 상태    //
const [isNickNameError, setNicknameError] = useState<boolean>(false);
//          state : telNumber error 상태    //
const [isTelNumberError, setTelNumberError] = useState<boolean>(false);
//          state : address error 상태    //
const [isAddressError, setAddressError] = useState<boolean>(false);
//          state : email error 메세지 상태       //
const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
//          state : password error 메세지 상태    //
const [passwordErrorMessage, setPassWordErrorMessage] = useState<string>('');
//          state : password check error 메세지 상태 //
const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');
//          state : nick name error 메세지 상태 //
const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');
//          state : telNumber error 메세지 상태 //
const [telNumberErrorMessage, setTelNumberErrorMessage] = useState<string>('');
//          state : address error 메세지 상태 //
const [addressErrorMessage, setAddressErrorMessage] = useState<string>('');
//          state : password 버튼 아이콘 상태      //
const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
//          state : password check 버튼 아이콘 상태      //
const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
//          state : 닉네임 상태             //
const [nickname, setNickname] = useState<string>('');
//          state : 핸드폰 번호 상태             //
const [telNumber, setTelNumber] = useState<string>('');
//          state : 주소 상태             //
const [address, setAddress] = useState<string>('');
//          state : 상세 주소 상태             //
const [addressDetail, setAddressDetail] = useState<string>('');

//          event handler : 이메일 변경 이벤트 처리 //
const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const {value} = event.target;
  setEmail(value);
}//onEmailChangeHandler
//          event handler : 비밀번호 변경 이벤트 처리 //
const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const {value} = event.target;
  setPassword(value);
}//onPasswordChangeHandler
//          event handler : 비밀번호 체크 변경 이벤트 처리 //
const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const {value} = event.target;
  setPasswordCheck(value);
}//onPasswordCheckChangeHandler
//          event handler : 닉네임 변경 이벤트 처리      //
const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const {value} = event.target;
  setNickname(value);
}//onNicknameChangeHandler
//          event handler : 핸드폰 번호 변경 이벤트 처리  //
const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const {value} = event.target;
  setTelNumber(value);
}//onTelNumberChangeHandler
//          event handler : 주소 변경 이벤트 처리       //
const onAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const {value} = event.target;
  setAddress(value);
}//onAddressChangeHandler
//          event handler : 상세 주소 변경 이벤트 처리   //
const onAddressDetailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  const {value} = event.target;
  setAddressDetail(value);
}//onAddressDetailChangeHandler

//          event handler : password 버튼 클릭 이벤트 처리 //
const onPasswordButtonClickHandler = () => {
  if (passwordButtonIcon == 'eye-light-off-icon'){
    setPasswordButtonIcon('eye-light-on-icon');
    setPasswordType('text');
  }else{
    setPasswordButtonIcon('eye-light-off-icon');
    setPasswordType('password');
  }//else
}//onPasswordButtonClickHandler
//          event handler : password 확인 버튼 클릭 이벤트 처리 //
const onPasswordCheckButtonClickHandler = () => {
  if (passwordCheckButtonIcon == 'eye-light-off-icon'){
    setPasswordCheckButtonIcon('eye-light-on-icon');
    setPasswordCheckType('text');
  }else{
    setPasswordCheckButtonIcon('eye-light-off-icon');
    setPasswordCheckType('password');
  }//else
}//onPasswordButtonClickHandler
//          event handler : address 버튼 클릭 이벤트 처리 //
const onAddressButtonClickHandler = () => {

}//onAddressButtonClickHandler
//           event handler : 이메일 키 다운 이벤트 처리       //
const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
  if (event.key !== 'Enter') return;
  if (!  passwordRef) return;
  passwordRef.current?.focus();
}//onEmailKeyDownHandler
//           event handler : password 키 다운 이벤트 처리       //
const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key !== 'Enter') return;
  if (!  passwordRef) return;
  passwordRef.current?.focus();
}//onPasswordDownHandler
//           event handler : password check 키 다운 이벤트 처리       //
const onPasswordCheckKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key !== 'Enter') return;
  if (!  passwordRef) return;
  onNextButtonClickHandler();
}//onPasswordCheckKeyDownHandler
//           event handler : nickname 키 다운 이벤트 처리       //
const onNicknameKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  if(event.key !== 'Enter') return;
}//onNicknameKeyDownHandler
//           event handler : telNumber 키 다운 이벤트 처리       //
const onTelNumberKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  if(event.key !== 'Enter') return;
}//onTelNumberKeyDownHandler
//           event handler : address 키 다운 이벤트 처리       //
const onAddressKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  if(event.key !== 'Enter') return;
}//onAddressKeyDownHandler
//           event handler : addressDetail 키 다운 이벤트 처리       //
const onAddressDetailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  if(event.key !== 'Enter') return;
}//onAddressDetailKeyDownHandler
//          event handler : 다음 단계 버튼 클릭 이벤트 처리       //
const onNextButtonClickHandler = () => {
  const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*.[a-zA-Z]{2,4}$/;
  const isEmailPattern = emailPattern.test(email);
  if(!isEmailPattern){
    setEmailError(true);
    setEmailErrorMessage('メールを入力してください。');
  }//if
  const isCheckedPassword = password.trim().length > 8
  if(!isCheckedPassword){
    setPasswordError(true);
    setPassWordErrorMessage('パスワードは８字以上入力してください。');
  }//if
  const isEqualPassword = password === passwordCheck;
  if(!isEqualPassword){
    setPasswordCheckError(true);
    setPasswordCheckErrorMessage('パスワードが一致していません。');
  }//if
  if(!isEmailPattern || !isCheckedPassword || !isEqualPassword) return;
  setPage(2);
}//onNextButtonClickHandler
//         event handler : 로그인 링크 클릭 이벤트 처리     //
const onSignInLinkClickHandler = () => {
  setView('sign-in');
}//onSignInLinkClickHandler
//         event handler : 회원가입 버튼 클릭 이벤트 처리    //
const onSignUpButtonClickHandler = () => {

}


//          render : sign up card 컴포넌트 렌더링 //
  return (
    <div id="auth-card">
      <div className="auth-card-box">
        <div className="auth-card-top">
          <div className="auth-title-box">
            <div className="auth-card-title">{'SignUp'}</div>
            <div className="auth-card-page">{`${page}/2`}</div>
          </div>
          {page === 1 && (
           <>
            <InputBox ref={emailRef} label='Email *' type='text' placeholer='メールアドレスを入力してください。' value={email} onChange={onEmailChangeHandler} error={isEmailError} message={emailErrorMessage}  onKeyDown={onEmailKeyDownHandler}/>
            <InputBox ref={passwordRef} label='Password *' type={passwordType}　placeholer='パスワードを入力してください。' value={password} onChange={onPasswordChangeHandler} error={isPasswordError} message={passwordErrorMessage} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
            <InputBox ref={passwordCheckRef} label='Password Check *' type={passwordCheckType}　placeholer='パスワードをもう一度入力ください。' value={passwordCheck} onChange={onPasswordCheckChangeHandler} error={isPasswordCheckError} message={passwordCheckErrorMessage} icon={passwordCheckButtonIcon} onButtonClick={onPasswordCheckButtonClickHandler} onKeyDown={onPasswordCheckKeyDownHandler}/>
           </> 
          )}
          {page === 2 && (
            <>
            <InputBox ref={nicknameRef} label='NickName*' type='text' placeholer='ニックネームを入力してください。' value={nickname} onChange={onNicknameChangeHandler} error={isNickNameError} message={nicknameErrorMessage} onKeyDown={onNicknameKeyDownHandler}/>
            <InputBox ref={telNumberRef} label='TelNumber*' type='text' placeholer='電話番号を入力してください。'value={telNumber} onChange={onTelNumberChangeHandler} error={isTelNumberError} message={telNumberErrorMessage} onKeyDown={onTelNumberKeyDownHandler}/>
            <InputBox ref={addressRef} label='Address*' type='text' placeholer='郵便番号探し' value={address} onChange={onAddressChangeHandler} error={isAddressError} message={addressErrorMessage} icon='expand-right-light-icon' onButtonClick={onAddressButtonClickHandler} onKeyDown={onAddressKeyDownHandler}/>
            <InputBox ref={addressDetailRef} label='Address Detail' type='text' placeholer='詳細住所を入力してください。' value={addressDetail} onChange={onAddressDetailChangeHandler} error={false} onKeyDown={onAddressDetailKeyDownHandler}/>
            </>
          )}
        </div>  
        <div className="auth-card-bottom">
          {page === 1 && (
            <div className="black-large-full-button" onClick={onNextButtonClickHandler}>{'Next'}</div> 
            )}
          {page === 2 && (
            <>
              <div className="auth-consent-box">
                <div className="auth-check-box">
                  <div className="check-ring-light-icon"></div>
                </div>
                <div className="auth-consent-title">{'個人情報同義'}</div>
                <div className="auth-consent-link">{'<　more　>'}</div>
              </div>
              <div className="black-large-full-button" onClick={onSignUpButtonClickHandler}>{'SignUp!'}</div> 
            </>
          )}
          <div className="auth-description-box">
            <div className="auth-description">
            {'登録済みですか？'}
            <span className="auth-description-link" onClick={onSignInLinkClickHandler}>{'SignIn'}</span>
            </div>
            </div>
        </div>
      </div>
    </div>
    );
  };
//          render : 인증 화면 컴포넌트 렌더링       //
  return (
    <div id='auth-wrapper'>
      <div className="auth-container">
        <div className="auth-jumbotron-box">
          <div className="auth-jumbotron-contents">
            <div className="auth-logo-icon"></div>
            <div className="auth-jumbotron-text-box">
              <div className="auth-jumbotron-text">{'I LOVE YOU MORE'}</div>
              <div className="auth-jumbotron-text">{'TODAY THAN YESTERDAY'}</div>
            </div>
          </div>
        </div>
        {view === 'sign-in' && <SignInCard />}
        {view === 'sign-up' && <SignUpCard />}
      </div>
    </div>
  )
}