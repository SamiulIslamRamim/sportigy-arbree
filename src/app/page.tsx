import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Nexstruct</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Your project is ready. Start building.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/examples"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          View Component Examples
        </Link>
      </div>
    </main>
  );
}
