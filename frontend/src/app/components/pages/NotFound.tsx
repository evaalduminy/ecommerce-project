import Link from "next/link";
import { Home } from "lucide-react";

export function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-9xl mb-4 text-primary">404</h1>
      <h2 className="text-3xl mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
}

