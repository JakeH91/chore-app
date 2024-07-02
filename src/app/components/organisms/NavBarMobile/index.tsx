'use client';
import { NavBarItem } from '@app/components/atoms/NavBarItem';
import { Icon } from '@app/components/atoms/Icon';

export const NavBarMobile = () => {
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
