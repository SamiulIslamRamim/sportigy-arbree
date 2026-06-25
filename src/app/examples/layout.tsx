import { TooltipProvider } from '@/components/ui/tooltip.component';

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <main className="p-6 max-w-6xl mx-auto">{children}</main>
      </div>
    </TooltipProvider>
  );
}
