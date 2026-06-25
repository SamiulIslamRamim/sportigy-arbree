'use client';

import { ToastProvider } from '@/providers/toast.provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
    {children}
    </ToastProvider>
  );
}
