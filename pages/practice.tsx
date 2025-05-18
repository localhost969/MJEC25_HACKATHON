import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PracticeRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/practice-problems');
  }, [router]);
  
  return null;
} 