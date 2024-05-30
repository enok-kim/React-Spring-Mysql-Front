export default interface BoardListItem {
  boardNumber: number;
  title: string;
  content: string;
  boardTitleImage: string | null;
  favoriteCount: number;
  commentCount: number;
  viewCountl: number;
  writeDatetime: string;
  writerNickname: string;
  writerProfileImage: string | null;
}