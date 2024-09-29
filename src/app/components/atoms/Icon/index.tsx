import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';

const variants = {
  regular: regularIcons,
  solid: solidIcons,
};

export const Icon = ({
  icon,
  variant = 'regular',
}: {
  icon: string;
  variant?: 'regular' | 'solid';
}) => {
  // @ts-expect-error: couldn't find the correct type from font awesome
  return <FontAwesomeIcon icon={variants[variant][icon]} />;
};
