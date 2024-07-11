'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavBarItem = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: string | React.ReactElement;
}) => {
  const path = usePathname();
  const subDirectory = path.split('/')[1];
  const selected = href.split('/')[1] === subDirectory;

  return (
    <Link
      className={`${
        className ? className + ' ' : ''
      }p-4 md:w-full md:bg-opacity-70 rounded ${
        selected ? 'md:bg-sky-600' : 'md:hover:bg-gray-200'
      } md:hover:bg-opacity-80 flex justify-center items-center`}
      href={href}
    >
      {children}
    </Link>
  );
};
