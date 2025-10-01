import { useState } from "react";

export function useModal<T>() {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  function open(item: T) {
    setSelectedItem(item);
    setShow(true);
  }

  function close() {
    setSelectedItem(null);
    setShow(false);
  }

  return { show, selectedItem, open, close };
}