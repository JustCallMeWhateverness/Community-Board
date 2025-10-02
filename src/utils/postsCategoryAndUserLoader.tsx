export default async function postsAndCategoryLoader() {
  const res = await fetch('/api/postdetailsview'); // new endpoint
  const data = await res.json();
  console.log("API data:", data);
  return { posts: data };
}