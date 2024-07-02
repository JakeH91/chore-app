'use client';
import { NavBarItem } from '@app/components/atoms/NavBarItem';
import { Icon } from '@app/components/atoms/Icon';
import { useEffect, useState } from 'react';
import { Household } from '@prisma/client';
import { readHouseholds } from '@app/actions/database/household';

export const NavBarMobile = () => {
  const [households, setHouseholds] = useState<Household[]>([]);

  useEffect(() => {
    async function fetchHouseholds() {
      const fetchedHouseholds = await readHouseholds();
      setHouseholds(fetchedHouseholds);
    }
    fetchHouseholds();
  }, []);

  if (households.length === 0) return null;

  return (
    <nav className="flex text-lg bg-gray-100 flex-row w-screen py-1 border-r border-r-gray-200 shadow-lg justify-around">
      <NavBarItem href="/">
        <Icon icon={'faHouse'} variant={'solid'} />
      </NavBarItem>
      <NavBarItem href="/chores">
        <Icon icon={'faCalendar'} variant={'solid'} />
      </NavBarItem>
      <NavBarItem href="/projects">
        <Icon icon={'faClipboardList'} variant={'solid'} />
      </NavBarItem>
      <NavBarItem href="/households">
        <Icon icon={'faLocationDot'} variant={'solid'} />
      </NavBarItem>
    </nav>
  );
};
