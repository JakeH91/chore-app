'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SidebarItem from '../../atoms/SidebarItem';

export default function Sidebar() {
  const { user, isLoading } = useUser();
  const path = usePathname();

  if (!user || isLoading) {
    return (
      <aside className="flex flex-col w-60 border-r border-r-gray-200 shadow-lg h-full">
        <SidebarItem href="/">Home</SidebarItem>
        <SidebarItem href="/api/auth/login">Login</SidebarItem>
      </aside>
    );
  }

  return (
    <aside className="flex flex-col w-60 p-1 border-r border-r-gray-200 shadow-lg h-full">
      <SidebarItem href="/">Home</SidebarItem>
      <SidebarItem href="/tasks">Chores</SidebarItem>
      <SidebarItem href="/api/auth/logout">Logout</SidebarItem>
    </aside>
  );
}
