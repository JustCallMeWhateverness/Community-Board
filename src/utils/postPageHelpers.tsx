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
    { label: `All (${posts.length})`, value: 'All' },
    ...category.map(x => {
      const count = posts.filter(post => post.categoryID === x.id).length;
      return {
        label: `${x.name} (${count})`,
        value: String(x.id)
      };
    })
      // flatten to one array
      .flat()
      // remove duplicates1
      .filter((x, i, a) => a.indexOf(x) === i)
      // sort (by title)
      .sort()
  ];

  const sortOptions: SortOption[] = [
    { description: 'Date (newest to oldest)', key: 'date', order: -1 },
    { description: 'Date (oldest to newest)', key: 'date', order: 1 },
    { description: 'Title (A-Z)', key: 'title', order: 1 },
    { description: 'Title (Z-A)', key: 'title', order: -1 },
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