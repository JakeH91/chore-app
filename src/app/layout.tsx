import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css';
import Profile from './components/organisms/Profile';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chore App',
  description: 'An app for tracking household chores',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={`${inter.className} flex flex-row h-screen`}>
          <Profile />
          <aside className="flex flex-col w-60 border-r border-black h-full">
            <Link className="p-4 w-full" href="/">
              Home
            </Link>
            <Link className="p-4 w-full" href="/tasks">
              Chores
            </Link>
          </aside>
          <main className="p-8">{children}</main>
        </body>
      </UserProvider>
    </html>
  );
}
