"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  name: string;
  path: string;
}

export default function NavLink({ name, path }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={
        pathname === path
          ? "text-teal-400"
          : "hover:text-teal-400 transition-colors text-white"
      }
    >
      {name}
    </Link>
  );
}
