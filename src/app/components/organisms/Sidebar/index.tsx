'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import SidebarItem from '../../atoms/SidebarItem';

export default function Sidebar() {
  const { user, isLoading } = useUser();

  return (
    <nav className="flex flex-col w-60 p-1 border-r border-r-gray-200 shadow-lg h-full">
      <SidebarItem href="/">Home</SidebarItem>
      {!user || isLoading ? (
        <SidebarItem href="/api/auth/login">Login</SidebarItem>
      ) : (
        <>
          <SidebarItem href="/tasks">Chores</SidebarItem>
          <SidebarItem href="/api/auth/logout">Logout</SidebarItem>
        </>
      )}
    </nav>
  );
}
