import { Icon } from '@app/components/atoms/Icon';

export const Button = ({
  onClick,
  icon,
  selected,
  title,
  type,
}: {
  onClick: () => void;
  icon: string;
  selected: boolean;
  title?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
}) => {
  return (
    <button onClick={onClick} type={type} title={title}>
      <Icon icon={icon} variant={selected ? 'solid' : 'regular'} />
    </button>
  );
};
