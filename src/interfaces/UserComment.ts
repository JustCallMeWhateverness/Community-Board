export default interface UserComment {
  id: number;
  postID: number;
  userID: number;
  text: string;
  createdAt: string;
  updatedAt: string;
}