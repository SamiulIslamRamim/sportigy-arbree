'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './navbar.component';

/**
 * Pages where the global navbar should be hidden.
 * Users can add or remove paths here as needed.
 *
 * Supports:
 * - Exact match:  '/login'
 * - Wildcard:     '/auth/*'  (matches /auth/forgot-password, /auth/reset, etc.)
 */
const EXCLUDED_PATHS = ['/login', '/register', '/auth/*'];

function isPathExcluded(pathname: string): boolean {
  return EXCLUDED_PATHS.some((pattern) => {
    if (pattern.endsWith('/*')) {
      return pathname.startsWith(pattern.slice(0, -2));
    }
    return pathname === pattern;
  });
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = isPathExcluded(pathname);

  return (
    <>
      {!hideNav && <Navbar />}
      <main className={hideNav ? '' : 'min-h-[calc(100vh-3.5rem)]'}>{children}</main>
    </>
  );
}
