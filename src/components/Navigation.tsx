import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/services/auth";
import NavLink from "./NavLink";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

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
            {session.user?.image && (
              <Link href="/profile">
                <Image
                  src={session.user.image}
                  width={32}
                  height={32}
                  alt="User Avatar"
                  className="rounded-full"
                />
              </Link>
            )}
            <LogoutButton />
          </li>
        )}
      </ul>
    </nav>
  );
}
