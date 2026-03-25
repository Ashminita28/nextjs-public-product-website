"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-sm px-3 py-1 border rounded-md"
    >
      Logout
    </button>
  );
}