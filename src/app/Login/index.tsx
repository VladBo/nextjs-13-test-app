"use client";
import { signIn, signOut } from "next-auth/react";

export function SignOut() {
  return (
    <a
      href={`/api/auth/signout`}
      className="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
      onClick={(e) => {
        e.preventDefault();
        signOut();
      }}>
      Sign out
    </a>
  );
}

export function SignIn() {
  return (
    <a
      href={`/api/auth/signin`}
      className="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
      onClick={(e) => {
        e.preventDefault();
        signIn();
      }}>
      Sign in
    </a>
  );
}
