"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="hover:text-red-400 transition-colors text-white"
    >
      Logout
    </button>
  );
}
