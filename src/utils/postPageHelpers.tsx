import type Post from '../interfaces/Post';
import type Category from '../interfaces/Category';

export interface SortOption {
  description: string;
  key: keyof Post,
  order: number;
}

export function getHelpers(postsJson: any, categoryJson: any) {

  const posts = postsJson as Post[];
  const category = categoryJson as Category[];

  const categories = [
    'All (' + posts.length + ')',
    ...category
      // map to category arrays from each Post
      .map(x => x.name)
      // flatten to one array
      .flat()
      // add count of posts in to each category
      .map((x, _i, a) => x + ' ('
        + a.filter(y => x === y).length + ')')
      // remove duplicates1
      .filter((x, i, a) => a.indexOf(x) === i)
      // sort (by title)
      .sort()
  ];

  const sortOptions: SortOption[] = [
    { description: 'Date (newest to oldest', key: 'date', order: 1 },
    { description: 'Date (oldest to newest)', key: 'date', order: -1 },
    { description: 'Post title (a-z)', key: 'title', order: 1 },
    { description: 'Post title (z-a)', key: 'title', order: -1 }
  ];

  const sortDescriptions = sortOptions
    .map(x => x.description);

  return {
    posts,
    categories,
    sortOptions,
    sortDescriptions
  };
}