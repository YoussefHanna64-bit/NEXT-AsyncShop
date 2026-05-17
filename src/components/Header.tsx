import Link from "next/link";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="px-8 py-4">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-teal-400 hover:text-teal-300 transition-colors"
        >
          AsyncShop
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
