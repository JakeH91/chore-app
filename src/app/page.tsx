'use client';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user, error, isLoading } = useUser();

  const loadContent = () => {
    if (error) {
      return <h1>SOMETHING WENT WRONG!!</h1>;
    }

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (!user) {
      return (
        <div>
          <h1>Hello World!</h1>
          <a href="/api/auth/login">Login</a>
        </div>
      );
    }

    return (
      <div>
        <h1>Hello {user?.name}</h1>
        <a href="/api/auth/logout">Logout</a>
      </div>
    );
  };

  return <main>{loadContent()}</main>;
}
