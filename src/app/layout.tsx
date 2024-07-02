import type { Metadata } from 'next';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css';
import { Profile } from '@app/components/organisms/Profile';
import { NavBar } from '@app/components/organisms/NavBar';
import { headers } from 'next/headers';
import { getSession } from '@auth0/nextjs-auth0';
import { Login } from '@app/components/organisms/Login';

export const metadata: Metadata = {
  title: 'Chore App',
  description: 'An app for tracking household chores',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAgent = headers().get('user-agent');
  const isMobile = userAgent?.includes('Mobile');
  const session = await getSession();
  const isLoggedIn = session?.user;

  return (
    <html lang="en">
      <UserProvider>
        {isMobile ? (
          <body className={`flex flex-col h-full relative`}>
            <Profile />
            <main className="flex flex-col h-screen relative">
              {isLoggedIn ? children : <Login />}
            </main>
          </body>
        ) : (
          <body className={`flex flex-row h-full`}>
            <Profile />
            <NavBar />
            <main className="p-8 w-4/5">{children}</main>
          </body>
        )}
      </UserProvider>
    </html>
  );
}
