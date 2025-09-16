export default async function categoriesLoader({ params }: any) {
  let url = '/api/categories';
  if (params.slug) { url += '?slug=' + params.slug; }
  return {
    categories:
      await (await fetch(url)).json()
  };
};