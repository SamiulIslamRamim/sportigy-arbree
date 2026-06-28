import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { AppShell } from '@/components/common/app-shell.component';
import { Providers } from '@/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: "Sportigy | %s",
    default: "Sportigy", // a default is required when creating a template
  },
  description: "Sportigy is a platform for sports fans.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange> */}
          <AppShell>
            <Providers>{children}</Providers>
          </AppShell>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
