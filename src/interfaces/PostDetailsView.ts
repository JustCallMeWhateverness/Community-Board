export default interface PostDetailsView {
  postID: number;
  title: string;
  slug: string;
  overview: string;
  description: string;
  date: string;
  categoryID: number | null;
  categoryName: string | null;
  userID: number | null;
  authorUsername: string | null;
  authorEmail: string | null;
}