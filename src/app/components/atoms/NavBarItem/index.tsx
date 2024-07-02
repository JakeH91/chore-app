'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavBarItem = ({
  href,
  children,
}: {
  href: string;
  children: string | React.ReactElement;
}) => {
  const path = usePathname();
  const subDirectory = path.split('/')[1];
  const selected = href.split('/')[1] === subDirectory;

  return (
    <Link
      className={`p-4 md:w-full md:bg-opacity-70 rounded ${
        selected ? 'md:bg-sky-600' : 'md:hover:bg-gray-200'
      } md:hover:bg-opacity-80`}
      href={href}
    >
      {children}
    </Link>
  );
};
