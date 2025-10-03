export default interface CommentDetailsView {
  commentID: number;
  postID: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  postTitle: string;
  authorUsername: string;
  authorID: number;
}