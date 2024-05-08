'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { createDatabaseUser, readDatabaseUser } from '../actions/database/user';

export default function Profile() {
  const { user: authUser, error, isLoading } = useUser();
  const [databaseUser, setDatabaseUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>();

  useEffect(() => {
    async function fetchUser() {
      const user = await readDatabaseUser(authUser?.sub!);
      setDatabaseUser(user);
      console.log('user:', user);
    }
    if (authUser) {
      fetchUser();
    }
  }, [authUser]);

  console.log('auth user:', authUser);

  useEffect(() => {
    (async () => {
      if (databaseUser === null && authUser?.sub && !isLoading && !error) {
        await createDatabaseUser({
          userId: authUser.sub,
          name: authUser.name!,
          email: authUser.email!,
        });
      }
    })();
  }, [databaseUser, authUser, isLoading, error]);

  if (isLoading) {
    return <p>{'Fetching User...'}</p>;
  }

  return null;
}
