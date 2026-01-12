import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-[150px] md:text-[200px] font-semibold text-slate-lightest leading-none">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-medium text-slate-lightest mt-4 mb-6">
        Page Not Found
      </h2>
      <p className="text-slate max-w-md mb-12">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn btn-lg">
        Go Home
      </Link>
    </main>
  );
}
