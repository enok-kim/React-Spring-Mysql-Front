import React, { useState, KeyboardEvent, useRef, ChangeEvent } from 'react'
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
//          component : 인증 화면 컴포넌트          //
export default function Authentication() {

//          state : 화면 상태                  //
const [view, setView] = useState< 'sign-in' | 'sign-up' >('sign-in');    
  
//         state :   쿠키 상태           // 
const [cookies, setCookie] = useCookies();

//          function : 네비게이터        //
const navigator = useNavigate();
//          component : sign in card 컴포넌트          //
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
        <InputBox ref={emailRef} label='Adress' type='text' placeholer='メールアドレスを入力してください。'　error={error} value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler} />
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
//          component : sign up card 컴포넌트          //
const SignUpCard = () => {
//          render : sign up 컴포넌트 렌더링       //
  return (
    <div id="auth-card"></div>
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
