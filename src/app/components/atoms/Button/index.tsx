import { Icon } from '@app/components/atoms/Icon';
import { ButtonHTMLAttributes } from 'react';

export const Button = ({
  onClick,
  icon,
  selected,
  type,
}: {
  onClick: () => void;
  icon: string;
  selected: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
}) => {
  return (
    <button onClick={onClick} type={type}>
      <Icon icon={icon} variant={selected ? 'solid' : 'regular'} />
    </button>
  );
};
