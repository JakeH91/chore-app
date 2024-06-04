'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarItem({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  const path = usePathname();
  const subDirectory = path.split('/')[1];
  const selected = href.split('/')[1] === subDirectory;

  return (
    <Link
      className={`p-4 w-full bg-opacity-70 rounded ${
        selected ? 'bg-sky-600' : 'hover:bg-gray-200'
      } hover:bg-opacity-80`}
      href={href}
    >
      {children}
    </Link>
  );
}
