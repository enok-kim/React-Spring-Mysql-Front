import React from 'react';
import './App.css';
import BoardItem from 'components/BoardItem';
import latestBoardListMock from 'mocks/latest-board-list.mock';
import Top3Item from 'components/Top3Item';
import { commentListMock, favoriteListMock, top3BoardListMock } from 'mocks';
import CommnentItem from 'components/CommentItem';
import FavoriteItem from 'components/FavoriteItem';

function App() {
  return (
    <>
      {/* {latestBoardListMock.map(boardListItem => <BoardItem boardListItem={boardListItem}/>)} */}
      {/* <div style={{ display: 'flex', justifyContent: 'center', gap: '24px'}}>
        {top3BoardListMock.map(top3ListItem => <Top3Item top3ListItem={top3ListItem} />)}
      </div> */}
      <div style={{padding: '0 20px', display: 'flex',  columnGap: '30px', rowGap: '20px'}}>
      {favoriteListMock.map(favoriteListItem => <FavoriteItem favoriteListItem = {favoriteListItem} /> )}
      </div>
    </>
  );
}

export default App;
