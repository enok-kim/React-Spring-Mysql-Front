import React from 'react';
import './App.css';
import BoardItem from 'components/BoardItem';
import latestBoardListMock from 'mocks/latest-board-list.mock';
import Top3Item from 'components/Top3Item';
import { commentListMock, top3BoardListMock } from 'mocks';
import CommnentItem from 'components/CommentItem';

function App() {
  return (
    <>
      {/* {latestBoardListMock.map(boardListItem => <BoardItem boardListItem={boardListItem}/>)} */}
      {/* <div style={{ display: 'flex', justifyContent: 'center', gap: '24px'}}>
        {top3BoardListMock.map(top3ListItem => <Top3Item top3ListItem={top3ListItem} />)}
      </div> */}
      <div style={{padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px'}}>
      {commentListMock.map(commentListMock => <CommnentItem commentListItem = {commentListMock} /> )}
      </div>
    </>
  );
}

export default App;
