import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import './globals.css';
import Profile from './components/Profile';

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
        <body className={inter.className}>
          <Profile />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
