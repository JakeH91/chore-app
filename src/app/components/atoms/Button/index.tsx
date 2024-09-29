import { Icon } from '@app/components/atoms/Icon';
import Link from 'next/link';

export const Button = ({
  onClick,
  href,
  children,
  icon,
  iconVariant,
  className,
  title,
  type,
  variant,
  size,
}: {
  onClick?: () => void;
  href?: string;
  children?: string;
  icon?: string;
  iconVariant?: 'solid' | 'regular';
  className?: string;
  title?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  variant?: 'primary' | 'secondary' | undefined;
  size?: 'small' | 'medium';
}) => {
  if (href) {
    return (
      <Link
        className={`${className ? className + ' ' : ''} ${
          size === 'small'
            ? 'p-0'
            : 'border py-2 px-4 shadow active:shadow-inner'
        } text-center rounded ${
          variant === 'secondary'
            ? 'bg-white text-black active:bg-gray-100'
            : 'bg-green-500 text-white active:bg-green-600'
        }`}
        href={href}
      >
        {icon ? <Icon icon={icon} variant={iconVariant} /> : null}
        {children ? children : null}
      </Link>
    );
  }
  return (
    <button
      className={`${className ? className + ' ' : ''} ${
        size === 'small' ? 'p-0' : 'border py-2 px-4 shadow active:shadow-inner'
      } text-center rounded ${
        variant === 'secondary'
          ? 'bg-white text-black active:bg-gray-100'
          : 'bg-green-500 text-white active:bg-green-600'
      }`}
      onClick={onClick}
      type={type}
      title={title}
    >
      {icon ? <Icon icon={icon} variant={iconVariant} /> : null}
      {children ? children : null}
    </button>
  );
};
