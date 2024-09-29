'use client';
import { NavBarItem } from '@app/components/atoms/NavBarItem';
import { Icon } from '@app/components/atoms/Icon';
import { useEffect, useState } from 'react';
import { Household } from '@prisma/client';
import { readHouseholds } from '@app/actions/database/household';
import { useUser } from '@auth0/nextjs-auth0/client';
import { usePathname } from 'next/navigation';
import { createTask } from '@app/actions/database/task';

export const NavBarMobile = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const [households, setHouseholds] = useState<Household[]>([]);
  const includeAddButton = pathname === '/chores' || pathname === '/projects';

  useEffect(() => {
    async function fetchHouseholds() {
      if (user) {
        const fetchedHouseholds = await readHouseholds();
        setHouseholds(fetchedHouseholds);
      }
    }
    fetchHouseholds();
  }, [user]);

  if (households.length === 0) return null;

  return (
    <nav className="flex text-lg bg-gray-100 flex-row w-screen py-1 border-r border-r-gray-200 shadow-lg justify-around bottom-0 fixed">
      <NavBarItem className="w-[60px] h-[60px]" href="/">
        <Icon icon={'faHouse'} variant={'solid'} />
      </NavBarItem>
      <NavBarItem
        className={`w-[60px] h-[60px]${includeAddButton ? '' : ' pl-8'}`}
        href="/chores"
      >
        <Icon icon={'faCalendar'} variant={'solid'} />
      </NavBarItem>
      <div
        className={`relative ${includeAddButton ? 'scale-[1]' : 'scale-[0]'} ${
          includeAddButton ? 'transition-all' : 'transition-none'
        }`}
      >
        <div className="bg-gray-100 absolute w-[80px] h-[80px] top-[-40px] left-[-10px] border rounded-full text-3xl flex justify-center items-center">
          <form action={createTask}>
            {pathname === '/chores' ? (
              <input
                id="true"
                type="hidden"
                name="repeating"
                value="true"
                defaultChecked
              />
            ) : null}
            <button type="submit">
              <Icon icon={'faPlus'} variant={'solid'} />
            </button>
          </form>
        </div>
        <div
          className={`${
            includeAddButton ? 'w-[60px] h-[60px]' : 'w-[0px] h-[0px]'
          } transition-all`}
        ></div>
      </div>
      <NavBarItem
        className={`w-[60px] h-[60px]${includeAddButton ? '' : ' pr-8'}`}
        href="/projects"
      >
        <Icon icon={'faClipboardList'} variant={'solid'} />
      </NavBarItem>
      <NavBarItem className="w-[60px] h-[60px]" href="/households">
        <Icon icon={'faLocationDot'} variant={'solid'} />
      </NavBarItem>
    </nav>
  );
};
