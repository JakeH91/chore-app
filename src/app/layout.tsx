import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css';
import { Profile } from '@app/components/organisms/Profile';
import { NavBar } from '@app/components/organisms/NavBar';

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
          <NavBar />
          <main className="p-8 w-4/5">{children}</main>
        </body>
      </UserProvider>
    </html>
  );
}
