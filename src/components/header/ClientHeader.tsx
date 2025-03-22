'use client';

import { usePathname } from 'next/navigation';
import MainHeader from '@/components/header/MainHeader';
import LandingHeader from '@/components/header/LandingHeader';

export default function ClientHeader() {
  const pathname = usePathname();

  if (pathname.startsWith('/auth/')) {
    return null;
  }

  return pathname === '/' ? <LandingHeader /> : <MainHeader />;
}
