import React from 'react'
import defaultProflieImage from 'assets/image/default-profile-image.png'
import { FavoriteListItem } from 'types/interface';
import './style.css';

interface Props {
  favoriteListItem: FavoriteListItem;
}


//          conponent: Favorite List Item 컴포넌트          //
export default function FavoriteItem({favoriteListItem}: Props) {

//          Properties          //
  const {profileImage, nickname} = favoriteListItem;

//          render : Favorite List Item 랜더링          //  
  return (
    <div>
      <div className='favorite-list-item'>
        <div className='favorite-list-item-profile-box'>
          <div className='favorite-list-item-profile-image' style={{ backgroundImage: `url(${profileImage ? profileImage : defaultProflieImage})`}}></div>
          <div className='favorite-list-item-nickname'>{nickname}</div>
        </div>
      </div>
    </div>
  )
}
