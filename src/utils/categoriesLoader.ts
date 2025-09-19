export default async function categoriesLoader() {
  let url = '/api/categories';
  return {
    categories:
      await (await fetch(url)).json()
  };
};