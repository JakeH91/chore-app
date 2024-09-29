import { useEffect, useRef, useState } from 'react';
import { Icon } from '@app/components/atoms/Icon';

export const Dropdown = () => {
  const [isShowingDropdown, setIsShowingDropdown] = useState(false);
  const [buttonVariant, setButtonVariant] = useState<'regular' | 'solid'>(
    'regular'
  );

  // Close dropdown if click occurs outside component
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsShowingDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="relative">
      <button onClick={() => setIsShowingDropdown((current) => !current)}>
        <Icon icon={'faCircleCheck'} variant={buttonVariant} />
      </button>
      {isShowingDropdown ? (
        <div className="absolute top-6">
          <p>Hi</p>
          <button
            onClick={() =>
              setButtonVariant((current) =>
                current === 'regular' ? 'solid' : 'regular'
              )
            }
          >
            Completed?
          </button>
        </div>
      ) : null}
    </div>
  );
};
