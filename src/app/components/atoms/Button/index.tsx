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
  variant,
}: {
  onClick?: () => void;
  href?: string;
  children?: string;
  icon?: string;
  selected?: boolean;
  className?: string;
  title?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  variant?: 'primary' | 'secondary' | undefined;
}) => {
  if (href) {
    return (
      <Link
        className={`${
          className ? className + ' ' : ''
        }border py-2 px-4 text-center rounded ${
          variant === 'secondary'
            ? 'bg-white text-black active:bg-gray-100'
            : 'bg-green-500 text-white active:bg-green-600'
        } shadow active:shadow-inner`}
        href={href}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`${
        className ? className + ' ' : ''
      }border py-2 px-4 text-center rounded ${
        variant === 'secondary'
          ? 'bg-white text-black active:bg-gray-100'
          : 'bg-green-500 text-white active:bg-green-600'
      } shadow active:shadow-inner`}
      onClick={onClick}
      type={type}
      title={title}
    >
      {icon ? (
        <Icon icon={icon} variant={selected ? 'solid' : 'regular'} />
      ) : null}
      {children ? children : null}
    </button>
  );
};
