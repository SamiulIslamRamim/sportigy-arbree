'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge.component';
import { Card, CardContent } from '@/components/ui/card.component';

const PROJECT: string = "sportigy-arbree";
const STACK: Array<{ label: string; value: string }> = [{"label":"UI","value":"shadcn/ui (Tailwind CSS)"},{"label":"State","value":"Zustand"},{"label":"API","value":"Fetch API"},{"label":"Auth","value":"None"},{"label":"Forms","value":"react-hook-form + Zod"}];
const EXAMPLES: Array<{ href: string; title: string; desc: string }> = [{"href":"/examples/form","title":"Form Fields","desc":"CustomField types with validation"},{"href":"/examples/table","title":"DynamicTable","desc":"Config-driven data table"},{"href":"/examples/dialog","title":"Dialog & Actions","desc":"Reusable dialog, buttons, pagination"}];

export default function ExamplesContainer() {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-lg font-bold text-white shadow-sm">
            N
          </span>
          <h1 className="text-3xl font-bold tracking-tight">{PROJECT}</h1>
        </div>
        <p className="text-muted-foreground ml-[3.25rem]">
          Your Next.js project, scaffolded with &zwj;⚒️&zwj; Nexstruct.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>📦</span> Stack
        </h2>
        <Card>
          <CardContent className="p-6 space-y-3">
            {STACK.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm font-medium capitalize">{item.label}</span>
                <Badge variant="outline">{item.value}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {EXAMPLES.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🧩</span> Component Examples
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {EXAMPLES.map((ex) => (
              <Link key={ex.href} href={ex.href}
                className="block p-6 rounded-lg border hover:border-primary hover:shadow-md transition-all bg-card"
              >
                <h3 className="font-semibold mb-1">{ex.title}</h3>
                <p className="text-sm text-muted-foreground">{ex.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>📁</span> Project Structure
        </h2>
        <div className="rounded-lg border bg-card p-6">
          <pre className="text-sm text-muted-foreground font-mono leading-relaxed">{
`src/
├── app/          # App Router pages
├── components/   # Reusable components
│   ├── ui/       # UI primitives
│   └── common/   # Common components
├── lib/          # Utilities
├── providers/    # Provider wrappers
├── hooks/        # Custom hooks
├── store/        # State management
├── api/          # API layer
├── auth/         # Authentication
├── forms/        # Form handling
└── types/        # TypeScript types`}</pre>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>🧹</span> Cleanup
        </h2>
        <p className="text-sm text-muted-foreground mb-3">
          When ready to remove example files, run:
        </p>
        <div className="p-3 rounded-lg bg-muted border">
          <code className="text-sm text-primary font-mono">npm run cleanup</code>
        </div>
      </section>
    </div>
  );
}
