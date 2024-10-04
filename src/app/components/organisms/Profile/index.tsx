'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import {
  createDatabaseUser,
  readDatabaseUser,
} from '@app/actions/database/user';

export const Profile = () => {
  const { user: authUser, error, isLoading } = useUser();
  const [databaseUser, setDatabaseUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>();

  console.log('authUser:', authUser);
  console.log('error:', error);
  console.log('databaseUser:', databaseUser);

  useEffect(() => {
    async function fetchUser() {
      const user = await readDatabaseUser(authUser?.sub!);
      console.log('USER AFTER READING:', user);
      setDatabaseUser(user);
    }
    if (authUser) {
      fetchUser();
    }
  }, [authUser]);

  useEffect(() => {
    (async () => {
      console.log('outside');
      if (databaseUser === null && authUser?.sub && !isLoading && !error) {
        console.log('server side user creation attempt');
        await createDatabaseUser({
          userId: authUser.sub,
          name: authUser.name!,
          email: authUser.email!,
        });
      }
    })();
  }, [databaseUser, authUser, isLoading, error]);

  return null;
};
