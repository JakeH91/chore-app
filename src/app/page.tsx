'use client';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (error) {
    return <h1>SOMETHING WENT WRONG!!</h1>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <h1>Hello World!</h1>;
  }

  return <h1>Hello {user?.name}</h1>;
}
