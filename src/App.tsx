
import Footer from 'layouts/Footer';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import Search from 'views/Search';
import User from 'views/User';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Container';
import { MAIN_PATH, AUTH_PATH, SEARCH_PATH, USER_PATH, BOARD_PATH, BOARD_DETAIL_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH } from 'constant';


//          conponent: Application 컴포넌트          //
function App() {



//          render: Application 컴포넌트 랜더링          //
// desciption: 메인 화면 : '/' - Main //
// desciption: 로그인 + 회원가입 : '/auth' - Authentication //
// desciption: 검색 화면 : '/search/:searchWord' - Search //
// desciption: 유저 페이지 : '/user/:userEmail' - User //
// desciption: 게시물 상세보기 : '/board/detail/:boardNumber' - BoardDetail //
// desciption: 게시물 작성하기 : '/board/write' - BoardWrite //
// desciption: 게시물 수정하기 : '/board/update' - BoardUpdate //
return (
  <Routes>
    <Route element={<Container />}>
    <Route path={MAIN_PATH()} element={<Main />}/>

    <Route path={AUTH_PATH()} element={<Authentication />}/>

    <Route path={SEARCH_PATH(':searchWord')} element={<Search />}/>

    <Route path={USER_PATH(':userEmail')} element={<User />}/>
    
    <Route path={BOARD_PATH()}>
      <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />}/>
      <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />}/>
      <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />}/>
    </Route>
    <Route path='*' element={<h1>404 NOT FOUND</h1>}/>
    </Route>
  </Routes>
  );
}

export default App;
