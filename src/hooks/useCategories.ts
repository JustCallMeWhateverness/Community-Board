import { useEffect, useState } from "react";

export function useCategories() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      if (res.ok) setCategories(await res.json());
    }
    fetchCategories();
  }, []);

  return categories;
}