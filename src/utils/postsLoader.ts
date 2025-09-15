export default async function postsLoader({ params }: any) {
  let url = '/api/posts';
  if (params.slug) { url += '?slug=' + params.slug; }
  return {
    posts:
      await (await fetch(url)).json()
  };
};