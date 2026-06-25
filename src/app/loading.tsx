export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-muted border-t-primary" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
      <p className="mt-6 text-sm text-muted-foreground animate-pulse">Loading…</p>
    </div>
  );
}
