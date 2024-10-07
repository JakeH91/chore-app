import type { Metadata } from 'next';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css';
import { Profile } from '@app/components/organisms/Profile';
import { NavBarDesktop } from '@app/components/organisms/NavBarDesktop';
import { headers } from 'next/headers';
import { getSession } from '@auth0/nextjs-auth0';
import { Login } from '@app/components/organisms/Login';
import { NavBarMobile } from '@app/components/organisms/NavBarMobile';

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
          <body>
            <Profile />
            <div className={`flex flex-col h-screen relative justify-between`}>
              <main className="flex flex-col relative pb-[68px]">
                {isLoggedIn ? children : <Login />}
              </main>
              <NavBarMobile />
            </div>
          </body>
        ) : (
          <body className={`flex flex-row h-full`}>
            <Profile />
            <NavBarDesktop />
            <main className="p-8 w-4/5">{children}</main>
          </body>
        )}
      </UserProvider>
    </html>
  );
}
