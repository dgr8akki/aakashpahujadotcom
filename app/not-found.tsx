import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container lost">
      <h1>Page not found</h1>
      <p className="lead">The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.</p>
      <Link href="/" className="btn btn--quiet">
        Go home
      </Link>
    </div>
  );
}
