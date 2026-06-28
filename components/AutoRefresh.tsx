'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AutoRefresh({ interval = 15000 }: { interval?: number }) {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => {
      // router.refresh() fetches the latest server component payload silently 
      // without doing a hard reload, keeping the UI state intact.
      router.refresh();
    }, interval);

    return () => clearInterval(id);
  }, [router, interval]);

  return null; // This component doesn't render anything
}
