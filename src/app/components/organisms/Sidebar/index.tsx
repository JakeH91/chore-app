'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

export default function Sidebar() {
  const { user, isLoading } = useUser();

  if (!user || isLoading) {
    return (
      <aside className="flex flex-col w-60 border-r border-black h-full">
        <Link className="p-4 w-full" href="/">
          Home
        </Link>
        <a className="p-4 w-full" href="/api/auth/login">
          Login
        </a>
      </aside>
    );
  }

  return (
    <aside className="flex flex-col w-60 border-r border-black h-full">
      <Link className="p-4 w-full" href="/">
        Home
      </Link>
      <Link className="p-4 w-full" href="/tasks">
        Chores
      </Link>
      <a className="p-4 w-full" href="/api/auth/logout">
        Logout
      </a>
    </aside>
  );
}
