"use client";

import { useState, useEffect, startTransition } from "react";

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    startTransition(() => setHasMounted(true));
  }, []);

  return hasMounted;
};
