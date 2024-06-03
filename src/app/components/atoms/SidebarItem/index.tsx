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
  const selected = href.includes(path);

  return (
    <Link
      className={`p-4 w-full rounded ${selected ? 'bg-sky-600' : ''}`}
      href={href}
    >
      {children}
    </Link>
  );
}
