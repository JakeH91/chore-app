'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { NavBarItem } from '@app/components/atoms/NavBarItem';

export const NavBarDesktop = () => {
  const { user, isLoading } = useUser();

  return (
    <nav className="flex flex-col w-1/5 p-1 border-r border-r-gray-200 shadow-lg h-full">
      <NavBarItem href="/">Home</NavBarItem>
      {!user || isLoading ? (
        <NavBarItem href="/api/auth/login">Login</NavBarItem>
      ) : (
        <>
          <NavBarItem href="/chores">Chores</NavBarItem>
          <NavBarItem href="/projects">Projects</NavBarItem>
          <NavBarItem href="/households">Households</NavBarItem>
          <NavBarItem href="/api/auth/logout">Logout</NavBarItem>
        </>
      )}
    </nav>
  );
};
