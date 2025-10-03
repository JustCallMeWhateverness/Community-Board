import { useEffect, useState } from "react";
import type UserComment from "../interfaces/UserComment";
import type User from "../interfaces/User";

export function useUserComments(user: User | null) {
  const [comments, setComments] = useState<UserComment[]>([]);

  useEffect(() => {
    if (!user) return;
    async function fetchComments() {
      const response = await fetch("/api/comments");
      if (response.ok) {
        const data: UserComment[] = await response.json();
        setComments(data.filter(c => c.userID === user?.id));
      }
    }
    fetchComments();
  }, [user]);
  return [comments, setComments] as const;
}