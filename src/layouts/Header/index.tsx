import React from 'react'
import './style.css';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'constant';

//           component: 헤더 레이아웃          //
export default function Header() {

//           function: 네비게이트 함수        //
const navigate = useNavigate();

//           event handler: 로고클릭 이벤트 처리 함수        //
const onLogoClickHandler = () => {
  navigate(MAIN_PATH());
}

//           render: 헤더 레이아웃 랜더링         //
  return (
    <div id='header'>
      <div className="header-container">
        <div className="header-left-box" onClick={onLogoClickHandler}>
          <div className="icon-box">
            <div className="icon logo-dark-icon"></div>
          </div>
          <div className="header-logo">{'Kanaki Board'}</div>
        </div>
        <div className="header-right-box"></div>
      </div>
    </div>
  )
}
