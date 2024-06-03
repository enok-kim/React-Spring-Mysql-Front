import React, { useState } from 'react';
import './App.css';
import BoardItem from 'components/BoardItem';
import latestBoardListMock from 'mocks/latest-board-list.mock';
import Top3Item from 'components/Top3Item';
import { commentListMock, favoriteListMock, top3BoardListMock } from 'mocks';
import CommnentItem from 'components/CommentItem';
import FavoriteItem from 'components/FavoriteItem';
import InputBox from 'components/InputBox';

function App() {

  const [value, setValue] = useState<string>('');

  return (
    <>
      {/* {latestBoardListMock.map(boardListItem => <BoardItem boardListItem={boardListItem}/>)} */}
      {/* <div style={{ display: 'flex', justifyContent: 'center', gap: '24px'}}>
        {top3BoardListMock.map(top3ListItem => <Top3Item top3ListItem={top3ListItem} />)}
      </div> */}
      {/* <div style={{padding: '0 20px', display: 'flex',  columnGap: '30px', rowGap: '20px'}}>
      {favoriteListMock.map(favoriteListItem => <FavoriteItem favoriteListItem = {favoriteListItem} /> )}
      </div> */}
      <InputBox label='이메일' type='text' placeholer='이메일을 입력해주세요' value={value} error={true} setValue={setValue}/>
    </>
  );
}

export default App;
