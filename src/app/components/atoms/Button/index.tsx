import { Icon } from '@app/components/atoms/Icon';

export const Button = ({
  onClick,
  icon,
  selected,
  className,
  title,
  type,
}: {
  onClick: () => void;
  icon: string;
  selected: boolean;
  className?: string;
  title?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
}) => {
  return (
    <button className={className} onClick={onClick} type={type} title={title}>
      <Icon icon={icon} variant={selected ? 'solid' : 'regular'} />
    </button>
  );
};
