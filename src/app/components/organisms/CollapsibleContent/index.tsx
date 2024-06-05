import { useState } from 'react';
import { Icon } from '@app/components/atoms/Icon';

export const CollapsibleContent = ({
  title,
  variant = 'gray',
  isShowing = false,
  children,
}: {
  title: string;
  variant?: 'red' | 'yellow' | 'green' | 'gray';
  isShowing?: boolean;
  children: React.ReactElement;
}) => {
  const [isShowingDropdown, setIsShowingDropdown] = useState(isShowing);

  const color = {
    red: {
      background: 'bg-red-100',
      border: 'border-red-100',
    },
    yellow: {
      background: 'bg-yellow-100',
      border: 'border-yellow-100',
    },
    green: {
      background: 'bg-green-100',
      border: 'border-green-100',
    },
    gray: {
      background: 'bg-gray-100',
      border: 'border-gray-100',
    },
  };

  return (
    <div className="w-1/2 mb-3">
      <div
        className={`w-full ${color[variant].background} rounded-t p-2 cursor-pointer flex flex-row items-center justify-between`}
        onClick={() => setIsShowingDropdown((current) => !current)}
      >
        <h2>{title}</h2>
        <Icon
          icon={isShowingDropdown ? 'faChevronUp' : 'faChevronDown'}
          variant="solid"
        />
      </div>
      {isShowingDropdown ? (
        <div className={`border ${color[variant].border} rounded-b p-2`}>
          {children}
        </div>
      ) : null}
    </div>
  );
};
