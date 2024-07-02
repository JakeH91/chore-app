import { Icon } from '@app/components/atoms/Icon';
import Link from 'next/link';

export const Button = ({
  onClick,
  href,
  children,
  icon,
  selected,
  className,
  title,
  type,
}: {
  onClick?: () => void;
  href?: string;
  children?: string;
  icon?: string;
  selected?: boolean;
  className?: string;
  title?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
}) => {
  if (href) {
    return (
      <Link
        className={`${className} border py-2 px-4 text-center rounded bg-green-500 text-white shadow active:shadow-inner active:bg-green-600`}
        href={href}
      >
        {children}
      </Link>
    );
  }
  return (
    <button className={className} onClick={onClick} type={type} title={title}>
      {icon ? (
        <Icon icon={icon} variant={selected ? 'solid' : 'regular'} />
      ) : null}
      {children ? children : null}
    </button>
  );
};
