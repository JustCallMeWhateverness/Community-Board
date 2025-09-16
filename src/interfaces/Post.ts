import type Category from './Category';

export default interface Post {
  id: number;
  title: string;
  overview: string;
  date: number;
  slug: string;
  description: string;
  categories: Category[];
}