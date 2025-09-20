import categoriesLoader from './categoriesLoader';

export default async function postsAndCategoriesLoader({ params }: any) {
  let url = '/api/posts';
  if (params.slug) { url += '?slug=' + params.slug; }
  const posts = await (await fetch(url)).json();
  const { categories } = await categoriesLoader();
  return { posts, categories };
}