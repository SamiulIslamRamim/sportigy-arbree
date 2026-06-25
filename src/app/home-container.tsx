'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ActionButton } from '@/components/common/button/action-button.component';
import { FlaskConical, BookOpen } from 'lucide-react';

export default function HomeContainer() {
  const router = useRouter();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 bg-background selection:bg-primary/20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div className="relative mb-8">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-1 ring-white/10">
          <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.087 4.113" />
          </svg>
        </div>
      </div>

      <div className="relative mb-2">
        <div className="text-6xl md:text-8xl font-bold tracking-tight text-foreground tabular-nums">
          {formatTime(time)}
        </div>
      </div>
      <p className="relative text-muted-foreground text-sm mb-10">
        {time.toLocaleDateString('en-US', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        })}
      </p>

      <div className="relative text-center mb-10 max-w-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 tracking-tight">
          Welcome to Your Project
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Your Next.js 15 + TypeScript project is scaffolded and ready. Explore the
          production-ready component system, form fields, data tables, and utilities.
        </p>
      </div>

      <section className="bg-gradient-to-br from-primary/5 via-primary/5 to-background rounded-2xl w-full max-w-2xl">
        <div className="py-10 px-6 mx-auto text-center">
          <h2 className="mb-3 text-2xl font-bold text-foreground">Ready to Build?</h2>
          <p className="mx-auto mb-6 max-w-lg text-muted-foreground">
            Browse the component lab to see what each component offers, or dive straight into the guides.
          </p>
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <ActionButton
              buttonContent="Explore Components"
              icon={<FlaskConical className="h-5 w-5" />}
              variant="default"
              handleOpen={() => router.push('/examples')}
            />
            <ActionButton
              buttonContent="View Guides"
              icon={<BookOpen className="h-5 w-5" />}
              variant="outline"
              handleOpen={() => router.push('/examples')}
            />
          </div>
          <p className="mt-10 text-xs text-muted-foreground/50">
            Nexstruct — Scaffolded with ❤️ for the developer community
          </p>
        </div>
      </section>

      <p className="relative mt-20 text-xs text-muted-foreground/30 select-none">
        Scaffolded with Nexstruct
      </p>
    </main>
  );
}
