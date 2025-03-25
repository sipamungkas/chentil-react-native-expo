import { useEffect, useState } from 'react';

export function useFrameworkReady() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Add any framework initialization logic here
    setIsReady(true);
  }, []);

  return isReady;
} 