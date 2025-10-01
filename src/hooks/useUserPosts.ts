import { useEffect, useState } from "react";
import type Post from "../interfaces/Post";
import type User from "../interfaces/User";

export function useUserPosts(user: User | null) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!user) return;

    async function fetchPosts() {
      const response = await fetch("/api/posts");
      if (response.ok) {
        const data: Post[] = await response.json();
        setPosts(data.filter(p => p.userID === user?.id));
      }
    }

    fetchPosts();
  }, [user]);

  return { posts, setPosts };
}