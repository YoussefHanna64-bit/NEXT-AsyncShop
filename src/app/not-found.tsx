import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-25">
      <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
      <p className="text-gray-400 mb-8">
        We couldn't find what you were looking for.
      </p>
      <Link href="/products" className="text-teal-400">
        Return to Products
      </Link>
    </div>
  );
}
