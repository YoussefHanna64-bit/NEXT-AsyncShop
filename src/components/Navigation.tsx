import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/services/auth";
import NavLink from "./NavLink";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { User } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" },
  { name: "Cart", path: "/cart" },
];

export default async function Navigation() {
  const session = await getServerSession(authConfig);
  const nav = [...navItems];

  if (!session) {
    nav.push({ name: "Login", path: "/login" });
  }

  return (
    <nav>
      <ul className="flex items-center space-x-4">
        {nav.map(({ name, path }) => (
          <li key={name}>
            <NavLink name={name} path={path} />
          </li>
        ))}
        {session && (
          <li className="flex items-center gap-3 text-sm text-gray-400">
            <Link
              href="/profile"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              {session.user?.name && (
                <span className="font-medium text-white">
                  {session.user.name}
                </span>
              )}

              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  width={32}
                  height={32}
                  alt="User Avatar"
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 border border-gray-600">
                  <User size={16} />
                </div>
              )}
            </Link>

            <LogoutButton />
          </li>
        )}
      </ul>
    </nav>
  );
}
